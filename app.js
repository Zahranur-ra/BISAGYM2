const iconPaths = {
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  people: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  package: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/><path d="M12 13v8"/>',
  camera: '<rect x="3" y="5" width="18" height="15" rx="2"/><circle cx="12" cy="12.5" r="3"/><path d="m8 5 1-2h6l1 2"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>',
  device: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/><circle cx="12" cy="10.5" r="2.5"/>',
  report: '<path d="M4 19V5m0 14h17"/><path d="m7 15 4-4 3 2 5-6"/><path d="M16 7h3v3"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.6.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.6-.9l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.9l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.6-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.6.9l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.9Z"/>',
  staff: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2m3-14v6m3-3h-6"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  plus: '<path d="M12 5v14m-7-7h14"/>',
  logout: '<path d="M10 17l5-5-5-5m5 5H3"/><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5m-5 5V3"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  gym: '<path d="M6.5 6.5h11v11h-11z"/><path d="M3 9v6m18-6v6M6.5 12h11"/>',
};

const icon = (name) => `<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24">${iconPaths[name] || iconPaths.dashboard}</svg></span>`;
const app = document.querySelector("#app");
const toastRegion = document.querySelector("#toast-region");
let clockTimer = null;
const today = new Date();
const dateLabel = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(today);
const clockLabel = () => new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());

const store = {
  role: "admin",
  user: null,
  activePage: "dashboard",
  shiftStarted: false,
  signedInAt: null,
  records: {
    members: [
      { name: "Aditya Pratama", email: "aditya@email.com", phone: "0812 3456 7890", plan: "Premium", status: "Aktif" },
      { name: "Nadia Putri", email: "nadia@email.com", phone: "0813 5544 2211", plan: "Reguler", status: "Aktif" },
      { name: "Rizky Ramadhan", email: "rizky@email.com", phone: "0821 8899 0011", plan: "Personal Training", status: "Aktif" },
      { name: "Salsa Maharani", email: "salsa@email.com", phone: "0857 3001 2255", plan: "Reguler", status: "Nonaktif" },
    ],
    packages: [
      { name: "Reguler", duration: "1 bulan", price: "Rp 250.000", status: "Aktif" },
      { name: "Premium", duration: "3 bulan", price: "Rp 650.000", status: "Aktif" },
      { name: "Personal Training", duration: "1 bulan", price: "Rp 900.000", status: "Aktif" },
    ],
    employees: [
      { name: "Dimas Saputra", email: "dimas@bisagym.id", position: "Admin", status: "Aktif" },
      { name: "Rani Lestari", email: "rani@bisagym.id", position: "Front desk", status: "Aktif" },
      { name: "Fajar Hidayat", email: "fajar@bisagym.id", position: "Trainer", status: "Aktif" },
    ],
    admins: [
      { name: "Dimas Saputra", email: "dimas@bisagym.id", access: "Admin", status: "Aktif" },
      { name: "Rani Lestari", email: "rani@bisagym.id", access: "Admin", status: "Aktif" },
    ],
    devices: [
      { name: "Kamera Resepsionis", location: "Area masuk", connection: "Terhubung" },
      { name: "Kamera Area Gym", location: "Lantai utama", connection: "Terhubung" },
      { name: "Kamera Ruang Kelas", location: "Studio 2", connection: "Offline" },
    ],
    access: [
      { name: "Aditya Pratama", memberId: "MBR-0018", time: "07:42", type: "Masuk", status: "Berhasil" },
      { name: "Nadia Putri", memberId: "MBR-0031", time: "07:35", type: "Masuk", status: "Berhasil" },
      { name: "Rizky Ramadhan", memberId: "MBR-0009", time: "07:18", type: "Masuk", status: "Berhasil" },
      { name: "Salsa Maharani", memberId: "MBR-0044", time: "06:58", type: "Keluar", status: "Berhasil" },
    ],
  },
};

