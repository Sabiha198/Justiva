// Static mock data driving the crime-reporting flow: report types,
// department routing, and a small set of pre-seeded reports so the
// "Track Report" search has something believable to find.

export const incidentTypes = [
  { value: "theft", label: "Theft / Robbery" },
  { value: "assault", label: "Assault / Harassment" },
  { value: "fire", label: "Fire Outbreak" },
  { value: "medical", label: "Medical Emergency" },
  { value: "cybercrime", label: "Cybercrime" },
  { value: "disaster", label: "Natural Disaster" },
  { value: "domestic", label: "Domestic Violence" },
  { value: "other", label: "Other" },
];

export const priorityByType = {
  theft: "High",
  assault: "Critical",
  fire: "Critical",
  medical: "Critical",
  cybercrime: "Medium",
  disaster: "High",
  domestic: "Critical",
  other: "Medium",
};

export const departmentByType = {
  theft: "Metropolitan Police — Property Crime Unit",
  assault: "Metropolitan Police — Violent Crime Unit",
  fire: "Fire & Civil Defence Authority",
  medical: "Emergency Medical Response",
  cybercrime: "Cyber Crime Investigation Cell",
  disaster: "Disaster Management Authority",
  domestic: "Women & Child Protection Desk",
  other: "General Complaints Desk",
};

export const statusSteps = ["Submitted", "Under Review", "Assigned", "Investigating", "Resolved"];

// Pre-seeded reports keyed by report ID, so the Track Report page can
// demonstrate a realistic lookup without any backend.
export const seededReports = {
  "JST-24A1F9": {
    reportId: "JST-24A1F9",
    type: "theft",
    title: "Bicycle theft near Central Market",
    description:
      "A bicycle was stolen from the rack outside Central Market between 6:30–7:00 PM. Lock was cut with bolt cutters.",
    location: "Central Market, Station Road",
    status: "Investigating",
    submittedOn: "2026-08-02T18:45:00",
    priority: "High",
    department: departmentByType.theft,
    timeline: [
      { label: "Submitted", timestamp: "2026-08-02T18:47:00", description: "Report received and encrypted." },
      { label: "Under Review", timestamp: "2026-08-03T09:12:00", description: "Reviewed by intake officer." },
      { label: "Assigned", timestamp: "2026-08-03T14:30:00", description: "Assigned to Property Crime Unit." },
      { label: "Investigating", timestamp: "2026-08-05T11:00:00", description: "CCTV footage requested from nearby shops." },
    ],
  },
  "JST-88C0B2": {
    reportId: "JST-88C0B2",
    type: "cybercrime",
    title: "Phishing attempt via SMS",
    description: "Received a fraudulent SMS impersonating a bank asking for OTP verification.",
    location: "Remote / Online",
    status: "Resolved",
    submittedOn: "2026-07-18T10:05:00",
    priority: "Medium",
    department: departmentByType.cybercrime,
    timeline: [
      { label: "Submitted", timestamp: "2026-07-18T10:06:00", description: "Report received and encrypted." },
      { label: "Under Review", timestamp: "2026-07-18T15:40:00", description: "Reviewed by intake officer." },
      { label: "Assigned", timestamp: "2026-07-19T09:00:00", description: "Assigned to Cyber Crime Cell." },
      { label: "Investigating", timestamp: "2026-07-21T13:20:00", description: "Number traced and flagged with telecom provider." },
      { label: "Resolved", timestamp: "2026-07-25T16:00:00", description: "Number blocked; advisory issued to reporter." },
    ],
  },
  "JST-5D71E4": {
    reportId: "JST-5D71E4",
    type: "fire",
    title: "Small electrical fire in residential building",
    description: "Smoke reported from a third-floor apartment, suspected electrical short circuit.",
    location: "Green Valley Apartments, Block C",
    status: "Assigned",
    submittedOn: "2026-08-15T21:12:00",
    priority: "Critical",
    department: departmentByType.fire,
    timeline: [
      { label: "Submitted", timestamp: "2026-08-15T21:13:00", description: "Report received and encrypted." },
      { label: "Under Review", timestamp: "2026-08-15T21:20:00", description: "Flagged as urgent, fast-tracked." },
      { label: "Assigned", timestamp: "2026-08-15T21:25:00", description: "Nearest fire unit dispatched." },
    ],
  },
};

// Authority/Admin-facing list of every crime report filed on the
// platform — the intake queue that sits *before* a report becomes a
// case. A report and a case are related but distinct records: a report
// is what a citizen submitted; a case is what an authority opened to
// investigate it. Reports that have been picked up already carry a
// `caseId` link; reports with no `caseId` are still waiting for an
// authority to review them and have not been promoted to a case yet.
export const reports = [
  {
    reportId: "JST-24A1F9",
    type: "theft",
    title: "Bicycle theft near Central Market",
    reporter: "Anonymous",
    location: "Central Market, Station Road",
    priority: "High",
    status: "Investigating",
    submittedOn: "2026-08-02T18:45:00",
    department: departmentByType.theft,
    caseId: "CASE-2026-0142",
  },
  {
    reportId: "JST-5D71E4",
    type: "fire",
    title: "Small electrical fire in residential building",
    reporter: "Md. Kamal Hossain",
    location: "Green Valley Apartments, Block C",
    priority: "Critical",
    status: "Assigned",
    submittedOn: "2026-08-15T21:12:00",
    department: departmentByType.fire,
    caseId: "CASE-2026-0139",
  },
  {
    reportId: "JST-88C0B2",
    type: "cybercrime",
    title: "Phishing attempt via SMS",
    reporter: "Anonymous",
    location: "Remote / Online",
    priority: "Medium",
    status: "Resolved",
    submittedOn: "2026-07-18T10:05:00",
    department: departmentByType.cybercrime,
    caseId: "CASE-2026-0121",
  },
  {
    reportId: "JST-99B4C7",
    type: "domestic",
    title: "Domestic disturbance, request for welfare check",
    reporter: "Anonymous",
    location: "Agrabad Residential Area",
    priority: "Critical",
    status: "Additional Information Required",
    submittedOn: "2026-07-30T08:10:00",
    department: departmentByType.domestic,
    caseId: "CASE-2026-0118",
  },
  {
    reportId: "JST-11FA20",
    type: "other",
    title: "Vandalism at community park",
    reporter: "Nadia Islam",
    location: "Riverside Community Park",
    priority: "Low",
    status: "Closed",
    submittedOn: "2026-06-10T14:00:00",
    department: departmentByType.other,
    caseId: "CASE-2026-0097",
  },
  // Newly filed reports an authority hasn't reviewed yet — no case
  // opened for these, which is exactly what "New reports" should count.
  {
    reportId: "JST-77AA11",
    type: "cybercrime",
    title: "Suspicious login attempts on email",
    reporter: "Anonymous",
    location: "Remote / Online",
    priority: "Medium",
    status: "Under Review",
    submittedOn: "2026-08-18T09:30:00",
    department: departmentByType.cybercrime,
    caseId: null,
  },
  {
    reportId: "JST-63FA02",
    type: "assault",
    title: "Harassment reported outside a market stall",
    reporter: "Anonymous",
    location: "New Market, Chattogram",
    priority: "Critical",
    status: "Submitted",
    submittedOn: "2026-08-27T19:20:00",
    department: departmentByType.assault,
    caseId: null,
  },
];

export const getReportByReportId = (reportId) => reports.find((r) => r.reportId === reportId);

export const generateReportId = () => {
  const chars = "ABCDEF0123456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `JST-${suffix}`;
};
