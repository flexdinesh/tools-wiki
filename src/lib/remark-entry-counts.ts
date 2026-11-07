import { countPage, entryLabel } from "./page-counts.ts";

type MdNode = {
  type: string;
  depth?: number;
  data?: { hProperties?: Record<string, string> };
};
type MdRoot = { children: MdNode[] };
type MdFile = { value: unknown };

/** Exposes each `##` section's entry count to CSS as `data-entries`. */
export function remarkEntryCounts() {
  return (tree: MdRoot, file: MdFile) => {
    const { sections } = countPage(String(file.value));
    const headings = tree.children.filter(node => node.type === "heading" && node.depth === 2);
    headings.forEach((heading, index) => {
      const entries = sections[index]?.entries;
      if (!entries) return;
      heading.data = {
        ...heading.data,
        hProperties: { ...heading.data?.hProperties, "data-entries": entryLabel(entries) },
      };
    });
  };
}
