"use client";
import { Container } from "@/components/ui/Container";

import { AboutHero } from "@/components/public/about/AboutHero";
import { OurStory } from "@/components/public/about/OurStory";
import ImageText from "@/components/common/ImageText";
import { AboutBanner } from "@/components/public/about/AboutBanner";
import { BottomGallery } from "@/components/public/about/BottomGallery";

export default function AboutPage() {
  return (
    <Container variant="full" clean py={"sm"}>
      <AboutHero />
      <OurStory />
      <ImageText
        title="Our Mission"
        imageSrc="/images/placeholder.svg"
        paragraphs={[
          "Our mission is to deliver seamless shopping experiences by connecting buyers and sellers through a reliable and user-friendly platform. We focus on quality transparency and efficiency at every step from product discovery to delivery.",
          "By leveraging technology and innovation we aim to simplify global commerce reduce barriers and enhance accessibility for everyone. Our platform ensures secure transactions trusted sellers and consistent support for customers worldwide.",
          "We continuously improve our systems to meet evolving market needs and expectations. Through innovation and dedication we strive to create a smooth efficient and enjoyable shopping journey that empowers both businesses and consumers across global markets.",
        ]}
      />
      <AboutBanner />
      <ImageText
        title="Vision"
        imageSrc="/images/placeholder.svg"
        reverse
        paragraphs={[
          "We envision a world where buying and selling is effortless and accessible to everyone, regardless of location or background, creating equal opportunities across global markets.",
          "Our platform is built to remove complexity and barriers, enabling seamless interactions between buyers and sellers through intuitive design, secure systems, and reliable performance.",
          "By embracing innovation and continuous improvement, we aim to shape the future of commerce with technology that adapts to user needs and delivers a smooth, intelligent experience.",
        ]}
      />
      <BottomGallery />
    </Container>
  );
}