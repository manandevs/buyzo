import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Typography } from "../ui/Typography";

type ImageTextProps = {
  label?: string;
  title: string;
  imageSrc: string;
  paragraphs: string[];
  reverse?: boolean;
};

export default function ImageText({
  label,
  title,
  imageSrc,
  paragraphs,
  reverse = false,
}: ImageTextProps) {
  return (
    <Container>
      <div
        className={`grid md:grid-cols-2 gap-12 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image */}
        <div className="relative aspect-[4/3]">
          <Image
            src={imageSrc}
            fill
            className="object-cover"
            alt={title}
          />
        </div>

        {/* Text */}
        <div className="max-w-md flex flex-col gap-4">
          {label && (
            <span className="text-xs tracking-widest uppercase text-muted-foreground">
              {label}
            </span>
          )}

          <Typography variant="h4" weight="bold">
            {title}
          </Typography>

          {paragraphs.map((text, idx) => (
            <Typography key={idx} variant="p">
              {text}
            </Typography>
          ))}
        </div>
      </div>
    </Container>
  );
}