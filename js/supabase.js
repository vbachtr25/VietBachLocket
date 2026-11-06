
const SUPABASE_URL = "https://qfvurvlfoxqibrnobtdh.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_lfaw4OSP-9KwAQH15bHT8g_FUHq4JDi";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

async function getServices() {
  const { data, error } = await supabaseClient
    .from("services")
    .select("id, name, description, price")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("Lỗi tải dịch vụ:", error);
    return [];
  }

  return data || [];
}

async function renderServices() {
  const container = document.getElementById("services-list");
  if (!container) return;

  container.innerHTML = "<p>Đang tải dịch vụ...</p>";

  const services = await getServices();

  if (services.length === 0) {
    container.innerHTML = "<p>Chưa có dịch vụ nào.</p>";
    return;
  }

  container.innerHTML = services.map(service => `
    <div class="card">
      <h3>${escapeHTML(service.name)}</h3>
      <p>${escapeHTML(service.description || "")}</p>
      <p><strong>${Number(service.price).toLocaleString("vi-VN")}đ</strong></p>
    </div>
  `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

document.addEventListener("DOMContentLoaded", renderServices);
