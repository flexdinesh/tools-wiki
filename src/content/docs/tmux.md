---
title: tmux
draft: false
head: []
---

## Sessions

### Start a session

Start a new session in the current terminal.

```bash
$ tmux new
```

Start a new session with a specific name.

```bash
$ tmux new -s mysession
```

Start a new session or attach to an existing session with the same name.

```bash
$ tmux new-session -A -s mysession
```

### Detach from a session

Keeps the session running in the background. The terminal returns to the parent shell.

```
Ctrl+b d
```

Detach other clients connected to the same session (maximises your view).

```bash
$ tmux attach -d
```

### Attach to a session

Reconnect to the last running session.

```bash
$ tmux attach
$ tmux a
```

Reconnect to a specific session.

```bash
$ tmux attach -t mysession
$ tmux a -t mysession
```

### List sessions

Show all running sessions with their window counts and creation times.

```
Ctrl+b s
```

```bash
$ tmux ls
mysession: 3 windows (created Sun May  3 17:47:30 2026) (attached)

$ tmux list-sessions
mysession: 3 windows (created Sun May  3 17:47:30 2026) (attached)
```

### Navigate between sessions

Move to the previous session. The status bar updates to show the new session name.

```
Ctrl+b (
```

Move to the next session. The status bar updates to show the new session name.

```
Ctrl+b )
```

Show session and window preview for interactive selection. A navigable list appears at the bottom of the terminal.

```
Ctrl+b w
```

### Rename a session

The status bar prompts for a new session name.

```
Ctrl+b $
```

### Kill a session

Kill the highlighted session from session preview mode. Use `j` / `k` to navigate, `x` to kill, and `y` to confirm.

```
Ctrl+b s
j / k
x
y
```

Example confirmation prompt:

```text
kill-session mysession? (y/n)
```

Kill the current session.

```bash
$ tmux kill-session
```

Kill a named session.

```bash
$ tmux kill-session -t mysession
```

Kill all sessions except the current one.

```bash
$ tmux kill-session -a
```

Kill all sessions except a named session.

```bash
$ tmux kill-session -a -t mysession
```

---

## Windows

### Create a window

A new empty window opens with a shell prompt. The status bar shows the new window index.

```
Ctrl+b c
```

Start a new session with a named window.

```bash
$ tmux new -s mysession -n mywindow
```

### Navigate windows

Switch to the previous window.

```
Ctrl+b p
```

Switch to the next window.

```
Ctrl+b n
```

Switch to a window by number.

```
Ctrl+b 0 ... Ctrl+b 9
```

Toggle the last active window.

```
Ctrl+b l
```

Open a navigable session and window list for interactive selection.

```
Ctrl+b w
```

Open the window actions menu at the bottom of the terminal.

```
Ctrl+b <
```

### Rename a window

The status bar prompts for a new window name.

```
Ctrl+b ,
```

### Close a window

A confirmation prompt appears: `kill-window window#? (y/n)`.

```
Ctrl+b &
```

Kill the highlighted window from window preview mode. Use `j` / `k` to navigate, `x` to kill, and `y` to confirm.

```
Ctrl+b w
j / k
x
y
```

Example confirmation prompt:

```text
kill-window window#? (y/n)
```

### Reorder windows

Swap window number 2 with window number 1.

```bash
$ tmux swap-window -s 2 -t 1
```

Move the current window one position to the left.

```bash
$ tmux swap-window -t -1
```

### Move windows

Move a window from one session to another.

```bash
$ tmux move-window -s src_session:src_window -t target_session:target_window
```

Short form aliases:

```bash
$ tmux movew -s foo:0 -t bar:9
$ tmux movew -s 0:0 -t 1:9
```

Renumber windows to remove gaps in the numbering sequence.

```bash
$ tmux move-window -r
$ tmux movew -r
```

### Convert pane to window

The current pane detaches from its window and becomes a new window in the same session.

```
Ctrl+b !
```

---

## Panes

### Split panes

Split the current pane vertically (side-by-side layout). A new pane with a shell prompt appears on the right.

```
Ctrl+b %
```

```bash
$ tmux split-window -h
```

Split the current pane horizontally (stacked layout). A new pane with a shell prompt appears below.

```
Ctrl+b "
```

```bash
$ tmux split-window -v
```

### Navigate panes

Switch to the next pane in order.

```
Ctrl+b o
```

Switch to a pane by direction (↑ ↓ → ←).

```
Ctrl+b ↑
Ctrl+b ↓
Ctrl+b →
Ctrl+b ←
```

Show pane numbers briefly overlaid on each pane, then switch by number.

```
Ctrl+b q
Ctrl+b q 0 ... Ctrl+b q 9
```

Toggle the last active pane.

```
Ctrl+b ;
```

### Resize panes

Resize the current pane height (hold the second key for continuous resize).

```
Ctrl+b + ↑
Ctrl+b + ↓

Ctrl+b Ctrl+↑
Ctrl+b Ctrl+↓
```

Resize the current pane width (hold the second key for continuous resize).

```
Ctrl+b + →
Ctrl+b + ←

Ctrl+b Ctrl+→
Ctrl+b Ctrl+←
```

### Move and swap panes

Move the current pane to the left (swaps with the pane on its left).

```
Ctrl+b {
```

Move the current pane to the right (swaps with the pane on its right).

```
Ctrl+b }
```

### Layout and zoom

Cycle through built-in pane layouts (even-horizontal, even-vertical, main-horizontal, main-vertical, tiled).

```
Ctrl+b Spacebar
```

Toggle pane zoom — the current pane expands to fill the full window. Press again to restore the previous layout.

```
Ctrl+b z
```

### Join and close panes

Merge window 2 into window 1 as panes.

