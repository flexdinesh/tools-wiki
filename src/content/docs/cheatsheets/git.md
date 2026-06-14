---
title: git
description: Everyday config, clone, status, clean, commit, log, push, worktree, restore, patch, diff, show, branch, tag, grep, rebase, and stacked-branch workflows.
---

## git config

Set identity, signing, editor, and credential behavior.

### Check config

Show all config settings with their source file and scope.

```bash
$ git config --list --show-origin --show-scope
file:/home/user/.gitconfig  global  user.name=Alice Example
file:/home/user/.gitconfig  global  user.email=alice@example.com
file:.git/config             local   core.repositoryformatversion=0
```

### Set global identity

Set name and email for all repos on the machine.

```bash
$ git config --global user.name "Alice Example"
$ git config --global user.email alice@example.com
```

### Set local identity

Set name and email for the current repo only.

```bash
$ git config user.name "Alice Example"
$ git config user.email alice@work.example.com
```

### Sign commits with SSH

Configure commit signing with an SSH key.

```bash
$ git config --global gpg.format ssh
$ git config --global user.signingkey ~/.ssh/id_ed25519.pub
$ git config --global commit.gpgsign true
```

### Edit global config

Open the global gitconfig in your default editor.

```bash
$ git config --global --edit
```

### Cache HTTPS credentials

Cache HTTPS credentials so Git does not prompt for every operation.

```bash
$ git config --global credential.helper 'cache --timeout=86400'
```

---

## git clone

Create a local copy of a remote repository.

### Clone a repository

Clone a remote repository into a new local directory.

```bash
$ git clone git@github.com:user/repo.git
Cloning into 'repo'...
remote: Enumerating objects: 142, done.
remote: Counting objects: 100% (142/142), done.
remote: Compressing objects: 100% (97/97), done.
Receiving objects: 100% (142/142), 1.20 MiB | 2.33 MiB/s, done.
Resolving deltas: 100% (48/48), done.
```

### Clone a specific branch

Clone only one branch when you do not need the full branch list locally.

```bash
$ git clone --branch feature/new-ui --single-branch git@github.com:user/repo.git
Cloning into 'repo'...
```

---

## git status

Inspect working tree and index state.

### Show concise status

Show changed files with short status codes.

```bash
$ git status --short
 M src/app.ts
A  src/dashboard.ts
?? notes.md
```

### Show branch and upstream status

Show the current branch and whether it is ahead or behind its upstream.

```bash
$ git status --short --branch
## feature/new-ui...origin/feature/new-ui [ahead 2]
 M src/app.ts
```

---

## git clean

Remove untracked files and directories from the working tree.

### Preview files before cleaning

Show what Git would remove without deleting anything.

```bash
$ git clean --dry-run
Would remove debug.log
Would remove tmp/output.json
```

### Remove untracked files and directories

Delete untracked files and untracked directories.

```bash
$ git clean -fd
Removing build/
Removing debug.log
```

### Clean interactively

Choose what to remove from an interactive prompt.

```bash
$ git clean -i
Would remove the following items:
  debug.log  tmp/output.json
*** Commands ***
    1: clean    2: filter by pattern    3: select by numbers
    4: ask each 5: quit                 6: help
What now>
```

---

## git commit

Create commits and update the latest commit.

### Commit staged changes

Create a commit from files already added to the index.

```bash
$ git add src/app.ts src/config.ts
$ git commit -m "Add dashboard filter"
[feature/new-ui a1b2c3d] Add dashboard filter
 2 files changed, 21 insertions(+), 3 deletions(-)
```

### Amend latest commit

Add staged changes to the latest commit without changing its message.

```bash
$ git add src/config.ts
$ git commit --amend --no-edit
[feature/new-ui d4e5f6g] Add dashboard filter
 Date: Sat May 3 14:22:00 2026 +0530
 2 files changed, 25 insertions(+), 3 deletions(-)
```

### Change latest commit message

Open the latest commit message in your editor.

```bash
$ git commit --amend
```

### Change latest commit author

Rewrite the author field on the latest commit.

```bash
$ git commit --amend --author="Alice Example <alice@example.com>"
[feature/new-ui a1b2c3d] Add dashboard filter
 Author: Alice Example <alice@example.com>
 Date: Sat May 3 14:22:00 2026 +0530
 2 files changed, 21 insertions(+), 3 deletions(-)
```

---

## git log

Filter, format, search, and summarize commit history.

### Show compact branch history

Show a graph across all local and remote branches, tags, and refs.

