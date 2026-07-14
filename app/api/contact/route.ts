import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EMAIL } from "@/lib/constants";

export const runtime = "nodejs";

// --- Rate limiting (in-memory, per serverless instance) ---
// This is a best-effort limiter: serverless functions may spin up new
// instances, so it does not guarantee a hard global limit. For stronger
// protection in high-traffic production, swap this for Upstash Redis or
// Vercel's KV-based rate limiting.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}

function isValidEmailOrPhone(value: string) {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone = /[\d+][\d\s()-]{6,}/;
  return email.test(value) || phone.test(value);
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Probá de nuevo en un minuto." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, business, contact, message, company_website, formRenderedAt } = body ?? {};

    // Honeypot: real users never fill this hidden field. If it has a
    // value, silently pretend success so the bot doesn't learn anything.
    if (company_website) {
      return NextResponse.json({ ok: true });
    }

    // Time-trap: a human takes at least a couple of seconds to fill the
    // form. Anything faster is almost certainly a bot submitting instantly.
    if (typeof formRenderedAt === "number" && Date.now() - formRenderedAt < 2000) {
      return NextResponse.json(
        { error: "El formulario se envió demasiado rápido." },
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Nombre inválido." }, { status: 400 });
    }
    if (!contact || typeof contact !== "string" || !isValidEmailOrPhone(contact)) {
      return NextResponse.json(
        { error: "Ingresá un email o WhatsApp válido." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json({ error: "Contanos un poco más." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error(
        "RESEND_API_KEY no configurada. Agregala como variable de entorno para enviar emails reales."
      );
      return NextResponse.json(
        { error: "El envío de emails no está configurado todavía." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "NEXUS Dev <onboarding@resend.dev>",
      to: EMAIL,
      replyTo: isValidEmailOrPhone(contact) && contact.includes("@") ? contact : undefined,
      subject: `Nuevo contacto de ${name}${business ? ` · ${business}` : ""}`,
      text: [
        `Nombre: ${name}`,
        business ? `Negocio: ${business}` : null,
        `Contacto: ${contact}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando el formulario de contacto:", err);
    return NextResponse.json(
      { error: "No pudimos enviar el mensaje." },
      { status: 500 }
    );
  }
}
