import type { APIRoute } from "astro";
import { getDomainConfig } from "../lib/domain";

export const GET: APIRoute = ({ url }) => {
  const domain = getDomainConfig(url.hostname);
  const body = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${domain.canonicalOrigin}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
