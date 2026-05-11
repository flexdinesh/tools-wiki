---
title: tmux
description: Sessions, windows, panes, copy mode, buffers, configuration, status bar, and scripting.
---

## Sessions

Create, attach, switch, and remove sessions.

Note: `Ctrl+b` is the default prefix. If you use a custom prefix, use that.

Note: Any command shown as `tmux {command}` can also run from tmux command mode with `Ctrl+b :`, then `{command}`. For example, `tmux new` in the shell is the same as `Ctrl+b :new` within a session.

| Key | Purpose | Result |
| --- | --- | --- |
| `Ctrl+b d` | Detach from the current session. | The session keeps running in the background and the terminal returns to the parent shell. |
| `Ctrl+b s` | Open session interactive mode. | A navigable list of sessions appears. |
| `Ctrl+b (` | Move to the previous session. | The status bar updates to show the previous session name. |
| `Ctrl+b )` | Move to the next session. | The status bar updates to show the next session name. |
| `Ctrl+b w` | Open session/window interactive mode. | A navigable session/window tree appears at the bottom of the terminal. |
| `Ctrl+b $` | Rename the current session. | The status bar prompts for a new session name. |

### Start an unnamed session

Start a new unnamed session in the current terminal.

```bash
$ tmux new
```

### Start a named session

Start a new session with a specific name.

```bash
$ tmux new -s mysession
```

### Start or attach to a named session

Start a new session, or attach to an existing session with the same name.

```bash
$ tmux new-session -A -s mysession
```

### Attach to the latest session

Reconnect to the last running session.

```bash
$ tmux attach
$ tmux a
```

### Attach to a named session

Reconnect to a specific session.

```bash
$ tmux attach -t mysession
$ tmux a -t mysession
```

### Attach and detach other clients

Attach to a session and detach other clients connected to it, which maximizes your view.

```bash
$ tmux attach -d
```

### List sessions

Show all running sessions with their window counts and creation times.

```bash
$ tmux ls
mysession: 3 windows (created Sun May  3 17:47:30 2026) (attached)

$ tmux list-sessions
mysession: 3 windows (created Sun May  3 17:47:30 2026) (attached)
```

### Kill the current session

Kill the current session.

```bash
$ tmux kill-session
```

### Kill a named session

Kill a named session.

```bash
$ tmux kill-session -t mysession
```

### Kill all other sessions

Kill all sessions except the current one.

```bash
$ tmux kill-session -a
```

### Kill all sessions except one

Kill all sessions except a named session.

```bash
$ tmux kill-session -a -t mysession
```

### Select a session from interactive mode

Open session interactive mode and switch to a highlighted session.

```bash
# Press Ctrl+b s to enter session interactive mode.
# Use j / k to move through sessions.
# Press Enter to switch to the highlighted session.
```

### Kill a session from interactive mode

Kill the highlighted session from session interactive mode.

```bash
# Press Ctrl+b s to enter session interactive mode.
# Use j / k to move through sessions.
# Press x to kill the highlighted session.
# Press y to confirm when prompted.

# Example confirmation prompt:
# kill-session mysession? (y/n)
```

---

## Windows

Create, move, select, and close windows.

| Key | Purpose | Result |
| --- | --- | --- |
| `Ctrl+b c` | Create a new window. | A new empty window opens with a shell prompt. |
| `Ctrl+b p` | Switch to the previous window. | The previous window becomes active. |
| `Ctrl+b n` | Switch to the next window. | The next window becomes active. |
| `Ctrl+b 0 ... Ctrl+b 9` | Switch to a window by number. | The numbered window becomes active. |
| `Ctrl+b l` | Toggle the last active window. | The previously active window opens. |
| `Ctrl+b w` | Open session/window interactive mode. | A navigable session and window tree appears for interactive selection. |
| `Ctrl+b <` | Open the window actions menu. | Window actions appear at the bottom of the terminal. |
| `Ctrl+b ,` | Rename the current window. | The status bar prompts for a new window name. |
| `Ctrl+b &` | Close the current window. | A confirmation prompt appears: `kill-window window#? (y/n)`. |
| `Ctrl+b !` | Convert the current pane to a window. | The current pane detaches and becomes a new window in the same session. |

### Start a session with a named window

Start a new session with a named window.

```bash
$ tmux new -s mysession -n mywindow
```

