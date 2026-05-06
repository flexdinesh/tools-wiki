---
title: git
description: Config, clone, status, commit, log, push, worktree, patch, diff, show, branch, tag, grep, and rebase workflows.
---

## git config

Set identity, signing, editor, and credential behavior.

### Check config

Show all config settings with their source file and scope (global, local, worktree).

```bash
$ git config --list --show-origin --show-scope
file:/home/user/.gitconfig  global  user.name=Alice Example
file:/home/user/.gitconfig  global  user.email=alice@example.com
file:.git/config             local  user.name=bob
file:.git/config             local  user.email=bob@work.example.com
```

### Set global identity

Set name and email for all repos on the machine.

```bash
$ git config --global user.name "Your Name Here"
$ git config --global user.email your@email.example
```

### Set local identity

Set name and email for the current repo only (overrides global).

```bash
$ git config user.name "Your Name Here"
$ git config user.email your@email.example
```

### Sign commits with SSH

Configure commit signing using an SSH key.

```bash
$ git config gpg.format ssh
$ git config user.signingkey ~/.ssh/id_ed25519.pub
$ git config commit.gpgsign true
```

Per-repo signing example (GitHub):

```bash
$ git config user.name "Alice Example"
$ git config user.email alice@example.com
$ git config gpg.format ssh
$ git config user.signingkey ~/.ssh/id_ed25519.pub
$ git config commit.gpgsign true
```

Per-repo signing example (Gitea):

```bash
$ git config user.name "bob"
$ git config user.email bob@work.example.com
$ git config gpg.format ssh
$ git config user.signingkey ~/.ssh/id_ed25519.pub
$ git config commit.gpgsign true
```

### Edit config in editor

Open the global gitconfig in your default editor.

```bash
$ export EDITOR=nvim
$ git config --edit --global
```

### Cache credentials

Cache HTTPS credentials for a set duration so you aren't prompted repeatedly.

```bash
$ git config --global credential.helper 'cache --timeout=86400'
```

---

## git clone

Create a local copy of a remote repository.

### Clone without SSL verification

Skip HTTPS certificate validation (useful for self-signed or internal Git servers).

```bash
$ git -c http.sslVerify=false clone https://example.com/path/to/git
Cloning into 'git'...
remote: Enumerating objects: 142, done.
remote: Counting objects: 100% (142/142), done.
remote: Compressing objects: 100% (97/97), done.
remote: Total 142 (delta 48), reused 131 (delta 38)
Receiving objects: 100% (142/142), 1.20 MiB | 2.33 MiB/s, done.
Resolving deltas: 100% (48/48), done.
```

---

## git status

Inspect working tree and index state.

### Filter changed files

Filter changed files by status or path.

```bash
$ git status --short | grep '^ M'
 M src/app.ts
 M src/config.ts
```

---

## git commit

Create commits and amend metadata on the latest commit.

### Update date of latest commit

Change the timestamp on the most recent commit without editing its message.

```bash
$ git commit --amend --no-edit --date=now
[main d3adb33] Updated README with examples
 Date: Sat May 3 14:22:00 2026 +0530
 1 file changed, 5 insertions(+), 2 deletions(-)
```

### Change author of latest commit

Rewrite the author field on the latest commit.

```bash
$ git commit --amend --author="Alice Example <alice@example.com>"
[main a1b2c3d] Updated README with examples
 Author: Alice Example <alice@example.com>
 Date: Sat May 3 14:22:00 2026 +0530
 1 file changed, 5 insertions(+), 2 deletions(-)
```

### Amend date and author together

Update the date and author metadata in one amend operation.

```bash
$ git commit --amend --no-edit --date=now --author="Alice Example <alice@example.com>"
```

---

## git log

Filter, format, search, and summarize commit history.

### Filter by date

Show commits since a specific date, one line each.

```bash
$ git log --oneline --since 2024-07-30
a1b2c3d Add feature flag for new dashboard
e4f5g6h Fix null pointer in user service
i7j8k9l Bump version to 2.1.0
```

### Filter by author

Match commits where the author name matches a Perl regex pattern.

