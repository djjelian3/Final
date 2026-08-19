/* ==========================================================================
   iPrime Vision — Authentication
   Simple email/password auth against the localStorage user store.
   ========================================================================== */

function currentUser() {
  const session = Store.session();
  if (!session) return null;
  return Store.users().find(u => u.id === session.id) || null;
}

function cacheUser(user) {
  const users = Store.users().filter(existing => existing.id !== user.id);
  Store.saveUsers([...users, user]);
  Store.saveSession({ id: user.id, role: user.role });
}

async function loginUser(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const result = await response.json();
  if (!response.ok) return result;
  cacheUser(result.user);
  return result;
}

async function signupPatient({ name, email, password, phone }) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone })
  });
  const result = await response.json();
  if (!response.ok) return result;
  cacheUser(result.user);
  return result;
}

async function logoutUser() {
  await fetch('/api/auth/logout', { method: 'POST' });
  Store.clearSession();
  window.location.href = resolvePath('index.html');
}

async function serverUser() {
  const response = await fetch('/api/auth/me');
  const result = await response.json();
  if (result.user) cacheUser(result.user);
  return result.user || null;
}

/** Resolves a root-relative path (e.g. "index.html", "admin/dashboard.html")
 *  correctly no matter how deep the current page is nested. */
function resolvePath(path) {
  const depth = window.__ipvDepth || 0;
  return '../'.repeat(depth) + path;
}

/** Call at the top of any protected page. Redirects if the role doesn't match. */
function requireRole(role) {
  const user = currentUser();
  if (!user || user.role !== role) {
    window.location.href = resolvePath('auth/auth.html');
    return null;
  }
  return user;
}

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join('');
}
