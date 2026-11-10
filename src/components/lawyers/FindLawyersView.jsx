
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import Card from "../ui/Card";
import { Input } from "../ui/Field";
import NearbyLawyersSection from "./NearbyLawyersSection";
import GoogleMapsLawyerSearch from "./GoogleMapsLawyerSearch";
import LawyerFilterBar from "./LawyerFilterBar";
import PageHero from "../art/PageHero";
import CategoryIcon from "../art/CategoryIcon";

import { categories } from "../../data/lawyers";
import { bdCities } from "../../data/bdCities";
import { pageMedia } from "../../data/media";
import API_URL from "../../config/api";

import {
  defaultFilters,
  countActiveFilters,
  filterLawyers,
} from "../../utils/lawyerSearch";

const categoryTabColors = [
  "var(--color-alert-600)",
  "var(--color-pine-600)",
  "var(--color-navy-700)",
  "var(--color-brass-600)",
  "var(--color-alert-600)",
  "var(--color-pine-600)",
];

export default function FindLawyersView({
  basePath,
  ngoPath,
}) {
  const [filters, setFilters] = useState({
    ...defaultFilters,
  });

  const [lawyers, setLawyers] = useState([]);
  const [ngos, setNgos] = useState([]);

  const [loadingLawyers, setLoadingLawyers] = useState(true);
  const [lawyersError, setLawyersError] = useState("");

  const [loadingNgos, setLoadingNgos] = useState(true);
  const [ngosError, setNgosError] = useState("");

  // Fetch verified lawyers from MongoDB
  useEffect(() => {
    const controller = new AbortController();

    async function loadLawyers() {
      try {
        setLoadingLawyers(true);
        setLawyersError("");

        const response = await fetch(
          `${API_URL}/lawyers`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load lawyers.");
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setLawyers(
            Array.isArray(data)
              ? data.filter((lawyer) => lawyer.verified === true)
              : []
          );
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Lawyers fetch error:", error);
          setLawyersError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingLawyers(false);
        }
      }
    }

    loadLawyers();

    return () => controller.abort();
  }, []);

  // Fetch NGOs from MongoDB
  useEffect(() => {
    const controller = new AbortController();

    async function loadNgos() {
      try {
        setLoadingNgos(true);
        setNgosError("");

        const response = await fetch(
          `${API_URL}/public/ngos`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load NGOs.");
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setNgos(
            Array.isArray(data)
              ? data.filter((ngo) => ngo.verified === true)
              : []
          );
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("NGO fetch error:", error);
          setNgosError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingNgos(false);
        }
      }
    }

    loadNgos();

    return () => controller.abort();
  }, []);

  const city = bdCities.find(
    (item) => item.key === filters.cityKey
  );

  const activeCount = countActiveFilters(filters);

  const isDefaultView =
    activeCount === 0 &&
    filters.sort === "recommended";

  // Filter real MongoDB lawyers
  const results = useMemo(() => {
    const list = filterLawyers({
      ...filters,
      cityLabel: city?.label || "",
      lawyers,
    });

    return isDefaultView
      ? list.slice(0, 6)
      : list;
  }, [filters, city?.label, lawyers, isDefaultView]);

  return (
    <div className="container-page py-8">
      <PageHero
        variant="inline"
        art="scales"
        media={pageMedia.findLawyers}
        title="Find the right lawyer"
        subtitle="Browse by specialty or search by name, city, or focus area."
      />

      {/* Search */}
      <div className="relative mt-5 max-w-lg">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />

        <Input
          className="pl-10"
          placeholder="Search lawyers, e.g. 'criminal' or 'Dhaka'"
          value={filters.query}
          onChange={(e) =>
            setFilters((previous) => ({
              ...previous,
              query: e.target.value,
            }))
          }
        />
      </div>

      {/* Teammate's Google Maps feature */}
      <GoogleMapsLawyerSearch
        cityKey={filters.cityKey}
        onCityChange={(cityKey) =>
          setFilters((previous) => ({
            ...previous,
            cityKey,
          }))
        }
      />

      {/* Advanced filters */}
      <LawyerFilterBar
        filters={filters}
        onChange={setFilters}
        onClear={() =>
          setFilters({
            ...defaultFilters,
            sort: filters.sort,
          })
        }
        activeCount={activeCount}
      />

      {/* MongoDB lawyers */}
      {loadingLawyers ? (
        <p className="mt-8 text-sm text-slate-500">
          Loading verified lawyers...
        </p>
      ) : lawyersError ? (
        <p className="mt-8 text-sm text-red-600">
          {lawyersError}
        </p>
      ) : (
        <NearbyLawyersSection
          query={filters.query.trim()}
          city={city}
          filtersActive={activeCount > 0}
          featured={results}
          seeAllTo={`${basePath}/category/criminal-law`}
        />
      )}

      {/* Categories */}
      <h3 className="mt-9 font-display text-lg font-semibold text-ink">
        Browse by category
      </h3>

      <div className="mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((category, index) => (
          <Link
            key={category.slug}
            to={`${basePath}/category/${category.slug}`}
            className="shrink-0"
          >
            <Card
              tab={
                categoryTabColors[
                  index % categoryTabColors.length
                ]
              }
              className="flex w-44 flex-col gap-2 p-4 transition-shadow hover:shadow-lift"
            >
              <CategoryIcon
                slug={category.slug}
                size="sm"
              />

              <p className="text-sm font-semibold text-ink">
                {category.title}
              </p>

              <p className="text-xs leading-snug text-slate-500">
                {category.blurb}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Verified NGO section */}
      {loadingNgos ? (
        <p className="mt-8 text-sm text-slate-500">
          Loading partner NGOs...
        </p>
      ) : ngosError ? (
        <p className="mt-8 text-sm text-red-600">
          {ngosError}
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {ngos.slice(0, 2).map((ngo) => (
            <Link
              key={ngo.id || ngo._id}
              to={ngoPath}
              className="block"
            >
              <Card className="flex items-center gap-4 p-4 transition-shadow hover:shadow-lift">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-pine-100 font-display font-semibold text-pine-700">
                  {(ngo.name || "N").charAt(0)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {ngo.name}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {ngo.focus || "Legal aid support"}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
