import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactForm = () => (
  <form className="flex flex-col gap-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {["Full Name", "Email Address"].map((p) => (
        <input
          key={p}
          type={p.includes("Email") ? "email" : "text"}
          placeholder={p}
          className="w-full bg-transparent border-b border-gray-800 text-white py-4 focus:outline-none focus:border-[#BA68C8] transition-colors placeholder:text-gray-600"
        />
      ))}
    </div>
    <input
      type="text"
      placeholder="Subject"
      className="w-full bg-transparent border-b border-gray-800 text-white py-4 focus:outline-none focus:border-[#BA68C8] transition-colors placeholder:text-gray-600"
    />
    <textarea
      placeholder="Tell us about your project or inquiry..."
      className="w-full bg-transparent border-b border-gray-800 text-white py-4 focus:outline-none focus:border-[#BA68C8] transition-colors placeholder:text-gray-600 resize-none"
    />
    <Button variant="vibrant" className="w-fit flex gap-2">
      Send Message <Send size={18} />
    </Button>
  </form>
);
