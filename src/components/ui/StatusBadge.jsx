import Badge from "./Badge";

// Central status → tone mapping so a given status word always reads
// the same color everywhere in the app (citizen, authority, admin).
const toneMap = {
  // report / case lifecycle
  submitted: "slate",
  "under review": "navy",
  assigned: "navy",
  investigating: "brass",
  investigation: "brass",
  "additional information required": "alert",
  resolved: "pine",
  closed: "slate",
  // appointments
  pending: "brass",
  upcoming: "navy",
  completed: "pine",
  cancelled: "alert",
  confirmed: "pine",
  // verification
  verified: "pine",
  rejected: "alert",
  // users / accounts
  active: "pine",
  inactive: "slate",
  suspended: "alert",
  // moderation
  flagged: "alert",
  approved: "pine",
  open: "pine",
  "closed today": "alert",
};

export default function StatusBadge({ status, className }) {
  const tone = toneMap[String(status).toLowerCase()] || "slate";
  return (
    <Badge tone={tone} className={className}>
      {status}
    </Badge>
  );
}
