import { Typography } from "@/components/ui/Typography";

export const ProductFaq = ({ faq }: any) => (
  <div className="flex flex-col gap-2">
    <Typography variant="large" weight="semibold">Frequently Asked Questions</Typography>
    <div className="flex flex-col gap-4">
      {faq?.length ? faq.map((item: any, i: number) => (
        <div key={i} className="flex flex-col">
          <Typography>Q.{i + 1}. {item.questions}</Typography>
          <Typography>A.{i + 1}. {item.answers}</Typography>
        </div>
      )) : (
        <Typography className="text-gray-500 italic">Have a question? Reach out to our support team.</Typography>
      )}
    </div>
  </div>
);