const adminMenu = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "members", label: "Data member", icon: "people", count: "128" },
  { id: "packages", label: "Paket member", icon: "package" },
  { id: "stream", label: "Streaming kamera", icon: "camera" },
  { id: "access", label: "Riwayat akses member", icon: "history" },
  { id: "devices", label: "Perangkat CCTV", icon: "device" },
  { id: "reports", label: "Laporan", icon: "report" },
  { id: "profile", label: "Setting profil", icon: "settings" },
];
const superMenu = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "members", label: "Data member", icon: "people", count: "128" },
  { id: "employees", label: "Data karyawan", icon: "staff" },
  { id: "admins", label: "Buat akun admin", icon: "shield" },
  { id: "packages", label: "Paket membership", icon: "package" },
  { id: "stream", label: "Streaming kamera", icon: "camera" },
  { id: "access", label: "Riwayat akses member", icon: "history" },
  { id: "shifts", label: "Riwayat shift admin", icon: "clock" },
  { id: "devices", label: "Perangkat CCTV", icon: "device" },
  { id: "reports", label: "Laporan dari admin", icon: "report" },
  { id: "profile", label: "Setelan profil", icon: "settings" },
];

const pageInfo = {
  dashboard: ["Dashboard", "Ringkasan aktivitas dan kondisi BisaGym hari ini."],
  members: ["Data member", "Kelola informasi dan status keanggotaan member."],
  packages: ["Paket member", "Atur pilihan membership dan periode berlangganan."],
  employees: ["Data karyawan", "Pantau data karyawan dan status kerja."],
  admins: ["Buat akun admin", "Kelola akun dan hak akses administrator."],
  stream: ["Streaming kamera", "Pantau tayangan kamera CCTV secara langsung."],
  access: ["Riwayat akses member", "Daftar aktivitas masuk dan keluar member."],
  shifts: ["Riwayat shift admin", "Pantau catatan login dan absensi admin."],
  devices: ["Perangkat CCTV", "Status kamera yang terhubung ke sistem."],
  reports: ["Laporan", "Ringkasan akses dan aktivitas operasional."],
  profile: ["Setelan profil", "Perbarui informasi akun yang sedang digunakan."],
};

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastRegion.append(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function initials(name) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase();
}

