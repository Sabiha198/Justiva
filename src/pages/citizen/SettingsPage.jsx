import SettingsPanel from "../../components/account/SettingsPanel";

const groups = [
  {
    label: "Notifications",
    items: [
      { label: "Report status updates", desc: "Get notified when one of your reports changes status.", checked: true },
      { label: "Appointment reminders", desc: "Reminders before scheduled lawyer consultations.", checked: true },
      { label: "AI Assistant follow-ups", desc: "Occasional check-ins on saved AI conversations.", checked: false },
    ],
  },
  {
    label: "Privacy",
    items: [
      { label: "File reports anonymously by default", desc: "Pre-select anonymous submission on new reports.", checked: true },
      { label: "Show profile to lawyers I contact", desc: "Let lawyers see your name and city when you request a consultation.", checked: true },
    ],
  },
];

export default function SettingsPage() {
  return <SettingsPanel title="Settings" groups={groups} />;
}
