import { createClient } from "@/lib/supabase/server";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Helper to sort days correctly
const dayOrder = {
  "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, 
  "Friday": 5, "Saturday": 6, "Sunday": 7
};

export async function Timetable() {
  const supabase = await createClient();

  // Fetch schedule joined with class names
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

  // Group data by Day
  const scheduleByDay = (schedule || []).reduce((acc: any, curr: any) => {
    const day = curr.day_of_week;
    if (!acc[day]) acc[day] = [];
    acc[day].push(curr);
    return acc;
  }, {});

  // Sort days
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
            <div key={day} className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="bg-primary p-3 text-center">
                <h3 className="font-heading text-xl font-bold uppercase text-black">{day}</h3>
              </div>
              <div className="divide-y divide-border">
                {scheduleByDay[day].map((slot: any) => (
                  <div key={slot.id} className="p-4 flex flex-col gap-1 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="font-bold uppercase text-foreground">
                        {slot.classes?.name}
                      </span>
                    </div>
                    <div className="text-sm text-primary font-mono">
                      {/* Format Time: Remove seconds if present */}
                      {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
           <p className="text-sm text-muted-foreground mb-4">
             Booking required for all classes via your membership app.
           </p>
           {/* We will link this button in Phase 5 */}
           <Badge variant="outline" className="text-xs uppercase tracking-widest">
             Live Membership Required
           </Badge>
        </div>
      </div>
    </section>
  );
}