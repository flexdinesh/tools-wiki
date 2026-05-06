---
title: ssh
description: Connect, key generation, copy keys, known hosts, SSH agent, and port forwarding.
---

## Connect

Log in to remote hosts with passwords or keys.

### Connect with a password

Log in to a remote host using password authentication.

```bash
$ ssh alice@192.168.1.100
alice@192.168.1.100's password:
Last login: Mon May  3 09:15:22 2026 from 192.168.1.5
[alice@remote ~]$
```

### Connect with a specific key

Log in using a specific private key instead of the default.

```bash
$ ssh -i ~/.ssh/id_ed25519 alice@github.com
Hi alice! You've successfully authenticated, but GitHub does not provide shell access.
Connection to github.com closed.
```

---

## Generate Keys

Create SSH key pairs for authentication.

### Generate an Ed25519 key

Generate a new Ed25519 private/public key pair.

```bash
$ ssh-keygen -t ed25519 -C "alice@example.com"
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/alice/.ssh/id_ed25519): /home/alice/.ssh/id_ed25519
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/alice/.ssh/id_ed25519
Your public key has been saved in /home/alice/.ssh/id_ed25519.pub
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

Install public keys on remote hosts.

### Copy a public key

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

Fix saved host key records after host changes.

### Remove a saved host key

Remove a saved host key from `~/.ssh/known_hosts`, useful after a server rebuild or IP reassignment.

```bash
$ ssh-keygen -R 192.168.1.100
# Host 192.168.1.100 found: line 42
/home/alice/.ssh/known_hosts updated.
Original contents retained as /home/alice/.ssh/known_hosts.old
```

---

## Agent

Cache private keys for repeated SSH use.

### Add a key to the agent

Add a private key to the SSH agent for passwordless use during the current session.

```bash
$ ssh-add ~/.ssh/id_ed25519
Identity added: /home/alice/.ssh/id_ed25519 (alice@example.com)
```

### Start the agent manually

Start the SSH agent and add a key (common on Arch Linux and other distributions without a desktop keychain).

```bash
$ eval "$(ssh-agent -s)"
Agent pid 12345
$ ssh-add ~/.ssh/id_ed25519
Identity added: /home/alice/.ssh/id_ed25519 (alice@example.com)
```

### Persist the agent with keychain

Use the `keychain` package to manage the SSH agent across shells and reboots on Arch Linux.

```bash
$ sudo pacman -S keychain
resolving dependencies...
looking for conflicting packages...

Packages (1) keychain-2.8.5-2

Total Installed Size:  0.05 MiB
:: Proceed with installation? [Y/n] y

$ keychain --eval --quiet ~/.ssh/id_ed25519
SSH_AUTH_SOCK=/tmp/ssh-XXXXXX/agent.12345; export SSH_AUTH_SOCK;
SSH_AGENT_PID=12345; export SSH_AGENT_PID;
```

Add the eval line to your shell profile (e.g., `~/.bashrc`) to persist across new terminals:

```bash
$ echo 'eval "$(keychain --eval --quiet ~/.ssh/id_ed25519)"' >> ~/.bashrc
```

---

## Port Forward

Tunnel remote services to local ports.

### Forward a local port

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

---

## Popular use cases

Use `ssh` with remote commands, local pipes, and tunnels for day-to-day server work.

### Run a remote command

Execute one command on the remote host without opening an interactive shell.

```bash
$ ssh deploy@example.com 'systemctl status app'
● app.service - App service
   Active: active (running)
```

### Stream remote logs through local grep

Run the log command remotely and filter the stream locally.

```bash
$ ssh deploy@example.com 'journalctl -u app -f' | grep ERROR
May 06 10:14:22 app ERROR database connection failed
```

### Tunnel a remote database port

Forward a local port to a database reachable from the remote host.

```bash
$ ssh -N -L 5433:localhost:5432 deploy@example.com
```

### Copy a build with tar over SSH

Stream a local archive to the remote host and extract it there.

```bash
$ tar -czf - dist | ssh deploy@example.com 'tar -xzf - -C /var/www/app'
```

### Debug connection issues

Enable verbose SSH logs while troubleshooting authentication or host-key problems.

```bash
$ ssh -v deploy@example.com
OpenSSH_9.9p2, LibreSSL 3.3.6
...
```
