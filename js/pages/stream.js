function renderStreamPage() {
  return `${heading(pageInfo.stream[0], pageInfo.stream[1])}
    <section class="camera-card">
      <article class="panel"><div class="panel-head"><h3>Live view · Kamera resepsionis</h3><span class="status">${icon("camera")} Siap</span></div><div class="panel-body" style="padding:12px"><div class="camera-feed" id="stream-feed"><div class="camera-placeholder">${icon("camera")}<span>Pratinjau kamera belum dimulai</span></div></div></div></article>
      <aside class="panel camera-meta"><span class="eyebrow">PERANGKAT CCTV</span><h3>Pantau area gym</h3><div class="camera-device"><span class="device-dot"></span>Kamera Resepsionis · Terhubung</div><p>Izinkan akses kamera untuk menampilkan pratinjau langsung dari perangkat ini. Prototipe tidak merekam atau mengirim video.</p><button class="btn btn-dark" data-action="toggle-stream">${icon("camera")} Mulai pratinjau</button><button class="btn btn-outline" data-page="devices">Lihat perangkat</button></aside>
    </section>`;
}
