"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, Globe, Clock, ShieldCheck, MapPin, Package, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";

const shippingMethods = [
  {
    icon: <Truck className="text-blue-500" />,
    title: "Standard Shipping",
    time: "3-5 Business Days",
    price: "Free over $50",
    desc: "Reliable delivery via USPS or FedEx Ground."
  },
  {
    icon: <Zap className="text-yellow-500" />,
    title: "Express Delivery",
    time: "1-2 Business Days",
    price: "$14.99",
    desc: "Priority handling with UPS Next Day Air."
  },
  {
    icon: <Globe className="text-emerald-500" />,
    title: "International",
    time: "7-14 Business Days",
    price: "Calculated at checkout",
    desc: "Global reach to 50+ countries via DHL Express."
  }
];

export default function ShippingPage() {
  return (
    <Container py="page">
      {/* Hero Section */}
      <div className="max-w-3xl mb-8 flex flex-col gap-2">
        <Typography variant="h2" weight="bold">
          Shipping & Delivery
        </Typography>
        <Typography variant="p">
          We bring the world to your doorstep. From our warehouse to your hands,
          track every step of the journey with Buyzo’s premium logistics network.
        </Typography>
      </div>

      {/* Shipping Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {shippingMethods.map((method, i) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 space-y-2 border border-white/10 bg-zinc-900/50 rounded-xl hover:border-[#BA68C8]/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-sm">
                {method.icon}
              </div>
              <Typography variant="h4" weight="bold">{method.title}</Typography>
            </div>
            <Typography variant="p" className="text-[#BA68C8] font-medium mb-2">
              {method.time} • {method.price}
            </Typography>
            <Typography variant="p" className="text-sm opacity-60">
              {method.desc}
            </Typography>
          </motion.div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Clock size={20} className="text-[#BA68C8]" />
              <Typography variant="h3" weight="bold">Processing Times</Typography>
            </div>
            <Typography variant="p" className="opacity-70 leading-relaxed">
              Orders placed before <span className="text-white font-bold">2:00 PM EST</span> are processed
              the same business day. Orders placed on weekends or holidays will be processed
              the following business day. You will receive an email with your tracking number
              the moment your label is printed.
            </Typography>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={20} className="text-[#BA68C8]" />
              <Typography variant="h3" weight="bold">International Rules</Typography>
            </div>
            <Typography variant="p" className="opacity-70 leading-relaxed">
              International orders may be subject to import duties and taxes (including VAT),
              which are incurred once a shipment reaches your destination country.
              Buyzo is not responsible for these charges if they are applied and are
              your responsibility as the customer.
            </Typography>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={20} className="text-[#BA68C8]" />
              <Typography variant="h3" weight="bold">Carrier Partners</Typography>
            </div>
            <div className="flex flex-wrap gap-6 opacity-40 grayscale contrast-125">
              {/* Replace these with actual SVGs or small Image components */}
              <span className="font-black italic">FedEx</span>
              <span className="font-black italic">UPS</span>
              <span className="font-black italic">DHL</span>
              <span className="font-black italic">USPS</span>
            </div>
          </section>
        </div>

        {/* Right Column: Visual Component / "Where is my package?" */}
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Package size={200} />
          </div>

          <Typography variant="h4" weight="bold" className="mb-4">
            Live Tracking
          </Typography>

          <div className="space-y-4 relative">
            {[
              { label: "Ordered & Confirmed", date: "Oct 12, 10:00 AM", done: true },
              { label: "Processing at Warehouse", date: "Oct 12, 02:30 PM", done: true },
              { label: "Shipped", date: "Oct 13, 09:15 AM", done: true },
              { label: "Out for Delivery", date: "Today", done: false },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className={`size-4 rounded-full ${step.done ? 'bg-[#BA68C8]' : 'bg-zinc-700'} z-10`} />
                  {idx !== 3 && <div className="w-[2px] h-8 bg-zinc-800 -my-1" />}
                </div>
                <div>
                  <Typography variant="p" className={step.done ? "text-white" : "opacity-40"}>
                    {step.label}
                  </Typography>
                  <Typography variant="p" className="text-xs opacity-50">{step.date}</Typography>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Typography variant="p" className="text-sm opacity-60 mb-4">
              Looking for your specific order?
            </Typography>
            <Button className="bg-white text-black hover:bg-zinc-200 transition-colors">
              Track Your Order
            </Button>
          </div>
        </div>

      </div>
    </Container>
  );
}