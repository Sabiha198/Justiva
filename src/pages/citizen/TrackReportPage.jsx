import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiCheckCircle } from "react-icons/fi";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Input, Label, ErrorText, HelpText } from "../../components/ui/Field";
import EmptyState from "../../components/ui/EmptyState";

import { incidentTypes } from "../../data/crimeReports";
import { formatDateTime } from "../../utils/format";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

const statusTone = {
  Submitted: "slate",
  "Under Review": "navy",
  Investigating: "brass",
  Resolved: "pine",
  Rejected: "slate",
};

const typeLabel = (value) =>
  incidentTypes.find((t) => t.value === value)?.label || value;

export default function TrackReportPage() {
  const { token } = useAuth();

  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    const clean = id.trim();

    if (!clean) {
      setError("Enter a report ID to continue.");
      setReport(null);
      setSearched(false);
      return;
    }

    if (!token) {
      setError("Please log in to track your report.");
      setReport(null);
      setSearched(false);
      return;
    }

    setError("");
    setLoading(true);
    setReport(null);
    setSearched(false);

    try {
      const response = await fetch(`${API_URL}/reports/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to load reports"
        );
      }

      const reports = Array.isArray(data.reports)
        ? data.reports
        : [];

      const found = reports.find(
        (item) =>
          String(item._id).toLowerCase() === clean.toLowerCase()
      );

      if (found) {
        setReport(found);
      }

      setSearched(true);
    } catch (error) {
      console.error("Track report error:", error);

      setError(
        error.message || "Failed to track your report."
      );
    } finally {
      setLoading(false);
    }
  };

  const buildTimeline = (report) => {
    const timeline = [
      {
        label: "Report submitted",
        timestamp: report.createdAt,
        description:
          "Your report was successfully submitted.",
      },
    ];

    if (report.status && report.status !== "Submitted") {
      timeline.push({
        label: report.status,
        timestamp: report.updatedAt || report.createdAt,
        description: `Report status changed to ${report.status}.`,
      });
    }

    return timeline;
  };

  return (
    <div className="container-page py-10 sm:py-14">
      {/* Header */}
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Track Your Report
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter your report ID to see its current status.
        </p>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-start"
        noValidate
      >
        <div className="flex-1">
          <Label htmlFor="reportId">
            Report ID
          </Label>

          <Input
            id="reportId"
            placeholder="Enter your report ID"
            value={id}
            onChange={(e) => {
              setId(e.target.value);

              if (error) {
                setError("");
              }
            }}
            error={error}
            className="font-mono"
          />

          <ErrorText>{error}</ErrorText>

          <HelpText>
            You can find your report ID on the submission confirmation.
          </HelpText>
        </div>

        <Button
          type="submit"
          variant="brass"
          loading={loading}
          className="mt-0 sm:mt-6"
        >
          <FiSearch />
          Track Report
        </Button>
      </form>

      {/* Result */}
      <div className="mx-auto mt-10 max-w-2xl">
        <AnimatePresence mode="wait">
          {/* Report found */}
          {report && (
            <motion.div
              key={report._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card className="p-6 sm:p-8">
                {/* Status + ID */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Report status
                    </p>

                    <Badge
                      tone={statusTone[report.status] || "slate"}
                      className="mt-1.5"
                    >
                      {report.status || "Submitted"}
                    </Badge>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Report ID
                    </p>

                    <p className="mt-1.5 break-all font-mono text-sm text-ink">
                      {report._id}
                    </p>
                  </div>
                </div>

                {/* Report information */}
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {report.title}
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  {typeLabel(report.type)}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {report.description}
                </p>

                {/* Details */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">
                  {[
                    [
                      "Submitted on",
                      report.createdAt
                        ? formatDateTime(report.createdAt)
                        : "—",
                    ],
                    [
                      "Priority",
                      report.priority || "Medium",
                    ],
                    [
                      "Location",
                      report.location || "—",
                    ],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs text-slate-400">
                        {label}
                      </p>

                      <p className="mt-1 text-sm font-medium text-ink">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="mt-6 border-t border-line pt-5">
                  <p className="text-sm font-semibold text-ink">
                    Timeline
                  </p>

                  <ol className="mt-4 space-y-4">
                    {buildTimeline(report).map(
                      (event, i) => (
                        <li
                          key={`${event.label}-${i}`}
                          className="flex gap-3"
                        >
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-navy-800 text-white">
                            <FiCheckCircle className="h-3 w-3" />
                          </span>

                          <div>
                            <p className="text-sm font-medium text-ink">
                              {event.label}
                            </p>

                            <p className="text-xs text-slate-400">
                              {event.timestamp
                                ? formatDateTime(
                                    event.timestamp
                                  )
                                : "—"}
                            </p>

                            <p className="mt-0.5 text-sm text-slate-500">
                              {event.description}
                            </p>
                          </div>
                        </li>
                      )
                    )}
                  </ol>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Nothing found */}
          {searched && !report && !error && (
            <EmptyState
              icon={FiSearch}
              title="No report found"
              description="Double-check the ID and make sure it belongs to your account."
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}