// Static content for the "Know Your Rights" legal resources section.
// Presented as short guides civilians can read before filing a report
// or speaking with a lawyer.

export const rightsGuides = [
  {
    slug: "arrest-rights",
    title: "Your Rights If You Are Arrested",
    category: "Criminal Law",
    readTime: "4 min read",
    summary: "What officers must tell you, what you can refuse, and how to contact a lawyer immediately.",
    points: [
      "You have the right to know the reason for your arrest at the time it happens.",
      "You are entitled to inform a family member or lawyer of your whereabouts.",
      "You cannot be held beyond the legal detention window without being presented before a magistrate.",
      "Anything you say can be used later — you may choose to stay silent until counsel arrives.",
    ],
  },
  {
    slug: "filing-a-report",
    title: "How to File a Police Report the Right Way",
    category: "Crime Reporting",
    readTime: "5 min read",
    summary: "A step-by-step overview of what to include so your report is taken seriously and acted on quickly.",
    points: [
      "Note the date, time, and exact location of the incident as precisely as possible.",
      "Photograph or preserve any physical evidence before it can be disturbed.",
      "Ask for a copy of the First Information Report (FIR) or your digital report ID.",
      "Follow up using your report ID if you don't hear back within the stated review window.",
    ],
  },
  {
    slug: "tenant-rights",
    title: "Tenant Rights During a Dispute",
    category: "Property Law",
    readTime: "6 min read",
    summary: "What a landlord can and cannot do, and how to respond to an eviction notice.",
    points: [
      "A landlord generally cannot shut off utilities or change locks without a court order.",
      "You are entitled to written notice within the legally required time frame before eviction.",
      "Keep all rent receipts and written communication — they matter if the dispute goes to court.",
      "Mediation is often faster and cheaper than litigation for minor lease disagreements.",
    ],
  },
  {
    slug: "domestic-safety",
    title: "Getting a Protection Order",
    category: "Family Law",
    readTime: "5 min read",
    summary: "How protection orders work, who can apply, and what happens after filing.",
    points: [
      "Protection orders can be requested regardless of whether a criminal case has been filed.",
      "Emergency orders can often be issued within 24 hours in urgent situations.",
      "A violation of an active protection order is a separate, punishable offense.",
      "Support workers can accompany you to filings and hearings if you request it.",
    ],
  },
  {
    slug: "workplace-harassment",
    title: "Reporting Workplace Harassment",
    category: "Civil Rights",
    readTime: "4 min read",
    summary: "Internal complaint channels, external escalation, and documentation tips.",
    points: [
      "Most employers are required to maintain an internal complaints committee.",
      "You can escalate externally if the internal process stalls beyond the required timeline.",
      "Keep dated records — messages, emails, and witness names strengthen a complaint.",
      "Retaliation for filing a good-faith complaint is itself independently actionable.",
    ],
  },
  {
    slug: "cybercrime-basics",
    title: "What Counts as Cybercrime",
    category: "Security Law",
    readTime: "3 min read",
    summary: "Common examples and where to report online fraud, harassment, or data breaches.",
    points: [
      "Phishing, identity theft, and non-consensual image sharing are all reportable offenses.",
      "Screenshot evidence before accounts or messages can be deleted by the other party.",
      "Report to your platform first, then file with the cyber crime cell for formal action.",
      "Banks generally require a police report to process disputed fraudulent transactions.",
    ],
  },
];

export const getGuideBySlug = (slug) => rightsGuides.find((g) => g.slug === slug);
