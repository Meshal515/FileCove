import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
  useRouteLoaderData,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import readexArabic from "@fontsource-variable/readex-pro/files/readex-pro-arabic-wght-normal.woff2?url";
import readexLatin from "@fontsource-variable/readex-pro/files/readex-pro-latin-wght-normal.woff2?url";
import kufamArabic600 from "@fontsource/kufam/files/kufam-arabic-600-normal.woff2?url";
import kufamLatin600 from "@fontsource/kufam/files/kufam-latin-600-normal.woff2?url";
import { nonceContext } from "./lib/context";
import { dirOf, localeFromPath, type Locale } from "./i18n";

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  return {
    nonce: context.get(nonceContext),
    origin: url.origin,
  };
}

export function headers() {
  return { "Cache-Control": "public, max-age=0, s-maxage=300, must-revalidate" };
}

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/manifest.webmanifest" },
];

/** Set theme before first paint — no flash. Also marks JS as available. */
const THEME_SCRIPT = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem('fc-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.setAttribute('data-theme',t);d.classList.add('js')})()`;

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  // Derive from the URL (not loader data) so client-side language switches update <html>.
  const locale: Locale = localeFromPath(useLocation().pathname);
  const nonce = data?.nonce;
  const primaryFonts =
    locale === "ar" ? [readexArabic, kufamArabic600] : [readexLatin, kufamLatin600];

  return (
    <html lang={locale} dir={dirOf(locale)} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F7F5F0" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0D1522" />
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {primaryFonts.map((href) => (
          <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
        ))}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Error";
  let details = "Something went wrong.";
  if (isRouteErrorResponse(error)) {
    title = String(error.status);
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
  }
  return (
    <main className="container-page py-24">
      <h1 className="font-display text-h1">{title}</h1>
      <p className="mt-4 text-muted">{details}</p>
    </main>
  );
}
