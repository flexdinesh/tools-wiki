import { Copy } from 'lucide-react'
import type { ReactNode } from 'react'
import { Divider, Stage, Window, type Act, type Theme } from '../kit'
import { ArrowIcon, CaretIcon, CloseIcon, GitHubIcon, LaptopIcon, SearchIcon } from './icons'
import './cover.css'

// README cover for tools wiki. The site in a browser window, inset top and
// sides and running off the bottom, on the README's own page color (no
// plate). One gesture: press Cmd+K, type "git", open the git result, land on
// the git cheatsheet with its first entry and real output. The brand link
// takes you home again, so the loop closes on a caused navigation.
//
// Real strings throughout (a named product at hero scale): the header, the
// home directory, the search dialog and its results, the git page. They are
// copied from the built site. Look: DESIGN.md "Timetable" roles (--wiki-*),
// square corners, no shadows inside the page, Geist and Geist Mono.

type Page = 'home' | 'git'

type S = {
  page: Page
  /** The header's Cmd+K key cap, pressed */
  kbd: boolean
  open: boolean
  query: string
  results: boolean
}

const INITIAL: S = { page: 'home', kbd: false, open: false, query: '', results: false }
const POSTER: S = { ...INITIAL, open: true, query: 'git', results: true }

// Empty surface in the hero, left of its action: where the pointer waits.
const REST = { x: 716, y: 150 }

type Tool = { name: string; covers: string; sections: number; entries: number }

const TOOLS: Tool[] = [
  { name: 'apt', covers: 'Install, update, search, inspect, remove, and clean Debian and Ubuntu packages.', sections: 3, entries: 13 },
  { name: 'awk', covers: 'Print fields, filter records, summarize columns, and format text in pipelines.', sections: 5, entries: 14 },
  { name: 'brew', covers: 'Install Homebrew, install packages, update, search, inspect, remove, and clean packages.', sections: 4, entries: 15 },
  { name: 'curl', covers: 'Fetch URLs, inspect headers, send JSON, authenticate, download files, and debug requests.', sections: 5, entries: 17 },
  { name: 'cp', covers: 'Copy files and directories, with recursive and safety options.', sections: 3, entries: 6 },
  { name: 'docker', covers: 'Install, build, registry, run, manage containers and images, cleanup, compose, and remote host.', sections: 14, entries: 59 },
  { name: 'fd', covers: 'Find files by pattern, extension, type, depth, ignore rules, and run commands on matches.', sections: 9, entries: 47 },
  { name: 'flatpak', covers: 'Install, search, run, update, list, inspect, remove, and clean Flatpak apps.', sections: 7, entries: 7 },
  { name: 'find', covers: 'Find files by name, type, size, date, exclude directories, and run commands on matches.', sections: 5, entries: 17 },
]

const INDEX = ['apt', 'awk', 'brew', 'cp', 'curl', 'docker', 'fc-list', 'fd', 'find', 'flatpak', 'git', 'grep', 'head', 'jq', 'kill', 'kubectl']

// An excerpt as runs: plain text, or [text] for a highlighted match.
type Run = string | [string]
type Hit = { title: string; excerpt: Run[] }
type Result = { page: string; target?: string; hits: Hit[] }

const RESULTS: Result[] = [
  {
    page: 'git',
    target: 'result',
    hits: [
      { title: 'Check config', excerpt: ['scope. $ ', ['git'], ' config --list --show-origin --show-scope. ', ['file:/home/user/.gitconfig'], ' global user.name=Alice Example.'] },
      { title: 'Restore a file from another branch', excerpt: ['branch. ', ['git'], ' restore --source main -- pnpm-lock.yaml. ', ['git'], ' diff -- pnpm-lock.yaml. ', ['git']] },
      { title: 'Stacked rebase for stacked PRs', excerpt: ['$ ', ['git'], ' switch main. $ ', ['git'], ' pull. $ ', ['git'], ' switch feature/api. $'] },
    ],
  },
  {
    page: 'ls',
    hits: [
      { title: 'Show all entries', excerpt: ['... $ ls -a. . .. ', ['.git.'], ' .env. README.md.'] },
      { title: 'Show hidden entries without dot directories', excerpt: ['. and ... $ ls -A. ', ['.git.'], ' .env. README.md. package.json. src.'] },
    ],
  },
]

const CONFIG_OUTPUT = [
  ['file:/home/user/.gitconfig', 'global', 'user.name=Alice Example'],
  ['file:/home/user/.gitconfig', 'global', 'user.email=alice@example.com'],
  ['file:.git/config', 'local', 'core.repositoryformatversion=0'],
]

