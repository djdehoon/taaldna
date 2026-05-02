import { escapeHtml } from "@/lib/report/escape-html";
import type { SendReportBody } from "@/lib/report/send-report-payload";
import { getPublicSiteUrl } from "@/lib/report/site-url";

export function buildReportEmailHtml(data: SendReportBody): string {
  const site = getPublicSiteUrl();
  const cta = `${site}/resultaat`;
  const safeName = escapeHtml(data.profileName);
  const safeDesc = escapeHtml(data.profileDescription).replace(/\n/g, "<br/>");
  const appsHtml = data.topApps
    .map(
      (a) => `
    <li style="margin:0 0 12px 0;">
      <strong>${escapeHtml(a.emoji ? `${a.emoji} ${a.name}` : a.name)}</strong>
      <span style="color:#64748b;"> — ${a.matchPercent}% match</span><br/>
      <span style="color:#334155;font-size:14px;">${escapeHtml(a.reasonLine)}</span>
    </li>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;padding:28px 24px;border:1px solid #e2e8f0;">
        <tr><td>
          <img src="${escapeHtml(`${site}/email-header.png`)}" width="280" style="display:block;margin:0 auto 24px auto;" alt="TaalDNA" />
          <h1 style="margin:0 0 8px;font-size:22px;color:#1e293b;">Hoi! Hier is jouw TaalDNA-profiel 🧬</h1>
          <p style="margin:0 0 20px;font-size:16px;color:#64748b;">Samenvatting en tips — het volledige rapport vind je in de bijlage (PDF).</p>
          <h2 style="margin:0 0 8px;font-size:20px;color:#7c3aed;">${safeName}</h2>
          <p style="margin:0 0 20px;font-size:15px;color:#334155;">${safeDesc}</p>
          <p style="margin:0 0 8px;font-size:14px;"><strong>Analytisch ↔ Intuïtief:</strong> ${data.xScore.toFixed(2)}</p>
          <p style="margin:0 0 20px;font-size:14px;"><strong>Solo ↔ Sociaal:</strong> ${data.yScore.toFixed(2)}</p>
          <h3 style="margin:0 0 12px;font-size:16px;">Top 3 apps voor jou</h3>
          <ul style="margin:0;padding-left:20px;">${appsHtml || "<li>Geen app-lijst meegestuurd.</li>"}</ul>
          <p style="margin:28px 0 0;text-align:center;">
            <a href="${escapeHtml(cta)}" style="display:inline-block;background:#7c3aed;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:600;font-size:15px;">Bekijk je profiel online →</a>
          </p>
          <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;text-align:center;">TaalDNA · Jouw taalleerstijl · ${escapeHtml(site.replace(/^https?:\/\//, ""))}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
