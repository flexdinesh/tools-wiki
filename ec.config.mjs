import { defineEcConfig, ExpressiveCodeAnnotation } from "@astrojs/starlight/expressive-code";
import { addClassName, h } from "@astrojs/starlight/expressive-code/hast";
import { classifyLines, hasPrompt } from "./src/lib/terminal-lines.ts";

const SHELL_LANGUAGES = new Set(["bash", "sh", "shell", "zsh", "console"]);

class PromptAnnotation extends ExpressiveCodeAnnotation {
  render({ nodesToTransform }) {
    return nodesToTransform.map(node => h("span.ec-prompt", node));
  }
}

/** Marks `$` prompts and command output so CSS can set them apart. */
function pluginTerminalLines() {
  const outputLines = new WeakSet();
  return {
    name: "terminal-lines",
    hooks: {
      annotateCode: ({ codeBlock }) => {
        if (!SHELL_LANGUAGES.has(codeBlock.language)) return;
        const lines = codeBlock.getLines();
        const kinds = classifyLines(lines.map(line => line.text));
        lines.forEach((line, index) => {
          if (kinds[index] === "output") outputLines.add(line);
          else if (hasPrompt(line.text)) {
            line.addAnnotation(new PromptAnnotation({ inlineRange: { columnStart: 0, columnEnd: 1 } }));
          }
        });
      },
      postprocessRenderedLine: ({ line, renderData }) => {
        if (outputLines.has(line)) addClassName(renderData.lineAst, "ec-output");
      },
    },
  };
}

const monochrome = (name, type, foreground, background) => ({
  name,
  type,
  colors: { "editor.background": background, "editor.foreground": foreground },
  settings: [{ settings: { foreground, background } }],
});

export default defineEcConfig({
  themes: [
    monochrome("wiki-dark", "dark", "#eff1f4", "#0e1115"),
    monochrome("wiki-light", "light", "#12151b", "#f2f3f5"),
  ],
  useStarlightUiThemeColors: false,
  minSyntaxHighlightingColorContrast: 0,
  plugins: [pluginTerminalLines()],
  defaultProps: { frame: "none" },
  styleOverrides: {
    borderColor: "var(--wiki-line)",
    borderRadius: "0",
    codeBackground: "var(--wiki-ground)",
    codeFontFamily: "var(--font-mono)",
    codeFontSize: "0.8125rem",
    codeLineHeight: "1.55",
    codePaddingBlock: "0.625rem",
    codePaddingInline: "0.875rem",
    uiFontFamily: "var(--font-sans)",
    frames: { frameBoxShadowCssValue: "none" },
  },
});
