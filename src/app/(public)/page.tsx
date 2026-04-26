import Hero from '@/components/public/home/Hero';
import BrandMarquee from '@/components/public/home/BrandMarquee';
import About from '@/components/public/home/About';
import Solution from '@/components/public/home/Solutions';
import ProductShowcase from '@/components/public/home/ProductShowcase';
import Mission from '@/components/public/home/Mission';
import ContactMarquee from '@/components/public/home/ContactMarquee';
import Standards from '@/components/public/home/Standards';
import FAQ from '@/components/public/home/Faq';
import FooterBanner from '@/components/public/home/FooterBanner';
import { Container } from '@/components/ui/Container';

export default function Home() {
  return (
    <Container variant={"full"} clean>
      <Hero />
       <BrandMarquee />
      <ProductShowcase />
      <About />
      <Solution />
      <Mission />
      <ContactMarquee />
      <Standards />
      <FAQ />
      <FooterBanner />
    </Container>
  );
}