import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-black text-center">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder for real gym image - overlay puts a dark tint so text pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        {/* TODO: Replace 'bg-neutral-900' with <Image src={heroImg} /> 
           Use the 'object-cover' class to fill the space.
        */}
        <div className="h-full w-full bg-neutral-900" /> 
      </div>

      {/* Content Layer */}
      <div className="container relative z-10 flex max-w-4xl flex-col items-center gap-6 px-4">
        <div className="inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
          OPEN 7 DAYS A WEEK
        </div>
        
        <h1 className="font-heading text-5xl font-bold uppercase leading-none tracking-tighter text-white sm:text-7xl md:text-8xl">
          Where Everyone <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-lime-300">
            Is Welcome
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-gray-300 sm:text-xl">
          Full Olympic gym, Cardio Suites, Boxing Studio, and 
          diverse classes in Buxton. From powerlifters to beginners, 
          this is your new home.
        </p>

        <div className="flex flex-col w-full gap-4 sm:flex-row sm:justify-center sm:w-auto">
          <Button size="lg" className="h-14 px-8 text-lg font-heading font-bold uppercase tracking-wider text-black bg-primary hover:bg-primary/90">
            Join Now
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-heading font-bold uppercase tracking-wider text-white border-white/20 hover:bg-white/10 hover:text-white">
            View Timetable
          </Button>
        </div>
      </div>
    </section>
  );
}