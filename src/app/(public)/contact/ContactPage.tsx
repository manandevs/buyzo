"use client";
import { ContactForm } from "@/components/public/contact/ContactForm";
import { ContactHeader } from "@/components/public/contact/ContactHeader";
import { ContactInfo } from "@/components/public/contact/ContactInfo";
import { Container } from "@/components/ui/Container";

export default function ContactPage() {
  return (
    <Container py="page">
      <ContactHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContactForm />
        <ContactInfo />
      </div>
    </Container>
  );
}