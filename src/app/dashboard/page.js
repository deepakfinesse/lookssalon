"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import { useRouter } from "next/navigation";

// ── Constants ─────────────────────────────────────────────────────────────────

// Full Tailwind class strings per status — defined at module scope, never recreated.
// We must use full strings (not template literals with dynamic parts) so Tailwind's
// static scanner can detect and include them in the build.
const STATUS_CFG = {
  pending: {
    label: "Pending",
    badgeCls: "text-amber-400 bg-amber-400/10 border border-amber-400/30",
    selectCls: "text-amber-400",
    activeBtnCls:
      "text-amber-400 bg-amber-400/10 border border-amber-400/30 font-bold",
  },
  confirmed: {
    label: "Confirmed",
    badgeCls: "text-emerald-400 bg-emerald-400/10 border border-emerald-400/30",
    selectCls: "text-emerald-400",
    activeBtnCls:
      "text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 font-bold",
  },
  completed: {
    label: "Completed",
    badgeCls: "text-indigo-400 bg-indigo-400/10 border border-indigo-400/30",
    selectCls: "text-indigo-400",
    activeBtnCls:
      "text-indigo-400 bg-indigo-400/10 border border-indigo-400/30 font-bold",
  },
  cancelled: {
    label: "Cancelled",
    badgeCls: "text-red-400 bg-red-400/10 border border-red-400/30",
    selectCls: "text-red-400",
    activeBtnCls:
      "text-red-400 bg-red-400/10 border border-red-400/30 font-bold",
  },
};
const STATUS_KEYS = Object.keys(STATUS_CFG);

