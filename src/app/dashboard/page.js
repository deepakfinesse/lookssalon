"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";

const DATE_FMT = new Intl.DateTimeFormat("en-IN", {
  weekday: "long", day: "numeric", month: "long", year: "numeric",
  timeZone: "Asia/Kolkata",
});

const STAT_CARDS = [
  { key: "total",     label: "Total Bookings",  icon: HiOutlineCalendar,    color: "text-foreground",  bg: "bg-black/5"       },
  { key: "pending",   label: "Pending",          icon: HiOutlineClock,       color: "text-amber-600",   bg: "bg-amber-50"      },
  { key: "confirmed", label: "Confirmed",        icon: HiOutlineCheckCircle, color: "text-emerald-600", bg: "bg-emerald-50"    },
  { key: "completed", label: "Completed",        icon: HiOutlineCheckCircle, color: "text-indigo-600",  bg: "bg-indigo-50"     },
  { key: "cancelled", label: "Cancelled",        icon: HiOutlineXCircle,     color: "text-red-600",     bg: "bg-red-50"        },
];

export default function DashboardHomePage() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const today  = DATE_FMT.format(new Date());

  useEffect(() => {
    fetch("/api/appointments?page=1&limit=1&status=all")
      .then(r => {
        if (r.status === 401) { router.push("/dashboard/login"); return null; }
        return r.json();
      })
      .then(data => data && setStats(data.stats))
      .catch(() => {});
  }, [router]);

  return (
    <main className="px-8 py-10 max-w-[1400px] mx-auto">

      {/* Welcome */}
      <div className="mb-10">
        <p className="text-grey/60 text-xs tracking-[3px] uppercase font-bold mb-2">{today}</p>
        <h1 className="text-3xl font-bold text-foreground m-0 mb-1">Welcome back 👋</h1>
        <p className="text-grey text-base m-0">Here's an overview of your salon appointments.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {STAT_CARDS.map(({ key, label, icon: Icon, color, bg }) => (
          <div key={key} className="bg-white border border-black/10 rounded-lg p-5 shadow-sm">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${bg} mb-4`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-grey/60 text-xs tracking-[2px] uppercase font-bold mb-1">{label}</p>
            <p className={`font-[Georgia,serif] text-[32px] font-light m-0 ${color}`}>
              {stats ? stats[key] : "—"}
            </p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="border-t border-black/10 pt-8">
        <p className="text-grey/60 text-xs tracking-[3px] uppercase font-bold mb-4">Quick Actions</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/appointments"
            className="flex items-center gap-2 px-5 py-3 bg-primary border-2 border-primary
                       text-black text-sm font-bold uppercase tracking-wide rounded
                       transition-opacity hover:opacity-90"
          >
            <HiOutlineCalendar size={16} />
            Manage Appointments
          </Link>
          <Link
            href="/salon-book-appointment"
            target="_blank"
            className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-black/10
                       text-grey text-sm font-bold uppercase tracking-wide rounded
                       transition-colors hover:border-primary hover:text-primary"
          >
            View Booking Page ↗
          </Link>
        </div>
      </div>

    </main>
  );
}
