import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { Theme } from '../kit'
import Cover from './cover'

export async function mount(theme: Theme) {
  const root = document.getElementById('root')
  if (!root) throw new Error('Missing #root')
  await document.fonts.load('600 16px "Geist Variable"')
  await document.fonts.load('600 16px "Geist Mono Variable"')
  createRoot(root).render(
    <StrictMode>
      <Cover theme={theme} />
    </StrictMode>,
  )
}