function renderShell() {
  stopCamera();
  const menu = store.role === "super" ? superMenu : adminMenu;
  const [title] = pageInfo[store.activePage] || pageInfo.dashboard;
  const roleLabel = store.role === "super" ? "Super admin" : "Admin";
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <a class="brand" href="#" aria-label="BisaGym">${'<span class="brand-mark">' + icon("gym") + "</span>"}<span>BisaGym</span></a>
        <div class="side-label">Menu utama</div>
        <nav class="nav-list" aria-label="Navigasi utama">
          ${menu.map((item) => `<button class="nav-item ${store.activePage === item.id ? "active" : ""}" data-page="${item.id}">${icon(item.icon)}<span>${item.label}</span>${item.count ? `<span class="nav-count">${item.count}</span>` : ""}</button>`).join("")}
        </nav>
        <div class="side-bottom">
          <div class="side-label">Sistem</div>
          <button class="nav-item" data-action="logout">${icon("logout")}<span>Keluar akun</span></button>
          <div class="user-mini"><span class="avatar">${initials(store.user.name)}</span><span><strong>${escapeHtml(store.user.name)}</strong><small>${roleLabel}</small></span></div>
        </div>
      </aside>
      <button class="mobile-overlay" id="mobile-overlay" aria-label="Tutup menu"></button>
      <main class="main-area">
        <header class="topbar">
          <div class="topbar-left">
            <button class="mobile-menu" id="mobile-menu" aria-label="Buka menu">${icon("menu")}</button>
            <div class="breadcrumb">BisaGym <span class="muted">/</span> <strong>${title}</strong></div>
          </div>
          <div class="topbar-right">
            <div class="current-time"><strong id="clock">${clockLabel()}</strong><span>${dateLabel}</span></div>
            ${store.role === "admin" ? `<button class="btn ${store.shiftStarted ? "btn-outline" : "btn-primary"}" data-action="${store.shiftStarted ? "end-shift" : "start-shift"}">${icon("clock")}<span>${store.shiftStarted ? "Akhiri shift" : "Mulai shift"}</span></button>` : ""}
          </div>
        </header>
        <div class="content" id="page-content">${renderPage()}</div>
      </main>
    </div>`;
  app.querySelectorAll('[data-action="logout"]').forEach((button) => button.addEventListener("click", logout));
  app.querySelectorAll('[data-action="start-shift"]').forEach((button) => button.addEventListener("click", () => openAttendanceScan("in")));
  app.querySelectorAll('[data-action="end-shift"]').forEach((button) => button.addEventListener("click", () => openAttendanceScan("out")));
  app.querySelector("#mobile-menu").addEventListener("click", () => {
    app.querySelector("#sidebar").classList.add("open");
    app.querySelector("#mobile-overlay").classList.add("show");
  });
  app.querySelector("#mobile-overlay").addEventListener("click", () => {
    app.querySelector("#sidebar").classList.remove("open");
    app.querySelector("#mobile-overlay").classList.remove("show");
  });
  if (!clockTimer) {
    clockTimer = window.setInterval(() => {
      const clock = document.querySelector("#clock");
      if (clock) clock.textContent = clockLabel();
    }, 1000);
  }
  bindPageActions();
}

function renderPage() {
  if (store.activePage === "dashboard") return renderDashboard();
  if (store.activePage === "members") return renderMembersPage();
  if (store.activePage === "packages") return renderPackagesPage();
  if (store.activePage === "employees") return renderEmployeesPage();
  if (store.activePage === "admins") return renderAdminsPage();
  if (store.activePage === "devices") return renderDevicesPage();
  if (store.activePage === "access") return renderAccessPage();
  if (store.activePage === "shifts") return renderShiftPage();
  if (store.activePage === "reports") return renderReportsPage();
  if (store.activePage === "stream") return renderStreamPage();
  if (store.activePage === "profile") return renderProfilePage();
  return renderDashboard();
}

function heading(title, description, actions = "") {
  return `<div class="page-heading"><div><span class="eyebrow">${store.role === "super" ? "SUPER ADMIN" : "ADMIN"} · WEB MANAGEMENT</span><h1>${title}</h1><p>${description}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ""}</div>`;
}

function statCard(label, value, note, iconName) {
  return `<article class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon">${icon(iconName)}</span></div><div class="stat-value">${value}</div><div class="stat-foot">${note}</div></article>`;
}