```bash
$ git log --oneline --graph --decorate --all
* a1b2c3d (HEAD -> feature/new-ui) Add dashboard filter
* e4f5g6h Update dashboard loading state
| * i7j8k9l (origin/main, main) Bump dependencies
|/
* b1c2d3e Add dashboard shell
```

### Show commits on current branch

Show commits on your branch that are not on `origin/main`.

```bash
$ git log --oneline --graph origin/main..HEAD
* a1b2c3d Add dashboard filter
* e4f5g6h Update dashboard loading state
```

### Show commits missing from current branch

Show commits on `origin/main` that are not on your current branch.

```bash
$ git log --oneline --graph HEAD..origin/main
* i7j8k9l Bump dependencies
* m1n2o3p Update CI cache
```

### Compare both sides of a branch

Show commits unique to each side before merging, rebasing, or opening a pull request.

```bash
$ git log --oneline --graph --left-right HEAD...origin/main
< a1b2c3d Add dashboard filter
< e4f5g6h Update dashboard loading state
> i7j8k9l Bump dependencies
> m1n2o3p Update CI cache
```

### Show the latest commits

Limit the graph to the latest commit count.

```bash
$ git log --oneline --graph -20
* a1b2c3d Add dashboard filter
* e4f5g6h Update dashboard loading state
* b1c2d3e Add dashboard shell
```

### Show only the latest commit

Show just the current `HEAD` commit.

```bash
$ git log --oneline --graph HEAD^..HEAD
* a1b2c3d Add dashboard filter
```

### Show commits since the branch point

Show commits added since the current branch diverged from `origin/main`.

```bash
$ git log --oneline --graph $(git merge-base HEAD origin/main)..HEAD
* a1b2c3d Add dashboard filter
* e4f5g6h Update dashboard loading state
```

### Search commit messages

Find commits with matching text in the subject or body.

```bash
$ git log --oneline --grep="fix"
f1e2d3c Fix dashboard empty state
c4b5a6d Fix login redirect
```

### Filter by author

Show commits from one author.

```bash
$ git log --oneline --graph --author="Alice"
* a1b2c3d Add dashboard filter
* e4f5g6h Update dashboard loading state
```

### Filter by multiple authors

Show commits from any author whose name matches an extended regex.

```bash
$ git log --oneline --extended-regexp --author="Alice|Bob"
a1b2c3d Add dashboard filter
e4f5g6h Update dashboard loading state
c4b5a6d Fix login redirect
```

### Filter by date

Show recent commits since a relative date.

```bash
$ git log --oneline --graph --since="1 week ago"
* a1b2c3d Add dashboard filter
* e4f5g6h Update dashboard loading state
* i7j8k9l Bump dependencies
```

### Show history for a file

Show commits that changed a specific file.

```bash
$ git log --oneline --graph -- src/app.ts
* a1b2c3d Add dashboard filter
* b1c2d3e Add dashboard shell
```

### Follow file history across renames

Show commits for a file while following rename history.

```bash
$ git log --oneline --graph --follow -- src/app.ts
* a1b2c3d Add dashboard filter
* c7d8e9f Rename app entrypoint
* b1c2d3e Add dashboard shell
```

### Show merge commits

Show only merge commits for release or history audits.

```bash
$ git log --oneline --graph --merges
* m1n2o3p Merge pull request #42 from user/feature-new-ui
* q4r5s6t Merge branch 'release/2026-05'
```

### Show changed file names

Show each commit followed by the files it changed.

```bash
$ git log --oneline --graph --name-only
* a1b2c3d Add dashboard filter
src/dashboard.ts
src/config.ts

* e4f5g6h Update dashboard loading state
src/dashboard.ts
```

### Show commit stats

Show each commit followed by a changed-file summary.

```bash
$ git log --oneline --graph --stat
* a1b2c3d Add dashboard filter
|  src/dashboard.ts | 12 ++++++++++++
|  src/config.ts    |  1 +
|  2 files changed, 13 insertions(+)
```

---

## git push

Send local refs to remotes safely.

### Push current branch and set upstream

Push the current branch and remember its upstream remote branch.

```bash
$ git push -u origin HEAD
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Writing objects: 100% (4/4), 462 bytes | 462.00 KiB/s, done.
To github.com:user/repo.git
 * [new branch]      HEAD -> feature/new-ui
branch 'feature/new-ui' set up to track 'origin/feature/new-ui'.
```

### Force-push safely

Overwrite the remote branch but refuse if someone else pushed since you last fetched.

```bash
$ git push --force-with-lease
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Writing objects: 100% (4/4), 462 bytes | 462.00 KiB/s, done.
To github.com:user/repo.git
 + e4f5g6h...a1b2c3d feature/new-ui -> feature/new-ui (forced update)
```

---

