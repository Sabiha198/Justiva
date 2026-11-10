import PanelLayout from "./PanelLayout";
import { authorityNav, authorityNavFooter } from "../routes/navConfig";
import { ROLES } from "../context/RoleContext";

const titleMap = {
  "/authority/dashboard": "Dashboard",
  "/authority/reports": "Reports",
  "/authority/cases": "Case Management",
  "/authority/evidence": "Evidence",
  "/authority/timeline": "Case Timeline",
  "/authority/notifications": "Notifications",
  "/authority/profile": "Profile",
  "/authority/settings": "Settings",
};

export default function AuthorityLayout() {
  return (
    <PanelLayout
      requiredRole={ROLES.AUTHORITY}
      items={authorityNav}
      footerItems={authorityNavFooter}
      titleMap={titleMap}
      notificationsPath="/authority/notifications"
    />
  );
}