function renderTablePage(key, headers, fields, addLabel) {
  const records = store.records[key] || [];
  const superAdmin = store.role === "super";
  const canEdit = key !== "members" && (key !== "devices" && key !== "packages" || superAdmin);
  const readOnly = (key === "packages" && !superAdmin) || (key === "members" && superAdmin);
  const actions = readOnly
    ? ""
    : `<button class="btn btn-primary" data-action="add-record" data-key="${key}">${icon("plus")} ${addLabel}</button>`;
  const note = readOnly
    ? `Anda dapat melihat ${key === "members" ? "data member" : "paket membership"}. Penambahan dan perubahan hanya dapat dilakukan oleh ${key === "members" ? "Admin" : "Super Admin"}.`
    : "Perubahan pada prototipe ini hanya tersimpan sementara di browser dan akan kembali ke data demo saat halaman dimuat ulang.";
  return `${heading(pageInfo[key][0], pageInfo[key][1], actions)}
    <section class="stats-grid" style="grid-template-columns:repeat(2,minmax(0,190px));">
      ${statCard("Total data", records.length, "Data tersimpan di sesi ini", key === "devices" ? "device" : "people")}
      ${statCard("Status aktif", records.filter((row) => row.status === "Aktif" || row.connection === "Terhubung").length, "Siap digunakan", "check")}
    </section>
    <article class="panel table-panel">
      <div class="panel-head"><h3>Daftar ${pageInfo[key][0].toLowerCase()}</h3><label class="search-box">${icon("search")}<input type="search" placeholder="Cari data..." aria-label="Cari data" data-search /></label></div>
      <div class="table-wrap"><table><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}${canEdit ? "<th>Aksi</th>" : ""}</tr></thead><tbody>
      ${records.length ? records.map((row, index) => `<tr data-row="${index}">${fields.map((field) => `<td>${field === "status" || field === "connection" ? statusBadge(row[field]) : `<strong>${escapeHtml(row[field])}</strong>`}</td>`).join("")}${canEdit ? `<td><div class="row-actions"><button class="icon-button" aria-label="Edit" data-action="edit-record" data-key="${key}" data-index="${index}">${icon("settings")}</button><button class="icon-button" aria-label="Hapus" data-action="delete-record" data-key="${key}" data-index="${index}">${icon("close")}</button></div></td>` : ""}</tr>`).join("") : `<tr><td class="empty-state" colspan="${headers.length + 1}">Belum ada data.</td></tr>`}
      </tbody></table></div>
    </article>
    <p class="inline-note" style="margin-top:14px;">${note}</p>`;
}

function statusBadge(value) {
  const normalized = String(value || "").toLowerCase();
  const className = normalized.includes("offline") || normalized.includes("nonaktif") ? "neutral" : normalized.includes("pending") ? "warning" : "";
  return `<span class="status ${className}">${escapeHtml(value || "-")}</span>`;
}

function bindPageActions() {
  app.querySelectorAll("[data-page]").forEach((button) => button.addEventListener("click", () => {
    store.activePage = button.dataset.page;
    renderShell();
  }));
  app.querySelectorAll('[data-action="add-record"]').forEach((button) => button.addEventListener("click", () => openRecordForm(button.dataset.key)));
  app.querySelectorAll('[data-action="edit-record"]').forEach((button) => button.addEventListener("click", () => openRecordForm(button.dataset.key, Number(button.dataset.index))));
  app.querySelectorAll('[data-action="delete-record"]').forEach((button) => button.addEventListener("click", () => {
    const rows = store.records[button.dataset.key];
    const record = rows[Number(button.dataset.index)];
    if (window.confirm(`Hapus data "${record.name}"?`)) {
      rows.splice(Number(button.dataset.index), 1);
      renderShell();
      showToast("Data berhasil dihapus.");
    }
  }));
  app.querySelectorAll("[data-search]").forEach((input) => input.addEventListener("input", () => {
    const query = input.value.toLocaleLowerCase("id");
    const table = input.closest(".panel").querySelector("tbody");
    table.querySelectorAll("tr").forEach((row) => { row.hidden = !row.textContent.toLocaleLowerCase("id").includes(query); });
  }));
  app.querySelectorAll('[data-action="export-access"]').forEach((button) => button.addEventListener("click", exportAccess));
  app.querySelectorAll('[data-action="toggle-stream"]').forEach((button) => button.addEventListener("click", toggleStream));
  const profile = app.querySelector("#profile-form");
  if (profile) profile.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(profile);
    const saveProfile = () => {
      store.user.name = String(data.get("name")).trim();
      store.user.email = String(data.get("email")).trim();
      renderShell();
      showToast("Informasi profil diperbarui.");
    };
    if (store.role === "admin") openAttendanceScan("profile", saveProfile);
    else saveProfile();
  });
}