```bash
$ tmux join-pane -s 2 -t 1
```

Move a specific pane from one window to another (pane 1 from window 2 into window 1 after pane 0).

```bash
$ tmux join-pane -s 2.1 -t 1.0
```

Close the current pane. A confirmation prompt appears: `kill-pane pane#? (y/n)`.

```
Ctrl+b x
```

Open the pane actions menu at the bottom of the terminal.

```
Ctrl+b >
```

### Synchronize panes

Toggle sending the same keystrokes to all panes in the current window. Useful for running identical commands across multiple split panes.

```bash
$ tmux setw synchronize-panes
```

---

## Copy Mode

Enter copy mode to scroll through and copy text from the terminal history.

### Enter and exit copy mode

Enter copy mode (scrollable view of the pane's scrollback buffer).

```
Ctrl+b [
```

Enter copy mode and scroll one page up.

```
Ctrl+b PgUp
```

Quit copy mode and return to the active shell.

```
q
```

### Navigation

Use vi-style keys to navigate within copy mode:

Go to the top line.

```
g
```

Go to the bottom line.

```
G
```

Scroll up one line.

```
↑  (or k)
```

Scroll down one line.

```
↓  (or j)
```

Move cursor left.

```
h
```

Move cursor down.

```
j
```

Move cursor up.

```
k
```

Move cursor right.

```
l
```

Move cursor forward one word at a time.

```
w
```

Move cursor backward one word at a time.

```
b
```

### Search

Search forward — a `/` prompt appears at the bottom. Type a pattern and press Enter.

```
/
```

Search backward — a `?` prompt appears at the bottom. Type a pattern and press Enter.

```
?
```

Jump to the next match.

```
n
```

Jump to the previous match.

```
N
```

### Copy and paste

Start text selection at the cursor position.

```
Spacebar
```

Clear the current selection.

```
Esc
```

Copy the current selection into the paste buffer and exit copy mode.

```
Enter
```

Paste the contents of the most recent paste buffer at the cursor.

```
Ctrl+b ]
```

---

## Buffers

### Show buffers

List all paste buffers with their sizes and previews.

```bash
$ tmux list-buffers
buffer1: 3 bytes: "far"
buffer0: 89 bytes: "let's convert the cheatsheet in this website into tmux doc"
```

Display the contents of the most recent paste buffer.

```bash
$ tmux show-buffer
far
```

Open an interactive buffer chooser to preview and select a buffer to paste.

```bash
$ tmux choose-buffer
```

### Copy pane contents

Copy the entire visible contents of the current pane into a new paste buffer.

```bash
$ tmux capture-pane
```

### Save and delete buffers

Save the most recent buffer contents to a file.

```bash
$ tmux save-buffer buf.txt
```

Delete a specific buffer by index (buffer 1).

```bash
$ tmux delete-buffer -b 1
```

---

## Configuration

### Reload config

Apply changes from the tmux configuration file without restarting the server.

```bash
$ tmux source-file ~/.tmux.conf
```

### Set global options

Set an option for all sessions.

```bash
$ tmux set -g OPTION
```

Set an option for all windows.

```bash
$ tmux setw -g OPTION
```

### Enable mouse mode

Allow mouse selection, pane resizing, and window selection.

```bash
$ tmux set mouse on
```

### Use vi keys in copy mode

Enable vi-style key bindings for copy mode navigation.

```bash
$ tmux setw -g mode-keys vi
```

### Rebind the prefix key

Change the default prefix from `Ctrl+b` to `Ctrl+a` (common in `~/.tmux.conf`):

```bash
$ tmux set -g prefix C-a
$ tmux unbind C-b
$ tmux bind C-a send-prefix
```

### Set base index

Start window numbering at 1 instead of 0.

```bash
$ tmux set -g base-index 1
$ tmux setw -g pane-base-index 1
```

### Increase scrollback

Set the number of lines kept in the scrollback buffer for each pane.

```bash
$ tmux set -g history-limit 10000
```

### Enable 256 colors

Set the terminal type for correct colour support.

```bash
$ tmux set -g default-terminal "screen-256color"
```

---

## Status Bar

### Customize the status bar

Set the left and right sides of the status bar with format strings.

```bash
$ tmux set -g status-left "#[fg=green]#S "
$ tmux set -g status-right "#[fg=yellow]%d %b %H:%M"
$ tmux setw -g window-status-format " #I:#W "
$ tmux setw -g window-status-current-format "#[fg=white,bold] #I:#W "
```

### Toggle status bar

Hide the status bar.

```bash
$ tmux set -g status off
```

Show the status bar.

```bash
$ tmux set -g status on
```

### Style the status bar

Set background and foreground colours for the status bar.

```bash
$ tmux set -g status-style bg=colour235,fg=white
```

Set the position to top of the terminal instead of bottom.

```bash
$ tmux set -g status-position top
```

---

## Scripting

### Check if a session exists

Exit code `0` means the session exists, `1` means it does not. Useful in shell scripts.

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

Create a new window that runs a command (the window closes when the command exits).

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

### List key bindings

Show all key bindings and their descriptions in a scrollable view.

```
Ctrl+b ?
```

```bash
$ tmux list-keys
bind-key    -T copy-mode    Escape                    send-keys -X cancel
bind-key    -T copy-mode    Space                     send-keys -X page-down
bind-key    -T copy-mode    ,                         send-keys -X jump-reverse
bind-key    -T copy-mode    \;                        send-keys -X jump-again
...
```

Run from within tmux command mode:

```
:list-keys
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

```bash
$ tmux -V
tmux 3.6a
```

### Enter command mode

Open the tmux command prompt at the bottom of the terminal. Type any tmux command and press Enter.

```
Ctrl+b :
```