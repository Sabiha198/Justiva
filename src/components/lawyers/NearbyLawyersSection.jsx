import { Link } from "react-router-dom";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import LawyerCard from "./LawyerCard";
import Button from "../ui/Button";
import { buildLawyerMapsUrl } from "./GoogleMapsLawyerSearch";

// The single lawyers list: Justiva lawyer profiles only.
// `city` is an entry from bdCities (or undefined when "All cities" is selected).
export default function NearbyLawyersSection({ query, city, filtersActive, featured, seeAllTo }) {
  let heading = "Featured lawyers";
  if (query) heading = `Results for "${query}"${city ? ` in ${city.label}` : ""}`;
  else if (city) heading = `Lawyers in ${city.label}`;
  else if (filtersActive) heading = "Matching lawyers";

  const showSeeAll = !query && !city && !filtersActive;
  const emptyCity = city && !query && !filtersActive;

  return (
    <section>
      <div className="mt-9 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h3 className="font-display text-lg font-semibold text-ink">{heading}</h3>
          {(query || city || filtersActive) && featured.length > 0 && (
            <span className="text-xs text-slate-400">{featured.length} found</span>
          )}
        </div>
        {showSeeAll && (
          <Link to={seeAllTo} className="flex items-center gap-1 text-sm font-semibold text-navy-800 hover:text-brass-600">
            See all <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((l) => (
          <LawyerCard key={l.id} lawyer={l} />
        ))}
      </div>

      {featured.length === 0 && (
        <div className="mt-4 rounded-lg border border-dashed border-line bg-white px-6 py-10 text-center">
          <p className="text-sm font-semibold text-ink">
            {emptyCity ? `No Justiva lawyers in ${city.label} yet.` : "No lawyers match these filters."}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {emptyCity
              ? "You can look for local lawyers on Google Maps, but those listings are not verified by Justiva."
              : "Try removing a filter or searching a different name, city or practice area."}
          </p>
          {city && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => window.open(buildLawyerMapsUrl(city.label), "_blank", "noopener,noreferrer")}
            >
              <FiExternalLink className="h-4 w-4" aria-hidden="true" /> Search {city.label} on Google Maps
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
