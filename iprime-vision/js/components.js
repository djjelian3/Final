/* ==========================================================================
   iPrime Vision — Shared Components
   Builds the site nav, admin sidebar/topbar and small icon set so every
   page stays lean and consistent. Include after data.js + auth.js.
   ========================================================================== */

const ICONS = {
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 22V12h6v10"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>',
  help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  fileText: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>',
  glasses: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M10 15h4M2 13l1-6a2 2 0 0 1 2-1.5M22 13l-1-6a2 2 0 0 0-2-1.5"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M4 6h16M4 18h16"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 2-1.58l1.65-7.42H5.12"/></svg>'
};

function svg(name) { return ICONS[name] || ''; }

function brandLogo() {
  return '<span class="brand-logo">iPRIME-Vision</span>';
}

/* --------------------------------------------------------------------------
   Public / Patient site navigation (index.html + patient/*.html)
   -------------------------------------------------------------------------- */
function renderSiteNav(activeKey) {
  const mount = document.getElementById('site-nav');
  if (!mount) return;
  const user = currentUser();
  const homeHref = user ? resolvePath('patient/dashboard.html') : resolvePath('index.html');

  const links = [
    { key: 'home', label: 'Home', href: homeHref },
    { key: 'about', label: 'About', href: resolvePath('patient/about.html') },
    { key: 'services', label: 'Services', href: resolvePath('patient/services.html') },
    { key: 'appointment', label: 'Appointment', href: resolvePath('patient/appointment.html') },
    { key: 'faq', label: 'FAQ', href: resolvePath('patient/faq.html') },
    { key: 'contact', label: 'Contact', href: resolvePath('patient/contact.html') }
  ];

  const linksHTML = links.map(l =>
    `<a href="${l.href}" class="${l.key === activeKey ? 'active' : ''}">${l.label}</a>`
  ).join('');

  const actionsHTML = user
    ? `<div class="flex gap-12" style="align-items:center;">
         <a href="${resolvePath('patient/dashboard.html')}" class="avatar" title="${user.name}">${initials(user.name)}</a>
         <button class="btn btn-outline btn-sm" id="nav-signout"><span>${svg('logout')}</span> Sign Out</button>
       </div>`
    : `<a href="${resolvePath('auth/auth.html')}" class="btn btn-ghost"><span class="hide-mobile">Sign In</span></a>
       <a href="${resolvePath('patient/appointment.html')}" class="btn btn-primary">Book an Appointment</a>`;

  mount.innerHTML = `
    <header class="site-header">
      <div class="nav-row">
        <a href="${homeHref}" class="brand">
          ${brandLogo()}
        </a>
        <nav class="nav-links" id="nav-links">${linksHTML}</nav>
        <div class="nav-actions">
          ${actionsHTML}
          <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">${svg('menu')}</button>
        </div>
      </div>
    </header>`;

  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle) toggle.addEventListener('click', () => navLinks.classList.toggle('open'));

  const signout = document.getElementById('nav-signout');
  if (signout) signout.addEventListener('click', logoutUser);
}

/* --------------------------------------------------------------------------
   Footer
   -------------------------------------------------------------------------- */