### Swap two windows

Swap window number 2 with window number 1.

```bash
$ tmux swap-window -s 2 -t 1
```

### Move the current window left

Move the current window one position to the left.

```bash
$ tmux swap-window -t -1
```

### Move a window between sessions

Move a window from one session to another.

```bash
$ tmux move-window -s src_session:src_window -t target_session:target_window
```

### Move windows with short aliases

Use short-form aliases to move windows between sessions.

```bash
$ tmux movew -s foo:0 -t bar:9
$ tmux movew -s 0:0 -t 1:9
```

### Renumber windows

Renumber windows to remove gaps in the numbering sequence.

```bash
$ tmux move-window -r
$ tmux movew -r
```

### Select a window from interactive mode

Open session/window interactive mode and switch to a highlighted window.

```bash
# Press Ctrl+b w to enter session/window interactive mode.
# Use j / k to move through sessions and windows.
# Press Enter to switch to the highlighted window.
```

### Kill a window from interactive mode

Kill the highlighted window from window interactive mode.

```bash
# Press Ctrl+b w to enter session/window interactive mode.
# Use j / k to move through windows.
# Press x to kill the highlighted window.
# Press y to confirm when prompted.

# Example confirmation prompt:
# kill-window window#? (y/n)
```

---

## Panes

Split, move, resize, and synchronize panes.

| Key | Purpose | Result |
| --- | --- | --- |
| `Ctrl+b %` | Split the current pane vertically. | A new side-by-side pane opens on the right. |
| `Ctrl+b "` | Split the current pane horizontally. | A new stacked pane opens below. |
| `Ctrl+b o` | Switch to the next pane. | Focus moves to the next pane in order. |
| `Ctrl+b ↑ / ↓ / → / ←` | Switch panes by direction. | Focus moves to the pane in the selected direction. |
| `Ctrl+b q` | Show pane numbers. | Pane numbers briefly overlay each pane. |
| `Ctrl+b q 0 ... Ctrl+b q 9` | Switch to a pane by number. | Focus moves to the numbered pane. |
| `Ctrl+b ;` | Toggle the last active pane. | Focus returns to the previously active pane. |
| `Ctrl+b + ↑ / ↓` | Resize pane height. | The current pane grows or shrinks vertically. |
| `Ctrl+b + → / ←` | Resize pane width. | The current pane grows or shrinks horizontally. |
| `Ctrl+b Ctrl+↑ / Ctrl+↓ / Ctrl+→ / Ctrl+←` | Resize continuously. | Hold the arrow key for continuous resizing. |
| `Ctrl+b {` | Move the current pane left. | The pane swaps with the pane on its left. |
| `Ctrl+b }` | Move the current pane right. | The pane swaps with the pane on its right. |
| `Ctrl+b Spacebar` | Cycle built-in layouts. | The window cycles through even-horizontal, even-vertical, main-horizontal, main-vertical, and tiled layouts. |
| `Ctrl+b z` | Toggle pane zoom. | The current pane expands to fill the window, or restores the previous layout. |
| `Ctrl+b x` | Close the current pane. | A confirmation prompt appears: `kill-pane pane#? (y/n)`. |
| `Ctrl+b >` | Open the pane actions menu. | Pane actions appear at the bottom of the terminal. |

### Split panes vertically from the command line

Split the current pane vertically from the command line.

```bash
$ tmux split-window -h
```

### Split panes horizontally from the command line

Split the current pane horizontally from the command line.

```bash
$ tmux split-window -v
```

### Merge one window into another

Merge window 2 into window 1 as panes.

```bash
$ tmux join-pane -s 2 -t 1
```

### Move a pane between windows

Move a specific pane from one window to another, such as pane 1 from window 2 into window 1 after pane 0.

```bash
$ tmux join-pane -s 2.1 -t 1.0
```

### Synchronize panes

Toggle sending the same keystrokes to all panes in the current window. This is useful for running identical commands across multiple split panes.

```bash
$ tmux setw synchronize-panes
```

---

## Copy Mode

Scroll and copy terminal history.

