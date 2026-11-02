function renderShiftPage() {
  const current = store.shiftStarted ? `<span class="status">Shift sedang berjalan</span>` : `<span class="status neutral">Belum ada shift aktif</span>`;
  return `${heading(pageInfo.shifts[0], pageInfo.shifts[1])}
    <article class="panel table-panel"><div class="panel-head"><h3>Catatan shift admin</h3>${current}</div><div class="table-wrap"><table><thead><tr><th>Admin</th><th>Waktu masuk</th><th>Waktu keluar</th><th>Status</th></tr></thead><tbody>
    <tr><td><strong>${escapeHtml(store.user.name)}</strong></td><td><strong>${store.signedInAt || "—"}</strong></td><td><strong>${store.shiftStarted ? "—" : "Belum tercatat"}</strong></td><td>${statusBadge(store.shiftStarted ? "Aktif" : "Selesai")}</td></tr>
    <tr><td><strong>Dimas Saputra</strong></td><td><strong>07:01</strong></td><td><strong>15:02</strong></td><td>${statusBadge("Selesai")}</td></tr>
    </tbody></table></div></article>
    <p class="inline-note" style="margin-top:14px;">Absensi shift pada prototipe dicatat setelah simulasi verifikasi wajah. Data tidak dikirim ke server.</p>`;
}