```bash
$ git log --oneline --perl-regexp --author='^(.*(Alice))'
a1b2c3d Add feature flag for new dashboard
e4f5g6h Refactor auth middleware
```

### Filter by multiple authors

Match commits from any author in a Perl regex group.

```bash
$ git log --oneline --perl-regexp --author='^(.*(alice|bob|charlie|dave|eve))'
```

### Exclude authors

Exclude commits from specific authors with a negative lookahead.

```bash
$ git log --oneline --perl-regexp --author='^(?!(.*(John|Paul|Ringo)))'
```

### Pretty log format

Show a compact, colour-coded log with relative dates.

```bash
$ git log --since 2024-09-25 origin/main --perl-regexp \
    --author=$AUTHOR_REGEX \
    --pretty=format:"%C(yellow)%h %Cblue%>(12)%ad %Cgreen%<(7)%aN%Cred%d %Creset%s" \
    --date=relative
a1b2c3d  3 days ago   Alice  Add feature flag for new dashboard
e4f5g6h  5 days ago   Alice  Refactor auth middleware
```

### Exclude merge commits

Show only non-merge commits that are direct children of the branch tip.

```bash
$ git log --oneline --first-parent
a1b2c3d Add feature flag for new dashboard
e4f5g6h Refactor auth middleware
i7j8k9l Fix null pointer in user service
```

For a specific branch:

```bash
$ git log --oneline --first-parent my-feature
```

### Find commits touching specific directories

See which commits modified files inside given directories over the past week.

```bash
$ git log --since="7 days ago" --oneline -- .github/ .husky/ .idea/ .vscode/ gradle/ scripts/
a1b2c3d Update CI action versions
e4f5g6h Bump Gradle wrapper to 8.7
i7j8k9l Add JetBrains run configuration
```

### Search commit subjects

Search commit subjects with familiar text tools.

```bash
$ git log --oneline | grep -i fix | head -5
e4f5g6h Fix null pointer in user service
a7b8c9d Fix broken dashboard route
c1d2e3f hotfix: restore login redirect
```

### Count commits by author

Count commits by author.

```bash
$ git log --format='%an' | sort | uniq -c | sort -nr | head
  142 Alice Example
   87 Bob Reviewer
   31 Charlie Dev
```

### Rank recently changed files

Find files changed most often in recent history.

```bash
$ git log --since='30 days ago' --name-only --pretty=format: | grep -v '^$' | sort | uniq -c | sort -nr | head
  18 src/app.ts
  11 src/config.ts
   7 README.md
```

---

## git push

Send local refs to remotes safely.

### Force-push safely

Overwrite the remote branch but refuse if someone else has pushed to it since you last fetched.

```bash
$ git push origin HEAD --force-with-lease
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 462 bytes | 462.00 KiB/s, done.
Total 4 (delta 2), reused 0 (delta 0), pack-reused 0
To github.com:user/repo.git
 + e4f5g6h...a1b2c3d HEAD -> main (forced update)
```

### Push without SSL verification

Skip HTTPS certificate validation while pushing to a remote.

```bash
$ git -c http.sslVerify=false push origin HEAD
```

---

## git worktree

Manage multiple checkouts of one repository.

### List worktrees

Show all active worktrees with their paths, branches, and HEAD commits.

```bash
$ git worktree list
~/workspace/repo          a1b2c3d [main]
~/workspace/repo-master   d4e5f6g [master]
~/workspace/repo-feature  h7i8j9k [feature/new-ui]
```

### Add worktree from existing branch

Create a new worktree directory linked to an existing branch.

```bash
$ git worktree add ../repo-master master
Preparing worktree (checking out 'master')
HEAD is now at d4e5f6g Merge pull request #42
```

### Add worktree with new branch

Create a new branch and worktree in one step, tracking the current remote branch.

```bash
$ git worktree add --track ../repo-feature -b feature/new-ui
Preparing worktree (new branch 'feature/new-ui')
branch 'feature/new-ui' set up to track 'origin/main'
HEAD is now at a1b2c3d Add feature flag for new dashboard
```

Place the worktree inside the repo folder instead of next to it:

```bash
$ git worktree add --track ./repo-feature -b feature/new-ui
```

### Remove a worktree

Clean up a worktree that is no longer needed.

