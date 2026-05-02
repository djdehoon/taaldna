import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { SendReportBody } from "@/lib/report/send-report-payload";
import { getPublicSiteUrl } from "@/lib/report/site-url";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingBottom: 56,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#1e293b",
    backgroundColor: "#ffffff",
  },
  title: { fontSize: 22, marginBottom: 6, color: "#0f172a" },
  subtitle: { fontSize: 12, color: "#64748b", marginBottom: 20 },
  profile: { fontSize: 20, fontWeight: "bold", color: "#7c3aed", marginBottom: 8 },
  body: { fontSize: 11, lineHeight: 1.45, marginBottom: 16, color: "#334155" },
  label: { fontSize: 10, color: "#64748b", marginBottom: 4 },
  scoreRow: { marginBottom: 10 },
  barTrack: {
    width: 200,
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    marginTop: 4,
  },
  barFill: { height: 8, backgroundColor: "#7c3aed", borderRadius: 4 },
  sectionTitle: { fontSize: 13, fontWeight: "bold", marginTop: 14, marginBottom: 6 },
  appItem: { marginBottom: 8 },
  appName: { fontSize: 11, fontWeight: "bold" },
  appMeta: { fontSize: 9, color: "#64748b" },
  appReason: { fontSize: 10, color: "#475569", marginTop: 2 },
  gridBox: {
    width: 160,
    height: 160,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 16,
    position: "relative",
  },
  gridCrossV: {
    position: "absolute",
    left: 80,
    top: 0,
    width: 1,
    height: 160,
    backgroundColor: "#94a3b8",
  },
  gridCrossH: {
    position: "absolute",
    left: 0,
    top: 80,
    width: 160,
    height: 1,
    backgroundColor: "#94a3b8",
  },
  dot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7c3aed",
  },
  gridLabel: { fontSize: 7, color: "#64748b" },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#94a3b8",
    textAlign: "center",
  },
});

function ScoreBar({
  leftLabel,
  rightLabel,
  fraction,
}: {
  leftLabel: string;
  rightLabel: string;
  /** 0 = volledig links, 1 = volledig rechts */
  fraction: number;
}) {
  const f = Math.min(1, Math.max(0, fraction));
  const pct = Math.round(f * 100);
  const fillW = 200 * f;
  return (
    <View style={styles.scoreRow}>
      <Text style={styles.label}>
        {leftLabel} ←——→ {rightLabel} ({pct}% naar {rightLabel})
      </Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: fillW }]} />
      </View>
    </View>
  );
}

function QuadrantGrid({ ux, uy }: { ux: number; uy: number }) {
  const x = Math.min(155, Math.max(5, ux * 160));
  const y = Math.min(155, Math.max(5, (1 - uy) * 160));
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={[styles.label, { marginBottom: 6 }]}>Je positie in het vlak</Text>
      <View style={styles.gridBox}>
        <View style={styles.gridCrossV} />
        <View style={styles.gridCrossH} />
        <View style={[styles.dot, { left: x - 5, top: y - 5 }]} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: 160 }}>
        <Text style={styles.gridLabel}>Analytisch</Text>
        <Text style={styles.gridLabel}>Intuïtief</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: 160, marginTop: 2 }}>
        <Text style={styles.gridLabel}>Solo</Text>
        <Text style={styles.gridLabel}>Sociaal</Text>
      </View>
    </View>
  );
}

function ReportDoc({ data }: { data: SendReportBody }) {
  const ux = (data.xScore + 1) / 2;
  const uy = (data.yScore + 1) / 2;
  const site = getPublicSiteUrl().replace(/^https?:\/\//, "");
  const date = new Date().toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>TaalDNA</Text>
        <Text style={styles.subtitle}>Jouw taalleerstijl — persoonlijk rapport</Text>
        <Text style={styles.profile}>{data.profileName}</Text>
        <Text style={styles.body}>{data.profileDescription}</Text>
        <QuadrantGrid ux={ux} uy={uy} />
        <ScoreBar
          leftLabel="Analytisch"
          rightLabel="Intuïtief"
          fraction={ux}
        />
        <ScoreBar leftLabel="Solo" rightLabel="Sociaal" fraction={uy} />
        <Text style={styles.sectionTitle}>Aanbevolen apps (top 3)</Text>
        {data.topApps.map((a, i) => (
          <View key={`${a.name}-${i}`} style={styles.appItem} wrap={false}>
            <Text style={styles.appName}>
              {a.emoji ? `${a.emoji} ${a.name}` : a.name} — {a.matchPercent}% match
            </Text>
            <Text style={styles.appReason}>{a.reasonLine}</Text>
          </View>
        ))}
        <Text style={styles.footer} fixed>
          Gegenereerd door TaalDNA · {site} · {date}
        </Text>
      </Page>
    </Document>
  );
}

export async function generateReportPdfBuffer(data: SendReportBody): Promise<Buffer> {
  const element = <ReportDoc data={data} />;
  const buf = await renderToBuffer(element);
  return Buffer.from(buf);
}
