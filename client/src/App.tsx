import './global.css'

import { ThemeProvider } from '@/components/theme/theme-provider'

import { Toaster } from './components/ui/toaster'
import { Home } from './pages/home'

export function App() {
  return (
    <ThemeProvider storageKey="notezyn-theme" defaultTheme="system">
      <Home />
      <Toaster />
    </ThemeProvider>
  )
}