function renderSiteFooter() {
  const mount = document.getElementById('site-footer');
  if (!mount) return;
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="brand" style="color:var(--white);margin-bottom:14px;">
              ${brandLogo()}
            </div>
            <p>Precision eye care and eyewear crafted around how you actually see the world. Serving Davao City since 2021.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="${resolvePath('patient/about.html')}">About Us</a></li>
              <li><a href="${resolvePath('patient/services.html')}">Services</a></li>
              <li><a href="${resolvePath('patient/faq.html')}">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Patients</h4>
            <ul>
              <li><a href="${resolvePath('patient/appointment.html')}">Book Appointment</a></li>
              <li><a href="${resolvePath('auth/auth.html')}">Sign In</a></li>
              <li><a href="${resolvePath('patient/contact.html')}">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit</h4>
            <p>2F Mount Mayon St. Quirino, Davao City Philippines</p>
            <p>Mon–Sat: 9:00 AM – 6:00 PM</p>
            <p> 0905 314 5838</p>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} iPrime Vision &amp; Eyecare Specialists. All rights reserved.</span>
          <span>Designed for clearer tomorrows.</span>
        </div>
      </div>
    </footer>`;
}

/* --------------------------------------------------------------------------
   Admin sidebar + topbar (admin/*.html)
   -------------------------------------------------------------------------- */
function renderAdminShellStart(activeKey) {
  const user = requireRole('admin');
  if (!user) return null;

  const nav = [
    { key: 'dashboard', label: 'Dashboard', icon: 'home', href: 'dashboard.html' },
    { key: 'appointments', label: 'Appointments', icon: 'calendar', href: 'appointments.html' },
    { key: 'patients', label: 'Patient Records', icon: 'users', href: 'patients.html' },
    { key: 'prescriptions', label: 'Prescriptions', icon: 'glasses', href: 'prescriptions.html' },
    { key: 'eyewear', label: 'Eyewear Catalog', icon: 'layers', href: 'eyewear.html' },
    { key: 'inventory', label: 'Inventory', icon: 'box', href: 'inventory.html' },
    { key: 'billing', label: 'Billing & Payments', icon: 'card', href: 'billing.html' },
    { key: 'notifications', label: 'Notifications', icon: 'bell', href: 'notifications.html', badge: true },
    { key: 'reports', label: 'Reports', icon: 'chart', href: 'reports.html' },
    { key: 'profile', label: 'Profile', icon: 'user', href: 'profile.html' },
    { key: 'settings', label: 'Settings', icon: 'settings', href: 'settings.html' }
  ];

  const unread = Store.notifications().filter(n => n.audience === 'admin' && !n.read).length;

  const navHTML = nav.map(n => `
    <a href="${n.href}" class="${n.key === activeKey ? 'active' : ''}">
      ${svg(n.icon)}<span>${n.label}</span>
      ${n.badge && unread ? `<span class="nav-badge">${unread}</span>` : ''}
    </a>`).join('');

  document.getElementById('admin-mount').innerHTML = `
    <div class="mobile-topbar">
      <button id="side-toggle">${svg('menu')}</button>
      <div class="brand" style="color:var(--white);font-size:1.05rem;">
        ${brandLogo()}
      </div>
    </div>
    <div class="admin-shell">
      <aside class="admin-sidebar" id="admin-sidebar">
        <div class="admin-brand">
          ${brandLogo()}
        </div>
        <nav class="admin-nav">${navHTML}</nav>
        <div class="admin-signout">
          <a href="#" id="admin-signout">${svg('logout')}<span>Sign Out</span></a>
        </div>
      </aside>
      <main class="admin-main">
        <div id="admin-topbar-mount"></div>
        <div class="admin-content" id="admin-content"></div>
      </main>
    </div>`;

  const sideToggle = document.getElementById('side-toggle');
  const sidebar = document.getElementById('admin-sidebar');
  if (sideToggle) sideToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.getElementById('admin-signout').addEventListener('click', (e) => { e.preventDefault(); logoutUser(); });

  return user;
}

function renderAdminTopbar(title, subtitle) {
  document.getElementById('admin-topbar-mount').innerHTML = `
    <div class="admin-topbar">
      <div>
        <h1>${title}</h1>
        ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
      </div>
      <div class="topbar-right">
        <div class="topbar-date">${svg('calendar')} ${fmtDate(todayISO())}</div>
      </div>
    </div>`;
}

/* --------------------------------------------------------------------------
   Reveal-on-scroll (subtle, respects reduced motion)
   -------------------------------------------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
}
document.addEventListener('DOMContentLoaded', initReveal);
