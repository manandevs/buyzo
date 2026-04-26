"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";

const faqsData = [
  {
    question: "What types of packaging does Buyzo offer?",
    answer:
      "Buyzo provides a range of packaging solutions including ready-to-order, custom branded, and bespoke moulded items for food and other products.",
  },
  {
    question: "Does Buyzo deliver nationwide?",
    answer:
      "Yes, Buyzo offers reliable nationwide delivery across South Africa.",
  },
  {
    question: "Does Buyzo ship globally?",
    answer:
      "Absolutely. Contact Buyzo to discuss global delivery options for your orders.",
  },
  {
    question: "How do I place an order with Buyzo?",
    answer:
      "You can place quick orders directly on Buyzo's online store or contact the team for bulk and custom packaging requests.",
  },
  {
    question: "Does Buyzo offer sustainable packaging?",
    answer:
      "Yes. Buyzo offers recyclable, compostable, FSC-certified, and post-consumer recycled packaging options.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Container py={"lg"}>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-3 text-center">
          <Typography as={"h2"} variant={"h2"} weight={"bold"} align={"center"}>FAQs – Buyzo</Typography>
          <Typography variant={"p"} align={"center"} className="text-gray-400">
            Everything you need to know about Buyzo&apos;s packaging, ordering, and delivery.
          </Typography>
        </div>

        <div className="space-y-4">
          {faqsData.map((faq, idx) => (
            <details
              key={idx}
              name="faq-accordion"
              className="group border-b border-zinc-700"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between py-2 outline-none [&::-webkit-details-marker]:hidden">
                <Typography variant="large" weight="medium" className="text-white">
                  {faq.question}
                </Typography>

                {/* The icon rotates automatically when the parent <details> is open */}
                <span className="text-2xl transition-transform duration-300 group-open:rotate-45 text-zinc-400">
                  +
                </span>
              </summary>

              <div className="pb-2">
                <Typography variant="muted" className="leading-relaxed">
                  {faq.answer}
                </Typography>
              </div>
            </details>
          ))}
        </div>
      </div>
    </Container>
  );
}