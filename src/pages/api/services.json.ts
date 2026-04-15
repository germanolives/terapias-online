// src/pages/api/services.json.ts
import type { APIRoute } from "astro";
import { SERVICES } from "../../data/services";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(SERVICES), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
