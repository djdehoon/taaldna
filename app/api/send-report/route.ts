import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateReportPdfBuffer } from "@/lib/generate-report-pdf";
import { buildReportEmailHtml } from "@/lib/report/build-email-html";
import {
  parseSendReportBody,
  safePdfFileName,
} from "@/lib/report/send-report-payload";
import { SEND_REPORT_ENABLED } from "@/lib/send-report-enabled";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON." }, { status: 400 });
  }

  const parsed = parseSendReportBody(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const data = parsed.data;
  console.log("[send-report] parsed:", data);

  if (!SEND_REPORT_ENABLED) {
    console.log("[send-report] uitgeschakeld (SEND_REPORT_ENABLED), skip verzenden.");
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "E-mail is tijdelijk niet beschikbaar (RESEND_API_KEY)." },
      { status: 503 }
    );
  }

  const admin = getSupabaseAdminClient();
  if (admin) {
    const { error: dbError } = await admin.from("taaldna_leads").insert({
      email: data.email,
      profile_name: data.profileName,
      x_score: data.xScore,
      y_score: data.yScore,
    });
    if (dbError) {
      console.error("[send-report] Supabase insert:", dbError.message);
      /* E-mail nog steeds versturen; lead staat dan niet in DB. */
    }
  } else {
    console.warn(
      "[send-report] SUPABASE_SERVICE_ROLE_KEY ontbreekt — lead niet opgeslagen."
    );
  }

  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await generateReportPdfBuffer(data);
  } catch (e) {
    console.error("[send-report] PDF:", e);
    return NextResponse.json(
      { error: "Kon het rapport niet genereren." },
      { status: 500 }
    );
  }

  const from =
    process.env.RESEND_FROM?.trim() ?? "TaalDNA <noreply@taaldna.nl>";
  const resend = new Resend(apiKey);
  const subject = `Jouw TaalDNA profiel: ${data.profileName}`;
  const html = buildReportEmailHtml(data);
  const filename = safePdfFileName(data.profileName);

  const { error: sendError } = await resend.emails.send({
    from,
    to: data.email,
    subject,
    html,
    attachments: [
      {
        filename,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });

  if (sendError) {
    console.error("[send-report] Resend:", sendError);
    return NextResponse.json(
      { error: "Kon de e-mail niet versturen. Probeer later opnieuw." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
