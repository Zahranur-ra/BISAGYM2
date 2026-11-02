function renderReportsPage() {
  const bars = [42, 68, 51, 84, 61, 93, 73].map((height, index) => `<div class="chart-column"><div class="chart-bar" style="height:${height}%"></div><small>${["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index]}</small></div>`).join("");
  return `${heading(pageInfo.reports[0], pageInfo.reports[1], `<button class="btn btn-outline" data-action="export-access">${icon("download")} Ekspor laporan</button>`)}
    <section class="report-summary">
      ${statCard("Total kunjungan", "486", "7 hari terakhir", "people")}
      ${statCard("Rata-rata harian", "69", "Kunjungan member", "report")}
      ${statCard("Member aktif", "128", "Terdaftar saat ini", "check")}
    </section>
    <article class="panel"><div class="panel-head"><h3>Aktivitas akses minggu ini</h3><span class="status">7 hari terakhir</span></div><div class="panel-body"><div class="chart-bars">${bars}</div></div></article>
    <p class="inline-note" style="margin-top:14px;">Ringkasan laporan menggunakan data contoh untuk keperluan demonstrasi frontend.</p>`;
}
