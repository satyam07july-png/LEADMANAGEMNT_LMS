import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inputPath = process.argv[2]
  ? path.resolve(root, process.argv[2])
  : path.join(root, "reports", "dizitaladda-lms-architecture-report.md");
const outputPath = process.argv[3]
  ? path.resolve(root, process.argv[3])
  : path.join(root, "reports", "dizitaladda-lms-architecture-report.pdf");

const markdown = fs.readFileSync(inputPath, "utf8");

const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 54;
const contentWidth = pageWidth - margin * 2;
const lineHeight = 14;
const titleLineHeight = 22;
const headingLineHeight = 18;
const fontSize = 10;
const headingSize = 13;
const titleSize = 18;

function escapePdfText(text) {
  return text
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function textWidth(text, size) {
  return text.length * size * 0.52;
}

function wrapText(text, size, maxWidth) {
  if (!text.trim()) return [""];
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (textWidth(candidate, size) <= maxWidth) {
      current = candidate;
      continue;
    }

    if (current) lines.push(current);
    current = word;
  }

  if (current) lines.push(current);
  return lines;
}

function normalizeMarkdown(md) {
  return md
    .replace(/^# (.*)$/gm, "TITLE::$1")
    .replace(/^## (.*)$/gm, "HEADING::$1")
    .split(/\r?\n/);
}

const pages = [];
let currentPage = [];
let y = pageHeight - margin;

function newPage() {
  if (currentPage.length) pages.push(currentPage);
  currentPage = [];
  y = pageHeight - margin;
}

function ensureSpace(height) {
  if (y - height < margin) newPage();
}

function addLine(text, x, size, font, leading) {
  ensureSpace(leading);
  currentPage.push({ text, x, y, size, font });
  y -= leading;
}

for (const rawLine of normalizeMarkdown(markdown)) {
  const line = rawLine.trimEnd();

  if (line.startsWith("TITLE::")) {
    y -= 8;
    for (const wrapped of wrapText(line.slice(7), titleSize, contentWidth)) {
      addLine(wrapped, margin, titleSize, "F2", titleLineHeight);
    }
    y -= 10;
    continue;
  }

  if (line.startsWith("HEADING::")) {
    y -= 8;
    for (const wrapped of wrapText(line.slice(9), headingSize, contentWidth)) {
      addLine(wrapped, margin, headingSize, "F2", headingLineHeight);
    }
    y -= 4;
    continue;
  }

  if (!line.trim()) {
    y -= 6;
    if (y < margin) newPage();
    continue;
  }

  const bullet = line.startsWith("- ");
  const numbered = /^\d+\.\s/.test(line);
  const indent = bullet || numbered ? 12 : 0;
  const text = bullet ? `* ${line.slice(2)}` : line;

  for (const wrapped of wrapText(text, fontSize, contentWidth - indent)) {
    addLine(wrapped, margin + indent, fontSize, "F1", lineHeight);
  }
}

if (currentPage.length) pages.push(currentPage);

const objects = [];

function addObject(content) {
  objects.push(content);
  return objects.length;
}

const catalogId = addObject("PLACEHOLDER_CATALOG");
const pagesId = addObject("PLACEHOLDER_PAGES");
const fontRegularId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
const fontBoldId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
const pageIds = [];

for (let i = 0; i < pages.length; i++) {
  const commands = [
    "BT",
    ...pages[i].map((item) => {
      const safeText = escapePdfText(item.text);
      return `/${item.font} ${item.size} Tf ${item.x.toFixed(2)} ${item.y.toFixed(2)} Td (${safeText}) Tj`;
    }),
    "ET",
  ].join("\n");

  const contentId = addObject(`<< /Length ${Buffer.byteLength(commands, "utf8")} >>\nstream\n${commands}\nendstream`);
  const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`);
  pageIds.push(pageId);
}

objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

let pdf = "%PDF-1.4\n";
const offsets = [0];

for (let i = 0; i < objects.length; i++) {
  offsets.push(Buffer.byteLength(pdf, "utf8"));
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}

const xrefOffset = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";

for (let i = 1; i < offsets.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}

pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

fs.writeFileSync(outputPath, pdf, "binary");
console.log(outputPath);
