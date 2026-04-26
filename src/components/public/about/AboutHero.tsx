import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";

export const AboutHero = () => (
  <Container as="section" py={"lg"}>
    <div className="max-w-3xl flex flex-col gap-4">
      <Typography variant="h1" weight="bold">
        About
      </Typography>
      <Typography variant="p">
        Buyzo is more than a brand — it's a movement redefining how people experience e-commerce through quality, trust, and innovation.
      </Typography>
    </div>

    {/* Image Grid */}
    <div className="grid md:grid-cols-2 gap-4 mt-8">
      <div className="relative aspect-3/2">
        <Image src="/images/placeholder.svg" fill className="object-cover" alt="" />
      </div>
      <div className="relative aspect-3/2">
        <Image src="/images/placeholder.svg" fill className="object-cover" alt="" />
      </div>
    </div>
  </Container>
);
