import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signout } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch user bookings
  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      id,
      date,
      status,
      weekly_schedule (
        start_time,
        classes ( name )
      )
    `)
    .eq("user_id", user.id)
    .order("date", { ascending: true });

  return (
    <>
      <Navbar />
      <div className="container py-12 min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-heading font-bold uppercase">My Bookings</h1>
          <form action={signout}>
            <Button variant="outline">Sign Out</Button>
          </form>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings?.length === 0 && <p>No active bookings found.</p>}
          
          {bookings?.map((booking: any) => (
            <div key={booking.id} className="border p-4 rounded-lg bg-card flex justify-between items-center">
              <div>
                <p className="font-bold uppercase text-lg">{booking.weekly_schedule.classes.name}</p>
                <p className="text-primary">{booking.date}</p>
                <p className="text-sm text-muted-foreground">{booking.weekly_schedule.start_time.slice(0,5)}</p>
              </div>
              <div className="px-3 py-1 bg-green-500/20 text-green-500 rounded text-xs uppercase font-bold border border-green-500/50">
                {booking.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}