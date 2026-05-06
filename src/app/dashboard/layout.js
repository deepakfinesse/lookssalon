export const metadata = {
  title: "Dashboard — Looks Salon",
  description: "Admin dashboard for Looks Salon appointment management.",
  robots: "noindex, nofollow",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased">
      {children}
    </div>
  );
}
