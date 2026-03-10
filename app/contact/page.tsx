"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import Header from "@/components/Header";
import ShopCTA from "@/components/ShopCTA";
import Button from "@/components/common/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactDetails = [
    {
      icon: FiMail,
      title: "Email Us",
      details: "hello@buyzo.com",
      description: "We aim to respond to all inquiries within 24 hours.",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: "+27 83 796 0416",
      description: "Mon-Fri from 8am to 5pm (SAST).",
    },
    {
      icon: FiMapPin,
      title: "Head Office",
      details: "Johannesburg, South Africa",
      description: "Available for scheduled visits and consultations.",
    },
    {
      icon: FiClock,
      title: "Business Hours",
      details: "Mon - Fri: 8:00 AM - 5:00 PM",
      description: "Closed on weekends and public holidays.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col selection:bg-[#BA68C8] selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-24 flex flex-col gap-16 md:gap-24">

        {/* Page Header */}
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 leading-relaxed"
          >
            Have a question about our packaging solutions, need a custom quote, or want to discuss a bulk order? Our dedicated team is here to help you set the standard for excellence.
          </motion.p>
        </div>

        {/* Two Column Layout (Form + Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Minimal Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-transparent border-b border-gray-800 text-white py-4 focus:outline-none focus:border-[#BA68C8] transition-colors placeholder:text-gray-600"
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-gray-800 text-white py-4 focus:outline-none focus:border-[#BA68C8] transition-colors placeholder:text-gray-600"
              />
            </div>

            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full bg-transparent border-b border-gray-800 text-white py-4 focus:outline-none focus:border-[#BA68C8] transition-colors placeholder:text-gray-600"
            />

            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project or inquiry..."
              className="w-full bg-transparent border-b border-gray-800 text-white py-4 focus:outline-none focus:border-[#BA68C8] transition-colors placeholder:text-gray-600 resize-none"
            />

            <Button className="w-fit px-8 py-3 mt-4 text-lg">
              Send Message <FiSend size={18} />
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            {contactDetails.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex flex-col items-start">
                  <div className="flex gap-1 items-center">
                    <Icon size={16} className="text-gray-500 shrink-0" />
                    <h3 className="font-semibold ">{item.title}</h3>
                  </div>
                  <p className="text-[#BA68C8]">{item.details}</p>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </main>

      <ShopCTA />
    </div>
  );
}