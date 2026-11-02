function renderAccessPage() {
  const actions = `<button class="btn btn-outline" data-action="export-access">${icon("download")} Ekspor CSV</button>`;
  return `${heading(pageInfo.access[0], pageInfo.access[1], actions)}
    <section class="report-summary">
      ${statCard("Akses hari ini", "86", "Aktivitas masuk dan keluar", "history")}
      ${statCard("Member masuk", "24", "Sejak pukul 00.00", "people")}
      ${statCard("Akses ditolak", "2", "Perlu ditinjau", "shield")}
    </section>
    <article class="panel table-panel"><div class="panel-head"><h3>Log akses terbaru</h3><label class="search-box">${icon("search")}<input type="search" placeholder="Cari nama member..." aria-label="Cari riwayat" data-search /></label></div>
      <div class="table-wrap"><table><thead><tr><th>Nama member</th><th>ID member</th><th>Waktu</th><th>Tipe akses</th><th>Status</th></tr></thead><tbody>
      ${store.records.access.map((row) => `<tr>${[row.name, row.memberId, row.time, row.type].map((value) => `<td><strong>${escapeHtml(value)}</strong></td>`).join("")}<td>${statusBadge(row.status)}</td></tr>`).join("")}
      </tbody></table></div></article>`;
}
