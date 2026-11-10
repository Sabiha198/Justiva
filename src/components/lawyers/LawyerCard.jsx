import { Link } from "react-router-dom";
import { FiMapPin, FiCheckCircle, FiCalendar } from "react-icons/fi";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import RatingStars from "./RatingStars";
import { formatCurrency } from "../../utils/format";
import { useRole, ROLES } from "../../context/RoleContext";
import { LawyerAvatar } from "../ui/Avatar";

export default function LawyerCard({ lawyer, variant = "grid" }) {
  const { role } = useRole();
  const basePath = role === ROLES.CITIZEN ? "/citizen/lawyers" : "/find-lawyers";
  const detailPath = `${basePath}/${lawyer.id}`;
  const isCitizen = role === ROLES.CITIZEN;
  // Booking is for citizens (and visitors, who are sent to log in first and then
  // returned to this lawyer's booking page). Other staff roles don't book.
  const canBook = isCitizen || role === ROLES.PUBLIC;
  const bookPath = `/citizen/lawyers/${lawyer.id}/book`;
  const isOpen = lawyer.status === "open";
  const avatar = (size) => <LawyerAvatar lawyer={lawyer} className={size} textClass="text-lg" />;

  if (variant === "row") {
    return (
      <Link to={detailPath} className="block">
        <div className="flex items-center gap-4 rounded-lg border border-line bg-white p-4 transition-shadow hover:shadow-card">
          {avatar("h-14 w-14")}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-semibold text-ink">{lawyer.name}</p>
              {lawyer.verified && <FiCheckCircle className="h-3.5 w-3.5 shrink-0 text-navy-700" />}
            </div>
            <p className="truncate text-xs text-slate-500">{lawyer.degree}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
              <FiMapPin className="h-3 w-3" /> {lawyer.city}
            </p>
            <div className="mt-1">
              <RatingStars rating={lawyer.rating} reviews={lawyer.reviews} />
            </div>
          </div>
          <div className="text-right text-sm font-semibold text-navy-800 shrink-0">
            {formatCurrency(lawyer.fee, lawyer.currency)}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Card className="group relative flex h-full flex-col p-5 transition-shadow hover:shadow-lift">
      <div className="flex items-start justify-between">
        {avatar("h-14 w-14")}
        {lawyer.verified && (
          <Badge tone="pine" className="!py-0.5">
            <FiCheckCircle className="h-3 w-3" /> Verified
          </Badge>
        )}
      </div>

      {/* Stretched link: the whole card opens the profile, while the Book button stays separately clickable. */}
      <Link
        to={detailPath}
        className="mt-3 text-sm font-semibold text-ink after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-navy-700"
      >
        {lawyer.name}
      </Link>
      <p className="text-xs text-slate-500">{lawyer.title}</p>
      <div className="mt-2"><RatingStars rating={lawyer.rating} reviews={lawyer.reviews} /></div>
      <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
        <FiMapPin className="h-3 w-3" /> {lawyer.city}
      </p>
      <p className={`mt-1 flex items-center gap-1.5 text-xs font-medium ${isOpen ? "text-pine-700" : "text-alert-700"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-pine-600" : "bg-alert-600"}`} aria-hidden="true" />
        {isOpen ? "Open today" : "Closed today"}
      </p>

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-xs text-slate-400">{lawyer.experienceYears} yrs exp.</span>
        <span className="text-sm font-semibold text-navy-800">{formatCurrency(lawyer.fee, lawyer.currency)}</span>
      </div>

      {canBook && (
        <Button
          as={Link}
          to={isCitizen ? bookPath : "/login?role=citizen"}
          state={isCitizen ? undefined : { from: bookPath }}
          variant="brass"
          size="sm"
          className="relative z-10 mt-3 w-full"
        >
          <FiCalendar className="h-4 w-4" aria-hidden="true" /> Book appointment
        </Button>
      )}
    </Card>
  );
}
