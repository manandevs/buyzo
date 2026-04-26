"use clinet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";

const infoBlocks = [
  {
    title: "Our Mission",
    text: "Our mission is to create a trusted online marketplace where buyers can easily find quality products at great prices and sellers can grow their businesses through powerful digital commerce tools.",
  },
  {
    title: "Our Vision",
    text: "Our vision is to build a global e-commerce platform like today’s leading marketplaces, connecting millions of customers and sellers through innovation, technology, and a seamless shopping experience.",
  },
];

const Mission = () => {
  return (
    <Container
      py={"lg"}
      as={"section"}
    >
      <div className="flex flex-col gap-8 max-w-4xl">
        <Typography as={"h2"} variant={"h2"} weight={"extrabold"} tracking="tight">
          Shop Smarter with Buyzo, Discover More Every Day
        </Typography>

        <Typography variant={"lead"} className="text-zinc-300 leading-relaxed">
          Buyzo is a modern e-commerce marketplace where customers can explore
          thousands of products across electronics, fashion, home essentials,
          and more. We make online shopping simple, affordable, and reliable
          with secure payments and fast delivery.
        </Typography>

        <div>
          <Button variant="secondary" className="rounded-full px-8" asChild>
            <Link href="/about">About Buyzo</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col pt-24">
        {infoBlocks.map(({ title, text }) => (
          <div key={title} className="border-t border-gray-700 py-6 flex flex-col gap-3">
            <Typography variant={"h4"} weight={"semibold"} className="text-gray-300 flex items-center gap-3">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              {title}
            </Typography>
            <Typography variant={"p"} className="text-gray-300">
              {text}
            </Typography>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Mission