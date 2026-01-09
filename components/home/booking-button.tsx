"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { bookClass } from "@/app/actions/booking";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Helper to get the next occurrence of a specific day (e.g., next "Monday")
function getNextDateForDay(dayName: string) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const targetDay = days.indexOf(dayName);
  const today = new Date();
  const currentDay = today.getDay();
  
  let daysUntilTarget = targetDay - currentDay;
  if (daysUntilTarget <= 0) {
    daysUntilTarget += 7; // If today is Monday, book for NEXT Monday
  }
  
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysUntilTarget);
  return targetDate.toISOString().split('T')[0]; // YYYY-MM-DD
}

export function BookingButton({ scheduleId, dayName, isLoggedIn }: { scheduleId: string, dayName: string, isLoggedIn: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBook = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const dateToBook = getNextDateForDay(dayName);
    const result = await bookClass(scheduleId, dateToBook);
    setLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      alert(`Class booked for ${dateToBook}!`);
      router.push("/dashboard");
    }
  };

  return (
    <Button 
      size="sm" 
      variant="ghost" 
      className="h-6 text-xs uppercase hover:bg-primary hover:text-black ml-auto"
      onClick={handleBook}
      disabled={loading}
    >
      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Book"}
    </Button>
  );
}