---
title: ssh
draft: false
head: []
---

## Connect

### ssh user@hostname

Log in to a remote host using password authentication.

```bash
$ ssh alice@192.168.1.100
alice@192.168.1.100's password:
Last login: Mon May  3 09:15:22 2026 from 192.168.1.5
[alice@remote ~]$
```

### ssh -i ~/.ssh/id_ed25519 user@hostname

Log in using a specific private key instead of the default.

```bash
$ ssh -i ~/.ssh/id_ed25519_github alice@github.com
Hi alice! You've successfully authenticated, but GitHub does not provide shell access.
Connection to github.com closed.
```

---

## Generate Keys

### ssh-keygen -t ed25519 -C "comment"

Generate a new Ed25519 private/public key pair.

```bash
$ ssh-keygen -t ed25519 -C "alice@example.com"
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/alice/.ssh/id_ed25519): /home/alice/.ssh/id_ed25519_github
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/alice/.ssh/id_ed25519_github
Your public key has been saved in /home/alice/.ssh/id_ed25519_github.pub
The key fingerprint is:
SHA256:AbCdEfGhIjKlMnOpQrStUvWxYz1234567890 alice@example.com
The key's randomart image is:
+--[ED25519 256]--+
|  .o.            |
|  .+.            |
| ...             |
+----[SHA256]-----+
```

---

## Copy Key

### ssh-copy-id -i ~/.ssh/id_ed25519.pub user@hostname

Copy your public key to a remote host to enable passwordless login.

```bash
$ ssh-copy-id -i ~/.ssh/id_ed25519.pub alice@192.168.1.100
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/alice/.ssh/id_ed25519.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
alice@192.168.1.100's password:

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'alice@192.168.1.100'"
and check to make sure that only the key(s) you wanted were added.
```

---

## Known Hosts

### ssh-keygen -R hostname

Remove a saved host key from `~/.ssh/known_hosts`, useful after a server rebuild or IP reassignment.

```bash
$ ssh-keygen -R 192.168.1.100
# Host 192.168.1.100 found: line 42
/home/alice/.ssh/known_hosts updated.
Original contents retained as /home/alice/.ssh/known_hosts.old
```

---

## Agent

### ssh-add ~/.ssh/id_ed25519

Add a private key to the SSH agent for passwordless use during the current session.

```bash
$ ssh-add ~/.ssh/id_ed25519_github
Identity added: /home/alice/.ssh/id_ed25519_github (alice@example.com)
```

### eval "$(ssh-agent -s)" and ssh-add

Start the SSH agent and add a key (common on Arch Linux and other distributions without a desktop keychain).

```bash
$ eval "$(ssh-agent -s)"
Agent pid 12345
$ ssh-add ~/.ssh/id_ed25519_github
Identity added: /home/alice/.ssh/id_ed25519_github (alice@example.com)
```

### keychain --eval --quiet

Use the `keychain` package to manage the SSH agent across shells and reboots on Arch Linux.

```bash
$ sudo pacman -S keychain
resolving dependencies...
looking for conflicting packages...

Packages (1) keychain-2.8.5-2

Total Installed Size:  0.05 MiB
:: Proceed with installation? [Y/n] y

$ keychain --eval --quiet ~/.ssh/id_ed25519_github
SSH_AUTH_SOCK=/tmp/ssh-XXXXXX/agent.12345; export SSH_AUTH_SOCK;
SSH_AGENT_PID=12345; export SSH_AGENT_PID;
```

Add the eval line to your shell profile (e.g., `~/.bashrc`) to persist across new terminals:

```bash
$ echo 'eval "$(keychain --eval --quiet ~/.ssh/id_ed25519_github)"' >> ~/.bashrc
```

---

## Port Forward

### ssh -L local_port:localhost:remote_port user@hostname

Forward a port from the remote machine to your local machine so you can access remote localhost services locally.

```bash
$ ssh -L 8080:localhost:3000 alice@192.168.1.100
Last login: Mon May  3 10:00:00 2026 from 192.168.1.5
[alice@remote ~]$
```

With the tunnel active, open `http://localhost:8080` on your local machine to reach the service running on port `3000` on the remote host.

Use `-N` to set up the tunnel without opening an interactive shell:

```bash
$ ssh -N -L 8080:localhost:3000 alice@192.168.1.100
```

Use `-f` to run the tunnel in the background:

```bash
$ ssh -f -N -L 8080:localhost:3000 alice@192.168.1.100
```