async function script(a: Act<S>) {
  a.mark('start')
  await a.wait(1300)

  // 1. Cmd+K: the header's key cap goes down, the search dialog opens
  a.mark('open')
  await a.set({ kbd: true })
  await a.wait(160)
  await a.set({ kbd: false, open: true })
  await a.wait(420)

  // 2. Type "git"; results arrive under the input
  a.mark('type')
  await a.type('query', 'git', { interval: 120 })
  await a.wait(220)
  await a.set({ results: true })
  await a.wait(1000)

  // 3. Open the git cheatsheet from its result
  a.mark('pick')
  await a.move({ at: 'result', x: 0.62, y: 0.55 })
  await a.wait(380)
  await a.click()
  await a.wait(80)
  await a.set({ open: false, page: 'git' })
  // Step off the page title so the pointer isn't over the payoff
  await a.move({ at: 'git-rest', x: 0.5, y: 0.5 })
  await a.snap({ query: '', results: false })

  // 4. The payoff: the git page, its first entry and real output
  a.mark('payoff')
  await a.wait(2600)

  // 5. The brand link takes you home: the loop's caused reset
  a.mark('home')
  await a.move({ at: 'brand', x: 0.62, y: 0.5 })
  await a.wait(320)
  await a.click()
  await a.wait(80)
  await a.set({ page: 'home' })
  await a.move(REST)
  // Rest long enough for the idle pointer to fade, matching the opening frame
  await a.wait(1900)
  a.mark('end')
}

function Excerpt({ runs }: { runs: Run[] }) {
  return (
    <span className="tw-excerpt">
      {runs.map((r, i) => (typeof r === 'string' ? <span key={i}>{r}</span> : <mark key={i}>{r[0]}</mark>))}
    </span>
  )
}

function Header({ s }: { s: S }) {
  return (
    <div className="tw-header">
      <div className="tw-brand" data-target="brand" data-cursor="pointer">
        <span className="tw-brand__name">tools wiki</span>
      </div>
      <div className="tw-search" data-pressed={s.kbd || undefined}>
        <SearchIcon size={16} className="tw-search__icon" />
        <span className="tw-search__label">Search</span>
        <span className="tw-search__kbd">
          <kbd>⌘</kbd>
          <kbd>K</kbd>
        </span>
      </div>
      <div className="tw-cell tw-gh">
        <GitHubIcon size={16} />
      </div>
      <div className="tw-cell tw-theme">
        <LaptopIcon size={14} />
        <span>Auto</span>
        <CaretIcon size={14} className="tw-theme__caret" />
      </div>
    </div>
  )
}

function Home() {
  return (
    <div className="tw-home">
      <div className="tw-hero">
        <div className="tw-hero__copy">
          <div className="tw-display">tools wiki</div>
          <p className="tw-hero__line">
            Cheatsheets for developer tools. Use <kbd>ctrl+k</kbd> / <kbd>cmd+k</kbd> to search commands.
          </p>
        </div>
        <span className="tw-action">
          Read git cheatsheet
          <ArrowIcon size={16} />
        </span>
      </div>
      <div className="tw-key">
        <span className="tw-key__item">
          <span className="tw-mark" />
          Cheatsheets<span className="tw-count">35</span>
        </span>
        <span className="tw-key__item">
          <span className="tw-mark" data-line="neovim" />
          Neovim Plugins<span className="tw-count">1</span>
        </span>
      </div>
      <div className="tw-dir">
        <div className="tw-dir__head">
          <span>Tool</span>
          <span>Covers</span>
          <span className="tw-num">Sections</span>
          <span className="tw-num">Entries</span>
        </div>
        {TOOLS.map((t) => (
          <div className="tw-dir__row" key={t.name}>
            <span className="tw-dir__name">{t.name}</span>
            <span className="tw-dir__covers">{t.covers}</span>
            <span className="tw-num tw-dir__count">{t.sections}</span>
            <span className="tw-num tw-dir__count">{t.entries}</span>
            <ArrowIcon size={14} className="tw-dir__arrow" />
          </div>
        ))}
      </div>
    </div>
  )
}

