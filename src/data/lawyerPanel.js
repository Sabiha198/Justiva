// Static mock data for the Lawyer panel — the demo lawyer's clients,
// incoming consultation requests, case documents, and reviews. Keyed
// loosely against the demo lawyer, Adv. Arif Mahmud (lw-001).

export const consultationRequests = [
  { id: "req-101", clientName: "Rafi Ahmed", topic: "Bail application guidance", message: "My cousin was detained last night — need urgent advice on the bail process.", submittedOn: "2026-08-20T08:15:00", urgency: "Urgent", status: "Pending" },
  { id: "req-102", clientName: "Farzana Akter", topic: "Property boundary dispute", message: "Neighbor has built a wall over the boundary line, would like a consultation.", submittedOn: "2026-08-19T14:40:00", urgency: "Normal", status: "Pending" },
  { id: "req-103", clientName: "Tanvir Hasan", topic: "Second opinion on ongoing case", message: "Currently represented but want a second opinion before the next hearing.", submittedOn: "2026-08-17T11:05:00", urgency: "Normal", status: "Accepted" },
  { id: "req-104", clientName: "Sadia Chowdhury", topic: "Document review", message: "Need a lease agreement reviewed before signing.", submittedOn: "2026-08-14T09:00:00", urgency: "Normal", status: "Declined" },
];

export const clients = [
  { id: "cl-01", name: "Shafwat Mahiya", email: "shafwat.m@example.com", city: "Chattogram", activeCases: 1, totalConsultations: 3, lastContact: "2026-08-19", status: "active" },
  { id: "cl-02", name: "Nadia Islam", email: "nadia.islam@example.com", city: "Sylhet", activeCases: 0, totalConsultations: 1, lastContact: "2026-08-19", status: "active" },
  { id: "cl-03", name: "Tanvir Hasan", email: "tanvir.h@example.com", city: "Chattogram", activeCases: 1, totalConsultations: 4, lastContact: "2026-08-17", status: "active" },
  { id: "cl-04", name: "Sadia Chowdhury", email: "sadia.c@example.com", city: "Rajshahi", activeCases: 0, totalConsultations: 1, lastContact: "2026-08-14", status: "past" },
];

export const caseDocuments = [
  { id: "doc-1", name: "Bail_Petition_Draft.pdf", client: "Shafwat Mahiya", category: "Petition", size: "212 KB", uploadedOn: "2026-08-18" },
  { id: "doc-2", name: "Witness_Statement_Scan.pdf", client: "Shafwat Mahiya", category: "Evidence", size: "1.4 MB", uploadedOn: "2026-08-17" },
  { id: "doc-3", name: "Property_Title_Copy.pdf", client: "Tanvir Hasan", category: "Title Deed", size: "890 KB", uploadedOn: "2026-08-12" },
  { id: "doc-4", name: "Lease_Agreement_Review.docx", client: "Sadia Chowdhury", category: "Contract", size: "58 KB", uploadedOn: "2026-08-14" },
  { id: "doc-5", name: "Case_Notes_Aug.pdf", client: "Nadia Islam", category: "Notes", size: "120 KB", uploadedOn: "2026-08-19" },
];

export const lawyerReviews = [
  { id: "rv-1", client: "S. Rahman", rating: 5, comment: "Professional, client-focused, and always responsive.", date: "2026-07-30" },
  { id: "rv-2", client: "A. Karim", rating: 4.5, comment: "Explained every step of the bail process clearly.", date: "2026-07-15" },
  { id: "rv-3", client: "Tanvir Hasan", rating: 5, comment: "Went above and beyond preparing our documents.", date: "2026-06-22" },
  { id: "rv-4", client: "Farzana Akter", rating: 4, comment: "Good advice, slightly slow to respond over messages.", date: "2026-06-02" },
];

export const credentialDocuments = [
  { id: "cred-1", label: "Bar Council Certificate", status: "Verified", uploadedOn: "2026-01-14" },
  { id: "cred-2", label: "Practicing License", status: "Verified", uploadedOn: "2026-01-14" },
  { id: "cred-3", label: "National ID / Passport", status: "Verified", uploadedOn: "2026-01-14" },
  { id: "cred-4", label: "LLM Certificate (optional)", status: "Under Review", uploadedOn: "2026-08-10" },
];
