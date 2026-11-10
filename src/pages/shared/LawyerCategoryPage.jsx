import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiCalendar,
  FiArrowLeft,
} from "react-icons/fi";

import LawyerCard from "../../components/lawyers/LawyerCard";
import { Input } from "../../components/ui/Field";
import EmptyState from "../../components/ui/EmptyState";
import { categories } from "../../data/lawyers";
import { useRole, ROLES } from "../../context/RoleContext";
import PageHero from "../../components/art/PageHero";
import CategoryIcon from "../../components/art/CategoryIcon";
import { pageMedia } from "../../data/media";
import API_URL from "../../config/api";

const normalize = (value = "") =>
  String(value).toLowerCase().replace(/[^a-z0-9]/g, "");

export default function LawyerCategoryPage() {
  const { slug } = useParams();
  const { role } = useRole();

  const basePath =
    role === ROLES.CITIZEN
      ? "/citizen/lawyers"
      : "/find-lawyers";

  const category = categories.find((c) => c.slug === slug);

  const [query, setQuery] = useState("");
  const [area, setArea] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadLawyers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/lawyers`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch lawyers");
        }

        const data = await response.json();
        setLawyers(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Category lawyers:", err);
          setError("Unable to load lawyers.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLawyers();

    return () => controller.abort();
  }, []);

  const results = useMemo(() => {
    return lawyers.filter((lawyer) => {
const matchesCategory = (lawyer.categories || []).some(
  (item) =>
    normalize(item) === normalize(slug) ||
    normalize(item) === normalize(category?.title || "")
);

      const q = query.trim().toLowerCase();
      const cityQuery = area.trim().toLowerCase();

      const matchesSearch =
        !q ||
        (lawyer.name || "").toLowerCase().includes(q) ||
        (lawyer.title || "").toLowerCase().includes(q) ||
        (lawyer.categories || []).some((item) =>
          item.toLowerCase().includes(q)
        );

      const matchesCity =
        !cityQuery ||
        (lawyer.city || "").toLowerCase().includes(cityQuery);

      return matchesCategory && matchesSearch && matchesCity;
    });
  }, [lawyers, category, slug, query, area]);

  return (
    <div className="container-page py-8">
      <Link
        to={basePath}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-navy-800"
      >
        <FiArrowLeft className="h-4 w-4" />
        All categories
      </Link>

      <div className="mt-4">
        <PageHero
          variant="inline"
          art="courthouse"
          media={pageMedia.lawyerCategory}
          leading={<CategoryIcon slug={slug} size="lg" className="mb-3" />}
          title={category?.title || "Lawyers"}
          subtitle={category?.blurb}
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="relative">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
          <Input
            className="pl-10"
            placeholder="Search by name or focus"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="relative">
          <FiMapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
          <Input
            className="pl-10"
            placeholder="Filter by city"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <p className="mt-6 text-sm text-slate-500">
          Loading lawyers...
        </p>
      )}

      {error && (
        <p className="mt-6 text-sm text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="mt-6 text-sm text-slate-500">
            {results.length} lawyer
            {results.length !== 1 ? "s" : ""} found
          </p>

          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((lawyer) => (
              <LawyerCard
                key={lawyer.id}
                lawyer={lawyer}
              />
            ))}
          </div>

          {results.length === 0 && (
            <EmptyState
              icon={FiCalendar}
              title="No lawyers match your filters"
              description="Try another category, search, or city."
              className="mt-4"
            />
          )}
        </>
      )}
    </div>
  );
}