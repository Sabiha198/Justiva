import PanelLayout from "./PanelLayout";
import { adminNav, adminNavFooter } from "../routes/navConfig";
import { ROLES } from "../context/RoleContext";

const titleMap = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/lawyers": "Lawyers",
  "/admin/lawyers/verification": "Lawyer Verification",
  "/admin/authorities": "Authorities",
  "/admin/organizations": "Organizations",
  "/admin/reports": "Crime Reports",
  "/admin/reports/moderation": "Report Moderation",
  "/admin/legal-resources": "Legal Resources",
  "/admin/appointments": "Appointments",
  "/admin/ai-analytics": "AI Analytics",
  "/admin/notifications": "Notifications",
  "/admin/settings": "Platform Settings",
};

export default function AdminLayout() {
  return (
    <PanelLayout
      requiredRole={ROLES.ADMIN}
      items={adminNav}
      footerItems={adminNavFooter}
      titleMap={titleMap}
      notificationsPath="/admin/notifications"
    />
  );
}
