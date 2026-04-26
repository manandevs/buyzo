"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

export default function About() {
  return (
    <Container
      clean
      py={"lg"}
      as="section"
      variant="full"
    >
      <Container variant="narrow" className="text-center flex flex-col justify-center items-center gap-8">
        <Typography variant={"h3"} align={"center"} className="max-w-3xl">
          Set the standard for ecommerce excellence with <span className="bg-blue-600 bg-clip-text text-transparent font-bitcount">Buyzo.</span>
          Let us help you showcase your products and delight your customers.
        </Typography>

        <Button variant={"neo"} asChild>
          <Link
            href="/shop"
            aria-label="See products"
          >
            See products
          </Link>
        </Button>
      </Container>
    </Container>
  );
}