function openRecordForm(key, index = -1) {
  const rows = store.records[key];
  const existing = index >= 0 ? rows[index] : {};
  const labels = {
    members: { name: "Nama member", email: "Email", phone: "No. telepon", plan: "Paket", status: "Status" },
    packages: { name: "Nama paket", duration: "Periode", price: "Harga", status: "Status" },
    employees: { name: "Nama karyawan", email: "Email", position: "Jabatan", status: "Status" },
    admins: { name: "Nama admin", email: "Email", access: "Hak akses", status: "Status" },
    devices: { name: "Nama perangkat", location: "Lokasi", connection: "Koneksi" },
  };
  const fieldLabels = labels[key];
  const title = index >= 0 ? "Edit data" : (key === "admins" ? "Buat akun admin" : "Tambah data");
  const fields = Object.entries(fieldLabels).map(([field, label]) => {
    const value = existing[field] || "";
    if (field === "status") return `<div class="field"><label for="record-${field}">${label}</label><select id="record-${field}" name="${field}"><option ${value === "Aktif" ? "selected" : ""}>Aktif</option><option ${value === "Nonaktif" ? "selected" : ""}>Nonaktif</option></select></div>`;
    if (field === "connection") return `<div class="field"><label for="record-${field}">${label}</label><select id="record-${field}" name="${field}"><option ${value === "Terhubung" ? "selected" : ""}>Terhubung</option><option ${value === "Offline" ? "selected" : ""}>Offline</option></select></div>`;
    if (field === "access") return `<div class="field"><label for="record-${field}">${label}</label><select id="record-${field}" name="${field}"><option ${value === "Admin" ? "selected" : ""}>Admin</option><option ${value === "Super admin" ? "selected" : ""}>Super admin</option></select></div>`;
    return `<div class="field"><label for="record-${field}">${label}</label><input id="record-${field}" name="${field}" value="${escapeAttribute(value)}" ${field === "email" ? 'type="email"' : ""} required /></div>`;
  }).join("");
  openModal(`<div class="modal-head"><div><span class="eyebrow">KELOLA DATA</span><h2>${title}</h2><p>Lengkapi informasi pada form berikut.</p></div><button class="modal-close" data-close aria-label="Tutup">${icon("close")}</button></div>
    <div class="modal-body"><form id="record-form"><div class="modal-form">${fields}</div><div class="modal-actions"><button class="btn btn-outline" type="button" data-close>Batal</button><button class="btn btn-primary" type="submit">Simpan</button></div></form></div>`);
  const modal = document.querySelector(".modal-backdrop");
  modal.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
  modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  modal.querySelector("#record-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (index >= 0) rows[index] = data;
    else rows.unshift(data);
    closeModal();
    renderShell();
    showToast(index >= 0 ? "Data berhasil diperbarui." : "Data berhasil ditambahkan.");
  });
}

function openModal(content) {
  closeModal();
  document.body.insertAdjacentHTML("beforeend", `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true">${content}</section></div>`);
}

function closeModal() {
  document.querySelector(".modal-backdrop")?.remove();
}

let activeStream = null;
async function startCamera(video, placeholder) {
  if (!navigator.mediaDevices?.getUserMedia) throw new Error("Perangkat ini tidak mendukung akses kamera.");
  activeStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
  video.srcObject = activeStream;
  video.hidden = false;
  placeholder.hidden = true;
  await video.play();
}

function stopCamera() {
  if (activeStream) {
    activeStream.getTracks().forEach((track) => track.stop());
    activeStream = null;
  }
}

async function toggleStream(event) {
  const button = event.currentTarget;
  const feed = document.querySelector("#stream-feed");
  if (!feed) return;
  if (activeStream) {
    stopCamera();
    renderShell();
    showToast("Pratinjau kamera dihentikan.");
    return;
  }
  const video = document.createElement("video");
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;
  const placeholder = feed.querySelector(".camera-placeholder");
  try {
    await startCamera(video, placeholder);
    feed.prepend(video);
    button.innerHTML = `${icon("close")} Hentikan pratinjau`;
  } catch (error) {
    showToast(error.message || "Kamera tidak dapat diakses. Periksa izin browser.");
  }
}

