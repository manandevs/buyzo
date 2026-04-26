"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FollowerButton } from '../../common/FollowerButton';
import { Typography } from '../../ui/Typography';

const FooterBanner = () => {
  return (
    <FollowerButton>
      <Container
        clean
        py={"lg"}
        as={"section"}
        variant={"full"}
        className="relative overflow-hidden border-y border-zinc-800"
      >
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-125 aspect-square bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <Container className="flex flex-col items-center text-center">
          <div className="relative z-10 flex flex-col items-center">
            <Typography variant={"p"} className="text-purple-500">
              Elevate Your Lifestyle
            </Typography>

            <Typography variant={"h2"} weight={"bold"} align={"center"} className="max-w-4xl">
              Ready to Shop <br />
              <span className="text-zinc-500">Smarter with Buyzo?</span>
            </Typography>

            <Typography variant={"p"} align={"center"} className="text-zinc-400 mt-8 max-w-md">
              Join thousands of shoppers discovering premium brands and lightning-fast delivery every day.
            </Typography>
          </div>
        </Container>

        {/* Large Watermark Text (Bottom background) */}
        <Container
          clean
          variant={"full"}
          className="flex justify-center pointer-events-none select-none overflow-hidden"
        >
          <Typography variant="marquee" font="bitcount" tracking="tighter" className="pt-12 text-zinc-800/50 whitespace-nowrap">
            BUYZO MARKETPLACE
          </Typography>
        </Container>
      </Container>
    </FollowerButton>
  );
};

export default FooterBanner;