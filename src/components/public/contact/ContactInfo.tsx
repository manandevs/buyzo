import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Typography } from "@/components/ui/Typography";

const info = [
  { Icon: Mail, title: "Email Us", val: "hello@buyzo.com", sub: "We aim to respond to all inquiries within 24 hours." },
  { Icon: Phone, title: "Call Us", val: "+27 83 796 0416", sub: "Mon-Fri from 8am to 5pm (SAST)." },
  { Icon: MapPin, title: "Head Office", val: "Johannesburg, South Africa", sub: "Available for scheduled visits and consultations." },
  { Icon: Clock, title: "Business Hours", val: "Mon - Fri: 8:00 AM - 5:00 PM", sub: "Closed on weekends and public holidays." }
];

export const ContactInfo = () => (
  <div className="flex flex-col gap-4">
    {info.map(({ Icon, title, val, sub }) => (
      <div key={title} className="flex flex-col items-start">
        <div className="flex gap-1 items-center text-gray-500">
          <Icon size={16} />
          <Typography weight="semibold">{title}</Typography>
        </div>
        <Typography className="text-[#BA68C8]">{val}</Typography>
        <Typography className="text-gray-400">{sub}</Typography>
      </div>
    ))}
  </div>
);
