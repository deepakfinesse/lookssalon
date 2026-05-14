"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  HiOutlinePlus, HiOutlineTrash, HiOutlinePencil,
  HiOutlinePhotograph, HiOutlineCheck, HiOutlineX,
} from "react-icons/hi";

const EMPTY_FORM = {
  desktopImageUrl: "",
  desktopImageAlt: "",
  mobileImageUrl:  "",
  mobileImageAlt:  "",
  href:            "/",
  order:           0,
  isActive:        true,
};

export default function BannersDashboard() {
  const [banners, setBanners]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [showAddForm, setShowAddForm] = useState(false);

  const desktopInputRef = useRef(null);
  const mobileInputRef  = useRef(null);
  const editDesktopRef  = useRef(null);
  const editMobileRef   = useRef(null);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/banners?admin=1");
      const data = await res.json();
      if (res.ok) setBanners(data.banners || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBanners(); }, [fetchBanners]);

  // ── Image upload helper ─────────────────────────────────────────────────────

  async function uploadImage(file, onSuccess) {
    const fd = new FormData();
    fd.append("file", file);
    const res  = await fetch("/api/banners/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) { alert(data.error || "Upload failed."); return; }
    onSuccess(data.url);
  }

  // ── Add form handlers ───────────────────────────────────────────────────────

  function handleFormChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleDesktopUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadImage(file, url => setForm(f => ({ ...f, desktopImageUrl: url })));
    e.target.value = "";
  }

  async function handleMobileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadImage(file, url => setForm(f => ({ ...f, mobileImageUrl: url })));
    e.target.value = "";
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.desktopImageUrl) { alert("Please upload a desktop image."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          desktopImage: { url: form.desktopImageUrl, alt: form.desktopImageAlt },
          mobileImage:  { url: form.mobileImageUrl,  alt: form.mobileImageAlt  },
          href:         form.href,
          order:        Number(form.order),
          isActive:     form.isActive,
        }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error || "Failed to create banner."); return; }
      setForm(EMPTY_FORM);
      setShowAddForm(false);
      fetchBanners();
    } finally {
      setSaving(false);
    }
  }

  // ── Inline edit handlers ────────────────────────────────────────────────────

  function startEdit(banner) {
    setEditingId(banner._id);
    setForm({
      desktopImageUrl: banner.desktopImage?.url ?? "",
      desktopImageAlt: banner.desktopImage?.alt ?? "",
      mobileImageUrl:  banner.mobileImage?.url  ?? "",
      mobileImageAlt:  banner.mobileImage?.alt  ?? "",
      href:            banner.href    ?? "/",
      order:           banner.order   ?? 0,
      isActive:        banner.isActive ?? true,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleEditDesktopUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadImage(file, url => setForm(f => ({ ...f, desktopImageUrl: url })));
    e.target.value = "";
  }

  async function handleEditMobileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadImage(file, url => setForm(f => ({ ...f, mobileImageUrl: url })));
    e.target.value = "";
  }

  async function handleSaveEdit(id) {
    if (!form.desktopImageUrl) { alert("Desktop image is required."); return; }
    setSaving(true);
    try {
      const res = await fetch(`/api/banners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          desktopImage: { url: form.desktopImageUrl, alt: form.desktopImageAlt },
          mobileImage:  { url: form.mobileImageUrl,  alt: form.mobileImageAlt  },
          href:         form.href,
          order:        Number(form.order),
          isActive:     form.isActive,
        }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error || "Update failed."); return; }
      setEditingId(null);
      fetchBanners();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this banner slide? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/banners/${id}`, { method: "DELETE" });
      if (res.ok) fetchBanners();
      else { const d = await res.json(); alert(d.error || "Delete failed."); }
    } finally {
      setDeleting(null);
    }
  }

  async function toggleActive(banner) {
    await fetch(`/api/banners/${banner._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !banner.isActive }),
    });
    fetchBanners();
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Banners</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {banners.length} slide{banners.length !== 1 ? "s" : ""} — ordered by the Order field (ascending)
          </p>
        </div>
        <button
          onClick={() => { setShowAddForm(v => !v); setEditingId(null); setForm(EMPTY_FORM); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-black rounded text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          <HiOutlinePlus size={16} /> Add Slide
        </button>
      </div>

      {/* Add new slide form */}
      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className="mb-8 border border-gray-200 rounded-lg p-6 bg-gray-50"
        >
          <h2 className="text-base font-semibold text-gray-800 mb-4">New Slide</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Desktop image */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                Desktop Image <span className="text-red-500">*</span>
              </label>
              <input ref={desktopInputRef} type="file" accept="image/*" onChange={handleDesktopUpload} className="hidden" />
              <button
                type="button"
                onClick={() => desktopInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-400 rounded text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors w-full justify-center"
              >
                <HiOutlinePhotograph size={18} />
                {form.desktopImageUrl ? "Change Desktop Image" : "Upload Desktop Image"}
              </button>
              {form.desktopImageUrl && (
                <div className="mt-2 relative h-28 rounded overflow-hidden border border-gray-200">
                  <Image src={form.desktopImageUrl} alt="Desktop preview" fill className="object-cover" />
                </div>
              )}
              <input
                name="desktopImageAlt"
                value={form.desktopImageAlt}
                onChange={handleFormChange}
                placeholder="Alt text (optional)"
                className="mt-2 w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Mobile image */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                Mobile Image <span className="text-gray-400 font-normal normal-case">(optional — falls back to desktop)</span>
              </label>
              <input ref={mobileInputRef} type="file" accept="image/*" onChange={handleMobileUpload} className="hidden" />
              <button
                type="button"
                onClick={() => mobileInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-400 rounded text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors w-full justify-center"
              >
                <HiOutlinePhotograph size={18} />
                {form.mobileImageUrl ? "Change Mobile Image" : "Upload Mobile Image"}
              </button>
              {form.mobileImageUrl && (
                <div className="mt-2 relative h-28 rounded overflow-hidden border border-gray-200">
                  <Image src={form.mobileImageUrl} alt="Mobile preview" fill className="object-cover" />
                </div>
              )}
              <input
                name="mobileImageAlt"
                value={form.mobileImageAlt}
                onChange={handleFormChange}
                placeholder="Alt text (optional)"
                className="mt-2 w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Link URL</label>
              <input
                name="href"
                value={form.href}
                onChange={handleFormChange}
                placeholder="/"
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Order</label>
              <input
                name="order"
                type="number"
                value={form.order}
                onChange={handleFormChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  name="isActive"
                  type="checkbox"
                  checked={form.isActive}
                  onChange={handleFormChange}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-gray-700 font-medium">Active</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-primary text-black text-sm font-bold rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Slide"}
            </button>
            <button
              type="button"
              onClick={() => { setShowAddForm(false); setForm(EMPTY_FORM); }}
              className="px-5 py-2 border border-gray-300 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Banner list */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">Loading…</div>
      ) : banners.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
          <HiOutlinePhotograph size={40} className="opacity-30" />
          <p className="text-sm">No banner slides yet. Add your first slide above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {banners.map((banner) =>
            editingId === banner._id ? (
              /* ── Inline edit row ─────────────────────────────────────────── */
              <div key={banner._id} className="border border-primary/40 rounded-lg p-5 bg-primary/5">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Editing Slide</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Desktop */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Desktop Image</label>
                    <input ref={editDesktopRef} type="file" accept="image/*" onChange={handleEditDesktopUpload} className="hidden" />
                    <button
                      type="button"
                      onClick={() => editDesktopRef.current?.click()}
                      className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-400 rounded text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors w-full justify-center"
                    >
                      <HiOutlinePhotograph size={18} />
                      {form.desktopImageUrl ? "Change Desktop Image" : "Upload Desktop Image"}
                    </button>
                    {form.desktopImageUrl && (
                      <div className="mt-2 relative h-28 rounded overflow-hidden border border-gray-200">
                        <Image src={form.desktopImageUrl} alt="Desktop preview" fill className="object-cover" />
                      </div>
                    )}
                    <input
                      name="desktopImageAlt"
                      value={form.desktopImageAlt}
                      onChange={handleFormChange}
                      placeholder="Alt text"
                      className="mt-2 w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Mobile Image</label>
                    <input ref={editMobileRef} type="file" accept="image/*" onChange={handleEditMobileUpload} className="hidden" />
                    <button
                      type="button"
                      onClick={() => editMobileRef.current?.click()}
                      className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-400 rounded text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors w-full justify-center"
                    >
                      <HiOutlinePhotograph size={18} />
                      {form.mobileImageUrl ? "Change Mobile Image" : "Upload Mobile Image"}
                    </button>
                    {form.mobileImageUrl && (
                      <div className="mt-2 relative h-28 rounded overflow-hidden border border-gray-200">
                        <Image src={form.mobileImageUrl} alt="Mobile preview" fill className="object-cover" />
                      </div>
                    )}
                    <input
                      name="mobileImageAlt"
                      value={form.mobileImageAlt}
                      onChange={handleFormChange}
                      placeholder="Alt text"
                      className="mt-2 w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Link URL</label>
                    <input
                      name="href"
                      value={form.href}
                      onChange={handleFormChange}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Order</label>
                    <input
                      name="order"
                      type="number"
                      value={form.order}
                      onChange={handleFormChange}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        name="isActive"
                        type="checkbox"
                        checked={form.isActive}
                        onChange={handleFormChange}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-gray-700 font-medium">Active</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleSaveEdit(banner._id)}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-2 bg-primary text-black text-sm font-bold rounded hover:bg-primary/90 disabled:opacity-50 transition-colors"
                  >
                    <HiOutlineCheck size={15} /> {saving ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                  >
                    <HiOutlineX size={15} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* ── Banner card ─────────────────────────────────────────────── */
              <div
                key={banner._id}
                className={`flex items-center gap-4 border rounded-lg p-4 bg-white transition-opacity ${
                  !banner.isActive ? "opacity-50" : ""
                }`}
              >
                {/* Desktop thumb */}
                <div className="relative w-32 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-200">
                  {banner.desktopImage?.url ? (
                    <Image src={banner.desktopImage.url} alt={banner.desktopImage.alt || "Banner"} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300">
                      <HiOutlinePhotograph size={28} />
                    </div>
                  )}
                  <span className="absolute bottom-0 left-0 right-0 text-center text-[10px] bg-black/50 text-white py-0.5">
                    Desktop
                  </span>
                </div>

                {/* Mobile thumb */}
                <div className="relative w-12 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-200">
                  {(banner.mobileImage?.url || banner.desktopImage?.url) ? (
                    <Image
                      src={banner.mobileImage?.url || banner.desktopImage?.url}
                      alt={banner.mobileImage?.alt || "Mobile"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300">
                      <HiOutlinePhotograph size={16} />
                    </div>
                  )}
                  <span className="absolute bottom-0 left-0 right-0 text-center text-[10px] bg-black/50 text-white py-0.5">
                    Mobile
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    Link: <span className="text-gray-500">{banner.href || "/"}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Order: {banner.order}</p>
                </div>

                {/* Status toggle */}
                <button
                  onClick={() => toggleActive(banner)}
                  title={banner.isActive ? "Click to deactivate" : "Click to activate"}
                  className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                    banner.isActive
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {banner.isActive ? "Active" : "Inactive"}
                </button>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEdit(banner)}
                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                    title="Edit"
                  >
                    <HiOutlinePencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id)}
                    disabled={deleting === banner._id}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <HiOutlineTrash size={16} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
