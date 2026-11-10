// Static mock data for the Admin "Report Moderation" queue — reports
// flagged by citizens or the system as potentially false, abusive, or
// spam, awaiting an admin decision.

export const moderationQueue = [
  { id: "mod-1", reportId: "JST-77AA11", reason: "Reported as possible duplicate", flaggedBy: "System", flaggedOn: "2026-08-19T10:00:00", status: "Pending" },
  { id: "mod-2", reportId: "JST-11FA20", reason: "Citizen flagged as false report", flaggedBy: "Anonymous user", flaggedOn: "2026-08-16T15:20:00", status: "Pending" },
  { id: "mod-3", reportId: "JST-99B4C7", reason: "Contains potentially identifying details", flaggedBy: "System", flaggedOn: "2026-08-14T08:40:00", status: "Reviewed" },
  { id: "mod-4", reportId: "JST-5D71E4", reason: "Spam / promotional content suspected", flaggedBy: "Officer S. Nasrin", flaggedOn: "2026-08-10T12:00:00", status: "Dismissed" },
];
