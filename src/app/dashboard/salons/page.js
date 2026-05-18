"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import { useRouter } from "next/navigation";
import { HiOutlinePencil, HiOutlinePlus, HiOutlineCheck, HiOutlineX,
         HiOutlineDownload, HiOutlineUpload, HiOutlineTemplate } from "react-icons/hi";

// ── Constants ─────────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  name: "", city: "",
  address1: "", address2: "", address3: "", pinCode: "",
  phone1: "", phone2: "", phone3: "",
  timing: "",
  googleMapUrl: "", salonTourUrl: "", bookAppointmentUrl: "",
  isActive: true,
};

function formToPayload(f) {
  const phones = [f.phone1, f.phone2, f.phone3].map(p => p.trim()).filter(Boolean);
  return {
    name: f.name, city: f.city,
    address1: f.address1, address2: f.address2, address3: f.address3, pinCode: f.pinCode,
    phones,
    timing: f.timing,
    googleMapUrl: f.googleMapUrl, salonTourUrl: f.salonTourUrl,
    bookAppointmentUrl: f.bookAppointmentUrl,
    isActive: f.isActive,
  };
}

function salonToForm(s) {
  return {
    name: s.name ?? "", city: s.city ?? "",
    address1: s.address1 ?? "", address2: s.address2 ?? "",
    address3: s.address3 ?? "", pinCode: s.pinCode ?? "",
    phone1: s.phones?.[0] ?? "", phone2: s.phones?.[1] ?? "", phone3: s.phones?.[2] ?? "",
    timing: s.timing ?? "",
    googleMapUrl: s.googleMapUrl ?? "", salonTourUrl: s.salonTourUrl ?? "",
    bookAppointmentUrl: s.bookAppointmentUrl ?? "",
    isActive: s.isActive ?? true,
  };
}

// ── CSV helpers ───────────────────────────────────────────────────────────────

const CSV_HEADERS = ["name","city","address1","address2","address3","pinCode",
                     "phone1","phone2","phone3","timing",
                     "googleMapUrl","salonTourUrl","bookAppointmentUrl","isActive"];

function csvQuote(val) {
  const s = String(val ?? "");
  return s.includes(",") || s.includes('"') || s.includes("\n")
    ? `"${s.replace(/"/g, '""')}"`
    : s;
}

function salonsToCsv(list) {
  const rows = [CSV_HEADERS.join(",")];
  for (const s of list) {
    rows.push([
      s.name, s.city,
      s.address1 ?? "", s.address2 ?? "", s.address3 ?? "", s.pinCode ?? "",
      s.phones?.[0] ?? "", s.phones?.[1] ?? "", s.phones?.[2] ?? "",
      s.timing,
      s.googleMapUrl ?? "", s.salonTourUrl ?? "", s.bookAppointmentUrl ?? "",
      s.isActive ? "true" : "false",
    ].map(csvQuote).join(","));
  }
  return rows.join("\r\n");
}

function downloadBlob(content, filename, mime = "text/csv;charset=utf-8;") {
  const bom  = new Uint8Array([0xEF, 0xBB, 0xBF]); // UTF-8 BOM for Excel
  const blob = new Blob([bom, content], { type: mime });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement("a"), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
}

const CSV_TEMPLATE =
  CSV_HEADERS.join(",") + "\r\n" +
  ["Vibhav Nagar","Agra","Shop 12 Near Vibhav Nagar Chauraha","Agra","","282004",
   "9876543210","","","10:00 AM - 09:00 PM",
   "https://maps.google.com/?q=example","","","true"].map(csvQuote).join(",");

// ── Import Modal ───────────────────────────────────────────────────────────────