```bash
$ git worktree remove ../repo-feature
```

For worktrees inside the repo directory:

```bash
$ git worktree remove ./repo-feature
```

---

## Patch workflows

Create, inspect, and apply patch files.

### Create a patch

Generate a `.patch` file from the latest commit. The `-1` flag controls how many commits are included.

```bash
$ git format-patch -1 HEAD
0001-Add-feature-flag-for-new-dashboard.patch
```

### Inspect a patch

Show which files the patch touches without applying it.

```bash
$ git apply --stat 0001-Add-feature-flag-for-new-dashboard.patch
 src/dashboard.ts  | 12 ++++++++++++
 src/config.ts     |  3 +++
 2 files changed, 15 insertions(+)
```

### Check for errors

Dry-run to check if the patch will apply cleanly before committing.

```bash
$ git apply --check 0001-Add-feature-flag-for-new-dashboard.patch
```

If no output, the patch will apply without conflicts.

### Apply a patch

Apply the patch to the working tree with verbose output for any errors.

```bash
$ git apply --verbose 0001-Add-feature-flag-for-new-dashboard.patch
Checking patch src/dashboard.ts...
Checking patch src/config.ts...
Applied patch src/dashboard.ts cleanly.
Applied patch src/config.ts cleanly.
```

### Apply and commit a patch

Apply the patch and create a commit, preserving the original author and message.

```bash
$ git am < 0001-Add-feature-flag-for-new-dashboard.patch
Applying: Add feature flag for new dashboard
```

---

## git diff

Compare worktrees, indexes, commits, branches, and paths.

### Show unstaged changes

Show unstaged changes in the working tree.

```bash
$ git diff
diff --git a/src/app.ts b/src/app.ts
index 2f3a8ad..8c4b03d 100644
--- a/src/app.ts
+++ b/src/app.ts
@@ -1,5 +1,5 @@
-const timeoutMs = 1000;
+const timeoutMs = 3000;
 export function start() {
   connect({ timeoutMs });
 }
```

### Show staged changes

Show staged changes that will be included in the next commit.

```bash
$ git add src/app.ts
$ git diff --staged
diff --git a/src/app.ts b/src/app.ts
index 2f3a8ad..8c4b03d 100644
--- a/src/app.ts
+++ b/src/app.ts
@@ -1,5 +1,5 @@
-const timeoutMs = 1000;
+const timeoutMs = 3000;
 export function start() {
   connect({ timeoutMs });
 }
```

### Show all uncommitted changes

Show all uncommitted changes, including both staged and unstaged changes.

```bash
$ git diff HEAD
diff --git a/src/app.ts b/src/app.ts
index 2f3a8ad..8c4b03d 100644
--- a/src/app.ts
+++ b/src/app.ts
@@ -1,5 +1,5 @@
-const timeoutMs = 1000;
+const timeoutMs = 3000;
 export function start() {
   connect({ timeoutMs });
 }
```

### Summarize changed files

Show a compact summary of changed files and line counts.

```bash
$ git diff --stat
 src/app.ts      | 2 +-
 src/config.ts   | 6 ++++++
 2 files changed, 7 insertions(+), 1 deletion(-)
```

### List changed paths

List only the paths changed by the diff.

```bash
$ git diff --name-only
src/app.ts
src/config.ts
```

### Highlight word changes

Highlight changed words inline instead of showing whole changed lines.

```bash
$ git diff --word-diff
@@ -1 +1 @@
-The API timeout is [-one second-]{+three seconds+}.
```

### Check whitespace errors

Detect whitespace errors and conflict markers before committing.

```bash
$ git diff --check
src/app.ts:12: trailing whitespace.
+  const status = "ready";
src/config.ts:4: leftover conflict marker
```

If there is no output, Git did not find whitespace errors or conflict markers.

### Compare branch tips

Compare the exact tips of two branches.

```bash
$ git diff --stat main..feature
 src/dashboard.ts | 18 ++++++++++++++++++
 src/config.ts    |  3 +++
 2 files changed, 21 insertions(+)
```

### Compare since merge base

Show what changed on `feature` since it branched from `main`.

