import { installVirtualClock } from '../kit/clock'

// ?theme=light|dark picks the look. ?record=1 swaps the page's clocks for
// stageshow's virtual clock before any scene code loads, so the recorder
// steps time by exactly 1/30s per frame (see scripts/record.mjs).
const params = new URLSearchParams(location.search)
const theme = params.get('theme') === 'dark' ? 'dark' : 'light'
document.body.dataset.theme = theme

if (params.has('record')) installVirtualClock({ fps: 30, epoch: 0 })

const { mount } = await import('./mount')
await mount(theme)
