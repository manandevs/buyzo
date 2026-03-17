import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <WhatsAppButton />
    </div>
  );
}
