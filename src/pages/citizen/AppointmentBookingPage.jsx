import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { FiArrowLeft, FiClock } from "react-icons/fi";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import CaseSeal from "../../components/ui/CaseSeal";
import {
  Select,
  Textarea,
  Label,
  ErrorText,
} from "../../components/ui/Field";

import MiniCalendar from "../../components/appointments/MiniCalendar";
import { getLawyerById } from "../../data/lawyers";
import {
  timeSlots,
  visitReasons,
} from "../../data/appointments";

import { formatCurrency, formatDate } from "../../utils/format";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

export default function AppointmentBookingPage() {
  const { id } = useParams();
  const lawyer = getLawyerById(id);

  const { token } = useAuth();
  const toast = useToast();

  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!lawyer) {
    return <Navigate to="/citizen/lawyers" replace />;
  }

  const validate = () => {
    const next = {};

    if (!date) next.date = "Choose a date.";
    if (!time) next.time = "Choose a time slot.";
    if (!reason) next.reason = "Select a reason for the visit.";

    if (!token) {
      next.auth = "Please log in before booking an appointment.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitting(true);

      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lawyerName: lawyer.name,
          date: formatDate(date),
          time,
          purpose: reason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to book appointment"
        );
      }

      setConfirmed({
        id: data.appointment._id,
        date: data.appointment.date,
        time: data.appointment.time,
        reason: data.appointment.purpose,
      });

      toast.success("Your appointment request has been sent.", {
        title: "Appointment booked",
      });
    } catch (error) {
      console.error("Appointment booking error:", error);

      toast.error(
        error.message || "Failed to book appointment.",
        {
          title: "Booking failed",
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center py-14">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex justify-center">
            <CaseSeal size={72} tone="pine" />
          </div>

          <h2 className="mt-5 font-display text-xl font-semibold text-ink">
            Appointment request sent
          </h2>

          <p className="mt-1.5 text-sm text-slate-500">
            With {lawyer.name} on {confirmed.date} at {confirmed.time}.
          </p>

          <div className="mt-5 rounded-lg bg-navy-50 px-4 py-3 text-left text-sm">
            <p className="flex justify-between">
              <span className="text-slate-500">
                Confirmation ID
              </span>

              <span className="font-mono text-ink">
                {confirmed.id}
              </span>
            </p>

            <p className="mt-1.5 flex justify-between">
              <span className="text-slate-500">
                Reason
              </span>

              <span className="text-ink">
                {confirmed.reason}
              </span>
            </p>

            <p className="mt-1.5 flex justify-between">
              <span className="text-slate-500">
                Fee
              </span>

              <span className="text-ink">
                {formatCurrency(
                  lawyer.fee,
                  lawyer.currency
                )}
              </span>
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              as={Link}
              to={`/citizen/lawyers/${lawyer.id}`}
              variant="outline"
              className="flex-1"
            >
              Back to profile
            </Button>

            <Button
              as={Link}
              to="/citizen/appointments"
              variant="brass"
              className="flex-1"
            >
              My appointments
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <Link
        to={`/citizen/lawyers/${lawyer.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-navy-800"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-800 font-display text-sm font-semibold text-white">
          {lawyer.initials}
        </div>

        <div>
          <h1 className="font-display text-xl font-semibold text-ink">
            Book with {lawyer.name}
          </h1>

          <p className="text-sm text-slate-500">
            {lawyer.title}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]"
        noValidate
      >
        <Card className="p-6">
          <Label required>Date</Label>

          <MiniCalendar
            selected={date}
            onSelect={setDate}
          />

          <ErrorText>{errors.date}</ErrorText>

          <div className="mt-5">
            <Label required>Time slot</Label>

            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTime(t)}
                  className={`flex items-center justify-center gap-1.5 rounded-md border px-2 py-2 text-xs font-medium transition-colors ${
                    time === t
                      ? "border-brass-600 bg-brass-100 text-brass-700"
                      : "border-line text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <FiClock className="h-3 w-3" />
                  {t}
                </button>
              ))}
            </div>

            <ErrorText>{errors.time}</ErrorText>
          </div>
        </Card>

        <Card className="flex flex-col p-6">
          <Label htmlFor="reason" required>
            Reason for visit
          </Label>

          <Select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            error={errors.reason}
          >
            <option value="">
              Select a reason
            </option>

            {visitReasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>

          <ErrorText>{errors.reason}</ErrorText>

          <div className="mt-4">
            <Label htmlFor="message">
              Message (optional)
            </Label>

            <Textarea
              id="message"
              rows={5}
              placeholder="Anything the lawyer should know beforehand"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />
          </div>

          {errors.auth && (
            <p className="mt-3 text-sm text-alert-600">
              {errors.auth}
            </p>
          )}

          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between border-t border-line pt-4 text-sm">
              <span className="text-slate-500">
                Consultation fee
              </span>

              <span className="font-semibold text-ink">
                {formatCurrency(
                  lawyer.fee,
                  lawyer.currency
                )}
              </span>
            </div>

            <Button
              type="submit"
              variant="brass"
              className="mt-4 w-full"
              loading={submitting}
            >
              Make an Appointment
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}