// Reports filed by the demo citizen (Shafwat Mahiya), used by the
// Citizen "My Reports" panel and dashboard. Distinct from
// crimeReports.js's `seededReports`, which is keyed for the public
// Track Report lookup and includes reports filed by other people.

export const myReports = [
  {
    reportId: "JST-24A1F9",
    type: "theft",
    title: "Bicycle theft near Central Market",
    location: "Central Market, Station Road",
    status: "Investigating",
    submittedOn: "2026-08-02T18:45:00",
    priority: "High",
    anonymous: false,
  },
  {
    reportId: "JST-77AA11",
    type: "cybercrime",
    title: "Suspicious login attempts on email",
    location: "Remote / Online",
    status: "Under Review",
    submittedOn: "2026-08-18T09:30:00",
    priority: "Medium",
    anonymous: true,
  },
  {
    reportId: "JST-40C2E8",
    type: "other",
    title: "Noise complaint — repeated late-night disturbance",
    location: "Agrabad Residential Area",
    status: "Resolved",
    submittedOn: "2026-06-28T22:10:00",
    priority: "Low",
    anonymous: false,
  },
];
