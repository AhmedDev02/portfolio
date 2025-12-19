// src/services/contact.js

import { supabase } from "../../supabase";

/**
 * Check if an email exists in the DB
 */
export async function findEmail(email) {
  const { data, error } = await supabase
    .from("contact_requests")
    .select("*")
    .eq("email", email);

  return { data, error };
}
export async function saveEmailTimestamp(email) {
  return await supabase.from("contact_requests").upsert(
    {
      email,
      last_sent: new Date().toISOString(),
    },
    { onConflict: "email" }
  );
}
