import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiAlertOctagon,
  FiBriefcase,
  FiMessageSquare,
  FiHeart,
  FiArrowRight,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";

import { useRole } from "../../context/RoleContext";
import { rightsGuides } from "../../data/legalCases";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

const focusAreas = [
  {
    icon: FiAlertOctagon,
    title: "Report",
    to: "/citizen/report",
    tab: "var(--color-alert-600)",
  },
  {
    icon: FiBriefcase,
    title: "Hire Lawyer",
    to: "/citizen/lawyers",
    tab: "var(--color-navy-700)",
  },
  {
    icon: FiMessageSquare,
    title: "AI Assistant",
    to: "/citizen/ai",
    tab: "var(--color-brass-600)",
  },
  {
    icon: FiHeart,
    title: "NGO Help",
    to: "/citizen/support",
    tab: "var(--color-pine-600)",
  },
];

export default function CitizenDashboardPage() {
  const { user, token } = useAuth();
  const { meta } = useRole();

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const [stats, setStats] = useState({
    totalReports: 0,
    activeReports: 0,
    resolvedReports: 0,
    totalAppointments: 0,
    upcomingAppointments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!token) {
        setLoading(false);
        setAppointmentsLoading(false);
        return;
      }

      try {
        // --------------------------------
        // 1. Load dashboard statistics
        // --------------------------------
        const statsResponse = await fetch(
          `${API_URL}/dashboard/citizen/stats`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const statsData = await statsResponse.json();

        if (!statsResponse.ok) {
          throw new Error(
            statsData.error ||
              statsData.message ||
              "Failed to load dashboard stats"
          );
        }

        setStats(statsData.stats);

        // --------------------------------
        // 2. Load upcoming appointments
        // --------------------------------
        const appointmentsResponse = await fetch(
          `${API_URL}/dashboard/citizen/upcoming-appointments`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const appointmentsData = await appointmentsResponse.json();

        if (!appointmentsResponse.ok) {
          throw new Error(
            appointmentsData.error ||
              appointmentsData.message ||
              "Failed to load upcoming appointments"
          );
        }

        setUpcomingAppointments(
          appointmentsData.appointments || []
        );
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
        setAppointmentsLoading(false);
      }
    };

    loadDashboard();
  }, [token]);

  return (
    <div className="container-page py-8">
      {/* =========================
          HEADER
      ========================== */}
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-slate-500">
            Welcome back,
          </p>

          <h2 className="font-display text-2xl font-semibold text-ink">
            {user?.name || "Citizen"}
          </h2>
        </div>

        <Link
          to="/citizen/profile"
          className="text-sm font-semibold text-navy-800 hover:text-brass-600"
        >
          View profile
        </Link>
      </div>

      {/* =========================
          HIGHLIGHT CARD
      ========================== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 overflow-hidden rounded-xl bg-navy-900 p-6 text-white sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge
              tone="alert"
              className="!border-alert-600/30 !bg-alert-600/20 !text-alert-100"
            >
              Active case
            </Badge>

            <h3 className="mt-3 max-w-md font-display text-xl font-semibold leading-snug">
              Theft near Central Market is currently under investigation
            </h3>

            <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
              <FiClock className="h-4 w-4" />
              Last updated 2 days ago
            </p>
          </div>

          <Button
            as={Link}
            to="/citizen/reports/track"
            variant="brass"
          >
            Track this report
            <FiArrowRight />
          </Button>
        </div>
      </motion.div>

      {/* =========================
          OVERVIEW
      ========================== */}
      <h3 className="mt-10 font-display text-lg font-semibold text-ink">
        Overview
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Total Reports
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            {loading ? "—" : stats.totalReports}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Active Reports
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            {loading ? "—" : stats.activeReports}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Resolved Reports
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            {loading ? "—" : stats.resolvedReports}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Appointments
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            {loading ? "—" : stats.totalAppointments}
          </p>
        </Card>
      </div>

      {/* =========================
          FOCUS AREAS
      ========================== */}
      <h3 className="mt-10 font-display text-lg font-semibold text-ink">
        For you
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {focusAreas.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: i * 0.05,
            }}
          >
            <Link to={f.to}>
              <Card
                tab={f.tab}
                className="flex flex-col items-center gap-3 p-6 text-center transition-shadow hover:shadow-lift"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-navy-800">
                  <f.icon className="h-5 w-5" />
                </div>

                <span className="text-sm font-semibold text-ink">
                  {f.title}
                </span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* =========================
          APPOINTMENTS + RIGHTS
      ========================== */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">

        {/* =========================
            UPCOMING APPOINTMENTS
        ========================== */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink">
              Upcoming appointments
            </h3>

            <Link
              to="/citizen/lawyers"
              className="text-sm font-semibold text-navy-800 hover:text-brass-600"
            >
              Book another
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {appointmentsLoading ? (
              <div className="rounded-lg border border-line px-4 py-5">
                <p className="text-sm text-slate-500">
                  Loading appointments...
                </p>
              </div>
            ) : upcomingAppointments.length === 0 ? (
              <div className="rounded-lg border border-line px-4 py-5 text-center">
                <p className="text-sm font-medium text-ink">
                  No upcoming appointments
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Your upcoming lawyer appointments will appear here.
                </p>

                <Button
                  as={Link}
                  to="/citizen/lawyers"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  Find a lawyer
                </Button>
              </div>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="flex flex-col gap-3 rounded-lg border border-line px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-ink">
                        {appointment.lawyerName}
                      </p>

                      <StatusBadge status={appointment.status} />
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {appointment.purpose}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm font-medium text-navy-800">
                      {appointment.date}
                    </p>

                    <p className="text-xs text-slate-500">
                      {appointment.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {upcomingAppointments.length > 0 && (
            <Button
              as={Link}
              to="/citizen/appointments"
              variant="outline"
              size="sm"
              className="mt-5 w-full"
            >
              View all appointments
            </Button>
          )}
        </Card>

        {/* =========================
            RIGHTS SPOTLIGHT
        ========================== */}
        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold text-ink">
            Know your rights
          </h3>

          <div className="mt-4 space-y-4">
            {rightsGuides.slice(0, 3).map((g) => (
              <Link
                key={g.slug}
                to="/citizen/legal-resources"
                className="group block"
              >
                <p className="text-sm font-semibold text-ink group-hover:text-navy-700">
                  {g.title}
                </p>

                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                  <FiMapPin className="h-3 w-3" />
                  {g.category} · {g.readTime}
                </p>
              </Link>
            ))}
          </div>

          <Button
            as={Link}
            to="/citizen/legal-resources"
            variant="outline"
            size="sm"
            className="mt-5 w-full"
          >
            View all guides
          </Button>
        </Card>
      </div>
    </div>
  );
}