import { supabase } from "./supabase";
import { buildFullBackup, restoreFromBackup, type FullBackup } from "./exportImport";

// Cloud sync is intentionally simple: the whole local database is a single
// JSON blob (the same shape as the manual "export backup" feature), stored
// as one row per user. Good enough for one person moving between their own
// devices — not a real-time multi-device merge engine.

export async function pullFromCloud(userId: string): Promise<boolean> {
  if (!supabase) return false;
  const { data, error } = await supabase.from("user_data").select("data").eq("user_id", userId).maybeSingle();
  if (error || !data?.data) return false;
  await restoreFromBackup(data.data as FullBackup);
  return true;
}

export async function pushToCloud(userId: string): Promise<void> {
  if (!supabase) return;
  const backup = await buildFullBackup();
  await supabase.from("user_data").upsert({
    user_id: userId,
    data: backup,
    updated_at: new Date().toISOString(),
  });
}

export async function hasCloudData(userId: string): Promise<boolean> {
  if (!supabase) return false;
  const { data } = await supabase.from("user_data").select("user_id").eq("user_id", userId).maybeSingle();
  return Boolean(data);
}
