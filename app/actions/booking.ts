"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function bookClass(scheduleId: string, dateStr: string) {
  const supabase = await createClient();
  
  // 1. Get User
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in to book." };

  // 2. Insert Booking
  const { error } = await supabase.from("bookings").insert({
    user_id: user.id,
    schedule_id: scheduleId,
    date: dateStr, 
    status: 'confirmed'
  });

  if (error) {
    if (error.code === '23505') { // Unique constraint violation code
      return { error: "You have already booked this class." };
    }
    return { error: "Booking failed. Please try again." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/"); // Refresh homepage timetable if we show capacity
  return { success: true };
}