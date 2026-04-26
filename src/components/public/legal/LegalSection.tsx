import { Typography } from "@/components/ui/Typography";

interface Subsection {
  subtitle: string;
  detail: string;
}

interface LegalSectionProps {
  title: string;
  content: string;
  subsections: Subsection[];
}

export const LegalSection = ({ title, content, subsections }: LegalSectionProps) => (
  <div className="flex flex-col gap-6 mb-16 last:mb-0">
    <Typography variant="h4" weight="bold" className="text-[#BA68C8]">
      {title}
    </Typography>
    <Typography className="text-gray-300 text-justify leading-relaxed">
      {content}
    </Typography>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      {subsections.map((sub, sIdx) => (
        <div key={sIdx} className="p-5 border border-gray-800 bg-gray-900/10 hover:border-gray-700 transition-colors">
          <Typography weight="bold" variant={"large"} className="mb-3 text-white">
            {sub.subtitle}
          </Typography>
          <Typography variant="p" className="text-zinc-200">
            {sub.detail}
          </Typography>
        </div>
      ))}
    </div>
  </div>
);
