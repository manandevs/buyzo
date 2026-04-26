"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FaqCategoriesGrid } from "@/components/public/faq/FaqCategoriesGrid";
import { FaqDetailsView } from "@/components/public/faq/FaqDetailsView";
import { FAQ_CONTENT, faqCategories } from "@/data/content/faq-content";

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activeCategoryData = faqCategories.find(c => c.title === selectedCategory);
  const questions = selectedCategory ? FAQ_CONTENT[selectedCategory] || [] : [];

  return (
    <Container py="page">
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <FaqCategoriesGrid
            categories={faqCategories}
            onSelect={setSelectedCategory}
          />
        ) : (
          <FaqDetailsView
            selectedCategory={selectedCategory}
            activeCategoryData={activeCategoryData}
            questions={questions}
            onBack={() => setSelectedCategory(null)}
          />
        )}
      </AnimatePresence>
    </Container>
  );
}