import { Link } from "react-router-dom";
import { FiPlus, FiSearch, FiEye } from "react-icons/fi";
import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";

import { incidentTypes } from "../../data/crimeReports";
import { formatDateTime } from "../../utils/format";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

const typeLabel = (value) =>
  incidentTypes.find((t) => t.value === value)?.label || value;

export default function MyReportsPage() {
  const { token } = useAuth();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyReports = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/reports/my`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load reports");
        }

        setReports(data.reports);
      } catch (error) {
        console.error("Failed to load reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReports();
  }, [token]);

  if (loading) {
    return (
      <div className="container-page py-8">
        <p className="text-sm text-slate-500">
          Loading your reports...
        </p>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <PageHeader
        title="My Reports"
        subtitle="Every report you've filed, with its live status."
        actions={
          <Button
            as={Link}
            to="/citizen/report/new"
            variant="brass"
          >
            <FiPlus /> New report
          </Button>
        }
      />

      {reports.length === 0 ? (
        <EmptyState
          icon={FiSearch}
          title="No reports yet"
          description="Reports you file will show up here."
          className="mt-8"
        />
      ) : (
        <div className="mt-6 space-y-3">
          {reports.map((r) => (
            <Card
              key={r._id}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-xs text-slate-400">
                    {r._id}
                  </p>

                  <StatusBadge status={r.status} />

                  {r.anonymous && (
                    <span className="text-xs text-slate-400">
                      · Filed anonymously
                    </span>
                  )}
                </div>

                <p className="mt-1.5 font-semibold text-ink">
                  {r.title}
                </p>

                <p className="mt-0.5 text-sm text-slate-500">
                  {typeLabel(r.type)} · {r.location} ·{" "}
                  {formatDateTime(r.createdAt)}
                </p>
              </div>

              <Button
                as={Link}
                to="/citizen/reports/track"
                variant="outline"
                size="sm"
                className="shrink-0"
              >
                <FiEye /> Track status
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}