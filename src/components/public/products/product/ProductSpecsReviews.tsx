import { Typography } from "@/components/ui/Typography";

export const ProductSpecsReviews = ({ specifications, reviews }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col gap-2 py-8">
      <Typography variant="h4" weight="bold">Technical Specifications</Typography>
      <div className="max-w-2xl border border-gray-800">
        <table className="w-full text-left border-collapse">
          <tbody>
            {specifications?.map((spec: string, i: number) => {
              const [label, value] = spec.includes(":") ? spec.split(":") : [spec, "Yes"];
              return (
                <tr key={i} className="border-b border-gray-800 last:border-0 hover:bg-gray-900/30 transition-colors">
                  <td className="py-2 px-4 font-semibold text-gray-400 w-1/3">{label}</td>
                  <td className="py-2 px-4 text-gray-200">{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

    <div className="flex flex-col gap-2 py-8">
      <Typography variant="h4" weight="bold">Customer Reviews</Typography>
      <div className="flex flex-col gap-6">
        {reviews?.length ? reviews.map((review: string, i: number) => (
          <div key={i} className="flex flex-col gap-2 p-4 bg-gray-900/30 border border-gray-800">
            <div className="flex text-primary text-sm">★★★★★</div>
            <Typography className="italic text-gray-300">"{review}"</Typography>
            <Typography variant="small" className="text-gray-500 font-medium">— Verified Buyer</Typography>
          </div>
        )) : (
          <Typography className="text-gray-500 italic">No reviews yet. Be the first to share your thoughts!</Typography>
        )}
      </div>
    </div>
  </div>
);
