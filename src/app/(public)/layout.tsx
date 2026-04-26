import Navbar from "@/components/public/layout/Navbar";
import Footer from '@/components/public/layout/Footer';
import WhatsAppButton from "@/components/common/WhatsAppButton";

export default function PublicGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}
