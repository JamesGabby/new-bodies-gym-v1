import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-neutral-900 border-t border-white/10">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <h2 className="font-heading text-4xl font-bold uppercase text-white">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white uppercase">Visit Us</h4>
                  <p className="text-gray-400">
                    {siteConfig.contact.address.line1}<br />
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.postcode}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white uppercase">Call Us</h4>
                  <p className="text-gray-400">{siteConfig.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white uppercase">Email Us</h4>
                  <p className="text-gray-400">{siteConfig.contact.email}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
              <h4 className="font-bold text-white uppercase mb-2">Rules & Guidance</h4>
              <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                {siteConfig.rules.slice(0, 3).map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Placeholder for Google Maps Embed or Image */}
          <div className="aspect-square md:aspect-video w-full rounded-xl bg-neutral-800 border border-white/10 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-neutral-800 z-10 flex items-center justify-center">
                <span className="text-muted-foreground uppercase font-bold tracking-widest">
                  Map Embed Area
                </span>
            </div>
            {/* To embed Google Maps:
              1. Go to Google Maps -> Search "New Bodies Gym Buxton" -> Share -> Embed a map
              2. Copy HTML and replace the div above with the iframe.
              3. Add className="w-full h-full grayscale opacity-80 hover:grayscale-0 transition-all"
            */}
          </div>

        </div>
      </div>
    </section>
  );
}