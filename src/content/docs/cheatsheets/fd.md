---
title: fd
description: Find files by pattern, extension, type, depth, ignore rules, and run commands on matches.
---

`fd` finds filesystem entries quickly with sensible defaults. It respects ignore files, skips hidden paths by default, and uses regex patterns unless glob mode is enabled.

## Install

### Install on macOS

Install `fd` with Homebrew.

```bash
$ brew install fd
```

### Install on Debian or Ubuntu

Install the Debian package. The binary is usually named `fdfind` because another package owns `fd`.

```bash
$ sudo apt install fd-find
```

### Link fdfind to fd

Create an `fd` symlink if your package installs the binary as `fdfind`.

```bash
$ mkdir -p ~/.local/bin
$ ln -s "$(which fdfind)" ~/.local/bin/fd
```

### Install on Arch Linux

Install `fd` from the official repositories.

```bash
$ sudo pacman -S fd
```

### Install with Cargo

Install `fd` from source with Rust's package manager.

```bash
$ cargo install fd-find
```

## Basics

### List the current tree

Run `fd` with no pattern to list entries recursively under the current directory.

```bash
$ fd
README.md
package.json
src
src/index.ts
```

### Search by name

Pass a pattern to find entries whose filenames contain the pattern.

```bash
$ fd config
src/config.ts
config/example.json
```

### Search a path

Pass a directory after the pattern to limit the search root.

```bash
$ fd test src
src/api.test.ts
src/components/Button.test.tsx
```

### List a specific path recursively

Use a catch-all pattern such as `.` when searching a specific path without narrowing names.

```bash
$ fd . docs
docs/index.md
docs/install.md
```

## Patterns

### Search with regex

Patterns are regular expressions by default.

```bash
$ fd '^test_.*\.py$'
test_api.py
tests/test_auth.py
```

### Search with a glob

Use `--glob` or `-g` when the pattern should be treated as a glob.

```bash
$ fd --glob '*.md'
README.md
docs/install.md

$ fd -g '*.md'
README.md
docs/install.md
```

### Match the full path

Use `--full-path` or `-p` to match against the whole path instead of only the filename.

```bash
$ fd --full-path 'components/.+\.tsx$'
src/components/Button.tsx

$ fd -p 'components/.+\.tsx$'
src/components/Button.tsx
```

### Ignore case

Use `--ignore-case` or `-i` to force case-insensitive matching.

```bash
$ fd --ignore-case readme
README.md

$ fd -i readme
README.md
```

### Force case-sensitive search

Use `--case-sensitive` or `-s` to force exact case matching.

```bash
$ fd --case-sensitive README
README.md

$ fd -s README
README.md
```

## Types and Filters

### Find files by extension

Use `--extension` or `-e` to match a file extension.

```bash
$ fd --extension ts
src/index.ts
src/config.ts

$ fd -e ts
src/index.ts
src/config.ts
```

### Combine extension and pattern

Combine `-e` with a pattern to find matching files of a specific type.

```bash
$ fd -e ts config
src/config.ts
tests/config.test.ts
```

### Find regular files

Use `--type file` or `-t f` to print files only.

```bash
$ fd --type file
README.md
src/index.ts

$ fd -t f
README.md
src/index.ts
```

### Find directories

Use `--type directory` or `-t d` to print directories only.

```bash
$ fd --type directory
src
src/components

$ fd -t d
src
src/components
```

### Limit search depth

Use `--max-depth` or `-d` to stop traversal after a fixed depth.

```bash
$ fd --max-depth 1
README.md
package.json
src

$ fd -d 1
README.md
package.json
src
```

### Find by size

Use `--size` to filter files by size.

```bash
$ fd --type file --size +10m
videos/demo.mov
backup/archive.tar
```

### Find recently changed files

Use `--changed-within` to find files modified within a duration or date range.

```bash
$ fd --type file --changed-within 7d
src/index.ts
docs/changelog.md
```

### Find older files

Use `--changed-before` to find files older than a duration or date.

```bash
$ fd --type file --changed-before 30d
archive/notes.txt
old/report.pdf
```

## Hidden, Ignored, and Excluded Paths

### Search hidden files

Use `--hidden` or `-H` to include hidden files and directories.

```bash
$ fd --hidden pre-commit
.git/hooks/pre-commit.sample

$ fd -H pre-commit
.git/hooks/pre-commit.sample
```

### Search ignored files

Use `--no-ignore` or `-I` to include paths ignored by `.gitignore`, `.ignore`, or `.fdignore`.

```bash
$ fd --no-ignore generated
dist/generated/client.js

$ fd -I generated
dist/generated/client.js
```

