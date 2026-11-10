// Static mock notifications, scoped per role. Read/unread state is
// handled with React state in the pages that use this data.

export const citizenNotifications = [
  { id: "n-c1", type: "report", title: "Report status updated", body: "Your report JST-24A1F9 moved to Investigation.", time: "2 hours ago", read: false },
  { id: "n-c2", type: "appointment", title: "Appointment confirmed", body: "Adv. Shirin Akter confirmed your appointment for Fri, 21 Aug.", time: "1 day ago", read: false },
  { id: "n-c3", type: "lawyer", title: "New message from your lawyer", body: "Adv. Arif Mahmud replied to your consultation request.", time: "2 days ago", read: true },
  { id: "n-c4", type: "announcement", title: "Platform maintenance notice", body: "Justiva will undergo brief maintenance on Sunday, 2:00–2:30 AM.", time: "4 days ago", read: true },
];

export const lawyerNotifications = [
  { id: "n-l1", type: "request", title: "New consultation request", body: "Rafi Ahmed requested a consultation for a bail matter.", time: "35 minutes ago", read: false },
  { id: "n-l2", type: "appointment", title: "Appointment reminder", body: "You have an appointment with Nadia Islam at 3:00 PM today.", time: "3 hours ago", read: false },
  { id: "n-l3", type: "review", title: "New review received", body: "A client left you a 5-star review.", time: "1 day ago", read: true },
  { id: "n-l4", type: "verification", title: "Credential verification approved", body: "Your bar certificate has been verified.", time: "6 days ago", read: true },
];

export const authorityNotifications = [
  { id: "n-a1", type: "report", title: "New report requires review", body: "Report JST-63FA02 was submitted and awaits triage.", time: "20 minutes ago", read: false },
  { id: "n-a2", type: "case", title: "Case escalated", body: "CASE-2026-0118 flagged as Critical severity.", time: "5 hours ago", read: false },
  { id: "n-a3", type: "evidence", title: "New evidence uploaded", body: "New evidence added to CASE-2026-0142.", time: "1 day ago", read: true },
];

export const adminNotifications = [
  { id: "n-d1", type: "moderation", title: "Report flagged for review", body: "A citizen flagged report JST-77AA11 as potentially false.", time: "1 hour ago", read: false },
  { id: "n-d2", type: "verification", title: "Lawyer verification pending", body: "3 lawyer applications await credential review.", time: "3 hours ago", read: false },
  { id: "n-d3", type: "system", title: "Weekly analytics ready", body: "Your platform analytics summary for last week is ready.", time: "2 days ago", read: true },
];
