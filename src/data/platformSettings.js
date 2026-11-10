// Default platform settings shown/edited (in memory only) on the
// Admin "Platform Settings" page.

export const crimeCategorySettings = [
  { id: "theft", label: "Theft / Robbery", active: true },
  { id: "assault", label: "Assault / Harassment", active: true },
  { id: "fire", label: "Fire Outbreak", active: true },
  { id: "medical", label: "Medical Emergency", active: true },
  { id: "cybercrime", label: "Cybercrime", active: true },
  { id: "disaster", label: "Natural Disaster", active: true },
  { id: "domestic", label: "Domestic Violence", active: true },
  { id: "other", label: "Other", active: true },
];

export const emergencyContactSettings = [
  { id: "police", label: "Police", number: "999" },
  { id: "fire", label: "Fire Service", number: "199" },
  { id: "ambulance", label: "Ambulance", number: "199" },
  { id: "womenChild", label: "Women & Child Helpline", number: "109" },
  { id: "legalAid", label: "National Legal Aid Helpline", number: "16430" },
];

export const generalPlatformSettings = {
  platformName: "Justiva",
  supportEmail: "support@justiva.app",
  reportReviewWindowHours: 48,
  autoAssignReports: true,
  requireLawyerVerification: true,
  allowAnonymousReports: true,
  maintenanceMode: false,
};
