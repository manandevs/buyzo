import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import SolutionCard from '@/components/common/SolutionCard'
import { Typography } from '@/components/ui/Typography';

const solutions = [
  {
    title: "Electronics",
    description: "Shop smartphones, laptops, accessories, and gadgets.",
    href: "/electronics",
    image: "/images/electronics.png"
  },
  {
    title: "Fashion",
    description: "Discover trendy clothing and accessories from top brands.",
    href: "/fashion",
    image: "/images/fashion.png"
  },
  {
    title: "Home & Living",
    description: "Find furniture, décor, and smart home devices.",
    href: "/home-living",
    image: "/images/home-living.png"
  },
  {
    title: "Beauty & Health",
    description: "Explore skincare, makeup, and wellness products.",
    href: "/beauty-health",
    image: "/images/beauty-health.png"
  },
  {
    title: "Sports & Outdoors",
    description: "Get sports equipment and outdoor gear to stay active.",
    href: "/sports-outdoors",
    image: "/images/sports-outdoors.png"
  },
  {
    title: "Toys & Baby",
    description: "Shop toys, games, and baby care essentials.",
    href: "/toys-baby",
    image: "/images/toys-baby.png"
  },
];

const Hero = () => {
  return (
    <Container
      clean
      py={"sm"}
      as="section"
      variant="full"
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Buyzo Marketplace background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      </div>

      {/* Main Content */}
      <Container py={"lg"} className="relative z-10">
        <div className="flex flex-col gap-8 mb-16">
          <Typography as={"h1"} variant={"h1"} weight={"extrabold"} tracking={"tight"} className="max-w-4xl leading-[1.1]">
            Quality products, seamless shopping, and lightning-fast delivery.
          </Typography>
          <Typography as={"p"} variant={"lead"} className="max-w-2xl text-zinc-300">
            Shop thousands of products from top brands. Fast delivery and trusted service at your fingertips.
          </Typography>
        </div>

        {/* Categories Grid (6 items) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
          {solutions.map((solution, idx) => (
            <SolutionCard
              key={idx}
              title={solution.title}
              description={solution.description}
              href={solution.href}
              image={solution.image}
            />
          ))}
        </div>
      </Container>
    </Container>
  )
}

export default Hero