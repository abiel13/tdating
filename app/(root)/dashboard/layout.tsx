import Bottombar from "@/components/Bottombar";
import LeftSidebar from "@/components/LeftSidebar";
import Topbar from "@/components/Topbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = cookies().get("flirtgram-user");

  if (!loggedIn?.value) {
    redirect("/");
  }

  return (
    <main className={`bg-[#060218]  flex md:flex-row flex-col`}>
      <LeftSidebar />
      <section className="w-full h-full">
        <Topbar />
        {children}
      </section>
      <Bottombar />
    </main>
  );
}
