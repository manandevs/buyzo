import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { SidebarProvider } from "@/components/dashboard/SidebarProvider";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import AdminHeader from "@/components/dashboard/AdminHeader";

import { Toaster } from "react-hot-toast";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const { data: user, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <>
      <SidebarProvider>
        <AdminHeader />

        <div className="flex min-h-[calc(100vh-64px)]">
          <AdminSidebar />
          <main className="flex-1 px-6 py-6 overflow-y-auto">{children}</main>
        </div>
      </SidebarProvider>

      <Toaster position="bottom-right" />
    </>
  );
}