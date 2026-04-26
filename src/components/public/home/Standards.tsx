import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";

export default function StandardsSection() {
  const standards = [
    "FDA Compliance",
    "EU 10/2011 Regulatory",
    "BRCGS Global Standards",
    "FSC Certified Sourcing",
    "GRS Recycled Standard",
    "BPI Compostable",
    "DIN CERTCO Verified",
    "TÜV OK Compost Home",
    "TÜV OK Compost Industrial",
    "ISO 9001 Quality",
    "ISO 14001 Environment",
    "ISO 22000 Food Safety",
    "ISO 45001 Health & Safety",
    "FSSC 22000 Certification",
  ];

  return (
    <Container
      py={"lg"}
      as={"section"}
    >
      {/* Header */}
      <div className="mb-16 flex flex-col gap-6">
        <Typography as="h2" variant={"h2"} weight={"extrabold"} tracking="tight" className="max-w-3xl">
          Global Compliance & Product Standards
        </Typography>

        {/* About Buyzo */}
        <Typography variant={"lead"} className="text-zinc-300 max-w-3xl leading-relaxed">
          At <span className="text-white font-semibold">Buyzo</span>, we bridge the gap between world-class manufacturing and the conscious consumer. Every item in our marketplace is strictly vetted against rigorous international frameworks to ensure safety, ethical production, and environmental excellence.
        </Typography>

        {/* Additional info */}
        <Typography variant={"p"} className="text-zinc-400 max-w-3xl leading-relaxed">
          Our global partners are held to the same uncompromising benchmarks for sustainability and quality management, providing you with full traceability and peace of mind with every purchase.
        </Typography>
      </div>

      {/* Standards List - Keeping your exact styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {standards.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <div className="flex-1 h-[2px] bg-gray-700"></div>
            <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
            <Typography variant={"large"} weight={"medium"} className="text-gray-300">{item}</Typography>
          </div>
        ))}
      </div>
    </Container>
  );
}