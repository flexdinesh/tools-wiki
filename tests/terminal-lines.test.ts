import assert from "node:assert/strict";
import { test } from "node:test";
import { classifyLines } from "../src/lib/terminal-lines.ts";

test("blocks without a prompt are all commands", () => {
  assert.deepEqual(classifyLines(["git add .", "git commit"]), ["command", "command"]);
});

test("prompted blocks separate commands from output", () => {
  assert.deepEqual(
    classifyLines(["$ git status --short", " M src/app.ts", "?? notes.md"]),
    ["command", "output", "output"],
  );
});

test("output starting with a hash stays output", () => {
  assert.deepEqual(classifyLines(["$ git status -b", "## main"]), ["command", "output"]);
});

test("continued commands stay commands", () => {
  assert.deepEqual(
    classifyLines(["$ docker run \\", "  --rm alpine", "hello"]),
    ["command", "command", "output"],
  );
  assert.deepEqual(classifyLines(["$ ls |", "  wc -l", "3"]), ["command", "command", "output"]);
});

test("heredoc bodies stay commands", () => {
  assert.deepEqual(
    classifyLines(["$ cat <<EOF", "hello", "EOF", "hello"]),
    ["command", "command", "command", "output"],
  );
});