function openAttendanceScan(direction, onVerified) {
  const isCheckIn = direction === "in";
  const isProfileVerification = direction === "profile";
  const title = isProfileVerification ? "Verifikasi perubahan profil" : isCheckIn ? "Absensi masuk" : "Absensi pulang";
  const note = isProfileVerification
    ? "Verifikasi wajah sebelum perubahan nama atau email profil disimpan."
    : isCheckIn
    ? "Pastikan wajah terlihat jelas di kamera untuk memulai shift."
    : "Verifikasi wajah untuk mencatat bahwa shift Anda telah selesai.";
  openModal(`<div class="modal-head"><div><span class="eyebrow">${isProfileVerification ? "VERIFIKASI PERUBAHAN · ADMIN" : "VERIFIKASI WAJAH · ADMIN"}</span><h2>${title}</h2><p>${note}</p></div><button class="modal-close" data-close aria-label="Tutup">${icon("close")}</button></div>
    <div class="modal-body"><div class="scan-layout">
      <div class="camera-feed" id="scan-feed"><div class="camera-placeholder">${icon("camera")}<span>Pratinjau kamera belum dimulai</span></div></div>
      <div class="scan-progress"><span class="scan-step active"></span><span class="scan-step"></span><span class="scan-step"></span></div>
      <div class="scan-message" id="scan-message">Akses kamera secara opsional, lalu jalankan simulasi pencocokan wajah. Demo ini tidak membaca biometrik.</div>
      <div class="modal-actions" style="padding-top:0"><button class="btn btn-outline" data-camera>${icon("camera")} Aktifkan kamera</button><button class="btn btn-primary" data-verify>Simulasikan verifikasi</button></div>
    </div></div>`);
  const modal = document.querySelector(".modal-backdrop");
  modal.querySelector("[data-close]").addEventListener("click", closeScanModal);
  modal.addEventListener("click", (event) => { if (event.target === modal) closeScanModal(); });
  modal.querySelector("[data-camera]").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    const placeholder = modal.querySelector(".camera-placeholder");
    try {
      await startCamera(video, placeholder);
      modal.querySelector("#scan-feed").prepend(video);
      button.textContent = "Kamera aktif";
      button.disabled = true;
    } catch (error) {
      modal.querySelector("#scan-message").textContent = `${error.message || "Kamera tidak dapat diakses."} Simulasi tetap bisa dilanjutkan tanpa kamera.`;
    }
  });
  modal.querySelector("[data-verify]").addEventListener("click", (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "Memverifikasi...";
    const steps = modal.querySelectorAll(".scan-step");
    const message = modal.querySelector("#scan-message");
    message.textContent = "Menjalankan simulasi verifikasi lokal...";
    steps.forEach((step, index) => window.setTimeout(() => step.classList.add("active"), index * 350));
    window.setTimeout(() => {
      if (isProfileVerification) {
        closeScanModal();
        onVerified();
        showToast("Verifikasi wajah berhasil.");
        return;
      }
      if (isCheckIn) {
        store.shiftStarted = true;
        store.signedInAt = clockLabel();
        store.activePage = "dashboard";
        closeScanModal();
        renderShell();
        showToast("Absensi masuk berhasil dicatat. Selamat bekerja!");
      } else {
        store.shiftStarted = false;
        closeScanModal();
        showToast("Absensi pulang berhasil dicatat.");
        logout();
      }
    }, 1100);
  });
}

function closeScanModal() {
  closeModal();
  stopCamera();
}

function logout() {
  closeScanModal();
  store.shiftStarted = false;
  store.signedInAt = null;
  renderLogin();
  showToast("Anda telah keluar dari sesi.");
}

function exportAccess() {
  const rows = [["Nama member", "ID member", "Waktu", "Tipe akses", "Status"], ...store.records.access.map((row) => [row.name, row.memberId, row.time, row.type, row.status])];
  const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `laporan-akses-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Laporan akses berhasil diunduh.");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

renderLogin();
