// Per-role sidebar navigation config for the four internal panels.
import {
  FiGrid, FiAlertOctagon, FiFileText, FiSearch, FiBriefcase, FiCalendar,
  FiHeart as FiHeartOutline, FiBookOpen, FiLifeBuoy, FiFolder, FiBell, FiUser, FiSettings,
  FiUserCheck, FiShield, FiUsers, FiMessageSquare, FiStar, FiClipboard,
  FiDatabase, FiActivity, FiFlag, FiTrendingUp, FiSliders,
} from "react-icons/fi";

export const citizenNav = [
  { to: "/citizen/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/citizen/report", label: "Report a Crime", icon: FiAlertOctagon },
  { to: "/citizen/reports", label: "My Reports", icon: FiFileText },
  { to: "/citizen/reports/track", label: "Track Reports", icon: FiSearch },
  { to: "/citizen/lawyers", label: "Find Lawyers", icon: FiBriefcase },
  { to: "/citizen/appointments", label: "My Appointments", icon: FiCalendar },
  { to: "/citizen/saved-lawyers", label: "Saved Lawyers", icon: FiHeartOutline },
  { to: "/citizen/legal-resources", label: "Legal Resources", icon: FiBookOpen },
  { to: "/citizen/ai", label: "AI Legal Assistant", icon: FiMessageSquare },
  { to: "/citizen/support", label: "Support / NGOs", icon: FiLifeBuoy },
  { to: "/citizen/documents", label: "Saved Documents", icon: FiFolder },
  { to: "/citizen/notifications", label: "Notifications", icon: FiBell },
];

export const citizenNavFooter = [
  { to: "/citizen/profile", label: "Profile", icon: FiUser },
  { to: "/citizen/settings", label: "Settings", icon: FiSettings },
];

export const lawyerNav = [
  { to: "/lawyer/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/lawyer/profile", label: "Professional Profile", icon: FiUser },
  { to: "/lawyer/verification", label: "Credential Verification", icon: FiUserCheck },
  { to: "/lawyer/requests", label: "Consultation Requests", icon: FiMessageSquare },
  { to: "/lawyer/appointments", label: "Appointments", icon: FiCalendar },
  { to: "/lawyer/clients", label: "Clients", icon: FiUsers },
  { to: "/lawyer/documents", label: "Case Documents", icon: FiFolder },
  { to: "/lawyer/reviews", label: "Reviews", icon: FiStar },
  { to: "/lawyer/notifications", label: "Notifications", icon: FiBell },
];

export const lawyerNavFooter = [
  { to: "/lawyer/settings", label: "Settings", icon: FiSettings },
];

export const authorityNav = [
  { to: "/authority/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/authority/reports", label: "Reports", icon: FiClipboard },
  { to: "/authority/cases", label: "Case Management", icon: FiFolder },
  { to: "/authority/evidence", label: "Evidence", icon: FiDatabase },
  { to: "/authority/timeline", label: "Case Timeline", icon: FiActivity },
  { to: "/authority/notifications", label: "Notifications", icon: FiBell },
];

export const authorityNavFooter = [
  { to: "/authority/profile", label: "Profile", icon: FiUser },
  { to: "/authority/settings", label: "Settings", icon: FiSettings },
];

export const adminNav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/admin/users", label: "Users", icon: FiUsers },
  { to: "/admin/lawyers", label: "Lawyers", icon: FiBriefcase },
  { to: "/admin/lawyers/verification", label: "Lawyer Verification", icon: FiUserCheck },
  { to: "/admin/authorities", label: "Authorities", icon: FiShield },
  { to: "/admin/organizations", label: "Organizations", icon: FiHeartOutline },
  { to: "/admin/reports", label: "Crime Reports", icon: FiAlertOctagon },
  { to: "/admin/reports/moderation", label: "Report Moderation", icon: FiFlag },
  { to: "/admin/legal-resources", label: "Legal Resources", icon: FiBookOpen },
  { to: "/admin/appointments", label: "Appointments", icon: FiCalendar },
  { to: "/admin/ai-analytics", label: "AI Analytics", icon: FiTrendingUp },
  { to: "/admin/notifications", label: "Notifications", icon: FiBell },
];

export const adminNavFooter = [
  { to: "/admin/settings", label: "Platform Settings", icon: FiSliders },
];
