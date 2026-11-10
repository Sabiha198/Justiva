import { useState } from "react";
import StepIndicator from "./StepIndicator";
import StepIncident from "./StepIncident";
import StepEvidence from "./StepEvidence";
import StepLocation from "./StepLocation";
import StepSuccess from "./StepSuccess";
import Card from "../ui/Card";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

export default function ReportWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [reportId, setReportId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const toast = useToast();
  const { token } = useAuth();

  const next = async (partial) => {
    const updatedData = { ...data, ...partial };

    setData(updatedData);

    // Step 3 is the final step
    if (step === 3) {
      if (!token) {
        toast.error("Please log in before submitting a report.", {
          title: "Authentication required",
        });
        return;
      }

      try {
        setSubmitting(true);

        const response = await fetch(`${API_URL}/reports`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: updatedData.incidentType,
            title: updatedData.title,
            description: updatedData.description,
            location: updatedData.location,

            // Convert frontend urgency to backend priority
            priority:
              updatedData.urgency === "EMERGENCY"
                ? "High"
                : "Medium",

            // Current UI doesn't have an anonymous checkbox,
            // so reports are anonymous by default.
            anonymous: true,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || result.message || "Failed to submit report"
          );
        }

        setReportId(result.report._id);

        toast.success("Your report has been filed securely.", {
          title: "Submitted",
        });

        setStep(4);
      } catch (error) {
        console.error("Report submission error:", error);

        toast.error(error.message || "Failed to submit report.", {
          title: "Submission failed",
        });
      } finally {
        setSubmitting(false);
      }

      return;
    }

    setStep((s) => Math.min(s + 1, 4));
  };

  const back = () => {
    if (!submitting) {
      setStep((s) => Math.max(s - 1, 1));
    }
  };

  return (
    <Card className="mx-auto max-w-xl p-6 sm:p-8">
      <StepIndicator current={step} />

      {step === 1 && (
        <StepIncident
          data={data}
          onNext={next}
        />
      )}

      {step === 2 && (
        <StepEvidence
          data={data}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 3 && (
        <StepLocation
          data={data}
          onNext={next}
          onBack={back}
          submitting={submitting}
        />
      )}

      {step === 4 && (
        <StepSuccess reportId={reportId} />
      )}
    </Card>
  );
}