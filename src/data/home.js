// Content for the triathlon homepage, in the order it appears on the page.

export const nextRace = {
  title: "IRONMAN 70.3 Florida",
  place: "Haines City, Florida",
  date: "Dec 13, 2026",
  // Race-morning start time. The countdown and the runner use this.
  start: "2026-12-13T07:00:00-05:00",
  url: "https://www.ironman.com/races/im703-florida",
};

// TODO: where the runner's track begins. Set this to the day you started training
// (or whatever day you want "zero" to be). The runner's spot is the share of the
// time between this date and race day that has already passed.
export const journeyStart = "2026-09-01T00:00:00-05:00";

// Fallback link for the Top Reels cards until each one has its own URL.
export const REELS_PAGE_URL = "https://www.instagram.com/mattli._/reels/";

// TODO: these three are stand-ins, taken from the old Partnerships section.
// Swap in your actual top Reels. For each one:
//   title / blurb: what the card says
//   thumb: image in public/photos, no extension needed (jpg, png, webp all work)
//   url: the Reel's own link. Leave it empty to link to your Reels tab.
//   stats: copy these from Instagram Insights, as text ("12.4K", "8.2%").
//          Anything left empty shows "--" on the card.
export const topContent = [
  {
    title: "Triathlon video",
    blurb: "Where it all started.",
    thumb: "/photos/reel-triathlon",
    url: "",
    stats: { views: "", engagement: "", likes: "", comments: "" },
  },
  {
    title: "COROS Pace 4 demo",
    blurb: "Unboxing the watch and what you can use it for.",
    thumb: "/photos/reel-coros",
    url: "",
    stats: { views: "", engagement: "", likes: "", comments: "" },
  },
  {
    title: "Action camera demo",
    blurb: "Unboxing a camera and the gear that goes with it.",
    thumb: "/photos/reel-camera",
    url: "",
    stats: { views: "", engagement: "", likes: "", comments: "" },
  },
];

// Text only on purpose, no logos.
export const gear = [
  "COROS Pace 4",
  "ASICS shoes and apparel",
  "Trek gear",
  "Cannondale road bike",
  "XTERRA wetsuit",
  "Nutrition from The Feed",
];

export const offers = [
  "Reels",
  "Stories",
  "Honest gear reviews",
  "Race-week coverage",
  "Affiliate partnerships",
];

export const raceCalendar = [
  { when: "Sept 2026", name: "Brett Robinson Alabama Gulf Coastal Sprint Triathlon", status: "Done" },
  {
    when: nextRace.date,
    name: nextRace.title,
    place: nextRace.place,
    url: nextRace.url,
  },
];
