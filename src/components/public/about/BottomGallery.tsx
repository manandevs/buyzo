import Image from "next/image";
import { Container } from "@/components/ui/Container";

export const BottomGallery = () => (
  <Container py={"lg"}>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="relative aspect-square">
          <Image src="/images/placeholder.svg" fill className="object-cover" alt="" />
        </div>
      ))}
    </div>
  </Container>
);
