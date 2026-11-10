// Static mock analytics for the Admin dashboard and AI analytics view.

export const platformStats = {
  totalUsers: 6428,
  totalLawyers: 184,
  totalAuthorities: 42,
  totalReports: 3190,
  activeCases: 214,
  resolvedCases: 2761,
  appointments: 1042,
  verifiedLawyers: 151,
  organizations: 38,
};

export const reportsByCategory = [
  { label: "Theft / Robbery", value: 812 },
  { label: "Cybercrime", value: 604 },
  { label: "Assault / Harassment", value: 431 },
  { label: "Domestic Violence", value: 388 },
  { label: "Fire Outbreak", value: 210 },
  { label: "Disaster", value: 96 },
  { label: "Other", value: 649 },
];

export const reportsByLocation = [
  { label: "Chattogram", value: 1180 },
  { label: "Dhaka", value: 1420 },
  { label: "Sylhet", value: 260 },
  { label: "Khulna", value: 190 },
  { label: "Rajshahi", value: 140 },
];

export const monthlyReports = [
  { month: "Mar", value: 240 }, { month: "Apr", value: 268 }, { month: "May", value: 301 },
  { month: "Jun", value: 287 }, { month: "Jul", value: 332 }, { month: "Aug", value: 298 },
];

export const resolutionRate = [
  { month: "Mar", rate: 78 }, { month: "Apr", rate: 81 }, { month: "May", rate: 83 },
  { month: "Jun", rate: 80 }, { month: "Jul", rate: 86 }, { month: "Aug", rate: 87 },
];

export const userGrowth = [
  { month: "Mar", value: 5120 }, { month: "Apr", value: 5410 }, { month: "May", value: 5680 },
  { month: "Jun", value: 5940 }, { month: "Jul", value: 6190 }, { month: "Aug", value: 6428 },
];

export const reportStatusDistribution = [
  { label: "Submitted", value: 40, tone: "slate" },
  { label: "Under Review", value: 35, tone: "navy" },
  { label: "Assigned", value: 30, tone: "navy" },
  { label: "Investigation", value: 214, tone: "brass" },
  { label: "Additional Info Required", value: 20, tone: "alert" },
  { label: "Resolved", value: 2761, tone: "pine" },
  { label: "Closed", value: 90, tone: "slate" },
];

export const aiAnalytics = {
  totalConversations: 4820,
  avgMessagesPerConvo: 3.4,
  positiveFeedbackRate: 91,
  flaggedResponses: 12,
  topQuestions: [
    { question: "What should I do immediately after a theft?", count: 512 },
    { question: "How do I file a protection order?", count: 388 },
    { question: "What are my rights if I'm arrested?", count: 341 },
    { question: "How long does a cybercrime report take?", count: 276 },
    { question: "Can my landlord evict me without notice?", count: 190 },
  ],
  sourceUsage: [
    { source: "Know Your Rights guides", value: 2340 },
    { source: "Report Crime flow", value: 1120 },
    { source: "NGO directory", value: 640 },
    { source: "Hire a Lawyer", value: 720 },
  ],
};
