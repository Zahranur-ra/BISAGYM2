function renderPackagesPage() {
  return renderTablePage("packages", ["Nama paket", "Periode", "Harga", "Status"], ["name", "duration", "price", "status"], "Tambah paket");
}
