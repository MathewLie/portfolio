// Per-page <title> and meta description. The prerender script writes these into
// each page's HTML, and App.jsx keeps them in sync during in-app navigation.

export const routes = [
  {
    path: "/",
    title: "Matthew Li | From zero to IRONMAN 70.3",
    description:
      "Matthew Li: first-timer documenting the road from zero to IRONMAN 70.3 Florida (Dec 13, 2026). Brand partnerships: matthewgx.li@gmail.com",
  },
  {
    path: "/portfolio",
    title: "Matthew Li | Product Manager",
    description:
      "Matthew Li is an Associate Product Manager at C Spire. Experience, projects, and resume.",
  },
  {
    path: "/linkedin",
    title: "Matthew Li | LinkedIn and video content",
    description:
      "Matthew Li: LinkedIn and startup video content, how I work with clients, and client feedback.",
  },
];

export const notFoundRoute = {
  path: "*",
  title: "Page not found | Matthew Li",
  description: "That page does not exist. Head back to the homepage.",
  noindex: true,
};

export function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function metaFor(pathname) {
  const path = normalizePath(pathname);
  return routes.find((r) => r.path === path) || notFoundRoute;
}
