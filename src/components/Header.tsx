import { Navbar } from "./navbar";
import { getSettings } from "@/lib/prismic-settings";

export default async function Header() {
  const settings = await getSettings();

  return (
    <header>
      <Navbar settings={settings} />
    </header>
  );
}