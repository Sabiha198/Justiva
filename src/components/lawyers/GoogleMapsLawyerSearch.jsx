import { useMemo } from "react";
import { FiMapPin, FiExternalLink } from "react-icons/fi";
import Button from "../ui/Button";
import { Label, Select } from "../ui/Field";
import { bdCities } from "../../data/bdCities";
import { countLawyersByCity } from "../../utils/lawyerSearch";

// Builds a Google Maps Search URL. No API key, billing or backend needed.
export function buildLawyerMapsUrl(cityLabel) {
  const query = `lawyers in ${cityLabel}, Bangladesh`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

// City filter for the Find Lawyers pages.
// Picking a city filters the Justiva lawyers list below it. Google Maps is only
// an optional extra for people who want to look beyond Justiva's verified lawyers.
export default function GoogleMapsLawyerSearch({ cityKey, onCityChange }) {
  const counts = useMemo(() => countLawyersByCity(), []);
  const city = bdCities.find((c) => c.key === cityKey);

  return (
    <div className="mt-4 max-w-lg">
      <Label htmlFor="lawyer-city">Filter by city</Label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:flex-1">
          <FiMapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
          <Select
            id="lawyer-city"
            className="pl-10"
            value={cityKey}
            onChange={(e) => onCityChange(e.target.value)}
          >
            <option value="">All cities</option>
            {bdCities.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label} ({counts[c.label] || 0})
              </option>
            ))}
          </Select>
        </div>
        {city && (
          <Button
            type="button"
            variant="subtle"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => window.open(buildLawyerMapsUrl(city.label), "_blank", "noopener,noreferrer")}
          >
            <FiExternalLink className="h-4 w-4" aria-hidden="true" /> Also search Google Maps
          </Button>
        )}
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Numbers show verified Justiva lawyers in each city. Google Maps listings open in a new tab and are not verified by Justiva.
      </p>
    </div>
  );
}
