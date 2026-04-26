"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { motion } from "framer-motion";
import { LegalLayout } from "@/components/public/legal/LegalLayout";
import { LegalHeader } from "@/components/public/legal/LegalHeader";
import { LegalSection } from "@/components/public/legal/LegalSection";
import { LegalFooter } from "@/components/public/legal/LegalFooter";

const tosSections = [
  {
    title: "1. Order Acceptance & Pricing Architecture",
    content: "By initiating a transaction on Buyzo, you acknowledge that your order constitutes a legal offer to purchase. A binding contract is only formed once Buyzo issues a secondary 'Shipping Confirmation' email. We reserve the right to refuse or cancel any order at our sole discretion, including for reasons of stock limitations, inaccuracies in product data, or suspected fraudulent activity.",
    subsections: [
      {
        subtitle: "Pricing Integrity & Errors",
        detail: "In the event that a product is listed at an incorrect price due to a typographical error or technical glitch, Buyzo reserves the right to cancel orders placed for said product. If your payment has already been processed, we will issue a full credit to your original payment method within 7-10 business days."
      },
      {
        subtitle: "Taxation & Currency",
        detail: "All transactions are processed in South African Rand (ZAR) unless specified otherwise. Prices displayed are inclusive of Value Added Tax (VAT) where applicable. However, the customer remains liable for any regional sales taxes or local levies required by their specific municipality or state."
      }
    ]
  },
  {
    title: "2. Comprehensive Logistics & Risk Allocation",
    content: "Buyzo partners with third-party logistics providers to facilitate global distribution. While we provide estimated lead times (typically 24-72 hours for dispatch), these are strictly approximations. We do not accept liability for delays caused by customs clearance, industrial action, or 'Acts of God' (Force Majeure) beyond our reasonable control.",
    subsections: [
      {
        subtitle: "Transfer of Title & Risk",
        detail: "Legal title and the risk of loss or damage to the commodities transfer from Buyzo to the Customer the moment the package is scanned by our designated carrier. We highly recommend customers opt for shipping insurance for high-value electronic or bespoke items."
      },
      {
        subtitle: "Undeliverable Consignments",
        detail: "If a package is returned to our warehouse due to an incorrect address provided by the user or failure to collect from a local depot, the customer will be responsible for secondary shipping fees and a 10% administrative handling charge."
      }
    ]
  },
  {
    title: "3. Restorative Actions & Return Protocol",
    content: "Our 'Customer First' policy allows for a 30-day evaluation period. To maintain the integrity of our inventory, returns are strictly categorized into 'Defective' and 'Change of Mind.' Each category follows a rigorous inspection process once the item returns to our distribution center.",
    subsections: [
      {
        subtitle: "Condition for Resale",
        detail: "For non-defective returns, items must be in 'As New' condition. This includes original shrink-wrap, un-broken security seals, and all internal documentation. Any item showing signs of wear, hardware configuration changes, or missing accessories will be rejected or subject to a 25% restocking fee."
      },
      {
        subtitle: "Hygiene & Software Exemptions",
        detail: "Due to health and safety regulations, intimate apparel, in-ear headphones (earbuds), and opened software licenses are non-returnable. This policy is final and serves to protect the health and data privacy of our entire customer base."
      }
    ]
  },
  {
    title: "4. Limitation of Liability & Indemnification",
    content: "To the maximum extent permitted by applicable law, Buyzo and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages. This includes, without limitation, loss of profits, data loss, or business interruption arising out of the use or inability to use our products.",
    subsections: [
      {
        subtitle: "Consumer Protection Act",
        detail: "Nothing in these terms is intended to contravene your rights under the South African Consumer Protection Act (CPA). Where the CPA applies, our liability is limited to the replacement of the product or a refund of the original purchase price."
      },
      {
        subtitle: "User Indemnity",
        detail: "You agree to indemnify and hold Buyzo harmless from any claims, damages, or legal expenses (including attorney fees) arising from your breach of these terms or your misuse of the website's intellectual property."
      }
    ]
  },
  {
    title: "5. Intellectual Property & Digital Usage",
    content: "The Buyzo name, logo, custom graphics, and product descriptions are protected by copyright, trademark, and other intellectual property laws. Users are granted a limited, non-exclusive license to access the site for personal shopping purposes only.",
    subsections: [
      {
        subtitle: "Prohibited Conduct",
        detail: "You may not engage in data mining, robots, or similar data gathering tools on this site. Any unauthorized use of our metadata or product imagery for commercial resale or drop-shipping without express written consent will result in immediate legal action."
      },
      {
        subtitle: "User-Generated Content",
        detail: "By posting reviews or photos on our platform, you grant Buyzo a perpetual, royalty-free license to use, reproduce, and modify that content for marketing purposes across all digital and print media channels globally."
      }
    ]
  }
];

export default function TermsOfServicePage() {
  return (
    <LegalLayout>
      <LegalHeader 
        title="Terms of Service"
        versionInfo="Version 2.4 | Effective Date: January 1, 2024"
        note="Attention: Please read these terms carefully. They contain important information regarding your legal rights..."
      />

      <div className="flex flex-col">
        {tosSections.map((section, idx) => (
          <LegalSection key={idx} {...section} />
        ))}
      </div>

      <LegalFooter
        title="Need further clarification?"
        description="If you have any questions regarding our terms, please contact our legal team."
        email="legal@buyzo.com"
      />
    </LegalLayout>
  );
}