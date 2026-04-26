import { Typography } from "@/components/ui/Typography";

interface LegalFooterProps {
  title: string;
  description: string;
  email: string;
}

export const LegalFooter = ({ title, description, email }: LegalFooterProps) => (
  <div className="mt-20 p-8 border border-dashed border-gray-800 rounded-2xl text-center">
    <Typography weight="bold">{title}</Typography>
    <Typography variant="small" className="text-gray-400 mb-4 block">
      {description}
    </Typography>
    <Typography className="text-[#BA68C8]">{email}</Typography>
  </div>
);
