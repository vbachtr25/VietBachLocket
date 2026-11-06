
const SUPABASE_URL =
  "https://qfvurvlfoxqibrnobtdh.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_lfaw4OSP-9KwAQH15bHT8g_FUHq4JDi";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

async function getServices() {
  const { data, error } = await supabaseClient
    .from("services")
    .select("id, name, description, price, is_active")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data || [];
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

async function renderServices() {
  const container = document.getElementById("services-list");

  if (!container) {
    console.error("Không tìm thấy services-list");
    return;
  }

  container.innerHTML =
    '<p class="status">Đang tải dịch vụ...</p>';

  try {
    const services = await getServices();

    if (services.length === 0) {
      container.innerHTML =
        '<p class="status">Chưa có dịch vụ đang hoạt động.</p>';
      return;
    }

    container.innerHTML = services.map(service => `
      <article class="card">
        <h3>${escapeHTML(service.name)}</h3>
        <p>${escapeHTML(service.description)}</p>
        <span class="price">
          ${Number(service.price).toLocaleString("vi-VN")}đ
        </span>
      </article>
    `).join("");

  } catch (error) {
    container.innerHTML = `
      <p class="status">
        Không thể tải dịch vụ. Vui lòng thử lại sau.
      </p>
    `;
  }
}

document.addEventListener("DOMContentLoaded", renderServices);
