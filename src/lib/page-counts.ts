export type SectionCount = { title: string; entries: number };
export type PageCounts = { sections: SectionCount[]; entries: number };

const FENCE = /^(`{3,}|~{3,})/;
const SECTION = /^## (.+)$/;
const ENTRY = /^### /;
const TABLE_LINE = /^\|/;
const TABLE_SEPARATOR = /^\|\s*:?-/;

/**
 * Counts sections and entries from a Markdown body. An entry is a `###`
 * heading or a table row; a section with neither counts its code blocks.
 * Fenced code is skipped, so `## ...` in sample output is not a heading.
 */
export function countPage(body: string): PageCounts {
  const sections: SectionCount[] = [];
  let openFence = "";
  let title: string | undefined;
  let headings = 0;
  let tableLines = 0;
  let tables = 0;
  let codeBlocks = 0;

  const closeSection = () => {
    if (title === undefined) return;
    const listed = headings + tableLines - 2 * tables;
    sections.push({ title, entries: listed > 0 ? listed : codeBlocks });
  };

  for (const line of body.split(/\r?\n/)) {
    const fence = line.match(FENCE)?.[1];
    if (openFence) {
      const closes = fence !== undefined && fence[0] === openFence[0]
        && fence.length >= openFence.length && line.trim() === fence;
      if (closes) openFence = "";
      continue;
    }
    if (fence !== undefined) {
      openFence = fence;
      codeBlocks++;
      continue;
    }
    const section = line.match(SECTION)?.[1];
    if (section !== undefined) {
      closeSection();
      title = section.trim();
      headings = 0;
      tableLines = 0;
      tables = 0;
      codeBlocks = 0;
    } else if (ENTRY.test(line)) {
      headings++;
    } else if (TABLE_LINE.test(line)) {
      tableLines++;
      if (TABLE_SEPARATOR.test(line)) tables++;
    }
  }
  closeSection();

  return { sections, entries: sections.reduce((total, section) => total + section.entries, 0) };
}

export function entryLabel(entries: number): string {
  return `${entries} ${entries === 1 ? "entry" : "entries"}`;
}
