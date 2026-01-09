"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Helper: Ensure user is Admin
async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard"); // Kick non-admins back to user dashboard
  }
  return supabase;
}

export async function deleteScheduleSlot(scheduleId: string) {
  const supabase = await requireAdmin();
  
  const { error } = await supabase
    .from("weekly_schedule")
    .delete()
    .eq("id", scheduleId);

  if (error) console.error("Delete failed", error);
  revalidatePath("/admin");
  revalidatePath("/"); // Update public homepage
}

export async function addScheduleSlot(formData: FormData) {
  const supabase = await requireAdmin();

  const class_id = formData.get("classId") as string;
  const day_of_week = formData.get("day") as string;
  const start_time = formData.get("startTime") as string;
  const end_time = formData.get("endTime") as string;

  const { error } = await supabase.from("weekly_schedule").insert({
    class_id,
    day_of_week,
    start_time,
    end_time,
  });

  if (error) {
    return { error: "Failed to add class." };
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteBooking(bookingId: string) {
    const supabase = await requireAdmin();
    await supabase.from('bookings').delete().eq('id', bookingId);
    revalidatePath("/admin");
}