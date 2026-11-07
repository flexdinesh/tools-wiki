export type LineKind = "command" | "output";

const PROMPT = "$ ";
const CONTINUATION = /(\\|\||&&)\s*$/;
const HEREDOC = /<<-?\s*['"]?([\w-]+)/;

/**
 * Splits a shell block into commands and output. Blocks without a `$ ` prompt
 * contain only commands. In prompted blocks, a line is a command when it has
 * the prompt, continues the previous command, or is inside its heredoc.
 */
export function classifyLines(lines: readonly string[]): LineKind[] {
  if (!lines.some(line => line.startsWith(PROMPT))) return lines.map(() => "command");

  let continues = false;
  let heredocEnd: string | undefined;
  return lines.map(line => {
    if (heredocEnd !== undefined) {
      if (line.trim() === heredocEnd) heredocEnd = undefined;
      return "command";
    }
    if (!continues && !line.startsWith(PROMPT)) return "output";
    continues = CONTINUATION.test(line);
    heredocEnd = line.match(HEREDOC)?.[1];
    return "command";
  });
}

export function hasPrompt(line: string): boolean {
  return line.startsWith(PROMPT);
}
