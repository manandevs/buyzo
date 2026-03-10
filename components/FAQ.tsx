"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="w-full py-20 text-white">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">FAQs – Buyzo</h2>
          <p className="text-gray-400">
            Everything you need to know about Buyzo's packaging, ordering, and delivery.
          </p>
        </div>

        <div className="space-y-4">
          {faqsData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-gray-700">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center py-4 text-left font-medium text-lg"
                  aria-expanded={isOpen}
                >
                  {faq.question}
                  <span
                    className={`transform transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"
                      }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-gray-300"
                    >
                      <p className="py-2">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}