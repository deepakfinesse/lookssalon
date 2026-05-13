"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineEye, HiOutlineDownload } from "react-icons/hi";

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_CFG = {
  pending: {
    label:       "Pending",
    badgeCls:    "text-amber-600 bg-amber-50 border border-amber-200",
    selectCls:   "text-amber-600",
    activeBtnCls:"text-amber-600 bg-amber-50 border border-amber-200 font-bold",
  },
  confirmed: {
    label:       "Confirmed",
    badgeCls:    "text-emerald-600 bg-emerald-50 border border-emerald-200",
    selectCls:   "text-emerald-600",
    activeBtnCls:"text-emerald-600 bg-emerald-50 border border-emerald-200 font-bold",
  },
  completed: {
    label:       "Completed",
    badgeCls:    "text-indigo-600 bg-indigo-50 border border-indigo-200",
    selectCls:   "text-indigo-600",
    activeBtnCls:"text-indigo-600 bg-indigo-50 border border-indigo-200 font-bold",
  },
  cancelled: {
    label:       "Cancelled",
    badgeCls:    "text-red-600 bg-red-50 border border-red-200",
    selectCls:   "text-red-600",
    activeBtnCls:"text-red-600 bg-red-50 border border-red-200 font-bold",
  },
};
const STATUS_KEYS = Object.keys(STATUS_CFG);

const DATE_FMT = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit", month: "short", year: "numeric",
  hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata",
});
const fmt = (d) => d ? DATE_FMT.format(new Date(d)) : "—";

