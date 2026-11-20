import { RouterContextProvider, createRequestHandler } from "react-router";
import { cloudflareContext, nonceContext } from "../app/lib/context";
import { createNonce } from "../app/lib/security";

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    const context = new RouterContextProvider();
    context.set(cloudflareContext, { env, ctx });
    context.set(nonceContext, createNonce());
    return requestHandler(request, context);
  },
} satisfies ExportedHandler<Env>;
