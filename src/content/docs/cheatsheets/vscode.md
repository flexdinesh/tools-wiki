---
title: vscode
description: Command palette, file navigation, editing, search, terminal, panels, multi-cursor, and debugging shortcuts.
---

Shortcut notation: macOS uses `Cmd` and `Option`; Windows/Linux uses `Ctrl` and `Alt`.

## Command Palette

| macOS | Windows/Linux | Purpose | Result |
| --- | --- | --- | --- |
| `Cmd+Shift+P` | `Ctrl+Shift+P` | Open Command Palette. | Run any VS Code command by name. |
| `Cmd+P` | `Ctrl+P` | Quick Open. | Search and open a file by name. |
| `Cmd+,` | `Ctrl+,` | Open Settings. | Settings opens in an editor tab. |
| `Cmd+K Cmd+S` | `Ctrl+K Ctrl+S` | Open Keyboard Shortcuts. | A searchable keybindings list opens. |

## File Navigation

| macOS | Windows/Linux | Purpose | Result |
| --- | --- | --- | --- |
| `Cmd+P` | `Ctrl+P` | Go to file. | Quick Open appears with matching files. |
| `Ctrl+G` | `Ctrl+G` | Go to line. | A line-number prompt opens. |
| `Cmd+Shift+O` | `Ctrl+Shift+O` | Go to symbol in file. | A symbol picker opens for the active file. |
| `Cmd+T` | `Ctrl+T` | Go to symbol in workspace. | A workspace symbol picker opens. |
| `Ctrl+Tab` | `Ctrl+Tab` | Switch recent editors. | A recent editor picker appears; release to switch. |
| `Cmd+\` | `Ctrl+\` | Split editor. | The current editor opens side by side. |
| `Cmd+1`, `Cmd+2` | `Ctrl+1`, `Ctrl+2` | Focus editor group. | Focus moves to the selected editor group. |
| `Cmd+W` | `Ctrl+W` | Close editor. | The active editor tab closes. |
| `Cmd+Shift+T` | `Ctrl+Shift+T` | Reopen closed editor. | The most recently closed editor reopens. |

## Editing

| macOS | Windows/Linux | Purpose | Result |
| --- | --- | --- | --- |
| `Cmd+X` | `Ctrl+X` | Cut line with no selection. | The current line is removed and copied to the clipboard. |
| `Cmd+C` | `Ctrl+C` | Copy line with no selection. | The current line is copied to the clipboard. |
| `Option+Up` / `Option+Down` | `Alt+Up` / `Alt+Down` | Move line up or down. | The current line or selection moves one row. |
| `Shift+Option+Up` / `Shift+Option+Down` | `Shift+Alt+Up` / `Shift+Alt+Down` | Copy line up or down. | A copy of the line appears above or below. |
| `Cmd+Shift+K` | `Ctrl+Shift+K` | Delete line. | The current line is removed. |
| `Cmd+Enter` | `Ctrl+Enter` | Insert line below. | A blank line opens below the current line. |
| `Cmd+Shift+Enter` | `Ctrl+Shift+Enter` | Insert line above. | A blank line opens above the current line. |
| `Cmd+/` | `Ctrl+/` | Toggle line comment. | Line comment markers are added or removed. |
| `Shift+Option+A` | `Shift+Alt+A` | Toggle block comment. | Block comment markers are added or removed. |
| `Shift+Option+F` | `Shift+Alt+F` | Format document. | The document is formatted with the configured formatter. |

## Multi-Cursor and Selection

| macOS | Windows/Linux | Purpose | Result |
| --- | --- | --- | --- |
| `Option+Click` | `Alt+Click` | Add cursor with mouse. | A new cursor appears at the clicked location. |
| `Cmd+Option+Up` / `Cmd+Option+Down` | `Ctrl+Alt+Up` / `Ctrl+Alt+Down` | Add cursor above or below. | A new cursor appears on the adjacent line. |
| `Cmd+D` | `Ctrl+D` | Select next occurrence. | The next match is selected and another cursor is added. |
| `Cmd+Shift+L` | `Ctrl+Shift+L` | Select all occurrences. | All matches are selected with multiple cursors. |
| `Cmd+L` | `Ctrl+L` | Select current line. | The current line is selected. |
| `Cmd+U` | `Ctrl+U` | Undo last cursor operation. | The most recent cursor or selection change is undone. |

## Search and Replace

| macOS | Windows/Linux | Purpose | Result |
| --- | --- | --- | --- |
| `Cmd+F` | `Ctrl+F` | Find in file. | The Find widget opens in the editor. |
| `Cmd+Option+F` | `Ctrl+H` | Replace in file. | The Replace widget opens in the editor. |
| `Cmd+Shift+F` | `Ctrl+Shift+F` | Search across files. | The Search view opens in the sidebar. |
| `Cmd+Shift+H` | `Ctrl+Shift+H` | Replace across files. | The Search view opens with replace controls enabled. |

## Terminal and Panels

| macOS | Windows/Linux | Purpose | Result |
| --- | --- | --- | --- |
| `` Ctrl+` `` | `` Ctrl+` `` | Toggle integrated terminal. | The terminal panel opens or closes. |
| `` Ctrl+Shift+` `` | `` Ctrl+Shift+` `` | Create new terminal. | A new integrated terminal opens. |
| `Cmd+B` | `Ctrl+B` | Toggle sidebar. | The primary sidebar opens or closes. |
| `Cmd+J` | `Ctrl+J` | Toggle panel. | The bottom panel opens or closes. |
| `Cmd+Shift+E` | `Ctrl+Shift+E` | Open Explorer. | The Explorer view opens in the sidebar. |
| `Cmd+Shift+F` | `Ctrl+Shift+F` | Open Search. | The Search view opens in the sidebar. |
| `Ctrl+Shift+G` | `Ctrl+Shift+G` | Open Source Control. | The Source Control view opens in the sidebar. |
| `Cmd+Shift+X` | `Ctrl+Shift+X` | Open Extensions. | The Extensions view opens in the sidebar. |
| `Cmd+Shift+M` | `Ctrl+Shift+M` | Open Problems. | The Problems panel opens. |

## Code Navigation and Refactoring

| macOS | Windows/Linux | Purpose | Result |
| --- | --- | --- | --- |
| `Cmd+.` | `Ctrl+.` | Quick Fix. | Available fixes and refactors open. |
| `F2` | `F2` | Rename symbol. | A rename input appears at the symbol. |
| `F12` | `F12` | Go to definition. | The symbol definition opens in the editor. |
| `Option+F12` | `Alt+F12` | Peek definition. | An inline definition preview opens. |
| `Ctrl+Space` | `Ctrl+Space` | Trigger suggestions. | IntelliSense suggestions open at the cursor. |

## Debugging

| macOS | Windows/Linux | Purpose | Result |
| --- | --- | --- | --- |
| `F5` | `F5` | Start or continue debugging. | The debugger starts or resumes execution. |
| `Shift+F5` | `Shift+F5` | Stop debugging. | The debug session stops. |
| `F9` | `F9` | Toggle breakpoint. | A breakpoint is added or removed on the current line. |
| `F10` | `F10` | Step over. | The debugger runs the current line and pauses on the next line. |
| `F11` | `F11` | Step into. | The debugger enters the called function. |
| `Shift+F11` | `Shift+F11` | Step out. | The debugger finishes the current function and pauses in the caller. |
