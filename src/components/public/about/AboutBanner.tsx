import Image from "next/image";
import { Container } from "@/components/ui/Container";

export const AboutBanner = () => (
  <Container variant="full" clean py={"lg"}>
    <div className="relative w-full min-h-175">
      <Image src="/images/placeholder.svg" fill className="object-cover" alt="" />
    </div>
  </Container>
);
