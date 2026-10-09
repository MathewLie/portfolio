// Site-wide constants. Used by the pages, the footer, and the prerender script.

// TODO: if you attach a custom domain in Netlify, change this one line.
// It feeds the canonical URL, og:url, og:image, and sitemap.xml.
export const SITE_URL = "https://matthewli.netlify.app";

export const EMAIL = "matthewgx.li@gmail.com";
export const CALENDLY_URL = "https://calendly.com/matthewli73303";

// Drop the file at public/media-kit.pdf. It is served at this URL.
export const MEDIA_KIT_URL = "/media-kit.pdf";

// Order here is the order in the footer (Instagram first, TikTok last).
export const socials = [
  { key: "instagram", label: "Instagram", handle: "@mattli._", url: "https://www.instagram.com/mattli._/" },
  { key: "linkedin", label: "LinkedIn", handle: "linkedin.com/in/matthew-li733", url: "https://www.linkedin.com/in/matthew-li733/" },
  // TODO: paste your YouTube channel URL into `url` when the channel launches.
  // While it is empty the footer shows "YouTube (launching soon)" as plain text.
  { key: "youtube", label: "YouTube", handle: "", url: "" },
  { key: "tiktok", label: "TikTok", handle: "@mattgx.li", url: "https://www.tiktok.com/@mattgx.li" },
];

// The three pages. `navLabel` is the short text used in the top nav.
export const PAGE_LINKS = [
  { to: "/", label: "Triathlon", navLabel: "Triathlon" },
  { to: "/portfolio", label: "Portfolio", navLabel: "Portfolio" },
  { to: "/linkedin", label: "LinkedIn UGC", navLabel: "LinkedIn UGC" },
];
