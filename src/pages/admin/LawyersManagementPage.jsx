
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiCheckCircle, FiEye } from "react-icons/fi";

import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Field";
import { formatCurrency } from "../../utils/format";
import API_URL from "../../config/api";

export default function LawyersManagementPage() {
  const [query, setQuery] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadLawyers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/admin/lawyers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load lawyers");
        }

        const data = await response.json();
        setLawyers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Admin lawyers:", err);
          setError("Unable to load lawyers.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadLawyers();
    return () => controller.abort();
  }, []);

  const filtered = lawyers.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.city.toLowerCase().includes(query.toLowerCase())
  );

  const columns = [
    {
      key: "name",
      header: "Lawyer",
      render: (l) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-xs font-semibold text-white">
            {l.initials}
          </div>
          <div>
            <p className="font-medium text-ink">{l.name}</p>
            <p className="text-xs text-slate-400">{l.title}</p>
          </div>
        </div>
      ),
    },
    { key: "city", header: "City" },
    {
      key: "experienceYears",
      header: "Experience",
      render: (l) => `${l.experienceYears} yrs`,
    },
    {
      key: "fee",
      header: "Fee",
      render: (l) => formatCurrency(l.fee, l.currency),
    },
    {
      key: "rating",
      header: "Rating",
      render: (l) =>
        typeof l.rating === "number"
          ? `★ ${l.rating.toFixed(1)}`
          : "—",
    },
    {
      key: "verified",
      header: "Status",
      render: (l) =>
        l.verified ? (
          <Badge tone="pine">
            <FiCheckCircle className="h-3 w-3" /> Verified
          </Badge>
        ) : (
          <Badge tone="brass">Pending</Badge>
        ),
    },
  ];

  return (
    <div className="container-page py-8">
      <PageHeader
        title="Lawyers"
        subtitle="Every lawyer listed on the platform."
        actions={
          <Button
            as={Link}
            to="/admin/lawyers/verification"
            variant="outline"
          >
            <FiEye /> Verification queue
          </Button>
        }
      />

      <div className="relative mt-5 max-w-sm">
        <FiSearch className="pointer-events-none absolute left-3.5 -translate-y-1/2 top-1/2 text-slate-300" />
        <Input
          className="pl-10"
          placeholder="Search by name or city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && (
        <p className="mt-5 text-sm text-slate-500">
          Loading lawyers...
        </p>
      )}

      {error && (
        <p className="mt-5 text-sm text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="mt-5">
          <DataTable columns={columns} rows={filtered} />
        </div>
      )}
    </div>
  );
}
