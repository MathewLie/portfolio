import { Target, Zap, Megaphone, Package } from "lucide-react";

export const ease = [0.16, 1, 0.3, 1];

export const THEMES = {
  light: {
    bg:          "#fafafa",
    bgAlt:       "#f0f0ee",
    ink:         "#0a0a0a",
    inkMid:      "#525252",
    inkSoft:     "#a3a3a0",
    line:        "#e2e2df",
    invert:      "#0a0a0a",
    invertText:  "#fafafa",
    placeholderBg:   "#e8e8e5",
    placeholderText: "#8f8f8a",
    quoteC:      "#525252",
    footerC:     "#a3a3a0",
    accent:      "#a3672b",
    accentSoft:  "rgba(163,103,43,0.07)",
  },
  dark: {
    bg:          "#0a0a0a",
    bgAlt:       "#141412",
    ink:         "#fafafa",
    inkMid:      "#a3a3a0",
    inkSoft:     "#5c5c58",
    line:        "#262624",
    invert:      "#fafafa",
    invertText:  "#0a0a0a",
    placeholderBg:   "#1b1b18",
    placeholderText: "#6b6b66",
    quoteC:      "#a3a3a0",
    footerC:     "#5c5c58",
    accent:      "#e0a655",
    accentSoft:  "rgba(224,166,85,0.1)",
  },
};

export const RACES = {
  sprint: {
    label: "Next Up",
    name: "Hub City Hustle Triathlon",
    type: "Sprint Triathlon",
    location: "Sumrall, Mississippi",
    date: new Date("2026-10-18T07:00:00-05:00"),
    dateLabel: "Oct 18, 2026",
    link: "https://www.trisignup.com/Race/MS/Oloh/HubCityHustleTriathlon",
  },
  half: {
    label: "The Long Game",
    name: "IRONMAN 70.3",
    type: "Florida",
    location: "Haines City, Florida",
    date: new Date("2026-12-13T07:00:00-05:00"),
    dateLabel: "Dec 13, 2026",
    link: "https://www.ironman.com/races/im703-florida",
  },
};

export const videoData = {
  profdev: [
    { file: "videos/profdev/LinkedInZoom.mp4",    title: "Workplace Tips — Zoom Out",
      views: "25K", impressions: "25K", engagement: "1.5%", likes: "323",
      description: "Tips for interns to succeed in their work environment.",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7349059863555031045/" },
    { file: "videos/profdev/LinkedinSilence.mov", title: "Workplace Tips — Speaking Out",
      views: "3.5K", impressions: "3.5K", engagement: "2.9%", likes: "72",
      description: "Tips for interns to stand out in their work environment.",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7351241773987360769/" },
  ],
  startups: [
    { file: "videos/startups/FavorIt.mp4", title: "FavorIt Carpool Feature Ad",
      views: "84K", impressions: "84K", engagement: "4.8%", likes: "2.6K",
      description: "First ad for FavorIt app, promoting the carpool feature to college students.",
      link: "https://www.instagram.com/myfavoritapp/" },
  ],
};

export const workflowSteps = [
  { step: "01", title: "Strategy", icon: Target,    desc: "Discussing ideas, expectations, and logistics through email or a phone call." },
  { step: "02", title: "Creating", icon: Zap,       desc: "Scripting and editing the first video draft for your review and approval." },
  { step: "03", title: "Edits",    icon: Megaphone, desc: "Incorporating your feedback and refining until the content is exactly right." },
  { step: "04", title: "Delivery", icon: Package,   desc: "Final polished content delivered within 5–7 business days, ready to publish." },
];
