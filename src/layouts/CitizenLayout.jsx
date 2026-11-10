import PanelLayout from "./PanelLayout";
import { citizenNav, citizenNavFooter } from "../routes/navConfig";
import { ROLES } from "../context/RoleContext";

const titleMap = {
  "/citizen/dashboard": "Dashboard",
  "/citizen/report": "Report a Crime",
  "/citizen/report/new": "Submit a Report",
  "/citizen/reports": "My Reports",
  "/citizen/reports/track": "Track Reports",
  "/citizen/lawyers": "Find Lawyers",
  "/citizen/appointments": "My Appointments",
  "/citizen/saved-lawyers": "Saved Lawyers",
  "/citizen/legal-resources": "Legal Resources",
  "/citizen/ai": "AI Legal Assistant",
  "/citizen/support": "Support / NGOs",
  "/citizen/documents": "Saved Documents",
  "/citizen/notifications": "Notifications",
  "/citizen/profile": "Profile",
  "/citizen/settings": "Settings",
};

export default function CitizenLayout() {
  return (
    <PanelLayout
      requiredRole={ROLES.CITIZEN}
      items={citizenNav}
      footerItems={citizenNavFooter}
      titleMap={titleMap}
      notificationsPath="/citizen/notifications"
    />
  );
}