| Key | Purpose | Result |
| --- | --- | --- |
| `Ctrl+b [` | Enter copy mode. | The pane opens a scrollable view of its scrollback buffer. |
| `Ctrl+b PgUp` | Enter copy mode one page up. | Copy mode opens and scrolls one page up. |
| `q` | Quit copy mode. | The active shell returns. |
| `g` | Go to the top line. | The cursor jumps to the top of the scrollback buffer. |
| `G` | Go to the bottom line. | The cursor jumps to the bottom of the scrollback buffer. |
| `↑` / `k` | Scroll or move up. | The cursor moves up one line. |
| `↓` / `j` | Scroll or move down. | The cursor moves down one line. |
| `h` | Move left. | The cursor moves one character left. |
| `j` | Move down. | The cursor moves one line down. |
| `k` | Move up. | The cursor moves one line up. |
| `l` | Move right. | The cursor moves one character right. |
| `w` | Move forward by word. | The cursor moves to the next word. |
| `b` | Move backward by word. | The cursor moves to the previous word. |
| `/` | Search forward. | A `/` prompt appears at the bottom; type a pattern and press Enter. |
| `?` | Search backward. | A `?` prompt appears at the bottom; type a pattern and press Enter. |
| `n` | Jump to the next match. | The cursor moves to the next search match. |
| `N` | Jump to the previous match. | The cursor moves to the previous search match. |
| `Spacebar` | Start selection. | Text selection starts at the cursor position. |
| `Esc` | Clear selection. | The current selection is cleared. |
| `Enter` | Copy selection. | The selection is copied into the paste buffer and copy mode exits. |
| `Ctrl+b ]` | Paste buffer. | The most recent paste buffer is pasted at the cursor. |

---

## Buffers

List, inspect, paste, and save buffers.

| Command | Purpose | Result |
| --- | --- | --- |
| `tmux list-buffers` | List paste buffers. | Buffer names, sizes, and content snippets are printed. |
| `tmux show-buffer` | Display the most recent paste buffer. | The buffer contents are printed. |
| `tmux choose-buffer` | Open buffer interactive mode. | An interactive buffer list opens for selecting and pasting buffers. |
| `tmux capture-pane` | Copy visible pane contents. | The visible contents of the current pane are copied into a new paste buffer. |
| `tmux save-buffer buf.txt` | Save the most recent buffer to a file. | The buffer contents are written to `buf.txt`. |
| `tmux delete-buffer -b 1` | Delete buffer 1. | The selected paste buffer is removed. |

### List buffers

List all paste buffers with their sizes and content snippets.

```bash
$ tmux list-buffers
buffer1: 3 bytes: "far"
buffer0: 89 bytes: "let's convert the cheatsheet in this website into tmux doc"
```

### Show the latest buffer

Display the contents of the most recent paste buffer.

```bash
$ tmux show-buffer
far
```

### Select and paste a buffer

Open buffer interactive mode to select a buffer to paste.

```bash
$ tmux choose-buffer
# Use j / k to move through buffers.
# Press Enter to paste the highlighted buffer.
# Press q to close interactive mode without pasting.
```

---

## Configuration

Adjust tmux options and reload config.

| Command | Purpose | Result |
| --- | --- | --- |
| `tmux source-file ~/.tmux.conf` | Reload the tmux config. | Changes apply without restarting the tmux server. |
| `tmux set -g OPTION` | Set a global session option. | The option applies to all sessions. |
| `tmux setw -g OPTION` | Set a global window option. | The option applies to all windows. |
| `tmux set mouse on` | Enable mouse mode. | Mouse selection, pane resizing, and window selection are enabled. |
| `tmux setw -g mode-keys vi` | Use vi keys in copy mode. | Copy mode uses vi-style navigation bindings. |
| `tmux set -g history-limit 10000` | Increase scrollback. | Each pane keeps 10,000 lines of scrollback history. |
| `tmux set -g default-terminal "screen-256color"` | Enable 256-color terminal support. | tmux advertises `screen-256color` for better color compatibility. |

### Rebind the prefix key

Change the default prefix from `Ctrl+b` to `Ctrl+a`. These commands are commonly placed in `~/.tmux.conf`.

```bash
$ tmux set -g prefix C-a
$ tmux unbind C-b
$ tmux bind C-a send-prefix
```

### Set base index

Start window and pane numbering at 1 instead of 0.

```bash
$ tmux set -g base-index 1
$ tmux setw -g pane-base-index 1
```

---

## Status Bar

Show, hide, move, and style the status bar.

