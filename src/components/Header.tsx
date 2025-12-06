import { createClient } from "@/prismicio";
import { Navbar } from "./navbar";
import { cache } from "react";

// Memoize settings fetch to avoid duplicate requests
const getSettings = cache(async () => {
  const client = createClient();
  return await client.getSingle("settings");
});

export default async function Header() {
  const settings = await getSettings();

  return (
    <header>
      <Navbar settings={settings} />
    </header>
  );
}