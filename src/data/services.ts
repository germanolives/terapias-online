// src/data/services.ts

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const SERVICES: Service[] = [
  {
    title: "Terapia Individual",
    description: "Espacio de escucha y trabajo psicoterapéutico para adultos y adolescentes desde un enfoque integral.",
    icon: "👤"
  },
  {
    title: "Terapia de Pareja",
    description: "Acompañamiento en crisis vinculares, comunicación y resolución de conflictos para fortalecer el lazo.",
    icon: "👥"
  },
  {
    title: "Orientación Vocacional",
    description: "Procesos breves para jóvenes y adultos en búsqueda de su camino profesional o reorientación laboral.",
    icon: "🎓"
  }
];