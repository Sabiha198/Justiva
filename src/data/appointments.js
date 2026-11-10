// Static mock data for the appointment-booking flow.

export const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
];

export const visitReasons = [
  "First-time consultation",
  "Ongoing case follow-up",
  "Document review",
  "Bail / urgent matter",
  "Second opinion",
];

// A couple of upcoming appointments shown on the dashboard, purely for
// demonstration — created fresh each session, never persisted.
export const sampleUpcomingAppointments = [
  {
    id: "apt-seed-1",
    lawyerName: "Adv. Shirin Akter",
    reason: "Ongoing case follow-up",
    date: "Fri, 21 Aug",
    time: "11:00 AM",
    mode: "In-person",
  },
];

// Fuller appointment list covering every status, used by both the
// Citizen "My Appointments" and Lawyer "Appointments" panels.
export const appointments = [
  { id: "APT-7F2K91QZ", lawyerId: "lw-003", lawyerName: "Adv. Samira Chowdhury", clientName: "Shafwat Mahiya", reason: "Ongoing case follow-up", date: "2026-08-21", time: "11:00 AM", mode: "In-person", status: "Upcoming", fee: 900 },
  { id: "APT-3M9BQX7T", lawyerId: "lw-001", lawyerName: "Adv. Arif Mahmud", clientName: "Shafwat Mahiya", reason: "Bail / urgent matter", date: "2026-08-25", time: "3:00 PM", mode: "Video call", status: "Pending", fee: 1000 },
  { id: "APT-9QD4RN2C", lawyerId: "lw-006", lawyerName: "Adv. Shirin Akter", clientName: "Shafwat Mahiya", reason: "First-time consultation", date: "2026-07-30", time: "10:00 AM", mode: "In-person", status: "Completed", fee: 700 },
  { id: "APT-2XV8HT5L", lawyerId: "lw-005", lawyerName: "Adv. Imran Hossain", clientName: "Shafwat Mahiya", reason: "Document review", date: "2026-07-12", time: "2:30 PM", mode: "Video call", status: "Cancelled", fee: 1500 },
  { id: "APT-6PL0WJ3F", lawyerId: "lw-002", lawyerName: "Adv. Rezaul Karim", clientName: "Rafi Ahmed", reason: "Second opinion", date: "2026-08-22", time: "4:00 PM", mode: "In-person", status: "Pending", fee: 1200 },
  { id: "APT-4KD7ZC1M", lawyerId: "lw-003", lawyerName: "Adv. Samira Chowdhury", clientName: "Nadia Islam", reason: "First-time consultation", date: "2026-08-19", time: "10:30 AM", mode: "In-person", status: "Completed", fee: 900 },
];

export const appointmentStatuses = ["Upcoming", "Pending", "Completed", "Cancelled"];

export const generateAppointmentId = () => {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 8; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `APT-${suffix}`;
};
