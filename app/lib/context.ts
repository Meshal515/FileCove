import { createContext } from "react-router";

export const cloudflareContext = createContext<{ env: Env; ctx: ExecutionContext }>();
/** Per-request CSP nonce, generated in the worker entry. */
export const nonceContext = createContext<string>("");