```bash
$ git diff --name-status main...feature
A	src/dashboard.ts
M	src/config.ts
```

### Compare two commits

Compare two commits directly.

```bash
$ git diff --stat HEAD~1 HEAD
 README.md | 5 +++--
 1 file changed, 3 insertions(+), 2 deletions(-)
```

### Limit diff to a path

Limit diff output to one file or directory.

```bash
$ git diff -- src/app.ts
diff --git a/src/app.ts b/src/app.ts
index 2f3a8ad..8c4b03d 100644
--- a/src/app.ts
+++ b/src/app.ts
@@ -1 +1 @@
-const timeoutMs = 1000;
+const timeoutMs = 3000;
```

### Ignore whitespace changes

Ignore whitespace-only changes when reviewing a diff.

```bash
$ git diff -w
diff --git a/src/app.ts b/src/app.ts
index 2f3a8ad..8c4b03d 100644
--- a/src/app.ts
+++ b/src/app.ts
@@ -1 +1 @@
-return user.name;
+return user.displayName;
```

### Format changed files

Run a command on changed files, such as formatting only modified TypeScript files.

```bash
$ git diff --name-only -- '*.ts' | xargs pnpm exec prettier --write
src/app.ts 42ms
src/config.ts 18ms
```

### Summarize branch churn

Summarize added and deleted lines for a branch.

```bash
$ git diff --numstat main...HEAD | awk '{ added += $1; deleted += $2 } END { print added " added, " deleted " deleted" }'
42 added, 9 deleted
```

---

## git show

Inspect commits and file snapshots.

### Show the latest commit

Show the latest commit metadata and patch.

```bash
$ git show HEAD
commit a1b2c3d4e5f6g7h8i9j0
Author: Alice Example <alice@example.com>
Date:   Sat May 3 14:22:00 2026 +0530

    Add feature flag for new dashboard

diff --git a/src/config.ts b/src/config.ts
index 6b7c8d9..9a0b1c2 100644
--- a/src/config.ts
+++ b/src/config.ts
@@ -1 +1,2 @@
 export const apiBaseUrl = "https://api.example.com";
+export const newDashboard = true;
```

### Show commit stats

Show a commit summary without the full patch.

```bash
$ git show --stat HEAD
commit a1b2c3d4e5f6g7h8i9j0
Author: Alice Example <alice@example.com>
Date:   Sat May 3 14:22:00 2026 +0530

    Add feature flag for new dashboard

 src/dashboard.ts | 12 ++++++++++++
 src/config.ts    |  1 +
 2 files changed, 13 insertions(+)
```

### List files changed by a commit

Show only the files changed by a commit.

```bash
$ git show --name-only HEAD
commit a1b2c3d4e5f6g7h8i9j0
Author: Alice Example <alice@example.com>
Date:   Sat May 3 14:22:00 2026 +0530

    Add feature flag for new dashboard

src/dashboard.ts
src/config.ts
```

### Show full commit metadata

Show fuller author and committer metadata for a commit.

```bash
$ git show --pretty=fuller --no-patch HEAD
commit a1b2c3d4e5f6g7h8i9j0
Author:     Alice Example <alice@example.com>
AuthorDate: Sat May 3 14:22:00 2026 +0530
Commit:     Bob Reviewer <bob@example.com>
CommitDate: Sat May 3 15:01:00 2026 +0530

    Add feature flag for new dashboard
```

### Print file at a commit

Print a file exactly as it existed at a commit.

```bash
$ git show HEAD:src/config.ts
export const apiBaseUrl = "https://api.example.com";
export const newDashboard = true;
```

### Show file from another branch

Show a file from another branch without checking it out.

```bash
$ git show main:README.md
# Project

Documentation and examples for the project.
```

### Show word-level patch

Show a commit patch with word-level highlighting.

```bash
$ git show --word-diff HEAD
commit a1b2c3d4e5f6g7h8i9j0
Author: Alice Example <alice@example.com>
Date:   Sat May 3 14:22:00 2026 +0530

    Add feature flag for new dashboard

@@ -1 +1 @@
-The dashboard is [-disabled-]{+enabled+} by default.
```

---

## git rebase

Move stacked branches as their bases change.

### Rebase onto a new parent

