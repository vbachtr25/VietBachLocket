const SUPABASE_URL = "https://qfvurvlfoxqibrnobtdh.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_lfaw4OSP-9KwAQH15bHT8g_FUHq4JDi";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

async function getServices() {
  const { data, error } = await supabaseClient
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("Lỗi tải dịch vụ:", error);
    return [];
  }

  return data;
}
