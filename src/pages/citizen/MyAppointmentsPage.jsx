import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiRefreshCw,
  FiXCircle,
} from "react-icons/fi";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import Tabs from "../../components/ui/Tabs";
import EmptyState from "../../components/ui/EmptyState";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Modal from "../../components/ui/Modal";
import { Select, Label } from "../../components/ui/Field";

import { timeSlots } from "../../data/appointments";

import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

const tabs = [
  { value: "Pending", label: "Pending" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

export default function MyAppointmentsPage() {
  const { token } = useAuth();
  const toast = useToast();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState("Pending");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/appointments/my`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.message || "Failed to load appointments"
          );
        }

        setAppointments(data.appointments || []);
      } catch (error) {
        console.error("Failed to load appointments:", error);

        toast.error(error.message || "Failed to load appointments.", {
          title: "Error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token, toast]);

  const counts = tabs.reduce((acc, tab) => {
    acc[tab.value] = appointments.filter(
      (appointment) => appointment.status === tab.value
    ).length;

    return acc;
  }, {});

  const filtered = appointments.filter(
    (appointment) => appointment.status === active
  );

const cancelAppointment = async () => {
  if (!cancelTarget) return;

  try {
    const response = await fetch(
      `${API_URL}/appointments/${cancelTarget._id}/cancel`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.message || "Failed to cancel appointment"
      );
    }

    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment._id === cancelTarget._id
          ? data.appointment
          : appointment
      )
    );

    toast.success("Appointment cancelled successfully.", {
      title: "Cancelled",
    });

    setCancelTarget(null);
  } catch (error) {
    console.error("Cancel appointment error:", error);

    toast.error(
      error.message || "Failed to cancel appointment.",
      {
        title: "Cancellation failed",
      }
    );
  }
};

const confirmReschedule = async () => {
  if (!rescheduleTarget || !newTime) return;

  try {
    const response = await fetch(
      `${API_URL}/appointments/${rescheduleTarget._id}/reschedule`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          time: newTime,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.message || "Failed to reschedule appointment"
      );
    }

    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment._id === rescheduleTarget._id
          ? data.appointment
          : appointment
      )
    );

    toast.success("Appointment rescheduled successfully.", {
      title: "Rescheduled",
    });

    setRescheduleTarget(null);
    setNewTime("");
  } catch (error) {
    console.error("Reschedule appointment error:", error);

    toast.error(
      error.message || "Failed to reschedule appointment.",
      {
        title: "Reschedule failed",
      }
    );
  }
};

  if (loading) {
    return (
      <div className="container-page py-8">
        <p className="text-sm text-slate-500">
          Loading your appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <PageHeader
        title="My Appointments"
        subtitle="Manage upcoming, pending, and past consultations."
        actions={
          <Button as={Link} to="/citizen/lawyers" variant="brass">
            Book new appointment
          </Button>
        }
      />

      <div className="mt-6">
        <Tabs
          tabs={tabs}
          active={active}
          onChange={setActive}
          counts={counts}
        />
      </div>

      <div className="mt-5 space-y-3">
        {filtered.length === 0 && (
          <EmptyState
            icon={FiCalendar}
            title={`No ${active.toLowerCase()} appointments`}
            description="Appointments in this category will appear here."
          />
        )}

        {filtered.map((appointment) => (
          <Card
            key={appointment._id}
            className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-mono text-xs text-slate-400">
                  {appointment._id}
                </p>

                <StatusBadge status={appointment.status} />
              </div>

              <p className="mt-1.5 font-semibold text-ink">
                {appointment.lawyerName}
              </p>

              <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <FiCalendar className="h-3.5 w-3.5" />
                  {appointment.date}
                </span>

                <span className="flex items-center gap-1">
                  <FiClock className="h-3.5 w-3.5" />
                  {appointment.time}
                </span>
              </p>

              <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                <FiMapPin className="h-3.5 w-3.5" />
                Lawyer consultation
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                {appointment.purpose}
              </p>
            </div>

            {(appointment.status === "Confirmed" ||
              appointment.status === "Pending") && (
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRescheduleTarget(appointment)}
                >
                  <FiRefreshCw />
                  Reschedule
                </Button>

                <Button
                  variant="subtle"
                  size="sm"
                  onClick={() => setCancelTarget(appointment)}
                >
                  <FiXCircle />
                  Cancel
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      <ConfirmDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={cancelAppointment}
        title="Cancel appointment"
        description={`Cancel your appointment with ${cancelTarget?.lawyerName}?`}
        confirmLabel="Cancel appointment"
        tone="danger"
      />

      <Modal
        open={!!rescheduleTarget}
        onClose={() => setRescheduleTarget(null)}
        title="Reschedule appointment"
        maxWidth="max-w-sm"
      >
        <p className="text-sm text-slate-500">
          Pick a new time for your appointment with{" "}
          {rescheduleTarget?.lawyerName}.
        </p>

        <div className="mt-4">
          <Label htmlFor="newTime">New time</Label>

          <Select
            id="newTime"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          >
            <option value="">Select a time</option>

            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
        </div>

        <Button
          variant="brass"
          className="mt-5 w-full"
          onClick={confirmReschedule}
          disabled={!newTime}
        >
          Send reschedule request
        </Button>
      </Modal>
    </div>
  );
}