Move a branch so it starts from a different base commit. Useful for stacked branches when the parent branch is rewritten.

```
main:        A---B---C---H---I
                  \          \
old commits:       D---E      D'---E'  (new hashes!)
                        \
my-feature-2:            F---G
```

```bash
$ git rebase --onto my-feature-1 my-feature-2-base my-feature-2
Successfully rebased and updated refs/heads/my-feature-2.
```

The general form:

```bash
$ git rebase --onto <new-base> <old-base> <branch>
```

### Clean up after parent merges

Once the parent branch merges into `main`, drop its commits from your stacked branch with an interactive rebase.

```bash
$ git checkout my-feature-2
$ git rebase -i main
```

In the editor, delete the lines for commits that belong to the merged parent:

```
pick D' ...  ← DELETE (merged from feature-1)
pick E' ...  ← DELETE (merged from feature-1)
pick F  ...  ← KEEP (your own work)
pick G  ...  ← KEEP (your own work)
```

---

## git branch

Create, update, list, and delete branch refs.

### Update a stacked-branch base marker

When you rebase `my-feature-2` onto `my-feature-1`, update the tracking base so future rebases use the correct old-base.

```bash
# After every rebase of my-feature-2 onto my-feature-1:
$ git branch -f my-feature-2-base my-feature-1
```

Full cycle — repeat each time `my-feature-1` is rewritten:

```bash
$ git rebase --onto my-feature-1 my-feature-2-base my-feature-2
$ git branch -f my-feature-2-base my-feature-1
```

### Delete merged branches

Delete merged local branches while excluding protected branch names.

```bash
$ git branch --merged main | grep -vE '^\*|^[[:space:]]*(main|master)$' | xargs git branch -d
Deleted branch feature/old-filter (was a1b2c3d).
Deleted branch chore/update-docs (was e4f5g6h).
```

---

## git rm

Remove paths from the working tree or index.

### Untrack a file without deleting it

Stop tracking a file in Git while keeping it on disk (e.g. a `.npmrc` that should be local).

```bash
$ git rm --cached .npmrc
rm '.npmrc'
```

The file remains on disk but is removed from the index. Add it to `.gitignore` afterwards.

---

## git ls-files

List tracked files and compose the output with text tools.

### Count lines in tracked Markdown

Find tracked files by extension and pass them to another command.

```bash
$ git ls-files | grep '\.md$' | xargs wc -l
     128 README.md
      74 docs/setup.md
     202 total
```

---

## git tag

List and sort tags.

### Show latest tags

Show the latest version tags.

```bash
$ git tag --sort=-v:refname | head -10
v2.4.1
v2.4.0
v2.3.2
v2.3.1
v2.3.0
```

---

## git grep

Search tracked file contents.

### List files with matches

List files containing a search term.

```bash
$ git grep -n 'TODO' | cut -d: -f1 | sort -u
src/app.ts
src/config.ts
src/dashboard.ts
```

---

## Popular use cases

Use Git output in pipelines to review changes, search tracked files, and run checks.

### Run checks on changed files

List files changed on the current branch and pass them to a checker.

```bash
$ git diff --name-only origin/main...HEAD | xargs pnpm prettier --check
Checking formatting...
All matched files use Prettier code style!
```

### Review branch change size

Compare your branch to the merge base and summarize changed files.

```bash
$ git diff --stat origin/main...HEAD
 src/app.ts      | 12 +++++++++---
 src/config.ts   |  4 ++--
 2 files changed, 11 insertions(+), 5 deletions(-)
```

### Search tracked files

Search only files Git tracks and print the file and line for each match.

```bash
$ git grep -n "TODO"
src/app.ts:12:TODO: handle empty responses
src/config.ts:8:TODO: document defaults
```

### Count commits by author

Count author names from Git history and rank them.

```bash
$ git log --format='%an' | sort | uniq -c | sort -nr
  42 Alice
  17 Bob
   9 Carol
```

### Find frequently changed files

List file paths from commits, count repeats, and show the files with the most churn.

```bash
$ git log --name-only --pretty=format: | sort | uniq -c | sort -nr | head
  18 src/app.ts
  11 package.json
   9 README.md
```