const APPT_DATE_FMT = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit", month: "long", year: "numeric",
});
const fmtApptDate = (d) => d ? APPT_DATE_FMT.format(new Date(d + "T00:00:00")) : "—";

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG.pending;
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${cfg.badgeCls}`}>
      {cfg.label}
    </span>
  );
}

function StatCard({ label, value, valueCls = "text-foreground" }) {
  return (
    <div className="flex-1 min-w-[130px] bg-white border border-black/10 rounded p-5 shadow-sm">
      <p className="text-grey/60 text-xs tracking-[2px] uppercase mb-2.5 m-0">{label}</p>
      <p className={`font-[Georgia,serif] text-[32px] font-light m-0 ${valueCls}`}>{value}</p>
    </div>
  );
}

const TableRow = memo(function TableRow({ appt, onStatusChange, onView, updatingId }) {
  const busy = updatingId === appt._id;
  const scfg = STATUS_CFG[appt.status] ?? STATUS_CFG.pending;
  return (
    <tr className="border-b border-black/5 transition-colors duration-150 hover:bg-primary/5">

      <td className="px-4 py-4 align-middle">
        <span className="text-primary text-xs font-mono font-bold">#{appt.bookingId}</span>
      </td>

      <td className="px-4 py-4 align-middle">
        <p className="text-foreground text-sm m-0 leading-snug font-medium">{appt.name}</p>
        <p className="text-grey/60 text-xs m-0 mt-0.5">{appt.email}</p>
      </td>

      <td className="px-4 py-4 align-middle text-grey text-sm">{appt.contact}</td>
      <td className="px-4 py-4 align-middle text-grey text-sm max-w-[160px]">{appt.service}</td>
      <td className="px-4 py-4 align-middle text-grey text-sm">{appt.city}</td>
      <td className="px-4 py-4 align-middle text-grey text-sm">{appt.preferredTime}</td>

      <td className="px-4 py-4 align-middle">
        <select
          value={appt.status}
          disabled={busy}
          onChange={e => onStatusChange(appt._id, e.target.value)}
          className={`bg-white border border-black/10 px-2 py-1.5 rounded text-xs
                      cursor-pointer outline-none transition-opacity duration-150
                      ${scfg.selectCls} ${busy ? "opacity-50" : ""}`}
        >
          {STATUS_KEYS.map(s => (
            <option key={s} value={s}>{STATUS_CFG[s].label}</option>
          ))}
        </select>
      </td>

      <td className="px-4 py-4 align-middle text-grey/60 text-xs whitespace-nowrap">
        {fmt(appt.createdAt)}
      </td>

      <td className="px-4 py-4 align-middle">
        <button
          onClick={() => onView(appt)}
          aria-label="View appointment"
          className="bg-transparent border border-black/20 text-grey p-2 rounded
                     cursor-pointer transition-colors duration-150 hover:border-primary hover:text-primary"
        ><HiOutlineEye size={18} /></button>
      </td>
    </tr>
  );
});

// ── Main component ─────────────────────────────────────────────────────────────

export default function AppointmentsPage() {
  const router      = useRouter();
  const toastTimer  = useRef(null);
  const searchTimer = useRef(null);

  const [appointments, setAppointments] = useState([]);
  const [stats,        setStats]        = useState({ total:0, pending:0, confirmed:0, completed:0, cancelled:0 });
  const [pagination,   setPagination]   = useState({ page:1, pages:1, total:0 });
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected,     setSelected]     = useState(null);
  const [notes,        setNotes]        = useState("");
  const [updatingId,   setUpdatingId]   = useState(null);
  const [toast,        setToast]        = useState(null);
  const [downloading,  setDownloading]  = useState(false);

  const showToast = useCallback((message, type = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchPage = useCallback(async (page = 1, filter = statusFilter, q = search) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15, status: filter, search: q });
      const res = await fetch(`/api/appointments?${params}`);
      if (res.status === 401) { router.push("/dashboard/login"); return; }
      const data = await res.json();
      setAppointments(data.appointments ?? []);
      setStats(data.stats ?? {});
      setPagination(data.pagination ?? {});
    } catch {
      showToast("Failed to load appointments.", "error");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, router, showToast]);

  useEffect(() => { fetchPage(1, statusFilter, search); }, [statusFilter]); // eslint-disable-line

  const handleSearchChange = useCallback((e) => {
    const q = e.target.value;
    setSearch(q);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => fetchPage(1, statusFilter, q), 420);
  }, [statusFilter, fetchPage]);

  const updateAppointment = useCallback(async (id, updates) => {
    setAppointments(prev => prev.map(a => a._id === id ? { ...a, ...updates } : a));
    setSelected(prev => prev?._id === id ? { ...prev, ...updates } : prev);
    setUpdatingId(id);
    try {
      const res  = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const srv = data.appointment;
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, ...srv } : a));
      setSelected(prev => prev?._id === id ? { ...prev, ...srv } : prev);
      showToast("Updated successfully.");
    } catch (err) {
      fetchPage(pagination.page);
      showToast(err.message || "Update failed.", "error");
    } finally {
      setUpdatingId(null);
    }
  }, [pagination.page, fetchPage, showToast]);

  const handleStatusChange = useCallback((id, status) => updateAppointment(id, { status }), [updateAppointment]);

  const downloadCSV = useCallback(async () => {
    setDownloading(true);
    try {
      const params = new URLSearchParams({ page: 1, limit: 5000, status: statusFilter, search });
      const res  = await fetch(`/api/appointments?${params}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      const rows = data.appointments ?? [];

      const COLS = ["Booking ID","Name","Email","Contact","City","Salon","Appt. Date","Service","Gender","Preferred Time","Status","Notes","Booked At"];
      const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      const lines  = [
        COLS.join(","),
        ...rows.map(a => [
          a.bookingId, a.name, a.email, a.contact,
          a.city, a.salonName ?? "", a.appointmentDate ?? "",
          a.service, a.gender, a.preferredTime,
          a.status, a.notes ?? "", fmt(a.createdAt),
        ].map(escape).join(",")),
      ];

      const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `appointments_${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      showToast("Failed to download CSV.", "error");
    } finally {
      setDownloading(false);
    }
  }, [statusFilter, search, showToast]);

  const handleSaveNotes = useCallback(() => selected && updateAppointment(selected._id, { notes }), [selected, notes, updateAppointment]);

  const deleteAppointment = useCallback(async (id) => {
    if (!confirm("Delete this appointment? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setAppointments(prev => prev.filter(a => a._id !== id));
      setSelected(null);
      showToast("Appointment deleted.");
      fetchPage(pagination.page);
    } catch {
      showToast("Delete failed.", "error");
    }
  }, [pagination.page, fetchPage, showToast]);

  const openModal  = useCallback((appt) => { setSelected(appt); setNotes(appt.notes || ""); }, []);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <>
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-6 right-6 z-[9999] rounded px-5 py-3.5 text-sm
                      shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                      will-change-[transform,opacity] animate-slide-in
                      ${toast.type === "error"
                        ? "bg-red-50 border border-red-300 text-red-600"
                        : "bg-emerald-50 border border-emerald-300 text-emerald-600"
                      }`}
        >
          {toast.message}
        </div>
      )}

      <main className="px-8 py-8 max-w-[1400px] mx-auto">

        {/* Stats */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <StatCard label="Total"     value={stats.total}     />
          <StatCard label="Pending"   value={stats.pending}   valueCls="text-amber-600"   />
          <StatCard label="Confirmed" value={stats.confirmed} valueCls="text-emerald-600" />
          <StatCard label="Completed" value={stats.completed} valueCls="text-indigo-600"  />
          <StatCard label="Cancelled" value={stats.cancelled} valueCls="text-red-600"     />
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap items-center">
          <input
            type="search"
            placeholder="Search by name, email, phone, booking ID…"
            value={search}
            onChange={handleSearchChange}
            className="flex-1 min-w-[240px] px-4 py-2.5
                       bg-white border-2 border-black/10 rounded
                       text-foreground text-sm outline-none
                       transition-[border-color] duration-200 focus:border-primary"
          />

          <div className="flex gap-2 flex-wrap">
            {["all", ...STATUS_KEYS].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2.5 rounded text-xs tracking-wide uppercase font-bold cursor-pointer
                            transition-all duration-150
                            ${statusFilter === s
                              ? "bg-primary text-black border-2 border-primary"
                              : "bg-white text-grey border-2 border-black/10 hover:border-primary hover:text-primary"
                            }`}
              >{s}</button>
            ))}
          </div>

          <button
            onClick={() => fetchPage(pagination.page)}
            aria-label="Refresh"
            className="px-4 py-2.5 bg-white border-2 border-black/10 text-grey
                       rounded text-sm font-bold cursor-pointer hover:border-primary hover:text-primary transition-colors"
          >↻</button>

          <button
            onClick={downloadCSV}
            disabled={downloading}
            aria-label="Download CSV"
            className="flex items-center gap-2 px-4 py-2.5 bg-primary border-2 border-primary text-black
                       rounded text-xs tracking-wide uppercase font-bold cursor-pointer
                       transition-opacity duration-150 disabled:opacity-50 hover:opacity-90"
          >
            <HiOutlineDownload size={16} />
            {downloading ? "Downloading…" : "Export CSV"}
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-black/10 rounded overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-16 text-grey/60">
              <div
                aria-hidden="true"
                className="w-7 h-7 border-2 border-black/10 border-t-primary
                           rounded-full animate-spin will-change-transform"
              />
              <span className="text-sm">Loading…</span>
            </div>
          ) : appointments.length === 0 ? (
            <div className="py-16 text-center text-grey/60">
              <p className="text-[40px] mb-3">📋</p>
              <p className="text-base">No appointments found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black/[0.02]">
                    {["Booking ID","Name","Contact","Service","City","Time","Status","Date",""].map((h, i) => (
                      <th
                        key={i}
                        className="px-4 py-4 text-left text-grey/60 text-xs tracking-[2px]
                                   uppercase whitespace-nowrap border-b border-black/10 font-bold"
                      >{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appt => (
                    <TableRow
                      key={appt._id}
                      appt={appt}
                      onStatusChange={handleStatusChange}
                      onView={openModal}
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
                onClick={() => fetchPage(p)}
                className={`w-10 h-10 rounded text-sm font-bold cursor-pointer transition-all duration-150
                            ${pagination.page === p
                              ? "bg-primary text-black border-2 border-primary"
                              : "bg-white text-grey border-2 border-black/10 hover:border-primary hover:text-primary"
                            }`}
              >{p}</button>
            ))}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
          onClick={e => e.target === e.currentTarget && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-label="Appointment Details"
        >
          <div className="bg-white border border-black/10 rounded w-full max-w-[580px] max-h-[90vh] overflow-y-auto shadow-xl">

            <div className="flex items-center justify-between px-7 py-6 border-b border-black/10">
              <div>
                <p className="text-primary text-xs tracking-[3px] uppercase m-0 mb-1 font-bold">
                  Appointment Details
                </p>
                <p className="text-foreground text-lg font-medium m-0">{selected.name}</p>
              </div>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="bg-transparent border-0 text-grey/60 text-2xl cursor-pointer
                           leading-none hover:text-foreground transition-colors"
              >✕</button>
            </div>

            <div className="p-7">

              <div className="grid grid-cols-2 gap-5 mb-6">
                {[
                  ["Booking ID",  <span key="id" className="text-primary font-mono text-sm font-bold">#{selected.bookingId}</span>],
                  ["Gender",      selected.gender],
                  ["Email",       selected.email],
                  ["Contact",     selected.contact],
                  ["City",        selected.city],
                  ["Salon",       selected.salonName || "—"],
                  ["Appt. Date",  fmtApptDate(selected.appointmentDate)],
                  ["Service",     selected.service],
                  ["Pref. Time",  selected.preferredTime],
                  ["Booked At",   fmt(selected.createdAt)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-grey/60 text-xs tracking-[2px] uppercase m-0 mb-1.5 font-bold">{label}</p>
                    <p className="text-foreground text-sm m-0">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <p className="text-grey/60 text-xs tracking-[2px] uppercase mb-2 font-bold">Current Status</p>
                <StatusBadge status={selected.status} />
              </div>

              <div className="mb-5">
                <p className="text-grey/60 text-xs tracking-[2px] uppercase mb-2.5 font-bold">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {STATUS_KEYS.map(val => {
                    const cfg      = STATUS_CFG[val];
                    const isActive = selected.status === val;
                    return (
                      <button
                        key={val}
                        disabled={updatingId === selected._id}
                        onClick={() => updateAppointment(selected._id, { status: val })}
                        className={`px-4 py-2 rounded text-xs tracking-wide uppercase font-bold
                                    cursor-pointer transition-opacity duration-150
                                    disabled:opacity-50
                                    ${isActive
                                      ? cfg.activeBtnCls
                                      : "text-grey bg-white border border-black/10 hover:border-primary hover:text-primary"
                                    }`}
                      >{cfg.label}</button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="modal-notes"
                  className="block text-grey/60 text-xs tracking-[2px] uppercase mb-2.5 font-bold"
                >Admin Notes</label>
                <textarea
                  id="modal-notes"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add internal notes…"
                  className="w-full p-3 bg-black/[0.02] border-2 border-black/10 rounded
                             text-foreground text-sm resize-y outline-none font-sans
                             box-border transition-[border-color] duration-200 focus:border-primary"
                />
                <button
                  onClick={handleSaveNotes}
                  className="mt-2 px-4 py-2 bg-white border-2 border-black/10 text-grey
                             rounded text-xs tracking-wide uppercase font-bold cursor-pointer
                             hover:border-primary hover:text-primary transition-colors"
                >Save Notes</button>
              </div>

              <div className="border-t border-black/10 pt-5">
                <button
                  onClick={() => deleteAppointment(selected._id)}
                  className="px-5 py-2.5 bg-white border-2 border-red-300 text-red-500
                             rounded text-xs tracking-wide uppercase font-bold cursor-pointer
                             hover:bg-red-50 transition-colors"
                >Delete Appointment</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
