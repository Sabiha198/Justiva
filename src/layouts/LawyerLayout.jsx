import PanelLayout from "./PanelLayout";
import { lawyerNav, lawyerNavFooter } from "../routes/navConfig";
import { ROLES } from "../context/RoleContext";

const titleMap = {
  "/lawyer/dashboard": "Dashboard",
  "/lawyer/profile": "Professional Profile",
  "/lawyer/verification": "Credential Verification",
  "/lawyer/requests": "Consultation Requests",
  "/lawyer/appointments": "Appointments",
  "/lawyer/clients": "Clients",
  "/lawyer/documents": "Case Documents",
  "/lawyer/reviews": "Reviews",
  "/lawyer/notifications": "Notifications",
  "/lawyer/settings": "Settings",
};

export default function LawyerLayout() {
  return (
    <PanelLayout
      requiredRole={ROLES.LAWYER}
      items={lawyerNav}
      footerItems={lawyerNavFooter}
      titleMap={titleMap}
      notificationsPath="/lawyer/notifications"
    />
  );
}
