import { Typography } from "@/components/ui/Typography";

interface LegalHeaderProps {
  title: string;
  versionInfo: string;
  note: string;
}

export const LegalHeader = ({ title, versionInfo, note }: LegalHeaderProps) => (
  <div className="mb-12 border-b border-gray-800 pb-12">
    <Typography variant="h2" weight="bold">{title}</Typography>
    <Typography className="text-gray-500 mt-2">{versionInfo}</Typography>

    <div className="mt-8 p-6 bg-[#BA68C8]/5 border-l-4 border-[#BA68C8]">
      <Typography variant="p" className="text-gray-300 italic">
        "{note}"
      </Typography>
    </div>
  </div>
);
