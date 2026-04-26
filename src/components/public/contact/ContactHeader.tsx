import { Typography } from "@/components/ui/Typography";

export const ContactHeader = () => (
  <div className="max-w-4xl mb-8 flex flex-col gap-4">
    <Typography variant="small" weight="bold" className="text-[#BA68C8]">
      Contact Us
    </Typography>
    <Typography variant="h2" weight="bold">
      Crafting Excellence <br /> Through Connection.
    </Typography>
    <Typography variant="large" className="max-w-2xl">
      Whether you need a custom quote for a high-volume order or have a technical question about our materials, our specialized teams are ready to assist.
    </Typography>
  </div>
);
