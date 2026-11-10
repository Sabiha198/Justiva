// Bangladesh legal knowledge that Justiva AI can use.
//
// These are references to official Bangladesh laws.
// The actual legal text should be checked from the
// official BD Laws website before giving legal advice.

const bangladeshLaws = [
  {
    id: "constitution",
    title: "The Constitution of the People's Republic of Bangladesh",
    actNumber: "Constitution",
    topic: "Fundamental rights and constitutional law",

    // Official source
    sourceUrl: "https://bdlaws.minlaw.gov.bd/act-print-367.html",

    keywords: [
  "constitution",
  "constitutional",
  "fundamental rights",
  "human rights",
  "citizen rights",
  "civil rights",
  "basic rights",
  "equality",
  "equal rights",
  "discrimination",
  "freedom",
  "freedom of speech",
  "freedom of expression",
  "freedom of religion",
  "religious freedom",
  "freedom of movement",
  "freedom of assembly",
  "right to life",
  "right to liberty",
  "personal liberty",
  "privacy",
  "right to privacy",
  "right to education",
  "right to property",
  "constitutional protection",
  "unlawful detention",
  "arbitrary arrest",
  "writ petition",
  "habeas corpus",
  "high court",
  "supreme court",
  "article 27",
  "article 31",
  "article 32",
  "article 39",
],

    summary:
      "The Constitution of Bangladesh contains the supreme constitutional framework of the Republic and includes provisions concerning fundamental rights.",
  },

  {
    id: "penal-code",
    title: "The Penal Code, 1860",
    actNumber: "Act No. XLV of 1860",
    topic: "Criminal offences and punishments",

    // Official source
    sourceUrl: "https://bdlaws.minlaw.gov.bd/act-print-11.html",

keywords: [
  "crime",
  "criminal",
  "offence",
  "offense",
  "illegal",
  "punishment",
  "sentence",
  "fine",
  "imprisonment",

  // Theft and property offences
  "theft",
  "steal",
  "stolen",
  "stole",
  "stealing",
  "thief",
  "robbery",
  "robbed",
  "robber",
  "burglary",
  "housebreaking",
  "snatching",
  "pickpocket",
  "pickpocketing",
  "shoplifting",
  "phone stolen",
  "mobile stolen",
  "laptop stolen",
  "money stolen",
  "bike stolen",
  "property stolen",
  "lost property",
  "criminal trespass",
  "trespassing",
  "property damage",
  "vandalism",
  "mischief",

  // Violence
  "assault",
  "attack",
  "attacked",
  "beat",
  "beaten",
  "beating",
  "hit",
  "hitting",
  "hurt",
  "injury",
  "physical violence",
  "physical abuse",
  "fight",
  "fighting",
  "murder",
  "killing",
  "killed",
  "homicide",
  "attempted murder",
  "poisoning",
  "kidnapping",
  "kidnapped",
  "abduction",
  "wrongful confinement",

  // Threats and intimidation
  "threat",
  "threatened",
  "threatening",
  "death threat",
  "intimidation",
  "criminal intimidation",
  "blackmail",
  "extortion",
  "forced to pay",

  // Fraud and dishonesty
  "fraud",
  "fraudulent",
  "cheating",
  "cheated",
  "scam",
  "scammed",
  "deception",
  "forgery",
  "forged signature",
  "fake document",
  "counterfeit",
  "breach of trust",
  "embezzlement",
  "dishonest",

  // Reputation and other offences
  "defamation",
  "defamed",
  "false accusation",
  "false allegation",
  "insult",
  "criminal conspiracy",
  "abetment",
],

    summary:
      "The Penal Code, 1860 provides the general criminal code applicable throughout Bangladesh and defines many offences and their punishments.",
  },

  {
    id: "criminal-procedure",
    title: "The Code of Criminal Procedure, 1898",
    actNumber: "Act No. V of 1898",
    topic: "Criminal procedure",

    // Official source
    sourceUrl: "https://bdlaws.minlaw.gov.bd/act-print-75.html",

    keywords: [
  "criminal procedure",
  "criminal case",
  "criminal court",
  "criminal justice",
  "legal procedure",

  // Police
  "police",
  "police station",
  "thana",
  "officer",
  "investigation",
  "investigate",
  "investigating",
  "investigator",
  "fir",
  "first information report",
  "gd",
  "general diary",
  "police report",
  "charge sheet",
  "chargesheet",
  "final report",

  // Arrest and detention
  "arrest",
  "arrested",
  "arresting",
  "detained",
  "detention",
  "custody",
  "police custody",
  "remand",
  "warrant",
  "arrest warrant",
  "arrest without warrant",
  "illegal arrest",
  "taken by police",

  // Bail
  "bail",
  "bailable",
  "non bailable",
  "non-bailable",
  "bail application",
  "bail hearing",
  "bail rejected",
  "get bail",
  "release from custody",
  "surety",
  "bond",

  // Court procedure
  "magistrate",
  "judge",
  "court",
  "trial",
  "hearing",
  "court hearing",
  "court date",
  "court summons",
  "summons",
  "notice",
  "complaint",
  "file a case",
  "filing a case",
  "case filing",
  "case status",
  "case investigation",
  "prosecution",
  "accused",
  "defendant",
  "charge",
  "charges",
  "cognizable",
  "non cognizable",
  "non-cognizable",
  "appeal",
  "revision",
  "acquittal",
  "conviction",
  "criminal judgment",
  "criminal order",
],
    summary:
      "The Code of Criminal Procedure, 1898 contains procedural rules relating to criminal matters, including investigation, inquiry and trial.",
  },

  {
    id: "evidence-act",
    title: "The Evidence Act, 1872",
    actNumber: "Act No. I of 1872",
    topic: "Evidence and judicial proceedings",

    // Official source
    sourceUrl: "https://bdlaws.minlaw.gov.bd/act-print-24.html",

    keywords: [
  "evidence",
  "proof",
  "prove",
  "proving",
  "burden of proof",
  "witness",
  "witnesses",
  "eyewitness",
  "testimony",
  "statement",
  "confession",
  "admission",
  "cross examination",
  "cross-examination",
  "judicial proceeding",

  // Documents
  "document",
  "documents",
  "documentary evidence",
  "written evidence",
  "certificate",
  "contract document",
  "signature",
  "handwriting",
  "original document",
  "certified copy",
  "fake evidence",

  // Digital evidence
  "digital evidence",
  "electronic evidence",
  "electronic record",
  "screenshot",
  "screenshots",
  "chat history",
  "chat messages",
  "text messages",
  "sms",
  "email evidence",
  "whatsapp messages",
  "facebook messages",
  "call recording",
  "voice recording",
  "audio recording",
  "video recording",
  "cctv",
  "cctv footage",
  "camera footage",
  "photo evidence",
  "photograph",
  "mobile data",

  // Court evidence
  "court evidence",
  "admissible",
  "admissibility",
  "relevant facts",
  "relevance",
  "oral evidence",
  "direct evidence",
  "circumstantial evidence",
  "expert opinion",
  "expert witness",
  "forensic evidence",
  "medical report",
  "postmortem report",
  "dna evidence",
],

    summary:
      "The Evidence Act, 1872 contains rules concerning evidence and its use in judicial proceedings in Bangladesh.",
  },
];

// Find laws related to the user's question.
const findRelevantLaws = (question) => {
  // Convert input into lowercase text.
  const text = String(question || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

  // Check all laws.
  return bangladeshLaws.filter((law) => {
    // Return true if at least one keyword matches.
    return law.keywords.some((keyword) => {
      const cleanedKeyword = keyword
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, " ")
        .trim();

      // Add spaces to match whole words or phrases.
      return (` ${text} `).includes(` ${cleanedKeyword} `);
    });
  });
};

module.exports = {
  bangladeshLaws,
  findRelevantLaws,
};