## git worktree

Manage multiple checkouts of one repository.

### List worktrees

Show all active worktrees with their paths, branches, and HEAD commits.

```bash
$ git worktree list
~/workspace/repo          a1b2c3d [main]
~/workspace/repo-feature  h7i8j9k [feature/new-ui]
```

### Add worktree with new branch

Create a new branch and checkout in a separate directory.

```bash
$ git worktree add ../repo-feature -b feature/new-ui origin/main
Preparing worktree (new branch 'feature/new-ui')
HEAD is now at a1b2c3d Add dashboard shell
```

### Set upstream for a new worktree branch

A new branch has no remote branch yet, so it has no upstream. Push with `-u` to create the remote branch and set it as the upstream.

```bash
$ git worktree add ../wt-login -b feature/login
Preparing worktree (new branch 'feature/login')
HEAD is now at a1b2c3d Add dashboard shell

$ git push -u origin HEAD
To github.com:user/repo.git
 * [new branch]      HEAD -> feature/login
branch 'feature/login' set up to track 'origin/feature/login'.
```

### Remove a worktree

Clean up a worktree that is no longer needed.

```bash
$ git worktree remove ../repo-feature
```

---

## git restore

Restore files in the working tree from another source.

### Restore a file from another branch

Apply one file's state from another branch into the current branch without merging that branch.

```bash
$ git restore --source main -- pnpm-lock.yaml
$ git diff -- pnpm-lock.yaml
$ git add pnpm-lock.yaml
$ git commit -m "chore: reset pnpm lockfile from branch main"
```

---

## Patch workflows

Create, inspect, and apply patch files.

### Create a patch

Generate a `.patch` file from the latest commit.

```bash
$ git format-patch -1 HEAD
0001-Add-dashboard-filter.patch
```

### Check a patch

Dry-run a patch before applying it.

```bash
$ git apply --check 0001-Add-dashboard-filter.patch
```

If there is no output, the patch applies cleanly.

### Apply a patch

Apply a patch to the working tree without committing it.

```bash
$ git apply 0001-Add-dashboard-filter.patch
```

### Apply and commit a patch

Apply an email-style patch and create a commit with the original author and message.

```bash
$ git am < 0001-Add-dashboard-filter.patch
Applying: Add dashboard filter
```

---

## git diff

Compare worktrees, indexes, commits, branches, and paths.

### Show unstaged changes

Show changes in the working tree that are not staged yet.

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

Show changes that will be included in the next commit.

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

### Summarize changed files

Show changed files with line counts.

```bash
$ git diff --stat
 src/app.ts    | 2 +-
 src/config.ts | 6 ++++++
 2 files changed, 7 insertions(+), 1 deletion(-)
```

### List changed paths

List only the paths changed by the diff.

```bash
$ git diff --name-only
src/app.ts
src/config.ts
```

### Compare two branch tips

Show differences between the exact `main` tip and the current `HEAD` snapshot.

```bash
$ git diff main HEAD
diff --git a/src/config.ts b/src/config.ts
index 6b7c8d9..9a0b1c2 100644
--- a/src/config.ts
+++ b/src/config.ts
@@ -1 +1,2 @@
 export const apiBaseUrl = "https://api.example.com";
+export const dashboardFilter = true;
```

### Compare branch changes since merge base

Show what changed on your branch since it branched from `main`.

```bash
$ git diff main...HEAD
diff --git a/src/dashboard.ts b/src/dashboard.ts
new file mode 100644
index 0000000..8c4b03d
--- /dev/null
+++ b/src/dashboard.ts
@@ -0,0 +1 @@
+export function renderDashboard() {}
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

### Check whitespace and conflict markers

Detect whitespace errors and conflict markers before committing.

```bash
$ git diff --check
src/app.ts:12: trailing whitespace.
+  const status = "ready";
src/config.ts:4: leftover conflict marker
```

If there is no output, Git did not find whitespace errors or conflict markers.

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

    Add dashboard filter

diff --git a/src/config.ts b/src/config.ts
index 6b7c8d9..9a0b1c2 100644
--- a/src/config.ts
+++ b/src/config.ts
@@ -1 +1,2 @@
 export const apiBaseUrl = "https://api.example.com";
+export const dashboardFilter = true;
```

### Show commit stats

Show a commit summary without the full patch.

```bash
$ git show --stat HEAD
commit a1b2c3d4e5f6g7h8i9j0
Author: Alice Example <alice@example.com>
Date:   Sat May 3 14:22:00 2026 +0530

    Add dashboard filter

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

    Add dashboard filter

src/dashboard.ts
src/config.ts
```

### Print file at a commit

