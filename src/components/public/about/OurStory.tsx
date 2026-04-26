import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";

export const OurStory = () => (
  <Container py={"lg"}>
    <div className="max-w-2xl flex flex-col gap-4">
      <Typography as={"h2"} variant={"h2"} weight={"bold"}>
        Our Story
      </Typography>
      <Typography variant="h4" weight="bold">
        Built on passion, driven by innovation.
      </Typography>
      <Typography variant={"p"}>
        Buyzo began with a vision to simplify global commerce by making quality products accessible to everyone. It has grown into a trusted, innovation-driven platform that connects buyers and sellers seamlessly, removes shopping barriers, and delivers a reliable, convenient, and transparent experience for a global audience.
      </Typography>
    </div>
  </Container>
);
