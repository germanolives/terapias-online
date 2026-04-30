export const SPAIN_DOMAIN = "psicoterapiaonline.es";
export const ARGENTINA_DOMAIN = "terapiasonline.com.ar";

export function isSpainHost(hostname: string): boolean {
  return hostname.includes(".es");
}

export function getDomainConfig(hostname: string) {
  const isSpain = isSpainHost(hostname);

  return {
    isSpain,
    siteName: isSpain ? "Psicoterapia Online" : "Terapias Online",
    therapyTerm: isSpain ? "Psicoterapia" : "Terapia",
    whatsappDisplay: isSpain ? "+34 696 03 51 56" : "+54 911 3468 1955",
    whatsappE164: isSpain ? "34696035156" : "5491134681955",
    countryLabel: isSpain ? "España" : "Argentina",
    cityLabel: isSpain ? "España" : "Buenos Aires, Argentina",
    canonicalOrigin: isSpain
      ? `https://${SPAIN_DOMAIN}`
      : `https://${ARGENTINA_DOMAIN}`,
    alternateEsOrigin: `https://${SPAIN_DOMAIN}`,
    alternateArOrigin: `https://${ARGENTINA_DOMAIN}`,
  };
}

export function getDomainConfigByCountry(isSpain: boolean) {
  return getDomainConfig(isSpain ? SPAIN_DOMAIN : ARGENTINA_DOMAIN);
}