### Search hidden and ignored files

Combine `-H` and `-I`, or use `--unrestricted` / `-u`, to search more broadly.

```bash
$ fd -HI API_KEY
.env
dist/config.js

$ fd --unrestricted API_KEY
.env
dist/config.js

$ fd -u API_KEY
.env
dist/config.js
```

### Exclude a pattern

Use `--exclude` or `-E` to skip files or directories matching a glob.

```bash
$ fd --exclude node_modules config
src/config.ts

$ fd -E node_modules config
src/config.ts
```

### Exclude generated files

Repeat `-E` for multiple exclude globs.

```bash
$ fd -E node_modules -E dist -E '*.map' source
src/source.ts
```

## Output

### Print absolute paths

Use `--absolute-path` or `-a` to print absolute paths.

```bash
$ fd --absolute-path README
/Users/alice/project/README.md

$ fd -a README
/Users/alice/project/README.md
```

### Show long listing details

Use `--list-details` or `-l` to show metadata with an `ls`-style listing.

```bash
$ fd --list-details README
-rw-r--r--  1 alice  staff   612 May  6 10:15 README.md

$ fd -l README
-rw-r--r--  1 alice  staff   612 May  6 10:15 README.md
```

### Control color output

Use `--color` to choose when colors are printed.

```bash
$ fd --color never README
README.md
```

### Format output

Use `--format` to print each result with a custom template.

```bash
$ fd --format '{//}/{/.}' -e ts
src/index
src/config
```

### Print null-delimited paths

Use `-0` when piping paths to tools that support null-delimited input.

```bash
$ fd -0 -e rs | xargs -0 wc -l
    120 src/main.rs
     48 src/config.rs
    168 total
```

## Run Commands on Matches

### Run a command for each match

Use `--exec` or `-x` to run a command once per result. `fd` appends the result path when no placeholder is provided.

```bash
$ fd --extension zip --exec unzip

$ fd -e zip -x unzip
```

### Run one command with all matches

Use `--exec-batch` or `-X` to run one command with all results as arguments.

```bash
$ fd --glob 'test_*.py' --exec-batch vim

$ fd -g 'test_*.py' -X vim
```

### Format matching source files

Put `-x` last so following arguments belong to the executed command.

```bash
$ fd -e h -e cpp -x clang-format -i
```

### Use placeholders

Use `{}` for the path and `{.}` for the path without extension.

```bash
$ fd -e jpg -x convert '{}' '{.}.png'
```

### Use basename placeholders

Use `{/}` for the basename and `{/.}` for the basename without extension.

```bash
$ fd -e md -x printf '%s -> %s\n' '{/}' '{/.}'
README.md -> README
install.md -> install
```

### Use parent directory placeholder

Use `{//}` for the parent directory of the matched path.

```bash
$ fd -e log -x printf '%s\n' '{//}'
logs
tmp
```

### Run serially

Use `--threads 1` when `-x` commands must run one at a time.

```bash
$ fd -e sql --threads 1 -x psql -f
```

## Common Pipelines

### Search inside a file set with ripgrep

Use `fd -X rg` to search within files selected by `fd`.

```bash
$ fd -e cpp -e h -X rg 'std::cout'
src/main.cpp:12:std::cout << "hello";
```

### Count lines in matching files

Use null-delimited output with `xargs -0` for safe path handling.

```bash
$ fd -0 -e ts | xargs -0 wc -l
     42 src/index.ts
     18 src/config.ts
     60 total
```

### Print matches as a tree

Pipe `fd` output to `tree --fromfile` to render selected paths as a tree.

```bash
$ fd -e rs | tree --fromfile
.
├── build.rs
└── src
    ├── app.rs
    └── error.rs
```

### Preview files before deleting

Run `fd` without `rm` first, then add `-X rm -i` for interactive deletion.

```bash
$ fd -H '^\.DS_Store$' -t f
.DS_Store
docs/.DS_Store

$ fd -H '^\.DS_Store$' -t f -X rm -i
remove .DS_Store?
```

## Troubleshooting

### Find hidden or ignored files

If a file is missing, include hidden paths and ignored paths.

```bash
$ fd -u filename
```

### Match directories in the path

If matching a directory name in the path does not work, search the full path.

```bash
$ fd --full-path 'fixtures/.+\.json$'
tests/fixtures/user.json
```

### Quote regex patterns

Quote patterns so the shell does not interpret regex characters first.

```bash
$ fd '^[A-Z][0-9]+$'
A123
```

### Search for a pattern starting with a dash

Use `--` before patterns that start with `-`.

```bash
$ fd -- '-draft'
notes/-draft.md
```