// Singleton date formatter — created once, reused for every cell render
const DATE_FMT = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});
const fmt = (d) => (d ? DATE_FMT.format(new Date(d)) : "—");

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG.pending;
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${cfg.badgeCls}`}
    >
      {cfg.label}
    </span>
  );
}

function StatCard({ label, value, valueCls = "text-white" }) {
  return (
    <div className="flex-1 min-w-[120px] bg-[#111] border border-[#222] rounded p-5">
      <p className="text-[#555] text-[10px] tracking-[2px] uppercase mb-2.5 m-0">
        {label}
      </p>
      <p
        className={`font-[Georgia,serif] text-[28px] font-light m-0 ${valueCls}`}
      >
        {value}
      </p>
    </div>
  );
}

// Memoised — only re-renders when this row's own data or updatingId changes
const TableRow = memo(function TableRow({
  appt,
  onStatusChange,
  onView,
  updatingId,
}) {
  const busy = updatingId === appt._id;
  const scfg = STATUS_CFG[appt.status] ?? STATUS_CFG.pending;
  return (
    <tr className="border-b border-[#161616] transition-colors duration-150 hover:bg-[rgba(201,168,76,0.04)]">
      <td className="px-4 py-3.5 align-middle">
        <span className="text-[#c9a84c] text-[11px] font-mono">
          #{appt.bookingId}
        </span>
      </td>

      <td className="px-4 py-3.5 align-middle">
        <p className="text-white text-[13px] m-0 leading-snug">{appt.name}</p>
        <p className="text-[#555] text-[11px] m-0 mt-0.5">{appt.email}</p>
      </td>

      <td className="px-4 py-3.5 align-middle text-[#888] text-xs">
        {appt.contact}
      </td>
      <td className="px-4 py-3.5 align-middle text-[#888] text-xs max-w-[160px]">
        {appt.service}
      </td>
      <td className="px-4 py-3.5 align-middle text-[#888] text-xs">
        {appt.city}
      </td>
      <td className="px-4 py-3.5 align-middle text-[#888] text-xs">
        {appt.preferredTime}
      </td>

      <td className="px-4 py-3.5 align-middle">
        <select
          value={appt.status}
          disabled={busy}
          onChange={(e) => onStatusChange(appt._id, e.target.value)}
          className={`bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-1 rounded-sm text-[11px]
                      cursor-pointer outline-none transition-opacity duration-150
                      ${scfg.selectCls} ${busy ? "opacity-50" : ""}`}
        >
          {STATUS_KEYS.map((s) => (
            <option key={s} value={s}>
              {STATUS_CFG[s].label}
            </option>
          ))}
        </select>
      </td>

      <td className="px-4 py-3.5 align-middle text-[#555] text-[11px] whitespace-nowrap">
        {fmt(appt.createdAt)}
      </td>

      <td className="px-4 py-3.5 align-middle">
        <button
          onClick={() => onView(appt)}
          className="bg-transparent border border-[#333] text-[#888] px-3 py-1 rounded-sm
                     text-[11px] tracking-wide cursor-pointer
                     transition-colors duration-150 hover:border-[#555] hover:text-[#bbb]"
        >
          View
        </button>
      </td>
    </tr>
  );
});

// ── Main component ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const toastTimer = useRef(null);
  const searchTimer = useRef(null);

  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [toast, setToast] = useState(null);

  // ── Helpers ───────────────────────────────────────────────────────────────

  const showToast = useCallback((message, type = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchPage = useCallback(
    async (page = 1, filter = statusFilter, q = search) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page,
          limit: 15,
          status: filter,
          search: q,
        });
        const res = await fetch(`/api/appointments?${params}`);
        if (res.status === 401) {
          router.push("/dashboard/login");
          return;
        }
        const data = await res.json();
        setAppointments(data.appointments ?? []);
        setStats(data.stats ?? {});
        setPagination(data.pagination ?? {});
      } catch {
        showToast("Failed to load appointments.", "error");
      } finally {
        setLoading(false);
      }
    },
    [statusFilter, search, router, showToast]
  );

  // Status filter → immediate fetch; search → debounced 420ms
  useEffect(() => {
    fetchPage(1, statusFilter, search);
  }, [statusFilter]); // eslint-disable-line

  const handleSearchChange = useCallback(
    (e) => {
      const q = e.target.value;
      setSearch(q);
      if (searchTimer.current) clearTimeout(searchTimer.current);
      searchTimer.current = setTimeout(
        () => fetchPage(1, statusFilter, q),
        420
      );
    },
    [statusFilter, fetchPage]
  );

  // ── Mutations ─────────────────────────────────────────────────────────────

  const updateAppointment = useCallback(
    async (id, updates) => {
      // Optimistic update — UI responds instantly
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, ...updates } : a))
      );
      setSelected((prev) =>
        prev?._id === id ? { ...prev, ...updates } : prev
      );
      setUpdatingId(id);
      try {
        const res = await fetch(`/api/appointments/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        const srv = data.appointment;
        setAppointments((prev) =>
          prev.map((a) => (a._id === id ? { ...a, ...srv } : a))
        );
        setSelected((prev) => (prev?._id === id ? { ...prev, ...srv } : prev));
        showToast("Updated successfully.");
      } catch (err) {
        fetchPage(pagination.page);
        showToast(err.message || "Update failed.", "error");
      } finally {
        setUpdatingId(null);
      }
    },
    [pagination.page, fetchPage, showToast]
  );

  const handleStatusChange = useCallback(
    (id, status) => updateAppointment(id, { status }),
    [updateAppointment]
  );
  const handleSaveNotes = useCallback(
    () => selected && updateAppointment(selected._id, { notes }),
    [selected, notes, updateAppointment]
  );

  const deleteAppointment = useCallback(
    async (id) => {
      if (!confirm("Delete this appointment? This cannot be undone.")) return;
      try {
        const res = await fetch(`/api/appointments/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error();
        setAppointments((prev) => prev.filter((a) => a._id !== id));
        setSelected(null);
        showToast("Appointment deleted.");
        fetchPage(pagination.page);
      } catch {
        showToast("Delete failed.", "error");
      }
    },
    [pagination.page, fetchPage, showToast]
  );

  const openModal = useCallback((appt) => {
    setSelected(appt);
    setNotes(appt.notes || "");
  }, []);
  const closeModal = useCallback(() => setSelected(null), []);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
  }, [router]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* ── Toast ──────────────────────────────────────────────────────── */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-6 right-6 z-[9999] rounded px-5 py-3.5 text-[13px]
                      shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                      will-change-[transform,opacity] animate-slide-in
                      ${
                        toast.type === "error"
                          ? "bg-[#1a0a0a] border border-red-500/40 text-red-400"
                          : "bg-[#0a1a0f] border border-emerald-500/40 text-emerald-400"
                      }`}
        >
          {toast.message}
        </div>
      )}

      {/* ── Header ─────────────────────────────────────────────────────── */}
      {/*
        translate-z-0 + will-change-transform → GPU compositor layer.
        Prevents the entire page from repainting on scroll.
      */}
      <header
        className="sticky top-0 z-[100] h-16 flex items-center justify-between
                   px-8 bg-black border-b border-[#1a1a1a]
                   [transform:translateZ(0)] will-change-transform"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#c9a84c] text-[11px] tracking-[4px] uppercase">
            LOOKS SALON
          </span>
          <span className="text-[#333] mx-1">|</span>
          <span className="text-[#555] text-xs tracking-[2px]">DASHBOARD</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent border border-[#333] text-[#666]
                     px-4 py-2 rounded-sm text-[11px] tracking-wide uppercase cursor-pointer
                     transition-colors duration-200 hover:border-[#c9a84c] hover:text-[#c9a84c]"
        >
          Sign Out
        </button>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <main className="px-8 py-8 max-w-[1400px] mx-auto">
        {/* Stats */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <StatCard label="Total" value={stats.total} />
          <StatCard
            label="Pending"
            value={stats.pending}
            valueCls="text-amber-400"
          />
          <StatCard
            label="Confirmed"
            value={stats.confirmed}
            valueCls="text-emerald-400"
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            valueCls="text-indigo-400"
          />
          <StatCard
            label="Cancelled"
            value={stats.cancelled}
            valueCls="text-red-400"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap items-center">
          <input
            type="search"
            placeholder="Search by name, email, phone, booking ID…"
            value={search}
            onChange={handleSearchChange}
            className="flex-1 min-w-[240px] px-4 py-2.5
                       bg-[#111] border border-[#222] rounded-sm
                       text-white text-[13px] outline-none
                       transition-[border-color] duration-200 focus:border-[#c9a84c]"
          />

          <div className="flex gap-2 flex-wrap">
            {["all", ...STATUS_KEYS].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2.5 rounded-sm text-[11px] tracking-wide uppercase cursor-pointer
                            transition-all duration-150
                            ${
                              statusFilter === s
                                ? "bg-[#c9a84c] text-black border border-[#c9a84c] font-bold"
                                : "bg-transparent text-[#555] border border-[#222] hover:border-[#444] hover:text-[#888]"
                            }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={() => fetchPage(pagination.page)}
            aria-label="Refresh"
            className="px-4 py-2.5 bg-transparent border border-[#333] text-[#666]
                       rounded-sm text-sm cursor-pointer hover:border-[#444]"
          >
            ↻
          </button>
        </div>

        {/* Table card */}
        <div className="bg-[#111] border border-[#1a1a1a] rounded overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-16 text-[#444]">
              {/* CSS-only spinner — compositor thread, zero JS animation cost */}
              <div
                aria-hidden="true"
                className="w-7 h-7 border-2 border-[#222] border-t-[#c9a84c]
                           rounded-full animate-spin will-change-transform"
              />
              <span className="text-sm">Loading…</span>
            </div>
          ) : appointments.length === 0 ? (
            <div className="py-16 text-center text-[#444]">
              <p className="text-[32px] mb-3">📋</p>
              <p className="text-sm">No appointments found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {[
                      "Booking ID",
                      "Name",
                      "Contact",
                      "Service",
                      "City",
                      "Time",
                      "Status",
                      "Date",
                      "",
                    ].map((h, i) => (
                      <th
                        key={i}
                        className="px-4 py-3.5 text-left text-[#444] text-[10px] tracking-[2px]
                                   uppercase whitespace-nowrap border-b border-[#1f1f1f]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
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
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => fetchPage(p)}
                  className={`w-9 h-9 rounded-sm text-xs cursor-pointer transition-all duration-150
                            ${
                              pagination.page === p
                                ? "bg-[#c9a84c] text-black border border-[#c9a84c] font-bold"
                                : "bg-transparent text-[#555] border border-[#222] hover:border-[#444]"
                            }`}
                >
                  {p}
                </button>
              )
            )}
          </div>
        )}
      </main>

      {/* ── Detail Modal — conditionally mounted (removed from DOM when closed) ── */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/85 z-[1000] flex items-center justify-center p-5"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-label="Appointment Details"
        >
          <div className="bg-[#111] border border-[#222] rounded w-full max-w-[560px] max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-[#1a1a1a]">
              <div>
                <p className="text-[#c9a84c] text-[10px] tracking-[3px] uppercase m-0 mb-1">
                  Appointment Details
                </p>
                <p className="text-white text-base m-0">{selected.name}</p>
              </div>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="bg-transparent border-0 text-[#555] text-xl cursor-pointer
                           leading-none hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal body */}
            <div className="p-7">
              {/* Detail grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  [
                    "Booking ID",
                    <span key="id" className="text-[#c9a84c] font-mono text-xs">
                      #{selected.bookingId}
                    </span>,
                  ],
                  ["Gender", selected.gender],
                  ["Email", selected.email],
                  ["Contact", selected.contact],
                  ["Service", selected.service],
                  ["City", selected.city],
                  ["Pref. Time", selected.preferredTime],
                  ["Booked At", fmt(selected.createdAt)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[#444] text-[10px] tracking-[2px] uppercase m-0 mb-1.5">
                      {label}
                    </p>
                    <p className="text-[#ccc] text-[13px] m-0">{value}</p>
                  </div>
                ))}
              </div>

              {/* Current status badge */}
              <div className="mb-5">
                <p className="text-[#444] text-[10px] tracking-[2px] uppercase mb-2">
                  Current Status
                </p>
                <StatusBadge status={selected.status} />
              </div>

              {/* Status update buttons */}
              <div className="mb-5">
                <p className="text-[#444] text-[10px] tracking-[2px] uppercase mb-2.5">
                  Update Status
                </p>
                <div className="flex gap-2 flex-wrap">
                  {STATUS_KEYS.map((val) => {
                    const cfg = STATUS_CFG[val];
                    const isActive = selected.status === val;
                    return (
                      <button
                        key={val}
                        disabled={updatingId === selected._id}
                        onClick={() =>
                          updateAppointment(selected._id, { status: val })
                        }
                        className={`px-3.5 py-2 rounded-sm text-[11px] tracking-wide uppercase
                                    cursor-pointer transition-opacity duration-150
                                    disabled:opacity-50
                                    ${
                                      isActive
                                        ? cfg.activeBtnCls
                                        : "text-[#555] bg-transparent border border-[#222] hover:border-[#444]"
                                    }`}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label
                  htmlFor="modal-notes"
                  className="block text-[#444] text-[10px] tracking-[2px] uppercase mb-2.5"
                >
                  Admin Notes
                </label>
                <textarea
                  id="modal-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add internal notes…"
                  className="w-full p-3 bg-[#0d0d0d] border border-[#222] rounded-sm
                             text-[#ccc] text-[13px] resize-y outline-none font-sans
                             box-border transition-[border-color] duration-200 focus:border-[#c9a84c]"
                />
                <button
                  onClick={handleSaveNotes}
                  className="mt-2 px-4 py-2 bg-[#1a1a1a] border border-[#333] text-[#888]
                             rounded-sm text-[11px] tracking-wide cursor-pointer
                             hover:border-[#555] hover:text-[#aaa] transition-colors"
                >
                  Save Notes
                </button>
              </div>

              {/* Delete */}
              <div className="border-t border-[#1a1a1a] pt-5">
                <button
                  onClick={() => deleteAppointment(selected._id)}
                  className="px-5 py-2.5 bg-transparent border border-red-500/30 text-red-400
                             rounded-sm text-[11px] tracking-wide cursor-pointer
                             hover:bg-red-500/[0.06] transition-colors"
                >
                  Delete Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
