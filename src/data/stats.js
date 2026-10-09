// Update this file once a month. The homepage Stats and Audience sections
// read everything from here, so nothing else needs to change.
// (Numbers are strings on purpose, so formatting like "101.6K" is exactly
// what shows up on the page.)

export const instagramStats = {
  // Shown as the label above the stat tiles.
  periodLabel: "Instagram, 30 days to Oct 7, 2026",
  followers: { value: "4,281", change: "+4.3%" },
  views: "101.6K",
  accountsReached: "33.8K",
  engagementRate: "15.4%",
  nonFollowerViews: "64.5%",
};

export const audience = {
  ageRange: { value: "80%", label: "aged 18-34" },
  men: { value: "70.8%", label: "men" },
  // Add a `share` when you have the number. Entries without one just show the name.
  topCountries: [
    { name: "United States", share: "36.9%" },
    { name: "India" },
    { name: "United Kingdom" },
    { name: "Canada" },
    { name: "Australia" },
  ],
};
