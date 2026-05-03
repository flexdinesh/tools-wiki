---
title: git
draft: false
head: []
---

## Config

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
$ git config user.signingkey ~/.ssh/id_ed25519_github.pub
$ git config commit.gpgsign true
```

Per-repo signing example (Gitea):

```bash
$ git config user.name "bob"
$ git config user.email bob@work.example.com
$ git config gpg.format ssh
$ git config user.signingkey ~/.ssh/id_ed25519_gitea.pub
$ git config commit.gpgsign true
```

### Edit config in editor

Open the global gitconfig in your default editor.

```bash
$ export EDITOR=nvim
$ git config --edit --global
```

### Credential helper

Cache HTTPS credentials for a set duration so you aren't prompted repeatedly.

```bash
$ git config --global credential.helper 'cache --timeout=86400'
```

---

## Commit

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

```bash
$ git commit --amend --no-edit --date=now --author="Alice Example <alice@example.com>"
```

---

## Log

### Filter by date

Show commits since a specific date, one line each.

```bash
$ git log --oneline --since 2024-07-30
a1b2c3d Add feature flag for new dashboard
e4f5g6h Fix null pointer in user service
i7j8k9l Bump version to 2.1.0
```

### Filter by author (regex)

Match commits where the author name matches a Perl regex pattern.

```bash
$ git log --oneline --perl-regexp --author='^(.*(Alice))'
a1b2c3d Add feature flag for new dashboard
e4f5g6h Refactor auth middleware
```

### Filter by multiple authors

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

---

## Push

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

---

## Worktree

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

## Patch

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

## Diff

### Commits touching specific directories

See which commits modified files inside given directories over the past week.

```bash
$ git log --since="7 days ago" --oneline -- .github/ .husky/ .idea/ .vscode/ gradle/ scripts/
a1b2c3d Update CI action versions
e4f5g6h Bump Gradle wrapper to 8.7
i7j8k9l Add JetBrains run configuration
```

---

## Rebase (Stacked)

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

### Sync pattern for repeated rebases

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

## Misc

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

### Push without SSL verification

```bash
$ git -c http.sslVerify=false push origin HEAD
```

### Untrack a file without deleting it

Stop tracking a file in Git while keeping it on disk (e.g. a `.npmrc` that should be local).

```bash
$ git rm --cached .npmrc
rm '.npmrc'
```

The file remains on disk but is removed from the index. Add it to `.gitignore` afterwards.