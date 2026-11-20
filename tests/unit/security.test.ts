import { describe, expect, it } from "vitest";
import { applySecurityHeaders, contentSecurityPolicy, createNonce } from "~/lib/security";

describe("security headers", () => {
  it("nonces are random and 128-bit", () => {
    const a = createNonce();
    const b = createNonce();
    expect(a).not.toBe(b);
    expect(atob(a)).toHaveLength(16);
  });

  it("production CSP is strict", () => {
    const csp = contentSecurityPolicy("abc");
    expect(csp).toContain("script-src 'self' 'nonce-abc' 'strict-dynamic'");
    expect(csp).toContain("style-src 'self'");
    expect(csp).not.toContain("unsafe-inline");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
  });

  it("sets the baseline headers", () => {
    const h = applySecurityHeaders(new Headers(), "abc");
    expect(h.get("strict-transport-security")).toContain("max-age=63072000");
    expect(h.get("x-content-type-options")).toBe("nosniff");
    expect(h.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(h.get("x-frame-options")).toBe("DENY");
  });
});
