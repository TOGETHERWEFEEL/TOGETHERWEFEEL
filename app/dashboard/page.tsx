import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  // ✅ KEY FIX: await here
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  if (error || !user) {
    redirect("/login");
  }

  return (
    <DashboardClient
      userId={user.id}
      email={user.email ?? ""}
    />
  );
}