function GitPage() {
  return (
    <div className="tw-git">
      <div className="tw-index">
        <div className="tw-index__head">
          <span className="tw-mark" />
          <span className="tw-index__label">Cheatsheets</span>
          <span className="tw-count">35</span>
          <CaretIcon size={14} className="tw-index__caret" />
        </div>
        {INDEX.map((name) => (
          <div className="tw-index__row" key={name} data-current={name === 'git' || undefined}>
            {name}
          </div>
        ))}
      </div>
      <div className="tw-main">
        <div className="tw-title">
          <div className="tw-crumb">
            <span className="tw-crumb__link">Cheatsheets</span>
            <span aria-hidden>/</span>
            <span>git</span>
          </div>
          <div className="tw-page-title" data-target="git-title">git</div>
          <p className="tw-summary">Everyday config, clone, status, clean, commit, log, push, worktree, restore, patch, diff, show, branch, tag, grep, rebase, and stacked-branch workflows.</p>
          <span className="tw-git-rest" data-target="git-rest" />
        </div>
        <Divider className="tw-rule" data-strong />
        <div className="tw-section">
          <div className="tw-section__head">
            <span className="tw-h2">git config</span>
            <span className="tw-entries">6 entries</span>
          </div>
          <p className="tw-purpose">Set identity, signing, editor, and credential behavior.</p>
        </div>
        <Divider className="tw-rule" data-strong />
        <div className="tw-entry">
          <div className="tw-h3">Check config</div>
          <p className="tw-entry__purpose">Show all config settings with their source file and scope.</p>
          <div className="tw-code">
            <span className="tw-code__copy">
              <Copy size={14} strokeWidth={1.75} />
            </span>
            <div className="tw-code__line tw-code__cmd">
              <span className="tw-prompt">$</span> git config --list --show-origin --show-scope
            </div>
            {CONFIG_OUTPUT.map(([file, scope, value]) => (
              <div className="tw-code__line tw-code__out" key={value}>
                <span className="tw-code__file">{file}</span>
                <span className="tw-code__scope">{scope}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <Divider className="tw-rule" />
        <div className="tw-entry">
          <div className="tw-h3">Set global identity</div>
          <p className="tw-entry__purpose">Set name and email for all repos on the machine.</p>
          <div className="tw-code">
            <div className="tw-code__line tw-code__cmd">
              git config --global user.name "Alice Example"
            </div>
            <div className="tw-code__line tw-code__cmd">
              git config --global user.email alice@example.com
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Dialog({ s }: { s: S }) {
  return (
    <div className="tw-dialog" data-show={s.open || undefined}>
      <div className="tw-input">
        <span className="tw-input__icon">
          <SearchIcon size={16} />
        </span>
        <span className="tw-input__text" data-typing>
          {s.query ? <span>{s.query}</span> : <span className="tw-input__placeholder">Search</span>}
          <span className="tw-caret" data-typing={s.query !== '' || undefined} />
        </span>
        <span className="tw-input__clear" data-show={s.query !== '' || undefined}>
          <CloseIcon size={16} />
        </span>
      </div>
      {/* The results drawer opens its height (height: auto via interpolate-size).
          Not the kit's Collapse: its 0fr-1fr grid transition resolves a box
          taller than its row under the recorder's stepped clock, a blank band. */}
      <div className="tw-drawer" data-open={s.results || undefined}>
        <div className="tw-results">
          <div className="tw-results__message">12 results for git</div>
          {RESULTS.map((r) => (
            <div className="tw-result" key={r.page}>
              <div className="tw-result__title" data-target={r.target} data-cursor={r.target ? 'pointer' : undefined}>
                {r.page}
              </div>
              {r.hits.map((h) => (
                <div className="tw-hit" key={h.title}>
                  <div className="tw-hit__title">{h.title}</div>
                  <Excerpt runs={h.excerpt} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Site({ s }: { s: S }) {
  const page = (name: Page, child: ReactNode) => (
    <div className="tw-page" data-shown={s.page === name || undefined}>
      {child}
    </div>
  )
  return (
    <div className="tw-site">
      <Header s={s} />
      <div className="tw-pages">
        {page('home', <Home />)}
        {page('git', <GitPage />)}
      </div>
      <div className="tw-scrim" data-show={s.open || undefined} />
      <Dialog s={s} />
    </div>
  )
}

export default function Cover({ theme }: { theme: Theme }) {
  return (
    <Stage
      width={1040}
      height={600}
      theme={theme}
      greys="cool"
      accent={theme === 'dark' ? '#86abff' : '#0a4fd0'}
      initial={INITIAL}
      poster={POSTER}
      script={script}
      cursor={{ at: REST, style: 'real', idle: 1200 }}
      className={`tw-cover tw-cover--${theme}`}
    >
      {(s) => (
        <Window url="toolswiki.hoplabs.dev" className="tw-window" body={{ className: 'tw-body', 'data-crop': true }}>
          <Site s={s} />
        </Window>
      )}
    </Stage>
  )
}
