
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiCalendar,
  FiHeart,
  FiNavigation,
} from "react-icons/fi";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import RatingStars from "../../components/lawyers/RatingStars";
import { LawyerAvatar } from "../../components/ui/Avatar";
import HeroBackdrop from "../../components/art/HeroBackdrop";
import { formatCurrency } from "../../utils/format";
import { useToast } from "../../context/ToastContext";
import { useRole, ROLES } from "../../context/RoleContext";
import API_URL from "../../config/api";

export default function LawyerProfilePage() {
  const { id } = useParams();
  const { role } = useRole();
  const toast = useToast();

  const isCitizen = role === ROLES.CITIZEN;
  const basePath = isCitizen
    ? "/citizen/lawyers"
    : "/find-lawyers";

  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  // Load lawyer details from MongoDB
  useEffect(() => {
    const controller = new AbortController();

    async function loadLawyer() {
      try {
        setLoading(true);
        setError("");
        setLawyer(null);

        const response = await fetch(
          `${API_URL}/lawyers/${id}`,
          { signal: controller.signal }
        );

        if (response.status === 404) {
          throw new Error("Lawyer profile not found.");
        }

        if (!response.ok) {
          throw new Error("Failed to load lawyer profile.");
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setLawyer(data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Lawyer profile:", err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLawyer();

    return () => controller.abort();
  }, [id]);

  const handlePrimaryCta = () => {
    if (!isCitizen) {
      toast.info(
        "Log in as a citizen to request a consultation."
      );
    }
  };

  const toggleSave = () => {
    setSaved((previous) => !previous);

    toast.info(
      "Favorites are not connected to the database yet."
    );
  };

  if (loading) {
    return (
      <div className="container-page py-12 text-sm text-slate-500">
        Loading lawyer profile...
      </div>
    );
  }

  if (error || !lawyer) {
    return (
      <div className="container-page py-12">
        <h2 className="text-xl font-semibold text-ink">
          Lawyer unavailable
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {error || "This lawyer profile could not be found."}
        </p>

        <Link
          to={basePath}
          className="mt-4 inline-block text-sm font-semibold text-navy-800"
        >
          Back to lawyers
        </Link>
      </div>
    );
  }

  // Only build Maps URLs after lawyer data has loaded.
  // Prefer the chamber address; use city if address is missing.
  const location = (lawyer.address || lawyer.city || "").trim();

  const mapQuery = encodeURIComponent(
    `${location}, Bangladesh`
  );

  const embedUrl = location
    ? `https://www.google.com/maps?q=${mapQuery}&output=embed`
    : "";

  const directionsUrl = location
    ? `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`
    : "";

  const bookPath = `/citizen/lawyers/${lawyer.id}/book`;

  const services = Array.isArray(lawyer.services)
    ? lawyer.services
    : [];

  const highlights = Array.isArray(
    lawyer.experienceHighlights
  )
    ? lawyer.experienceHighlights
    : [];

  const languages = Array.isArray(lawyer.languages)
    ? lawyer.languages
    : [];

  const feedback = Array.isArray(lawyer.feedback)
    ? lawyer.feedback
    : [];

  return (
    <div className="pb-16">
      {/* Header banner */}
      <div className="relative h-36 overflow-hidden bg-navy-950 sm:h-44">
        <HeroBackdrop variant="paths" />
      </div>

      <div className="container-page -mt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              {/* Lawyer photo */}
              <LawyerAvatar
                lawyer={lawyer}
                className="h-24 w-24 border-4 border-white shadow-card"
                textClass="text-3xl"
                rounded="rounded-xl"
              />

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-semibold text-ink">
                    {lawyer.name}
                  </h1>

                  {lawyer.verified && (
                    <Badge tone="pine">
                      <FiCheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {lawyer.title}
                  {lawyer.degree
                    ? ` · ${lawyer.degree}`
                    : ""}
                </p>

                <div className="mt-2">
                  <RatingStars
                    rating={lawyer.rating}
                    reviews={lawyer.reviews}
                  />
                </div>
              </div>

              {/* Experience and fee */}
              <div className="flex gap-6 border-t border-line pt-4 sm:border-0 sm:pt-0 sm:text-right">
                <div>
                  <p className="font-display text-xl font-semibold text-navy-800">
                    {lawyer.experienceYears != null
                      ? lawyer.experienceYears
                      : "—"}
                  </p>

                  <p className="text-xs text-slate-400">
                    Years experience
                  </p>
                </div>

                <div>
                  <p className="font-display text-xl font-semibold text-navy-800">
                    {lawyer.fee != null
                      ? formatCurrency(
                          lawyer.fee,
                          lawyer.currency || "BDT"
                        )
                      : "Not specified"}
                  </p>

                  <p className="text-xs text-slate-400">
                    Per appointment
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Timings, services and experience */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-ink">
                  Timings
                </h3>

                <Badge
                  tone={
                    lawyer.status === "open"
                      ? "pine"
                      : lawyer.status === "closed"
                      ? "alert"
                      : "slate"
                  }
                >
                  {lawyer.status === "open"
                    ? "Available"
                    : lawyer.status === "closed"
                    ? "Currently unavailable"
                    : "By appointment"}
                </Badge>
              </div>

              <p className="mt-1.5 text-sm text-slate-500">
                {lawyer.availability || "By appointment"}
              </p>

              {/* Services */}
              <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                Services &amp; facilities
              </h3>

              <div className="mt-2.5 flex flex-wrap gap-2">
                {services.length > 0 ? (
                  services.map((service, index) => (
                    <Badge key={index} tone="navy">
                      {service}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No services listed yet.
                  </p>
                )}
              </div>

              {/* Experience */}
              <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                Experience
              </h3>

              {highlights.length > 0 ? (
                <ul className="mt-2.5 space-y-2.5">
                  {highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-sm text-slate-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-700" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-slate-400">
                  No experience highlights listed yet.
                </p>
              )}
            </Card>

            {/* About */}
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                About
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {lawyer.bio || "No biography available yet."}
              </p>
            </Card>

            {/* Feedback */}
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                Feedback
              </h3>

              <div className="mt-3 space-y-4">
                {feedback.length === 0 && (
                  <p className="text-sm text-slate-400">
                    No reviews yet.
                  </p>
                )}

                {feedback.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-line pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-ink">
                        {item.author}
                      </p>

                      <RatingStars
                        rating={item.rating}
                        showValue={false}
                      />
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.comment}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs text-slate-400">
                Client reviews and feedback will be displayed
                here once the review system is available.
              </p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Address and Google Maps */}
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                Address
              </h3>

              {/* Embedded Google Map */}
              {embedUrl && (
                <div className="mt-3 overflow-hidden rounded-md border border-line bg-navy-50">
                  <iframe
                    title={`Map showing ${lawyer.name}'s location`}
                    src={embedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-44 w-full border-0"
                  />
                </div>
              )}

              {/* Address from MongoDB */}
              <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                {lawyer.address ||
                  lawyer.city ||
                  "Not provided"}
              </p>

              {/* Phone from MongoDB */}
              {lawyer.phone && (
                <p className="mt-3 flex items-center gap-2 text-sm font-medium text-ink">
                  <FiPhone className="h-4 w-4 text-slate-400" />
                  {lawyer.phone}
                </p>
              )}

              {/* Google Maps directions */}
              {directionsUrl && (
                <Button
                  as="a"
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="subtle"
                  size="sm"
                  className="mt-4 w-full"
                >
                  <FiNavigation
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Get directions
                </Button>
              )}

              {/* Appointment booking */}
              {isCitizen ? (
                <Button
                  as={Link}
                  to={bookPath}
                  variant="brass"
                  className="mt-5 w-full"
                >
                  <FiCalendar />
                  Book Appointment
                </Button>
              ) : (
                <Button
                  as={Link}
                  to="/login?role=citizen"
                  state={{ from: bookPath }}
                  variant="brass"
                  className="mt-5 w-full"
                  onClick={handlePrimaryCta}
                >
                  <FiCalendar />
                  Request Consultation
                </Button>
              )}

              {/* Save lawyer */}
              {isCitizen && (
                <Button
                  variant="outline"
                  className="mt-2.5 w-full"
                  onClick={toggleSave}
                >
                  <FiHeart
                    className={
                      saved
                        ? "fill-alert-600 text-alert-600"
                        : ""
                    }
                  />

                  {saved
                    ? "Saved to favorites"
                    : "Save lawyer"}
                </Button>
              )}
            </Card>

            {/* Languages */}
            <Card className="p-6">
              <h3 className="font-display text-sm font-semibold text-ink">
                Languages
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                {languages.length > 0 ? (
                  languages.map((language, index) => (
                    <Badge key={index} tone="slate">
                      {language}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No languages listed.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
