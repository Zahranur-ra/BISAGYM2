function renderDevicesPage() {
  return renderTablePage("devices", ["Nama perangkat", "Lokasi", "Koneksi"], ["name", "location", "connection"], "Tambah perangkat");
}
