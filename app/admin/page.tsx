import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addScheduleSlot, deleteScheduleSlot, deleteBooking } from "@/app/admin/actions";
import { Trash2 } from "lucide-react";

export default async function AdminPage() {
  const supabase = await createClient();

  // 1. Security Check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/dashboard");

  // 2. Fetch Data
  
  // A. All Bookings (Joined with User & Class info)
  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      id, date, status, created_at,
      profiles ( full_name, phone, email:id ), 
      weekly_schedule ( day_of_week, start_time, classes ( name ) )
    `)
    .order("date", { ascending: false });

  // B. Full Schedule
  const { data: schedule } = await supabase
    .from("weekly_schedule")
    .select(`*, classes(name)`)
    .order("day_of_week", { ascending: true }) // Note: Needs custom sort in JS ideally, but DB sort is okay for raw admin list
    .order("start_time", { ascending: true });

  // C. Available Class Types (for the dropdown)
  const { data: classTypes } = await supabase.from("classes").select("*").order("name");

  return (
    <>
      <Navbar />
      <div className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold uppercase text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage timetable and view attendance.</p>
          </div>
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="schedule">Manage Schedule</TabsTrigger>
          </TabsList>

          {/* TAB 1: BOOKINGS LIST */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings?.map((b: any) => (
                      <TableRow key={b.id}>
                        <TableCell>{b.date}</TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="font-bold">{b.profiles?.full_name || "Unknown"}</span>
                                <span className="text-xs text-muted-foreground">{b.profiles?.phone}</span>
                            </div>
                        </TableCell>
                        <TableCell>{b.weekly_schedule?.classes?.name}</TableCell>
                        <TableCell>{b.weekly_schedule?.day_of_week} @ {b.weekly_schedule?.start_time.slice(0,5)}</TableCell>
                        <TableCell>
                          <form action={deleteBooking.bind(null, b.id)}>
                             <Button size="icon" variant="destructive" className="h-8 w-8">
                                <Trash2 className="h-4 w-4" />
                             </Button>
                          </form>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: SCHEDULE MANAGER */}
          <TabsContent value="schedule">
            <div className="grid gap-8 md:grid-cols-3">
                
              {/* Left Col: Add New Class Form */}
              <Card className="md:col-span-1 h-fit">
                <CardHeader>
                    <CardTitle>Add to Timetable</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={addScheduleSlot} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Class Type</label>
                            <Select name="classId" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classTypes?.map((c) => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Day</label>
                            <Select name="day" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Day" />
                                </SelectTrigger>
                                <SelectContent>
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Start</label>
                                <Input type="time" name="startTime" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">End</label>
                                <Input type="time" name="endTime" required />
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-primary text-black font-bold uppercase">Add Class</Button>
                    </form>
                </CardContent>
              </Card>

              {/* Right Col: Existing Schedule List */}
              <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Current Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Day</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead className="text-right">Remove</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {schedule?.map((s) => (
                                <TableRow key={s.id}>
                                    <TableCell className="font-bold">{s.day_of_week}</TableCell>
                                    <TableCell>{s.start_time.slice(0,5)} - {s.end_time.slice(0,5)}</TableCell>
                                    <TableCell>{s.classes?.name}</TableCell>
                                    <TableCell className="text-right">
                                        <form action={deleteScheduleSlot.bind(null, s.id)}>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}