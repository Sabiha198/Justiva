
export const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest rated" },
  { value: "fee-low", label: "Fee: low to high" },
  { value: "fee-high", label: "Fee: high to low" },
  { value: "experience", label: "Most experienced" },
];

export const feeOptions = [800, 1000, 1200, 1500];

export const defaultFilters = {
  query: "",
  cityKey: "",
  category: "",
  language: "",
  maxFee: "",
  openToday: false,
  sort: "recommended",
};

export function countActiveFilters(f) {
  return [
    f.query.trim(),
    f.cityKey,
    f.category,
    f.language,
    f.maxFee,
    f.openToday,
  ].filter(Boolean).length;
}

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const validNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

// Uses the lawyer list provided by the page, not dummy data.
export function filterLawyers({
  lawyers = [],
  query = "",
  cityLabel = "",
  category = "",
  language = "",
  maxFee = "",
  openToday = false,
  sort = "recommended",
}) {
  const q = String(query).trim().toLowerCase();

  const results = lawyers.filter((lawyer) => {
    const lawyerCategories = Array.isArray(lawyer.categories)
      ? lawyer.categories
      : [];

    const lawyerLanguages = Array.isArray(lawyer.languages)
      ? lawyer.languages
      : [];

    if (
      cityLabel &&
      normalize(lawyer.city) !== normalize(cityLabel)
    ) {
      return false;
    }

    if (
      category &&
      !lawyerCategories.some(
        (item) => normalize(item) === normalize(category)
      )
    ) {
      return false;
    }

    if (
      language &&
      !lawyerLanguages.some(
        (item) => normalize(item) === normalize(language)
      )
    ) {
      return false;
    }

    if (maxFee !== "") {
      const fee = validNumber(lawyer.fee);

      if (fee === null || fee > Number(maxFee)) {
        return false;
      }
    }

    if (openToday && lawyer.status !== "open") {
      return false;
    }

    if (!q) return true;

    return [
      lawyer.name,
      lawyer.title,
      lawyer.city,
      ...lawyerCategories,
    ].some((value) =>
      String(value ?? "").toLowerCase().includes(q)
    );
  });

  const sorted = [...results];

  if (sort === "rating") {
    sorted.sort((a, b) => {
      const aRating = validNumber(a.rating);
      const bRating = validNumber(b.rating);

      if (aRating === null && bRating === null) return 0;
      if (aRating === null) return 1;
      if (bRating === null) return -1;

      return bRating - aRating;
    });
  }

  if (sort === "fee-low" || sort === "fee-high") {
    sorted.sort((a, b) => {
      const aFee = validNumber(a.fee);
      const bFee = validNumber(b.fee);

      if (aFee === null && bFee === null) return 0;
      if (aFee === null) return 1;
      if (bFee === null) return -1;

      return sort === "fee-low"
        ? aFee - bFee
        : bFee - aFee;
    });
  }

  if (sort === "experience") {
    sorted.sort((a, b) => {
      const aYears = validNumber(a.experienceYears);
      const bYears = validNumber(b.experienceYears);

      if (aYears === null && bYears === null) return 0;
      if (aYears === null) return 1;
      if (bYears === null) return -1;

      return bYears - aYears;
    });
  }

  return sorted;
}

export function countLawyersByCity(lawyers = []) {
  return lawyers.reduce((acc, lawyer) => {
    if (lawyer.city) {
      acc[lawyer.city] = (acc[lawyer.city] || 0) + 1;
    }

    return acc;
  }, {});
}

export function getLanguages(lawyers = []) {
  return [
    ...new Set(
      lawyers.flatMap((lawyer) =>
        Array.isArray(lawyer.languages)
          ? lawyer.languages
          : []
      )
    ),
  ].sort();
}
