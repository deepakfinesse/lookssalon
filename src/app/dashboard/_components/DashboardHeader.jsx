"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { HiOutlineHome, HiOutlineCalendar } from "react-icons/hi";

const NAV_LINKS = [
  { href: "/dashboard",              label: "Home",         icon: HiOutlineHome     },
  { href: "/dashboard/appointments", label: "Appointments", icon: HiOutlineCalendar },
  // Add more nav items here
];

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-[100] h-16 flex items-center justify-between
                 px-8 bg-white border-b border-black/10
                 [transform:translateZ(0)] will-change-transform"
    >
      {/* Brand */}
      <div className="flex items-center gap-6">
        <Image src="/img/logo.svg" width={120} height={48} alt="Looks Salon" priority />

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs tracking-wide uppercase font-bold
                            transition-colors duration-150
                            ${active
                              ? "bg-primary/10 text-primary"
                              : "text-grey hover:text-primary hover:bg-primary/5"
                            }`}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sign out */}
      <button
        onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
        className="border-2 border-black bg-white text-foreground
                   px-4 py-2 text-xs tracking-wide uppercase font-bold cursor-pointer
                   transition-colors duration-200 hover:bg-primary hover:border-primary"
      >
        Sign Out
      </button>
    </header>
  );
}
