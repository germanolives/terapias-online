// src/actions/index.ts
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

export const server = {
  sendContact: defineAction({
    accept: "form",
    input: z.object({
      name: z
        .string()
        .trim()
        .min(2, "El nombre es muy corto")
        .max(50, "El nombre es demasiado largo"),

      email: z
        .string()
        .trim()
        .toLowerCase() // Como tu .lower() de Python
        .email("Email inválido"),

      message: z
        .string()
        .trim()
        .min(10, "El mensaje debe tener al menos 10 caracteres")
        .max(2000, "El mensaje no puede exceder los 2000 caracteres"),

      subtitle: z.string().optional(),
    }),
    handler: async (input) => {
      const apiKey = import.meta.env.RESEND_API_KEY;
      const mailFrom = import.meta.env.MAIL_FROM;
      const mailToRaw = import.meta.env.MAIL_TO;

      if (!apiKey || !mailFrom || !mailToRaw) {
        console.error(
          "Faltan variables de entorno requeridas: RESEND_API_KEY, MAIL_FROM o MAIL_TO",
        );
        throw new Error("Error de configuración del servidor.");
      }

      const mailTo = mailToRaw
        .split(",")
        .map((value: string) => value.trim())
        .filter(Boolean);

      if (mailTo.length === 0) {
        console.error("MAIL_TO está vacío o mal configurado.");
        throw new Error("Error de configuración del servidor.");
      }

      const resend = new Resend(apiKey);

      const { name, email, message, subtitle } = input;

      if (subtitle) {
        console.warn("Spam detectado: Honeypot lleno.");
        return { message: "Mensaje procesado correctamente" };
      }

      const { error } = await resend.emails.send({
        from: mailFrom,
        to: mailTo,
        // Usamos reply_to para que si Graciela le da a "Responder",
        // le escriba directamente al paciente y no a Resend.
        replyTo: email,
        subject: `Nueva consulta de ${name}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4a7c59;">Nueva consulta desde la web</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
      });

      if (error) {
        console.error("Error de Resend:", error);
        throw new Error("No se pudo enviar el correo");
      }

      return {
        message: `¡Gracias ${name}! Tu mensaje fue enviado con éxito.`,
      };
    },
  }),
};
