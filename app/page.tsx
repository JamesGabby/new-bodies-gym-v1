import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Facilities } from "@/components/home/facilities";
import { Timetable } from "@/components/home/timetable";
import { ContactSection } from "@/components/home/contact-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Facilities />
        <Timetable />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}