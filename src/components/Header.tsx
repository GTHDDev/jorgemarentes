import { Navbar } from './navbar'
import { getSettings } from '@/lib/prismic-settings'

export default async function Header() {
  const settings = await getSettings()

  if (!settings) return null

  return (
    <header className="relative z-50">
      <Navbar settings={settings} />
    </header>
  )
}