function ImportModal({ onClose, onImportDone }) {
  const [file,     setFile]     = useState(null);
  const [preview,  setPreview]  = useState(null); // { rows, errors }
  const [result,   setResult]   = useState(null); // API response
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const fileRef = useRef(null);

  function parsePreview(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return { rows: [], errors: ["No data rows found."] };
    return {
      rows:   lines.slice(1, 6).map(l => l.split(",").map(c => c.replace(/^"|"$/g, "").trim())),
      total:  lines.length - 1,
      errors: [],
    };
  }

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setError("");
    setResult(null);
    if (f.size > 500_000) { setError("File too large. Maximum 500 KB."); return; }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(parsePreview(ev.target.result));
    reader.readAsText(f);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res  = await fetch("/api/salons/import", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok && res.status !== 207 && res.status !== 422) {
        setError(data.error || "Import failed.");
      } else {
        setResult(data);
        if (data.inserted > 0) onImportDone();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const headerCols = CSV_HEADERS;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
      onClick={e => e.target === e.currentTarget && !loading && onClose()}
      role="dialog" aria-modal="true" aria-label="Import Salons from CSV"
    >
      <div className="bg-white border border-black/10 rounded w-full max-w-170 max-h-[90vh] overflow-y-auto shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-black/10">
          <p className="text-foreground text-lg font-bold m-0">Import Salons from CSV</p>
          <button onClick={onClose} disabled={loading} aria-label="Close"
            className="bg-transparent border-0 text-grey/60 text-2xl cursor-pointer leading-none hover:text-foreground disabled:opacity-40">✕</button>
        </div>

        <div className="p-7 flex flex-col gap-5">

          {/* Instructions */}
          <div className="bg-primary/5 border border-primary/20 rounded p-4 text-sm text-grey">
            <p className="font-bold text-foreground mb-1.5">CSV Format</p>
            <p className="mb-1">Required columns: <span className="font-mono text-xs bg-black/5 px-1 rounded">name, city, address1, timing, phone1</span></p>
            <p className="text-xs text-grey/70">Optional: address2, address3, pinCode, phone2, phone3, googleMapUrl, salonTourUrl, bookAppointmentUrl, isActive (true/false)</p>
            {/* <p className="mt-2 text-xs text-grey/70">Max 300 rows · Max 500 KB · Duplicates (same name + city) are skipped automatically.</p> */}
          </div>

          {/* Template download */}
          <button
            onClick={() => downloadBlob(CSV_TEMPLATE, "salons_import_template.csv")}
            className="flex items-center gap-2 self-start px-4 py-2 border-2 border-black/10 text-grey
                       rounded text-xs font-bold uppercase tracking-wide cursor-pointer
                       hover:border-primary hover:text-primary transition-colors"
          >
            <HiOutlineTemplate size={15} /> Download Template
          </button>

          {/* File picker */}
          {!result && (
            <>
              <div>
                <label className="block text-grey/60 text-xs tracking-[2px] uppercase mb-1.5 font-bold">Select CSV File</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFile}
                  className="block w-full text-sm text-grey
                             file:mr-4 file:py-2 file:px-4 file:rounded
                             file:border-0 file:text-xs file:font-bold file:uppercase
                             file:bg-primary file:text-black file:cursor-pointer
                             hover:file:opacity-90"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-300 text-red-600 text-sm px-4 py-3 rounded">{error}</div>
              )}

              {/* Preview */}
              {preview && preview.rows.length > 0 && (
                <div>
                  <p className="text-grey/60 text-xs tracking-[2px] uppercase mb-2 font-bold">
                    Preview — {preview.total} row{preview.total !== 1 ? "s" : ""} detected
                    {preview.total > 5 ? " (showing first 5)" : ""}
                  </p>
                  <div className="overflow-x-auto border border-black/10 rounded text-xs">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-black/3">
                          {headerCols.map(h => (
                            <th key={h} className="px-3 py-2 text-left text-grey/60 font-bold whitespace-nowrap border-b border-black/10">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {preview.rows.map((row, i) => (
                          <tr key={i} className="border-b border-black/5">
                            {row.map((cell, j) => (
                              <td key={j} className="px-3 py-2 text-grey max-w-40 truncate">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {preview.errors?.map((e, i) => (
                    <p key={i} className="text-red-500 text-xs mt-1">{e}</p>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-black/10">
                <button
                  onClick={handleSubmit}
                  disabled={!file || loading}
                  className="flex-1 px-5 py-3 bg-primary border-2 border-primary text-black text-sm font-bold
                             uppercase tracking-wide rounded cursor-pointer transition-opacity disabled:opacity-40"
                >
                  {loading ? "Importing…" : "Import Salons"}
                </button>
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="px-5 py-3 bg-white border-2 border-black/10 text-grey text-sm font-bold
                             uppercase tracking-wide rounded cursor-pointer hover:border-primary hover:text-primary transition-colors disabled:opacity-40"
                >Cancel</button>
              </div>
            </>
          )}

          {/* Results */}
          {result && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded p-4 text-center">
                  <p className="text-[28px] font-light text-emerald-600 leading-none mb-1">{result.inserted}</p>
                  <p className="text-xs text-emerald-600/70 uppercase tracking-wide font-bold">Inserted</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded p-4 text-center">
                  <p className="text-[28px] font-light text-amber-600 leading-none mb-1">{result.skipped ?? 0}</p>
                  <p className="text-xs text-amber-600/70 uppercase tracking-wide font-bold">Skipped</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded p-4 text-center">
                  <p className="text-[28px] font-light text-red-500 leading-none mb-1">{result.errors?.length ?? 0}</p>
                  <p className="text-xs text-red-500/70 uppercase tracking-wide font-bold">Errors</p>
                </div>
              </div>

              {result.skippedList?.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-700">
                  <p className="font-bold mb-1">Skipped (already exist):</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {result.skippedList.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}

              {result.errors?.length > 0 && (
                <div className="bg-red-50 border border-red-300 rounded p-3 text-xs text-red-600">
                  <p className="font-bold mb-1">Row errors:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {result.errors.map((e, i) => (
                      <li key={i}>{typeof e === "string" ? e : `Row ${e.row}: ${e.error}`}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full px-5 py-3 bg-primary border-2 border-primary text-black text-sm font-bold
                           uppercase tracking-wide rounded cursor-pointer transition-opacity hover:opacity-90"
              >Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({ label, value, valueCls = "text-foreground" }) {
  return (
    <div className="flex-1 min-w-[130px] bg-white border border-black/10 rounded p-5 shadow-sm">
      <p className="text-grey/60 text-xs tracking-[2px] uppercase mb-2.5 m-0">{label}</p>
      <p className={`font-[Georgia,serif] text-[32px] font-light m-0 ${valueCls}`}>{value}</p>
    </div>
  );
}

const TableRow = memo(function TableRow({ salon, onEdit, onToggleActive, updatingId }) {
  const busy = updatingId === salon._id;
  return (
    <tr className="border-b border-black/5 transition-colors duration-150 hover:bg-primary/5">
      <td className="px-4 py-3 align-middle">
        <span className="text-primary text-xs font-mono font-bold">{salon.salonId}</span>
      </td>
      <td className="px-4 py-3 align-middle">
        <p className="text-sm font-medium m-0 leading-snug">{salon.name}</p>
      </td>
      <td className="px-4 py-3 align-middle text-sm text-grey">{salon.city}</td>
      <td className="px-4 py-3 align-middle text-xs text-grey max-w-[220px]">
        <span className="block truncate">{salon.address1 || salon.address}</span>
        {salon.pinCode && <span className="text-grey/50">{salon.pinCode}</span>}
      </td>
      <td className="px-4 py-3 align-middle">
        <div className="flex flex-col gap-0.5">
          {salon.phones.map((p, i) => (
            <span key={i} className="text-xs text-grey">{p}</span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3 align-middle text-xs text-grey whitespace-nowrap">{salon.timing}</td>
      <td className="px-4 py-3 align-middle">
        <button
          disabled={busy}
          onClick={() => onToggleActive(salon)}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold
                      cursor-pointer transition-all duration-150 disabled:opacity-50
                      ${salon.isActive
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : "bg-red-50 text-red-500 border border-red-200"
                      }`}
        >
          {salon.isActive ? <><HiOutlineCheck size={12} /> Active</> : <><HiOutlineX size={12} /> Inactive</>}
        </button>
      </td>
      <td className="px-4 py-3 align-middle">
        <button
          onClick={() => onEdit(salon)}
          aria-label="Edit salon"
          className="bg-transparent border border-black/20 text-grey p-2 rounded
                     cursor-pointer transition-colors duration-150 hover:border-primary hover:text-primary"
        ><HiOutlinePencil size={16} /></button>
      </td>
    </tr>
  );
});

// ── Salon Form Modal ───────────────────────────────────────────────────────────

function SalonModal({ salon, onClose, onSave, saving, error }) {
  const isEdit = !!salon?._id;
  const [form, setForm] = useState(salon ? salonToForm(salon) : { ...EMPTY_FORM });

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const inputCls = "w-full px-3 py-2.5 bg-black/[0.02] border-2 border-black/10 rounded text-sm outline-none transition-[border-color] duration-200 focus:border-primary";
  const labelCls = "block text-grey/60 text-xs tracking-[2px] uppercase mb-1.5 font-bold";

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? "Edit Salon" : "Add Salon"}
    >
      <div className="bg-white border border-black/10 rounded w-full max-w-[620px] max-h-[92vh] overflow-y-auto shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-black/10">
          <p className="text-foreground text-lg font-bold m-0">{isEdit ? "Edit Salon" : "Add New Salon"}</p>
          <button onClick={onClose} aria-label="Close"
            className="bg-transparent border-0 text-grey/60 text-2xl cursor-pointer leading-none hover:text-foreground">✕</button>
        </div>

        <div className="p-7 flex flex-col gap-5">
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 text-sm px-4 py-3 rounded">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Salon Name *</label>
              <input className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Vibhav Nagar" />
            </div>
            <div>
              <label className={labelCls}>City *</label>
              <input className={inputCls} value={form.city} onChange={e => set("city", e.target.value)} placeholder="e.g. Agra" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Address Line 1 *</label>
            <input className={inputCls} value={form.address1} onChange={e => set("address1", e.target.value)} placeholder="Shop / building name and number" />
          </div>

          <div>
            <label className={labelCls}>Address Line 2</label>
            <input className={inputCls} value={form.address2} onChange={e => set("address2", e.target.value)} placeholder="Street / area (optional)" />
          </div>

          <div>
            <label className={labelCls}>Address Line 3</label>
            <input className={inputCls} value={form.address3} onChange={e => set("address3", e.target.value)} placeholder="Landmark / locality (optional)" />
          </div>

          <div className="w-40">
            <label className={labelCls}>Pin Code</label>
            <input className={inputCls} value={form.pinCode} onChange={e => set("pinCode", e.target.value)} placeholder="e.g. 282001" maxLength={10} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Phone 1 *</label>
              <input className={inputCls} value={form.phone1} onChange={e => set("phone1", e.target.value)} placeholder="Required" />
            </div>
            <div>
              <label className={labelCls}>Phone 2</label>
              <input className={inputCls} value={form.phone2} onChange={e => set("phone2", e.target.value)} placeholder="Optional" />
            </div>
            <div>
              <label className={labelCls}>Phone 3</label>
              <input className={inputCls} value={form.phone3} onChange={e => set("phone3", e.target.value)} placeholder="Optional" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Timing *</label>
            <input className={inputCls} value={form.timing} onChange={e => set("timing", e.target.value)} placeholder="e.g. 10:00 AM - 09:00 PM" />
          </div>

          <div>
            <label className={labelCls}>Google Maps URL</label>
            <input className={inputCls} value={form.googleMapUrl} onChange={e => set("googleMapUrl", e.target.value)} placeholder="https://maps.google.com/..." />
          </div>

          <div>
            <label className={labelCls}>Salon Tour URL</label>
            <input className={inputCls} value={form.salonTourUrl} onChange={e => set("salonTourUrl", e.target.value)} placeholder="Virtual tour link (optional)" />
          </div>

          <div>
            <label className={labelCls}>Book Appointment URL</label>
            <input className={inputCls} value={form.bookAppointmentUrl} onChange={e => set("bookAppointmentUrl", e.target.value)} placeholder="Leave blank to use default booking page" />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => set("isActive", !form.isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                          ${form.isActive ? "bg-emerald-500" : "bg-black/20"}`}
            >
              <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200
                                ${form.isActive ? "translate-x-6" : "translate-x-1"}`} />
            </button>
            <span className="text-sm font-medium text-grey">
              {form.isActive ? "Active — visible on salon locator" : "Inactive — hidden from public"}
            </span>
          </div>

          <div className="flex gap-3 pt-2 border-t border-black/10">
            <button
              onClick={() => onSave(form)}
              disabled={saving}
              className="flex-1 px-5 py-3 bg-primary border-2 border-primary text-black text-sm font-bold
                         uppercase tracking-wide rounded cursor-pointer transition-opacity disabled:opacity-50"
            >{saving ? "Saving…" : isEdit ? "Save Changes" : "Add Salon"}</button>
            <button
              onClick={onClose}
              className="px-5 py-3 bg-white border-2 border-black/10 text-grey text-sm font-bold
                         uppercase tracking-wide rounded cursor-pointer hover:border-primary hover:text-primary transition-colors"
            >Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function SalonsPage() {
  const router      = useRouter();
  const toastTimer  = useRef(null);
  const searchTimer = useRef(null);

  const [salons,      setSalons]      = useState([]);
  const [stats,       setStats]       = useState({ total: 0, active: 0, inactive: 0 });
  const [pagination,  setPagination]  = useState({ page: 1, pages: 1, total: 0 });
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState("");
  const [modal,       setModal]       = useState(null); // null | { mode: "add"|"edit", salon?: {} }
  const [saving,      setSaving]      = useState(false);
  const [modalError,  setModalError]  = useState("");
  const [updatingId,  setUpdatingId]  = useState(null);
  const [toast,       setToast]       = useState(null);
  const [deleting,    setDeleting]    = useState(null);
  const [importOpen,  setImportOpen]  = useState(false);

  const showToast = useCallback((message, type = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchPage = useCallback(async (page = 1, q = search) => {
    setLoading(true);
    try {
      // Limit 500 covers all ~200 salons in one request so stats are accurate
      const params = new URLSearchParams({ page, limit: 500, search: q, admin: "1" });
      const res  = await fetch(`/api/salons?${params}`);
      if (res.status === 401) { router.push("/dashboard/login"); return; }
      const data = await res.json();
      const list = data.salons ?? [];
      setSalons(list);
      setPagination(data.pagination ?? {});
      setStats({
        total:    data.pagination?.total ?? list.length,
        active:   list.filter(s => s.isActive).length,
        inactive: list.filter(s => !s.isActive).length,
      });
    } catch {
      showToast("Failed to load salons.", "error");
    } finally {
      setLoading(false);
    }
  }, [search, router, showToast]);

  useEffect(() => { fetchPage(1, ""); }, []); // eslint-disable-line

  const handleSearchChange = useCallback((e) => {
    const q = e.target.value;
    setSearch(q);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => fetchPage(1, q), 420);
  }, [fetchPage]);

  const handleSave = useCallback(async (form) => {
    setSaving(true);
    setModalError("");
    const payload = formToPayload(form);
    const isEdit  = !!modal?.salon?._id;

    try {
      const res = await fetch(
        isEdit ? `/api/salons/${modal.salon._id}` : "/api/salons",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) { setModalError(data.error || "Save failed."); return; }

      setModal(null);
      showToast(isEdit ? "Salon updated." : "Salon added.");
      fetchPage(pagination.page, search);
    } catch {
      setModalError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [modal, pagination.page, search, fetchPage, showToast]);

  const handleToggleActive = useCallback(async (salon) => {
    setUpdatingId(salon._id);
    setSalons(prev => prev.map(s => s._id === salon._id ? { ...s, isActive: !s.isActive } : s));
    try {
      const res  = await fetch(`/api/salons/${salon._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !salon.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSalons(prev => prev.map(s => s._id === salon._id ? { ...s, ...data.salon } : s));
      showToast(data.salon.isActive ? "Salon activated." : "Salon deactivated.");
    } catch (err) {
      setSalons(prev => prev.map(s => s._id === salon._id ? salon : s));
      showToast(err.message || "Update failed.", "error");
    } finally {
      setUpdatingId(null);
    }
  }, [showToast]);

  const handleDelete = useCallback(async (salon) => {
    if (!confirm(`Delete "${salon.name}" in ${salon.city}? This cannot be undone.`)) return;
    setDeleting(salon._id);
    try {
      const res = await fetch(`/api/salons/${salon._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setSalons(prev => prev.filter(s => s._id !== salon._id));
      setModal(null);
      showToast("Salon deleted.");
    } catch {
      showToast("Delete failed.", "error");
    } finally {
      setDeleting(null);
    }
  }, [showToast]);

  const openAdd  = () => { setModalError(""); setModal({ mode: "add", salon: null }); };
  const openEdit = (salon) => { setModalError(""); setModal({ mode: "edit", salon }); };
  const closeModal = () => { if (!saving) setModal(null); };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          role="status" aria-live="polite"
          className={`fixed top-6 right-6 z-[9999] rounded px-5 py-3.5 text-sm
                      shadow-[0_8px_32px_rgba(0,0,0,0.12)] animate-slide-in
                      ${toast.type === "error"
                        ? "bg-red-50 border border-red-300 text-red-600"
                        : "bg-emerald-50 border border-emerald-300 text-emerald-600"}`}
        >{toast.message}</div>
      )}

      <main className="px-8 py-8 max-w-[1400px] mx-auto">

        {/* Stats */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <StatCard label="Total Salons" value={stats.total}    />
          <StatCard label="Active"       value={stats.active}   valueCls="text-emerald-600" />
          <StatCard label="Inactive"     value={stats.inactive} valueCls="text-red-500" />
        </div>

        {/* Toolbar */}
        <div className="flex gap-3 mb-6 flex-wrap items-center">
          <input
            type="search"
            placeholder="Search by city, salon name, or address…"
            value={search}
            onChange={handleSearchChange}
            className="flex-1 min-w-[240px] px-4 py-2.5
                       bg-white border-2 border-black/10 rounded text-sm outline-none
                       transition-[border-color] duration-200 focus:border-primary"
          />

          <button
            onClick={() => fetchPage(pagination.page, search)}
            aria-label="Refresh"
            className="px-4 py-2.5 bg-white border-2 border-black/10 text-grey
                       rounded text-sm font-bold cursor-pointer hover:border-primary hover:text-primary transition-colors"
          >↻</button>

          <button
            onClick={() => downloadBlob(salonsToCsv(salons), "salons_export.csv")}
            disabled={salons.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-black/10 text-grey
                       rounded text-xs tracking-wide uppercase font-bold cursor-pointer
                       hover:border-primary hover:text-primary transition-colors disabled:opacity-40"
          >
            <HiOutlineDownload size={15} /> Export CSV
          </button>

          <button
            onClick={() => setImportOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-black/10 text-grey
                       rounded text-xs tracking-wide uppercase font-bold cursor-pointer
                       hover:border-primary hover:text-primary transition-colors"
          >
            <HiOutlineUpload size={15} /> Import CSV
          </button>

          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary border-2 border-primary text-black
                       rounded text-xs tracking-wide uppercase font-bold cursor-pointer hover:opacity-90 transition-opacity"
          >
            <HiOutlinePlus size={16} /> Add Salon
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-black/10 rounded overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-16 text-grey/60">
              <div className="w-7 h-7 border-2 border-black/10 border-t-primary rounded-full animate-spin" />
              <span className="text-sm">Loading…</span>
            </div>
          ) : salons.length === 0 ? (
            <div className="py-16 text-center text-grey/60">
              <p className="text-[40px] mb-3">📍</p>
              <p className="text-base">No salons found.</p>
              <button onClick={openAdd} className="mt-4 px-5 py-2.5 bg-primary text-black text-sm font-bold rounded cursor-pointer">
                Add First Salon
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black/[0.02]">
                    {["Salon ID","Name","City","Address","Phones","Timing","Status",""].map((h, i) => (
                      <th key={i}
                        className="px-4 py-4 text-left text-grey/60 text-xs tracking-[2px]
                                   uppercase whitespace-nowrap border-b border-black/10 font-bold"
                      >{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {salons.map(salon => (
                    <TableRow
                      key={salon._id}
                      salon={salon}
                      onEdit={openEdit}
                      onToggleActive={handleToggleActive}
                      updatingId={updatingId}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => fetchPage(p, search)}
                className={`w-10 h-10 rounded text-sm font-bold cursor-pointer transition-all duration-150
                            ${pagination.page === p
                              ? "bg-primary text-black border-2 border-primary"
                              : "bg-white text-grey border-2 border-black/10 hover:border-primary hover:text-primary"}`}
              >{p}</button>
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      {modal && (
        <SalonModal
          salon={modal.salon}
          onClose={closeModal}
          onSave={handleSave}
          saving={saving}
          error={modalError}
        />
      )}

      {/* Import Modal */}
      {importOpen && (
        <ImportModal
          onClose={() => setImportOpen(false)}
          onImportDone={() => { setImportOpen(false); fetchPage(1, search); showToast("Salons imported successfully."); }}
        />
      )}

      {/* Delete button inside edit modal handled via separate confirm */}
      {modal?.mode === "edit" && modal.salon && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1100]">
          <button
            onClick={() => handleDelete(modal.salon)}
            disabled={!!deleting}
            className="px-5 py-2.5 bg-white border-2 border-red-300 text-red-500
                       rounded text-xs tracking-wide uppercase font-bold cursor-pointer
                       hover:bg-red-50 transition-colors disabled:opacity-50 shadow-lg"
          >{deleting === modal.salon._id ? "Deleting…" : "Delete This Salon"}</button>
        </div>
      )}
    </>
  );
}
