import DashboardHeader from "./_components/DashboardHeader";

export const metadata = {
  title: "Dashboard — Looks Salon",
  description: "Admin dashboard for Looks Salon appointment management.",
  robots: "noindex, nofollow",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <DashboardHeader />
      {children}
    </div>
  );
}
