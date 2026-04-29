import { getDomainConfig, isSpainHost } from "./domain";

export function getPsychologySchemas(hostname: string) {
  const domain = getDomainConfig(hostname);
  const isSpain = isSpainHost(hostname);

  const practitionerName = "Lic. Graciela Verónica Aballay";
  const canonicalUrl = `${domain.canonicalOrigin}/`;
  const sameAs = [
    "mailto:licenciadaaballay@gmail.com",
    `https://wa.me/${domain.whatsappE164}`,
  ];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${canonicalUrl}#person`,
    name: practitionerName,
    jobTitle: isSpain ? "Psicóloga General Sanitaria" : "Licenciada en Psicología",
    alumniOf: "Universidad de Buenos Aires",
    url: canonicalUrl,
    sameAs,
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "PsychologicalTreatment",
    "@id": `${canonicalUrl}#service`,
    name: isSpain ? "Psicoterapia Online en España" : "Terapia Online en Argentina",
    provider: { "@id": `${canonicalUrl}#person` },
    areaServed: {
      "@type": "Country",
      name: isSpain ? "España" : "Argentina",
    },
    availableLanguage: "es",
    telephone: domain.whatsappDisplay,
    url: canonicalUrl,
    sameAs,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: isSpain
      ? [
          {
            "@type": "Question",
            name: "¿La atención se adapta a normativa sanitaria de España?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí. La práctica se realiza con enfoque clínico y criterios de confidencialidad aplicables en España.",
            },
          },
          {
            "@type": "Question",
            name: "¿Ofrecés psicoterapia online para residentes en España?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí. Podés solicitar una cita online y recibir acompañamiento profesional en español.",
            },
          },
        ]
      : [
          {
            "@type": "Question",
            name: "¿Atendés terapia online para pacientes de Argentina?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí. Las consultas pueden realizarse online y se coordinan por WhatsApp.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cómo se gestionan los turnos en Argentina?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Los turnos se coordinan de forma personalizada según disponibilidad y necesidad clínica.",
            },
          },
        ],
  };

  return [personSchema, serviceSchema, faqSchema];
}
