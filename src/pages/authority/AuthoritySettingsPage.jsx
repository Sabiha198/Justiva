import SettingsPanel from "../../components/account/SettingsPanel";

const groups = [
  {
    label: "Notifications",
    items: [
      { label: "New report alerts", desc: "Get notified when a new report needs triage.", checked: true },
      { label: "Case escalations", desc: "Alerts when a case severity is raised.", checked: true },
      { label: "Evidence uploads", desc: "Notify when new evidence is added to your cases.", checked: false },
    ],
  },
];

export default function AuthoritySettingsPage() {
  return <SettingsPanel title="Settings" groups={groups} />;
}
