(async () => {
  try {
    const { user } = await fetch('/api/auth/me').then(r=>r.json());
    const el = document.querySelector('.loginicon'); // reuse your existing spot
    if (!el) return;
    el.innerHTML = user
      ? `Hello, ${user.name.split(' ')[0]} | <a href="#" id="logout">Logout</a>`
      : `<a href="/login.html" title="Login"><i class="fa-solid fa-circle-user"></i></a>`;
    document.getElementById('logout')?.addEventListener('click', async (e) => {
      e.preventDefault();
      await fetch('/api/auth/logout', { method:'POST' });
      location.reload();
    });
  } catch {}
})();
