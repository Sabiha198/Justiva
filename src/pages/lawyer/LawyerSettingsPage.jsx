import SettingsPanel from "../../components/account/SettingsPanel";

const groups = [
  {
    label: "Notifications",
    items: [
      { label: "New consultation requests", desc: "Get notified the moment a citizen reaches out.", checked: true },
      { label: "Appointment reminders", desc: "Reminders before scheduled consultations.", checked: true },
      { label: "New reviews", desc: "Get notified when a client leaves feedback.", checked: false },
    ],
  },
  {
    label: "Availability",
    items: [
      { label: "Accept new requests automatically", desc: "Skip manual review for repeat clients.", checked: false },
      { label: "Show profile in public search", desc: "Let citizens discover you without logging in.", checked: true },
    ],
  },
];

export default function LawyerSettingsPage() {
  return <SettingsPanel title="Settings" groups={groups} />;
}
