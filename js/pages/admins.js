function renderAdminsPage() {
  return renderTablePage("admins", ["Nama admin", "Email", "Hak akses", "Status"], ["name", "email", "access", "status"], "Buat akun admin");
}
