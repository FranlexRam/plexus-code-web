// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, sanitizeInput } from "@/lib/validation";
import { env } from "@/lib/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();

    const sanitizedData = {
      country: sanitizeInput(rawBody.country || ""),
      topic: sanitizeInput(rawBody.topic || ""),
      name: sanitizeInput(rawBody.name || ""),
      company: sanitizeInput(rawBody.company || ""),
      email: rawBody.email ? rawBody.email.trim().toLowerCase() : "",
      phone: sanitizeInput(rawBody.phone || ""),
      message: sanitizeInput(rawBody.message || ""),
    };

    const validation = contactSchema.safeParse(sanitizedData);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, company, email, phone, country, topic, message } = validation.data;

    // Despacho del email vía Resend
    const recipient = env.CONTACT_EMAIL;

    const emailResponse = await resend.emails.send({
      from: "Plexus Code Inquiry <onboarding@resend.dev>", // Cambia a contacto@plexuscode.com cuando verifiques tu dominio en Resend
      to: [recipient],
      replyTo: email,
      subject: `[Nuevo Lead] ${company} - ${topic}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #06090f; color: #f1f5f9; padding: 24px; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #0b111e; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; }
            .header { border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px; }
            .title { color: #00F0FF; font-size: 20px; font-weight: bold; margin: 0; }
            .field-group { margin-bottom: 16px; }
            .label { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 600; letter-spacing: 0.05em; }
            .value { font-size: 15px; color: #ffffff; margin-top: 4px; font-weight: 500; }
            .message-box { background-color: #06090f; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin-top: 8px; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap; font-size: 14px; }
            .footer { margin-top: 32px; pt-4; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 class="title">PLEXUS CODE // Solicitud de Proyecto</h2>
            </div>

            <div class="field-group">
              <div class="label">Nombre del Contacto</div>
              <div class="value">${name}</div>
            </div>

            <div class="field-group">
              <div class="label">Empresa / Organización</div>
              <div class="value">${company}</div>
            </div>

            <div class="field-group">
              <div class="label">Correo Corporativo</div>
              <div class="value"><a href="mailto:${email}" style="color: #00F0FF; text-decoration: none;">${email}</a></div>
            </div>

            <div class="field-group">
              <div class="label">Teléfono</div>
              <div class="value">${phone || "No especificado"}</div>
            </div>

            <div class="field-group">
              <div class="label">País & Servicio de Interés</div>
              <div class="value">${country} • ${topic}</div>
            </div>

            <div class="field-group">
              <div class="label">Detalles del Requerimiento</div>
              <div class="message-box">${message}</div>
            </div>

            <div class="footer">
              Enviado desde el formulario de contacto web de Plexus Code.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend Error:", emailResponse.error);
      return NextResponse.json(
        { success: false, error: emailResponse.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email dispatched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal processing error" },
      { status: 500 }
    );
  }
}