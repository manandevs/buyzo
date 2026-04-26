import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export const LegalLayout = ({ children }: { children: React.ReactNode }) => (
  <Container py="page">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {children}
    </motion.div>
  </Container>
);
