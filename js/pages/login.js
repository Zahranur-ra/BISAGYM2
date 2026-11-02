function renderLogin() {
  store.user = null;
  store.activePage = "dashboard";
  stopCamera();
  app.innerHTML = `
    <main class="login-page">
      <section class="login-art" aria-label="Tentang BisaGym">
        <a class="brand" href="#" aria-label="BisaGym">
          <span class="brand-mark">${icon("gym")}</span><span>BisaGym</span>
        </a>
        <div class="login-copy">
          <span class="eyebrow">GYM MANAGEMENT SYSTEM</span>
          <h1>Ruang sehat,<br /><span>terkelola lebih baik.</span></h1>
          <p>Kelola member, pantau aktivitas gym, dan pastikan setiap shift berjalan lancar dalam satu tempat.</p>
        </div>
        <div class="login-footer">© ${today.getFullYear()} BisaGym Management · Versi frontend demo</div>
      </section>
      <section class="login-panel">
        <form class="login-card" id="login-form">
          <span class="eyebrow">SELAMAT DATANG</span>
          <h2>Masuk ke akun</h2>
          <p>Gunakan akun Anda untuk melanjutkan ke dashboard manajemen.</p>
          <div class="role-switch" aria-label="Pilih jenis akun">
            <button type="button" class="role-option ${store.role === "admin" ? "active" : ""}" data-role="admin">${icon("people")} Admin</button>
            <button type="button" class="role-option ${store.role === "super" ? "active" : ""}" data-role="super">${icon("shield")} Super admin</button>
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" placeholder="nama@bisagym.id" autocomplete="username" required />
          </div>
          <div class="field">
            <label for="password">Password</label>
            <div class="input-wrap">
              <input id="password" name="password" type="password" placeholder="Masukkan password" autocomplete="current-password" required />
              <button class="password-toggle" type="button" aria-label="Tampilkan password">${icon("eye")}</button>
            </div>
          </div>
          <div class="login-error" id="login-error" role="alert"></div>
          <p class="form-note">Mode demo: isi email dan password apa saja. Akun admin akan melanjutkan ke simulasi absensi wajah.</p>
          <button class="btn btn-primary btn-block" type="submit">Masuk ke dashboard <span aria-hidden="true">→</span></button>
        </form>
      </section>
    </main>`;

  app.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      store.role = button.dataset.role;
      app.querySelectorAll("[data-role]").forEach((item) => item.classList.toggle("active", item === button));
    });
  });
  app.querySelector(".password-toggle").addEventListener("click", () => {
    const field = app.querySelector("#password");
    field.type = field.type === "password" ? "text" : "password";
  });
  app.querySelector("#login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    if (!email || !password) {
      const error = app.querySelector("#login-error");
      error.textContent = "Email dan password wajib diisi.";
      error.classList.add("show");
      return;
    }
    store.user = { name: nameFromEmail(email), email };
    if (store.role === "admin") openAttendanceScan("in");
    else renderShell();
  });
}

function nameFromEmail(email) {
  const prefix = email.split("@")[0].replace(/[._-]+/g, " ").trim();
  return prefix ? prefix.replace(/\b\w/g, (letter) => letter.toUpperCase()) : "Pengguna";
}
