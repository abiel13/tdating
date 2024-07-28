import Bottombar from "@/components/Bottombar";
import LeftSidebar from "@/components/LeftSidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`bg-air_force_blue-200  flex md:flex-row flex-col`}>
      <LeftSidebar />
      <section className="w-full h-full">
        <Topbar />
        {children}
      </section>
      <Bottombar />
    </main>
  );
}
