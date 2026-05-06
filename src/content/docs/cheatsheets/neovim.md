---
title: neovim
description: Modes, navigation, editing, search and replace, explorer, buffers, LSP, and common shortcuts.
---

## Modes

Enter common editing states.

| Key | Purpose | Result |
| --- | --- | --- |
| `i` | Enter insert mode before the cursor. | Start typing at the cursor. |
| `a` | Enter insert mode after the cursor. | Start typing after the current character. |
| `o` | Open a new line below. | Create a new line and enter insert mode. |
| `v` | Enter visual mode. | Select text character by character. |
| `V` | Enter visual line mode. | Select whole lines. |
| `Ctrl+v` | Enter visual block mode. | Select a rectangular block. |

## Navigation

Move through code, symbols, and jump history.

### General

| Key | Purpose | Result |
| --- | --- | --- |
| `gd` | Jump to definition. | Cursor moves to the symbol definition. |
| `Ctrl+o` | Jump back. | Cursor returns to the previous jump location. |
| `Ctrl+i` | Jump forward. | Cursor moves forward in the jump list. |
| `%` | Jump to matching pair. | Cursor moves between matching `()`, `{}`, or `[]`. |
| `gx` | Open URL under cursor. | Link opens in the default browser. |
| `{` / `}` | Move by paragraph. | Cursor moves to previous/next blank-line-separated block. |
| `[[` / `]]` | Move by section. | Cursor moves to previous/next section, depending on filetype. |
| `[]` / `][` | Move by section end. | Cursor moves to previous/next section end, depending on filetype. |

### LazyVim / Treesitter

| Key | Purpose | Result |
| --- | --- | --- |
| `[m` / `]m` | Move to function start. | Cursor moves to previous/next function start. |
| `[M` / `]M` | Move to function end. | Cursor moves to previous/next function end. |
| `[[` / `]]` | Move to class start. | Cursor moves to previous/next class start. |
| `[]` / `][` | Move to class end. | Cursor moves to previous/next class end. |

### LSP / plugin-based

| Key | Purpose | Result |
| --- | --- | --- |
| `[f` / `]f` | Move by function if configured. | Cursor moves to previous/next function through an LSP or outline plugin. |

## Editing

Select, yank, delete, and paste text.

### Visual selections

Select text first with `v`, `V`, or `Ctrl+v`, then run an operation.

| Key | Purpose | Result |
| --- | --- | --- |
| `d` | Delete selection. | Selection is cut into the default register. |
| `y` | Yank selection. | Selection is copied into the default register. |
| `p` | Paste after cursor. | Register contents are inserted after the cursor. |
| `P` | Paste before cursor. | Register contents are inserted before the cursor. |

### Yanking

| Command | Purpose | Result |
| --- | --- | --- |
| `yy` | Yank current line. | Current line is copied. |
| `3yy` | Yank three lines. | Three lines from the cursor are copied. |
| `y$` | Yank to end of line. | Text from cursor to line end is copied. |
| `y^` | Yank to start of line. | Text from cursor to first non-blank character is copied. |
| `yw` | Yank to next word. | Text from cursor to the next word start is copied. |
| `yiw` | Yank inner word. | Current word is copied. |
| `y%` | Yank to matching pair. | Text through the matching `()`, `{}`, or `[]` is copied. |

### Deleting

| Command | Purpose | Result |
| --- | --- | --- |
| `dd` | Delete current line. | Current line is cut. |
| `3dd` | Delete three lines. | Three lines from the cursor are cut. |
| `d$` | Delete to end of line. | Text from cursor to line end is cut. |
| `dw` | Delete to next word. | Text from cursor to the next word start is cut. |
| `d^` | Delete to start of line. | Text from cursor to first non-blank character is cut. |
| `"_dd` | Delete without yanking. | Current line is sent to the black hole register. |

## Search and Replace

Find text and replace it safely.

### Search and replace all instances in a file

| Command | Purpose | Result |
| --- | --- | --- |
| `/old` | Search forward. | Matches for `old` are highlighted. |
| `:%s/old/new/g` | Replace all matches in the file. | Every `old` is replaced with `new`. |

### Search and replace one by one in a file with confirmation

| Command | Purpose | Result |
| --- | --- | --- |
| `:%s/old/new/gc` | Replace all matches with confirmation. | Vim asks before each replacement. |

Confirmation prompt shortcuts:

| Key | Purpose | Result |
| --- | --- | --- |
| `y` | Yes. | Replace this match. |
| `n` | No. | Skip this match. |
| `a` | All. | Replace this and all remaining matches. |
| `q` | Quit. | Stop replacing. |
| `l` | Last. | Replace this match, then stop. |

### Notes

| Modifier | Purpose | Example |
| --- | --- | --- |
| `%` | Run substitute across the whole file. | `:%s/old/new/g` |
| `g` | Replace every match on each line. Without it, only the first match on each line is replaced. | `:%s/old/new/g` |
| `c` | Confirm each replacement. | `:%s/old/new/gc` |
| `i` | Ignore case for this replacement. | `:%s/old/new/gi` |
| `I` | Force case-sensitive replacement. | `:%s/old/new/gI` |
| `#` | Use another delimiter when searching paths or text with `/`. | `:%s#/old/path#/new/path#g` |

## Scrolling

Move the viewport without editing text.

| Key | Purpose | Result |
| --- | --- | --- |
| `Ctrl+u` | Scroll half page up. | Cursor and screen move up. |
| `Ctrl+d` | Scroll half page down. | Cursor and screen move down. |
| `Ctrl+b` | Scroll full page up. | Screen moves up one page. |
| `Ctrl+f` | Scroll full page down. | Screen moves down one page. |

## Explorer

Navigate project files with Neo-tree.

| Key | Purpose | Result |
| --- | --- | --- |
| `<leader>e` | Toggle explorer. | File explorer opens or closes. |
| `<leader>o` | Focus explorer. | Cursor jumps to the explorer. |
| `?` | Show shortcuts. | Neo-tree help appears. |
| `h` / `j` / `k` / `l` | Navigate tree. | Move left/down/up/right in the explorer. |
| `Ctrl+H` | Toggle hidden files. | Hidden files are shown or hidden. |
| `a` | Create file or directory. | Create dialog opens. |
| `d` | Delete file or directory. | Delete confirmation opens. |
| `m` | Move or rename. | Move/rename dialog opens. |

## Buffers

Move between open files.

| Key | Purpose | Result |
| --- | --- | --- |
| `Shift+h` | Move to previous buffer. | Previous buffer opens. |
| `Shift+l` | Move to next buffer. | Next buffer opens. |
| `Ctrl+6` | Toggle alternate buffer. | Previous active buffer opens. |

## LSP

Use language server actions.

| Key | Purpose | Result |
| --- | --- | --- |
| `<leader>ld` | Show line diagnostics. | Diagnostics for the current line appear. |
| `<leader>lD` | Show workspace diagnostics. | Diagnostics list for the workspace opens. |
| `<leader>lf` | Format buffer. | Current buffer is formatted. |
| `K` | Show hover/type info. | LSP hover documentation appears. |

## Misc

Run common editor commands.

| Command | Purpose | Result |
| --- | --- | --- |
| `:e` | Reload current file. | Buffer reloads from disk. |
| `:set timeout timeoutlen=100 ttimeoutlen=100` | Make mapped-key timeout faster. | Key sequence timeout becomes shorter. |
