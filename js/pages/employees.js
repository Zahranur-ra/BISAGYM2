function renderEmployeesPage() {
  return renderTablePage("employees", ["Nama karyawan", "Email", "Jabatan", "Status"], ["name", "email", "position", "status"], "Tambah karyawan");
}
