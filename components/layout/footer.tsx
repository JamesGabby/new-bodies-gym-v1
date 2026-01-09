import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12 text-gray-400">
      <div className="container grid gap-8 md:grid-cols-4">
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <h3 className="font-heading text-2xl font-bold text-white uppercase">{siteConfig.name}</h3>
          <p className="text-sm">{siteConfig.motto}</p>
        </div>

        {/* Column 2: Contact */}
        <div className="space-y-4">
          <h4 className="font-bold text-white uppercase">Contact</h4>
          <address className="not-italic text-sm space-y-2">
            <p>{siteConfig.contact.address.line1}</p>
            <p>{siteConfig.contact.address.city}, {siteConfig.contact.address.postcode}</p>
            <p className="text-primary hover:underline">
              <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
            </p>
            <p className="text-primary hover:underline">
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            </p>
          </address>
        </div>

        {/* Column 3: Hours */}
        <div className="space-y-4">
          <h4 className="font-bold text-white uppercase">Opening Hours</h4>
          <ul className="text-sm space-y-2">
            {siteConfig.openingHours.slice(0, 5).map((h) => (
              <li key={h.day} className="flex justify-between">
                <span>{h.day}</span>
                <span className="text-white">{h.open} - {h.close}</span>
              </li>
            ))}
          </ul>
        </div>
         <div className="space-y-4">
           <h4 className="font-bold text-white uppercase">Weekends</h4>
          <ul className="text-sm space-y-2">
            {siteConfig.openingHours.slice(5).map((h) => (
              <li key={h.day} className="flex justify-between">
                <span>{h.day}</span>
                <span className="text-white">{h.open} - {h.close}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mt-12 border-t border-white/10 pt-8 text-center text-xs">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}