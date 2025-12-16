import { cache } from "react";
import { createClient } from "@/prismicio";

// Shared cache for settings to avoid duplicate requests
export const getSettings = cache(async () => {
  const client = createClient();
  return await client.getSingle("settings");
});

