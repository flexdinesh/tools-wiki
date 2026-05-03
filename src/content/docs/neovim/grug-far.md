---
title: grug-far
draft: false
head: []
---

Grug Far is the multi-file search and replace UI included in this LazyVim setup.

Open it with:

```vim
<leader>sr
```

Inside a Grug Far buffer, press:

```vim
g?
```

to show the built-in help and available actions.

## Basic layout

A Grug Far buffer has input fields like:

```text
Search:
Replace:
Files Filter:
Flags:
Paths:
```

- `Search:` text or regex to find
- `Replace:` replacement text
- `Files Filter:` glob filter, like `*.ts`, `*.tsx`, or `*.{ts,tsx}`
- `Flags:` ripgrep flags, like `-i`, `--fixed-strings`, or `--multiline`
- `Paths:` files or directories to search inside

## Basic multi-file replace

```text
Search: oldName
Replace: newName
Files Filter:
Flags:
Paths:
```

Then apply all replacements with:

```vim
<localleader>r
```

This is the **Replace** action and replaces every matching occurrence shown by the search.

## Replace in TypeScript files only

```text
Search: oldName
Replace: newName
Files Filter: *.{ts,tsx}
Flags:
Paths:
```

Use this when you only want TypeScript and TSX files.

## Replace only inside `apps/signup`

### Option 1: use `Paths:`

```text
Search: oldName
Replace: newName
Files Filter: *.{ts,tsx}
Flags:
Paths: apps/signup
```

This is good for one-off scoped replacements while keeping Neovim at the repo root.

### Option 2: set tab cwd first

```vim
:tcd apps/signup
```

Then open Grug Far:

```vim
<leader>sr
```

Check current cwd with:

```vim
:pwd
```

Return to the previous cwd with:

```vim
:tcd -
```

## Case-insensitive search

```text
Search: signup
Replace: registration
Files Filter: *.{ts,tsx}
Flags: -i
Paths: apps/signup
```

`-i` is ripgrep's ignore-case flag.

## Literal string replace

Use this when the search text contains regex characters like `.`, `(`, `)`, `[`, `]`, `?`, `+`, or `*` and you want to treat them literally.

```text
Search: foo.bar()
Replace: foo?.bar()
Files Filter: *.{ts,tsx}
Flags: --fixed-strings
Paths: apps/signup
```

Short form:

```text
Flags: -F
```

## Exact word replace

Use word boundaries to avoid replacing inside longer identifiers.

```text
Search: \boldName\b
Replace: newName
Files Filter: *.{ts,tsx}
Flags:
Paths: apps/signup
```

This avoids replacing strings like:

```text
veryOldName
oldNameSuffix
```

## Replace import paths

```text
Search: @/components/Button
Replace: @/ui/button
Files Filter: *.{ts,tsx}
Flags: --fixed-strings
Paths: apps/signup
```

`--fixed-strings` is useful for import paths because you usually want literal matching.

## Exclude test files

Try putting filters on separate lines:

```text
Search: oldName
Replace: newName
Files Filter: *.{ts,tsx}
!*.test.ts
!*.spec.ts
Flags:
Paths: apps/signup
```

If that feels too broad or too narrow, search broadly and then delete unwanted result lines or file groups before syncing.

# Replacing one by one in multiple files

For one-by-one replacement, do **not** use:

```vim
<localleader>r
```

That applies all replacements.

Instead, use Grug Far's **Apply Next** / **Apply Prev** actions.

## One-by-one workflow

1. Open Grug Far:

   ```vim
   <leader>sr
   ```

2. Fill the inputs:

   ```text
   Search: oldName
   Replace: newName
   Files Filter: *.{ts,tsx}
   Flags:
   Paths: apps/signup
   ```

3. Wait for the result preview/diff.

4. Move to the first result.

   Useful navigation:

   ```vim
   <down>
   ```

   opens/moves to the next result location.

   ```vim
   <up>
   ```

   opens/moves to the previous result location.

5. When the cursor is on a result you want to apply:

   ```vim
   <localleader>j
   ```

   This is **Apply Next**. It:
   - applies the current change
   - removes the applied result from the Grug Far buffer
   - moves to / opens the next change

6. Repeat:

   ```vim
   <localleader>j
   <localleader>j
   <localleader>j
   ```

   for each accepted replacement.

7. To skip a result, move past it with:

   ```vim
   <down>
   ```

   or navigate normally with `j` / `k`.

8. To apply going backward:

   ```vim
   <localleader>k
   ```

   This is **Apply Prev**.

## If your localleader is the default

If `maplocalleader` is not configured, your localleader is often `\`.

So these may be:

```vim
\r
```

Replace all.

```vim
\j
```

Apply next.

```vim
\k
```

Apply previous.

```vim
\c
```

Close Grug Far.

Check localleader with:

```vim
:echo maplocalleader
```

Inside Grug Far, the top action bar and `g?` help show the actual mappings.

# Important Grug Far actions

| Action           |      Default key | Meaning                                             |
| ---------------- | ---------------: | --------------------------------------------------- |
| Help             |             `g?` | Show help/actions                                   |
| Replace          | `<localleader>r` | Replace all                                         |
| Apply Next       | `<localleader>j` | Apply current change, remove it, go next            |
| Apply Prev       | `<localleader>k` | Apply current change, remove it, go previous        |
| Sync Line        | `<localleader>l` | Sync current edited result line                     |
| Sync All         | `<localleader>s` | Sync all edited result lines                        |
| Sync File        | `<localleader>v` | Sync changes in current file group                  |
| Open location    | `<localleader>o` | Open current result while keeping focus in Grug Far |
| Preview location | `<localleader>i` | Preview current result                              |
| Open next        |         `<down>` | Move/open next result                               |
| Open previous    |           `<up>` | Move/open previous result                           |
| Quickfix         | `<localleader>q` | Send results to quickfix                            |
| Refresh          | `<localleader>f` | Re-run search                                       |
| Abort            | `<localleader>b` | Stop running search/replace                         |
| Close            | `<localleader>c` | Close Grug Far                                      |

# Alternative workflow: edit result list, then sync

This is useful when you want to accept most changes but exclude a few.

1. Fill `Search:` and `Replace:`.
2. Let Grug Far show the diff.
3. Delete result lines or file groups that you **do not** want to apply.
4. Run:

   ```vim
   <localleader>s
   ```

   This is **Sync All**.

`Sync All` syncs the remaining edited result lines back to their source files.

Use this distinction:

- `<localleader>r` = replace all using the search engine
- `<localleader>s` = sync the edited result list back to files
- `<localleader>j` = apply one change and move forward

# Recommended safe workflow

For risky multi-file replacements:

```vim
<leader>sr
```

Fill:

```text
Search: oldName
Replace: newName
Files Filter: *.{ts,tsx}
Flags:
Paths: apps/signup
```

Then:

1. Preview/navigate with `<down>` / `<up>`.
2. Apply accepted changes one by one with `<localleader>j`.
3. Skip unwanted ones by moving past them.
4. Close with `<localleader>c`.

Only use `<localleader>r` when you are confident all replacements are correct.
