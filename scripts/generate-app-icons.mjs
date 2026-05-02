import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public", "dna-logo.png");

const outputs = [
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
];

async function main() {
  for (const [filename, size] of outputs) {
    await sharp(src)
      .resize(size, size, { fit: "cover", position: "centre" })
      .png()
      .toFile(path.join(root, "public", filename));
  }
  console.log("Generated:", outputs.map(([f]) => f).join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
