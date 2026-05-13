"use client";

import { useState, useEffect } from "react";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineCheck, HiOutlineX } from "react-icons/hi";

function toSlug(str) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [form, setForm]             = useState({ name: "", slug: "", description: "" });
  const [slugEdited, setSlugEdited] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId]         = useState(null);
  const [editForm, setEditForm]     = useState({});
  const [error, setError]           = useState("");

  const fetch_ = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog/categories");
      const data = await res.json();
      if (res.ok) setCategories(data.categories || []);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetch_(); }, []);

  // Auto-slug from name
  useEffect(() => {
    if (!slugEdited) setForm(f => ({ ...f, slug: toSlug(f.name) }));
  }, [form.name, slugEdited]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/blog/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), slug: form.slug.trim(), description: form.description.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed."); return; }
      setForm({ name: "", slug: "", description: "" });
      setSlugEdited(false);
      fetch_();
    } finally { setSubmitting(false); }
  };

  const startEdit = (cat) => {
    setEditId(cat._id);
    setEditForm({ name: cat.name, slug: cat.slug, description: cat.description || "" });
  };

  const handleUpdate = async (id) => {
    setError("");
    try {
      const res = await fetch(`/api/blog/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed."); return; }
      setEditId(null);
      fetch_();
    } catch { setError("Network error."); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"? Posts won't be deleted, just unlinked.`)) return;
    try {
      const res = await fetch(`/api/blog/categories/${id}`, { method: "DELETE" });
      if (res.ok) fetch_();
      else { const d = await res.json(); alert(d.error || "Delete failed."); }
    } catch { alert("Network error."); }
  };

  const inputCls = "border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Categories</h1>
        <a href="/dashboard/blog" className="text-sm text-gray-500 hover:text-primary underline">← Back to Posts</a>
      </div>

      {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">{error}</div>}

      {/* Create form */}
      <form onSubmit={handleCreate} className="bg-white border border-gray-200 rounded-lg p-4 mb-6 space-y-3">
        <h2 className="font-semibold text-gray-800 text-sm">Add New Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Name *</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Hair Care" className={`${inputCls} w-full`} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Slug</label>
            <input
              value={form.slug}
              onChange={e => { setSlugEdited(true); setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })); }}
              placeholder="hair-care"
              className={`${inputCls} w-full`}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Description</label>
          <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional description" className={`${inputCls} w-full`} />
        </div>
        <button type="submit" disabled={submitting} className="flex items-center gap-1.5 px-4 py-2 bg-primary text-black rounded text-sm font-bold hover:bg-primary/90 disabled:opacity-60 transition-colors">
          <HiOutlinePlus size={16} /> {submitting ? "Adding…" : "Add Category"}
        </button>
      </form>

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">Loading…</div>
        ) : categories.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">No categories yet. Create one above.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Slug</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map(cat => (
                <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {editId === cat._id ? (
                      <input
                        value={editForm.name}
                        onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                        className={`${inputCls} w-full`}
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium text-gray-900">{cat.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-500">
                    {editId === cat._id ? (
                      <input
                        value={editForm.slug}
                        onChange={e => setEditForm(f => ({ ...f, slug: e.target.value }))}
                        className={`${inputCls} w-full`}
                      />
                    ) : (
                      cat.slug
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {editId === cat._id ? (
                        <>
                          <button onClick={() => handleUpdate(cat._id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors" title="Save"><HiOutlineCheck size={16} /></button>
                          <button onClick={() => setEditId(null)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded transition-colors" title="Cancel"><HiOutlineX size={16} /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(cat)} className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded transition-colors" title="Edit"><HiOutlinePencil size={16} /></button>
                          <button onClick={() => handleDelete(cat._id, cat.name)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete"><HiOutlineTrash size={16} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
