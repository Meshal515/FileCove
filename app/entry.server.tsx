import type { EntryContext, RouterContextProvider } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { nonceContext } from "./lib/context";
import { applySecurityHeaders } from "./lib/security";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: RouterContextProvider,
) {
  const nonce = loadContext.get(nonceContext);
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} nonce={nonce} />,
    {
      nonce,
      signal: request.signal,
      onError(error: unknown) {
        responseStatusCode = 500;
        if (shellRendered) console.error(error);
      },
    },
  );
  shellRendered = true;

  // Bots and SPA-mode builds get the fully rendered document.
  if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html; charset=utf-8");
  applySecurityHeaders(responseHeaders, nonce, { dev: import.meta.env.DEV });
  return new Response(body, { headers: responseHeaders, status: responseStatusCode });
}
