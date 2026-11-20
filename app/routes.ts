import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx", { id: "home-ar" }),
  route("en", "routes/home.tsx", { id: "home-en" }),
  route("signin", "routes/soon.tsx", { id: "signin-ar" }),
  route("en/signin", "routes/soon.tsx", { id: "signin-en" }),
  route("terms", "routes/soon.tsx", { id: "terms-ar" }),
  route("en/terms", "routes/soon.tsx", { id: "terms-en" }),
  route("privacy", "routes/soon.tsx", { id: "privacy-ar" }),
  route("en/privacy", "routes/soon.tsx", { id: "privacy-en" }),
  route("report", "routes/soon.tsx", { id: "report-ar" }),
  route("en/report", "routes/soon.tsx", { id: "report-en" }),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
