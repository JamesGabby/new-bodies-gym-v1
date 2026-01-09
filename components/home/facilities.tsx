import { siteConfig } from "@/lib/site-config";
import { CheckCircle2 } from "lucide-react";

export function Facilities() {
  return (
    <section id="facilities" className="py-24 bg-neutral-900">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold uppercase text-white mb-4">
            World Class <span className="text-primary">Facilities</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From our fully equipped Olympic gym to our specialized boxing studio, 
            we have everything you need to hit your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.facilities.map((facility) => (
            <div 
              key={facility} 
              className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-white/5 hover:border-primary/50 transition-colors"
            >
              <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0" />
              <span className="font-medium text-gray-200 uppercase tracking-wide">
                {facility}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}