Print a file exactly as it existed at a commit.

```bash
$ git show HEAD:README.md
# tools wiki

A searchable collection of cheatsheets and quick-reference guides for developer tools.
```

---

## git rebase

Move commits to a new base, clean up local history, and handle conflicts.

### Rebase current branch onto latest main

Replay your branch commits on top of the latest `origin/main`.

```bash
$ git fetch origin
$ git rebase origin/main
Successfully rebased and updated refs/heads/feature/new-ui.
```

### Resolve conflicts during rebase

Fix conflicted files, stage them, and continue the rebase.

```bash
$ git status
interactive rebase in progress; onto a1b2c3d
You are currently rebasing branch 'feature/new-ui' on 'a1b2c3d'.

Unmerged paths:
  both modified:   src/app.ts

$ git add src/app.ts
$ git rebase --continue
```

Abort and return to the pre-rebase state if needed.

```bash
$ git rebase --abort
```

### Clean up recent commits interactively

Edit, reorder, squash, or reword recent local commits before sharing them.

```bash
$ git rebase -i HEAD~3
```

In the editor:

```text
pick a1b2c3d Add dashboard shell
reword e4f5g6h Update loading copy
squash i7j8k9l Fix typo
```

### Move commits from one base to another

Use `--onto` when you need to transplant a commit range to a different base.

```bash
$ git rebase --onto main old-base feature
Successfully rebased and updated refs/heads/feature.
```

The general form is:

```bash
$ git rebase --onto <new-base> <old-base> <branch>
```

Git takes commits reachable from `<branch>` but not reachable from `<old-base>` and replays them onto `<new-base>`.

---

## git branch

Create, update, list, rename, and delete branch refs.

### List local and remote branches

Show all branches Git knows about locally.

```bash
$ git branch --all
* feature/new-ui
  main
  remotes/origin/feature/new-ui
  remotes/origin/main
```

### Rename current branch

Rename the branch you are currently on.

```bash
$ git branch -m feature/dashboard-filter
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

Stop tracking a file in Git while keeping it on disk.

```bash
$ git rm --cached .npmrc
rm '.npmrc'
```

The file remains on disk but is removed from the index. Add it to `.gitignore` afterwards.

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

### Search tracked files

Search only files Git tracks and print the file and line for each match.

```bash
$ git grep -n "TODO"
src/app.ts:12:TODO: handle empty responses
src/config.ts:8:TODO: document defaults
```

---

## Popular use cases

Walk through common multi-command workflows.

### Count commits by author

Count author names from Git history and rank them.

```bash
$ git log --format='%an' | sort | uniq -c | sort -nr
  42 Alice Example
  17 Bob Reviewer
   9 Carol Dev
```

### Find frequently changed files

List file paths from commits, count repeats, and show the files with the most churn.

```bash
$ git log --name-only --pretty=format: | grep -v '^$' | sort | uniq -c | sort -nr | head
  18 src/app.ts
  11 package.json
   9 README.md
```

### Stacked rebase for stacked PRs

Use the parent branch reflog to find the old parent tip, then move only the child commits onto the updated parent branch.

Start with a stack where `feature/api` branches from `main`, then `feature/ui` branches from `feature/api`:

```text
main:        A---B---C
                  \
feature/api:       D---E
                        \
feature/ui:              F---G
```

Update `main`, then rebase the parent branch:

```bash
$ git switch main
$ git pull
$ git switch feature/api
$ git rebase main
Successfully rebased and updated refs/heads/feature/api.
```

After the parent rebase, `feature/api` has new commits and `feature/ui` still points to the old stack:

```text
main:        A---B---C---H---I
                          \
feature/api:               D'---E'

feature/ui still points to the old stack: D---E---F---G
```

Find the last `feature/api` head before the rebase:

```bash
$ git reflog --date=local feature/api
e5f6g7h feature/api@{Sat Jun 13 10:04:21 2026}: rebase (finish): refs/heads/feature/api onto i9j0k1l
d4e5f6g feature/api@{Sat Jun 13 09:58:42 2026}: commit: Add API validation
```

Move only the child commits from the old parent tip to the updated parent branch:

```bash
$ git switch feature/ui
$ git rebase --onto feature/api d4e5f6g
Successfully rebased and updated refs/heads/feature/ui.
```

The child branch now sits on the rewritten parent branch:

```text
main:        A---B---C---H---I
                          \
feature/api:               D'---E'
                                  \
feature/ui:                        F'---G'
```

Push the rewritten branches safely if they exist on the remote:

```bash
$ git switch feature/api
$ git push --force-with-lease
$ git switch feature/ui
$ git push --force-with-lease
```
