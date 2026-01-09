import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { BookingButton } from "@/components/home/booking-button";

// Helper to sort days correctly starting Monday
const dayOrder = {
  "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, 
  "Friday": 5, "Saturday": 6, "Sunday": 7
};

export async function Timetable() {
  const supabase = await createClient();

  // 1. Get Current User Session (to determine if they can book)
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  // 2. Fetch schedule joined with class names
  const { data: schedule, error } = await supabase
    .from('weekly_schedule')
    .select(`
      id,
      day_of_week,
      start_time,
      end_time,
      classes ( name )
    `)
    .order('start_time', { ascending: true });

  if (error) {
    console.error("Error fetching timetable:", error);
    return <div className="text-center p-10 text-red-500">Error loading timetable.</div>;
  }

  // 3. Group data by Day
  const scheduleByDay = (schedule || []).reduce((acc: any, curr: any) => {
    const day = curr.day_of_week;
    if (!acc[day]) acc[day] = [];
    acc[day].push(curr);
    return acc;
  }, {});

  // 4. Sort days (Monday -> Sunday)
  const sortedDays = Object.keys(scheduleByDay).sort(
    (a, b) => (dayOrder[a as keyof typeof dayOrder] || 99) - (dayOrder[b as keyof typeof dayOrder] || 99)
  );

  return (
    <section id="timetable" className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold uppercase mb-4">
            Group Exercise <span className="text-primary">Timetable</span>
          </h2>
          <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold">
            Fully Inclusive in All Memberships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedDays.map((day) => (
            <div key={day} className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
              {/* Day Header */}
              <div className="bg-primary p-3 text-center">
                <h3 className="font-heading text-xl font-bold uppercase text-black">{day}</h3>
              </div>
              
              {/* Class List */}
              <div className="divide-y divide-border">
                {scheduleByDay[day].map((slot: any) => (
                  <div key={slot.id} className="p-4 flex flex-row justify-between items-center hover:bg-white/5 transition-colors group">
                    
                    {/* Class Info */}
                    <div className="flex flex-col">
                      <span className="font-bold uppercase text-foreground text-sm">
                        {slot.classes?.name}
                      </span>
                      <span className="text-xs text-primary font-mono mt-1">
                        {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                      </span>
                    </div>

                    {/* Booking Action */}
                    <BookingButton 
                      scheduleId={slot.id} 
                      dayName={day} 
                      isLoggedIn={isLoggedIn} 
                    />
                    
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center space-y-4">
           <p className="text-sm text-muted-foreground">
             Booking closes 30 minutes before class start time.
           </p>
           {!isLoggedIn && (
             <Badge variant="outline" className="text-xs uppercase tracking-widest border-primary text-primary">
               Login Required to Book
             </Badge>
           )}
        </div>
      </div>
    </section>
  );
}