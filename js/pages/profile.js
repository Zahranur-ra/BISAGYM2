function renderProfilePage() {
  return `${heading(pageInfo.profile[0], pageInfo.profile[1])}
    <form class="profile-grid" id="profile-form">
      <article class="panel profile-card"><h3>Informasi akun</h3>
        <div class="field"><label for="profile-name">Nama lengkap</label><input id="profile-name" name="name" value="${escapeAttribute(store.user.name)}" required /></div>
        <div class="field"><label for="profile-email">Alamat email</label><input id="profile-email" name="email" type="email" value="${escapeAttribute(store.user.email)}" required /></div>
        <div class="field" style="margin-top:15px"><button class="btn btn-primary" type="submit">Simpan perubahan</button></div>
      </article>
      <article class="panel profile-card"><h3>Keamanan akun</h3>
        <div class="field"><label for="new-password">Password baru</label><input id="new-password" type="password" placeholder="Masukkan password baru" /></div>
        <p class="form-note" style="margin:0">Penggantian password memerlukan koneksi backend dan belum tersedia di prototipe ini.</p>
      </article>
    </form>`;
}
