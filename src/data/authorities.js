// Static mock data for authority / case-officer accounts (Admin panel
// management view, and the demo Authority profile).

export const authorities = [
  { id: "auth-001", name: "Officer R. Chowdhury", badge: "PC-4471", department: "Metropolitan Police — Property Crime Unit", city: "Chattogram", casesAssigned: 12, status: "active" },
  { id: "auth-002", name: "Officer M. Sultana", badge: "PC-2290", department: "Women & Child Protection Desk", city: "Dhaka", casesAssigned: 9, status: "active" },
  { id: "auth-003", name: "Officer K. Rahman", badge: "PC-5581", department: "Cyber Crime Investigation Cell", city: "Dhaka", casesAssigned: 7, status: "active" },
  { id: "auth-004", name: "Officer A. Haque", badge: "PC-3312", department: "Fire & Civil Defence Authority", city: "Sylhet", casesAssigned: 4, status: "pending" },
  { id: "auth-005", name: "Officer S. Nasrin", badge: "PC-6650", department: "General Complaints Desk", city: "Chattogram", casesAssigned: 15, status: "active" },
];

export const currentAuthority = authorities[0];
