import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        {/* Phase 4 components will go here: Timetable, Facilities, etc. */}
        <section className="py-20 text-center text-muted-foreground">
          <p>Phase 4 Content Loading...</p>
        </section>
      </main>
      <Footer />
    </>
  );
}