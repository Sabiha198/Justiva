import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import RatingStars from "../../components/lawyers/RatingStars";
import { lawyerReviews } from "../../data/lawyerPanel";
import { currentLawyer } from "../../data/lawyers";

export default function ReviewsPage() {
  const me = currentLawyer;
  const avg = (lawyerReviews.reduce((s, r) => s + r.rating, 0) / lawyerReviews.length).toFixed(1);

  return (
    <div className="container-page py-8">
      <PageHeader title="Reviews" subtitle="Feedback from your clients." />

      <Card className="mt-6 flex items-center gap-6 p-6">
        <div className="text-center">
          <p className="font-display text-4xl font-semibold text-navy-900">{avg}</p>
          <RatingStars rating={me.rating} showValue={false} />
          <p className="mt-1 text-xs text-slate-400">{lawyerReviews.length} reviews</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = lawyerReviews.filter((r) => Math.round(r.rating) === star).length;
            const pct = (count / lawyerReviews.length) * 100;
            return (
              <div key={star} className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-8">{star} star</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy-50">
                  <div className="h-full rounded-full bg-brass-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-6 space-y-3">
        {lawyerReviews.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">{r.client}</p>
              <RatingStars rating={r.rating} showValue={false} />
            </div>
            <p className="mt-2 text-sm text-slate-600">{r.comment}</p>
            <p className="mt-2 text-xs text-slate-400">{r.date}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
