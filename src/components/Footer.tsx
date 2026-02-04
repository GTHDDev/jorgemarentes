import { getSettings } from '@/lib/prismic-settings'
import FooterClient from './footer/index'

export default async function Footer() {
  const settings = await getSettings()

  return <FooterClient settings={settings} />
}