| Command | Purpose | Result |
| --- | --- | --- |
| `tmux set -g status off` | Hide the status bar. | The status bar disappears. |
| `tmux set -g status on` | Show the status bar. | The status bar appears. |
| `tmux set -g status-style bg=colour235,fg=white` | Style the status bar. | The status bar uses the configured background and foreground colors. |
| `tmux set -g status-position top` | Move the status bar to the top. | The status bar appears at the top of the terminal instead of the bottom. |

### Customize the status bar

Set the left and right sides of the status bar with format strings, then customize inactive and active window labels.

```bash
$ tmux set -g status-left "#[fg=green]#S "
$ tmux set -g status-right "#[fg=yellow]%d %b %H:%M"
$ tmux setw -g window-status-format " #I:#W "
$ tmux setw -g window-status-current-format "#[fg=white,bold] #I:#W "
```

---

## Scripting

Automate sessions, panes, and windows.

### Check if a session exists

Exit code `0` means the session exists, and exit code `1` means it does not. This is useful in shell scripts.

```bash
$ tmux has-session -t mysession && echo "exists" || echo "not found"
not found
```

### Send keys to a pane

Simulate typing a command into a specific pane.

```bash
$ tmux send-keys -t mysession:0.0 'ls -la' Enter
```

### Run a command in a new window

Create a new window that runs a command. The window closes when the command exits.

```bash
$ tmux new-window -n logs 'tail -f /var/log/syslog'
```

### Run a command in a split pane

Split the current pane and run a command in the new pane.

```bash
$ tmux split-window -h 'htop'
```

### Capture pane contents to a file

Dump the full scrollback history of a pane to a file.

```bash
$ tmux capture-pane -pS - > output.txt
```

### List all pane PIDs

Print the process ID of the shell running in each pane.

```bash
$ tmux list-panes -a -F '#{pane_pid}'
12345
67890
```

---

## Help

Inspect commands, key bindings, and tmux state.

| Key | Purpose | Result |
| --- | --- | --- |
| `Ctrl+b ?` | List key bindings. | Key bindings and descriptions open in a scrollable view. |
| `Ctrl+b :` | Enter command mode. | A tmux command prompt opens at the bottom of the terminal. |
| `:list-keys` | List keys from command mode. | Key bindings are shown from within tmux command mode. |

### List key bindings

Show all key bindings and their descriptions.

```bash
$ tmux list-keys
bind-key    -T copy-mode    Escape                    send-keys -X cancel
bind-key    -T copy-mode    Space                     send-keys -X page-down
bind-key    -T copy-mode    ,                         send-keys -X jump-reverse
bind-key    -T copy-mode    \;                        send-keys -X jump-again
...
```

### Show tmux info

Display every session, window, pane, and terminal capability.

```bash
$ tmux info
Terminal 0: xterm-ghostty for /dev/pts/0, flags=0x34:
   0: acsc: (string) ++,,--..00``aaffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz{{||}}~~
   1: am: (flag) true
   2: AX: (flag) true
   3: bce: (flag) true
   4: bel: (string) \a
...
```

### Check tmux version

Check the installed tmux version.

```bash
$ tmux -V
tmux 3.6a
```

---

## Popular use cases

Use `tmux` to keep workspaces, logs, and remote sessions alive across terminals.

### Start a persistent project workspace

Create a named session with a named first window.

```bash
$ tmux new -s api -n server
```

### Reopen your main workspace

Create or attach to a default `main` session. Use this as a daily terminal entrypoint so the same workspace is reused across terminal restarts, SSH reconnects, and machine sessions.

```bash
$ tmux new-session -A -s main
```

### Run logs in a split pane

Split the current window and start a log command in the new pane.

```bash
$ tmux split-window -h
$ tmux send-keys 'tail -f app.log' C-m
```

### Keep a remote process attached to a session

SSH to a server and attach to a long-running tmux session.

```bash
$ ssh deploy@example.com
$ tmux attach -t app
```

### Search captured pane output

Capture recent pane contents and pipe them into `grep`.

```bash
$ tmux capture-pane -p -S -2000 | grep ERROR
2026-05-06 10:14:22 ERROR database connection failed
```

### List pane PIDs for debugging

Print every pane with the PID of its foreground process.

```bash
$ tmux list-panes -a -F '#{session_name}:#{window_index}.#{pane_index} #{pane_pid}'
api:0.0 12345
api:0.1 12346
```
