import type { APIRoute } from "astro";
import { getDomainConfig } from "../lib/domain";

export const GET: APIRoute = ({ url }) => {
  const domain = getDomainConfig(url.hostname);
  const esUrl = `${domain.alternateEsOrigin}/`;
  const arUrl = `${domain.alternateArOrigin}/`;
  const currentUrl = `${domain.canonicalOrigin}/`;

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>${currentUrl}</loc>
    <xhtml:link rel="alternate" hreflang="es-ES" href="${esUrl}" />
    <xhtml:link rel="alternate" hreflang="es-AR" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}" />
  </url>
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
