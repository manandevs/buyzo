"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { motion } from "framer-motion";
import { LegalLayout } from "@/components/public/legal/LegalLayout";
import { LegalHeader } from "@/components/public/legal/LegalHeader";
import { LegalSection } from "@/components/public/legal/LegalSection";
import { LegalFooter } from "@/components/public/legal/LegalFooter";

const privacySections = [
  {
    title: "1. Data Acquisition & Collection",
    content: "At Buyzo, we collect information that is essential for providing a seamless shopping experience. This data collection occurs when you browse our site, register an account, or complete a transaction. We are committed to transparency regarding how this data is harvested and stored.",
    subsections: [
      {
        subtitle: "Personal Identifiers",
        detail: "This includes your full name, shipping address, email, and contact number. We use this strictly for order fulfillment and critical account communications. We never sell this primary identification data to third-party brokers."
      },
      {
        subtitle: "Automated Metadata",
        detail: "Our servers automatically log your IP address, browser type, and device identifiers. This technical data helps us optimize our interface for your specific hardware and protects our platform against DDoS attacks and fraudulent login attempts."
      }
    ]
  },
  {
    title: "2. Purpose of Processing & Legal Basis",
    content: "We process your data under several legal frameworks, primarily for the performance of a contract (delivering your order) and our legitimate business interests (improving our service). Every data point serves a specific operational purpose.",
    subsections: [
      {
        subtitle: "Transaction Fulfillment",
        detail: "Your data is shared with financial institutions to process payments and with logistics partners to ensure physical delivery. Without this processing, we cannot legally or physically complete your purchase."
      },
      {
        subtitle: "Marketing & Personalization",
        detail: "With your express consent, we use your purchase history to suggest products you might like. You may opt-out of these communications at any time via the 'Unsubscribe' link found in every email."
      }
    ]
  },
  {
    title: "3. Data Retention & Security Protocols",
    content: "We implement industry-standard security measures, including 256-bit AES encryption and Secure Socket Layer (SSL) technology. We do not store raw credit card information; all financial tokens are handled by PCI-DSS compliant payment processors.",
    subsections: [
      {
        subtitle: "Retention Lifecycle",
        detail: "We retain your personal data only as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements (typically 5-7 years for tax records)."
      },
      {
        subtitle: "Breach Notification",
        detail: "In the highly unlikely event of a data breach, we have a response workflow in place to notify the relevant supervisory authorities and affected individuals within 72 hours of discovery."
      }
    ]
  },
  {
    title: "4. Global Jurisdictions & User Rights",
    content: "As a global platform, we respect diverse privacy laws including the POPI Act (South Africa), GDPR (Europe), and CCPA (California). Regardless of your location, we provide high-level data protection rights to all users.",
    subsections: [
      {
        subtitle: "Right to Erasure ('Right to be Forgotten')",
        detail: "You have the right to request that we delete all personal data we hold about you, provided the data is no longer required for legal compliance or ongoing contractual obligations."
      },
      {
        subtitle: "Data Portability",
        detail: "You may request a copy of your personal data in a structured, machine-readable format to transfer to another service provider. We provide this service free of charge within 30 days of request."
      }
    ]
  },
  {
    title: "5. Cookie Categories & Tracking",
    content: "Our website uses cookies to distinguish you from other users. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site functionality.",
    subsections: [
      {
        subtitle: "Essential Cookies",
        detail: "These are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website, use a shopping cart, or make use of e-billing services."
      },
      {
        subtitle: "Analytical/Performance Cookies",
        detail: "These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works."
      }
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout>
      <LegalHeader 
        title="Privacy Policy"
        versionInfo="Effective Date: January 1, 2024 | Privacy Version 3.1"
        note="Your privacy is our priority. This document outlines our 'Privacy-by-Design' approach..."
      />

      <div className="flex flex-col">
        {privacySections.map((section, idx) => (
          <LegalSection key={idx} {...section} />
        ))}
      </div>

      <LegalFooter
        title="Data Protection Officer"
        description="If you wish to exercise any of your data rights or have questions, please contact our designated DPO."
        email="privacy@buyzo.com"
      />
    </LegalLayout>
  );
}