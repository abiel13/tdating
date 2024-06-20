import LeftSidebar from "@/components/LeftSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className={`bg-black h-screen`}>
          <LeftSidebar />
          <section>{children}</section>
        </main>
      </body>
    </html>
  );
}
