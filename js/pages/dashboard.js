function renderDashboard() {
  const superAdmin = store.role === "super";
  const title = superAdmin ? "Selamat datang kembali," : "Halo, siap mulai hari ini?";
  const subtitle = superAdmin ? "Pantau operasional BisaGym dari satu dashboard." : "Semua aktivitas gym Anda terangkum di sini.";
  const quickLinks = (superAdmin
    ? [["members", "Data member", "people"], ["employees", "Data karyawan", "staff"], ["admins", "Akun admin", "shield"], ["reports", "Lihat laporan", "report"]]
    : [["members", "Data member", "people"], ["packages", "Paket member", "package"], ["stream", "Streaming kamera", "camera"], ["reports", "Lihat laporan", "report"]]);
  return `
    ${heading("Dashboard", pageInfo.dashboard[1])}
    <section class="welcome-card"><div><span class="eyebrow">${dateLabel}</span><h2>${title} ${escapeHtml(store.user.name)}.</h2><p>${subtitle}</p></div><div class="welcome-decoration">${icon("gym")}</div></section>
    <section class="stats-grid">
      ${statCard("Total member", "128", "+12 member bulan ini", "people")}
      ${statCard(superAdmin ? "Karyawan aktif" : "Hadir hari ini", superAdmin ? "8" : "24", superAdmin ? "Dari 10 karyawan terdaftar" : "Member sudah check-in", "staff")}
      ${statCard("Paket aktif", "3", "Pilihan membership tersedia", "package")}
      ${statCard("Kamera online", "2 / 3", "1 perangkat perlu diperiksa", "camera")}
    </section>
    <section class="dashboard-grid">
      <article class="panel"><div class="panel-head"><h3>Aktivitas terbaru</h3><button class="text-button" data-page="access">Lihat semua</button></div><div class="panel-body"><div class="activity-list">
        ${store.records.access.slice(0, 4).map((row) => `<div class="activity-row"><span class="activity-dot">${icon("history")}</span><span><strong>${escapeHtml(row.name)}</strong><small>${row.type} · ${row.memberId}</small></span><time>${row.time}</time></div>`).join("")}
      </div></div></article>
      <article class="panel"><div class="panel-head"><h3>Akses cepat</h3></div><div class="panel-body"><div class="quick-grid">
        ${quickLinks.map(([id, label, iconName]) => `<button class="quick-link" data-page="${id}">${icon(iconName)}<span>${label}</span></button>`).join("")}
      </div></div></article>
    </section>`;
}
