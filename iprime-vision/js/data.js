/* ==========================================================================
   iPrime Vision — Data Layer
   A tiny localStorage-backed "database" so the whole prototype works
   without a server. Every page includes this file first.
   ========================================================================== */

const DB_KEYS = {
  users: 'ipv_users',
  session: 'ipv_session',
  patients: 'ipv_patients',
  appointments: 'ipv_appointments',
  prescriptions: 'ipv_prescriptions',
  eyewear: 'ipv_eyewear',
  inventory: 'ipv_inventory',
  invoices: 'ipv_invoices',
  notifications: 'ipv_notifications',
  faqs: 'ipv_faqs',
  seeded: 'ipv_seeded_v1'
};

function db_get(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function db_set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function uid(prefix) { return prefix + '_' + Math.random().toString(36).slice(2, 9); }
function todayISO() { return new Date().toISOString().slice(0, 10); }
function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function fmtDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}
function timeAgo(iso) {
  const diff = Math.max(0, (Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 60) return Math.round(diff) + ' min ago';
  if (diff < 1440) return Math.round(diff / 60) + ' hr ago';
  return Math.round(diff / 1440) + ' day(s) ago';
}

/* --------------------------------------------------------------------------
   Seed demo data on first load
   -------------------------------------------------------------------------- */
function seedDatabase() {
  if (db_get(DB_KEYS.seeded, false)) return;

  const users = [
    { id: 'u_admin', role: 'admin', name: 'Admin User', email: 'admin@iprimevision.com', password: 'admin123', phone: '+63 917 000 1111' },
    { id: 'u_p1', role: 'patient', name: 'Juan Dela Cruz', email: 'juan@example.com', password: 'patient123', phone: '+63 917 222 3333', dob: '1990-04-12', address: 'Davao City' },
    { id: 'u_p2', role: 'patient', name: 'Maria Santos', email: 'maria@example.com', password: 'patient123', phone: '+63 917 444 5555', dob: '1995-08-02', address: 'Davao City' }
  ];

  const patients = [
    { id: 'u_p1', name: 'Juan Dela Cruz', email: 'juan@example.com', phone: '+63 917 222 3333', lastVisit: '2025-05-02', condition: 'Myopia', status: 'Active' },
    { id: 'u_p2', name: 'Maria Santos', email: 'maria@example.com', phone: '+63 917 444 5555', lastVisit: '2025-04-20', condition: 'Astigmatism', status: 'Active' },
    { id: uid('pt'), name: 'Kevin Reyes', email: 'kevin.reyes@example.com', phone: '+63 917 666 7777', lastVisit: '2025-05-10', condition: 'Presbyopia', status: 'Active' },
    { id: uid('pt'), name: 'Anne Garcia', email: 'anne.garcia@example.com', phone: '+63 917 888 9999', lastVisit: '2025-03-14', condition: 'Hyperopia', status: 'Follow-up' }
  ];

  const appointments = [
    { id: uid('ap'), patientId: 'u_p1', patient: 'Juan Dela Cruz', date: todayISO(), time: '09:00 AM', service: 'Eye Examination', status: 'Confirmed', notes: 'Routine annual checkup.' },
    { id: uid('ap'), patientId: 'u_p2', patient: 'Maria Santos', date: todayISO(), time: '10:30 AM', service: 'Contact Lens Fitting', status: 'Pending', notes: 'First-time contact lens wearer.' },
    { id: uid('ap'), patientId: uid('pt'), patient: 'Kevin Reyes', date: todayISO(), time: '01:00 PM', service: 'Follow-up Checkup', status: 'Confirmed', notes: 'Post-prescription follow up.' },
    { id: uid('ap'), patientId: uid('pt'), patient: 'Anne Garcia', date: todayISO(), time: '03:30 PM', service: 'Eye Examination', status: 'Pending', notes: '' },
    { id: uid('ap'), patientId: 'u_p1', patient: 'Juan Dela Cruz', date: '2025-05-25', time: '11:00 AM', service: 'Frame Adjustment', status: 'Confirmed', notes: '' }
  ];

  const prescriptions = [
    { id: uid('rx'), patientId: 'u_p1', patient: 'Juan Dela Cruz', date: '2025-05-02', odSph: '-1.25', odCyl: '-0.50', osSph: '-1.50', osCyl: '-0.25', pd: '62', notes: 'Recommend anti-glare coating.', status: 'Active' },
    { id: uid('rx'), patientId: 'u_p2', patient: 'Maria Santos', date: '2025-04-20', odSph: '-0.75', odCyl: '-1.00', osSph: '-0.50', osCyl: '-0.75', pd: '60', notes: 'Toric contact lenses fitted.', status: 'Active' },
    { id: uid('rx'), patientId: uid('pt'), patient: 'Kevin Reyes', date: '2025-05-10', odSph: '+1.50', odCyl: '0.00', osSph: '+1.75', osCyl: '0.00', pd: '64', notes: 'Progressive lenses for presbyopia.', status: 'Updated' }
  ];

  const eyewear = [
    { id: uid('ew'), name: 'Aria Round Frame', category: 'Eyeglasses', material: 'Acetate', price: 3450, stock: 18, image: 'aria-round-frame.jpg', img: '👓' },
    { id: uid('ew'), name: 'Solstice Aviator', category: 'Sunglasses', material: 'Metal Alloy', price: 4200, stock: 9, image: 'solstice-aviator.jpg', img: '🕶️' },
    { id: uid('ew'), name: 'Nomad Rectangle', category: 'Eyeglasses', material: 'Titanium', price: 5100, stock: 4, image: 'nomad-rectangle.jpg', img: '👓' },
    { id: uid('ew'), name: 'Daily Comfort Lens (30pk)', category: 'Contact Lenses', material: 'Silicone Hydrogel', price: 1290, stock: 32, image: 'daily-comfort-lens.jpg', img: '👁️' },
    { id: uid('ew'), name: 'Blue-Light Guard', category: 'Eyeglasses', material: 'TR90', price: 2650, stock: 2, image: 'blue-light-guard.jpg', img: '👓' },
    { id: uid('ew'), name: 'Coastal Cat-Eye', category: 'Sunglasses', material: 'Acetate', price: 3800, stock: 11, image: 'coastal-cat-eye.jpg', img: '🕶️' }
  ];

  const inventory = eyewear.map(e => ({ id: uid('inv'), item: e.name, category: e.category, sku: 'IPV-' + Math.floor(1000 + Math.random() * 8999), stock: e.stock, reorderLevel: 8, status: e.stock <= 8 ? 'Low Stock' : 'In Stock' }));
  inventory.push({ id: uid('inv'), item: 'Lens Cleaning Solution', category: 'Accessories', sku: 'IPV-4410', stock: 6, reorderLevel: 10, status: 'Low Stock' });
  inventory.push({ id: uid('inv'), item: 'Microfiber Cloths', category: 'Accessories', sku: 'IPV-4411', stock: 40, reorderLevel: 15, status: 'In Stock' });

  const invoices = [
    { id: uid('inv-bill'), patient: 'Juan Dela Cruz', date: '2025-05-02', service: 'Eye Examination + Frame', amount: 4780, status: 'Paid' },
    { id: uid('inv-bill'), patient: 'Maria Santos', date: '2025-04-20', service: 'Contact Lens Fitting', amount: 1890, status: 'Paid' },
    { id: uid('inv-bill'), patient: 'Kevin Reyes', date: '2025-05-10', service: 'Progressive Lenses', amount: 6200, status: 'Pending' },
    { id: uid('inv-bill'), patient: 'Anne Garcia', date: '2025-03-14', service: 'Eye Examination', amount: 950, status: 'Overdue' }
  ];

  const notifications = [
    { id: uid('nt'), audience: 'admin', title: 'New appointment request from Maria Santos', time: new Date(Date.now() - 10 * 60000).toISOString(), read: false, type: 'appointment' },
    { id: uid('nt'), audience: 'admin', title: 'Appointment reminder for Juan Dela Cruz tomorrow at 9:00 AM', time: new Date(Date.now() - 60 * 60000).toISOString(), read: false, type: 'reminder' },
    { id: uid('nt'), audience: 'admin', title: 'Prescription for Kevin Reyes has been updated', time: new Date(Date.now() - 3 * 3600000).toISOString(), read: false, type: 'prescription' },
    { id: uid('nt'), audience: 'admin', title: '3 items are low in stock', time: new Date(Date.now() - 5 * 3600000).toISOString(), read: true, type: 'inventory' },
    { id: uid('nt'), audience: 'u_p1', title: 'Your appointment on ' + todayISO() + ' at 9:00 AM is confirmed', time: new Date(Date.now() - 2 * 3600000).toISOString(), read: false, type: 'appointment' },
    { id: uid('nt'), audience: 'u_p1', title: 'Your prescription has been renewed', time: new Date(Date.now() - 26 * 3600000).toISOString(), read: true, type: 'prescription' },
    { id: uid('nt'), audience: 'u_p2', title: 'Your appointment request is pending confirmation', time: new Date(Date.now() - 15 * 60000).toISOString(), read: false, type: 'appointment' }
  ];

  const faqs = [
    { q: 'How do I book an eye examination?', a: 'Go to the Appointment page, choose your preferred service, date and time, and submit the form. You will receive a confirmation once our staff reviews your request.' },
    { q: 'What should I bring to my first visit?', a: 'Please bring a valid ID, your current glasses or contact lenses (if any), and a list of any medications you are taking.' },
    { q: 'Do you accept HMO or insurance?', a: 'Yes, iPrime Vision partners with major HMO providers. Please bring your HMO card and a valid ID to your appointment for verification.' },
    { q: 'How long does a full eye examination take?', a: 'A comprehensive eye examination typically takes 30–45 minutes, depending on the tests required.' },
    { q: 'Can I reschedule or cancel my appointment?', a: 'Yes. Sign in to your patient dashboard, open the appointment from your upcoming list, and choose to reschedule or cancel at least 24 hours in advance.' },
    { q: 'Do you offer same-day glasses?', a: 'Select frames with in-stock standard lenses can be ready the same day. Custom prescriptions typically take 3–5 business days.' },
    { q: 'How often should I get my eyes checked?', a: 'We recommend a comprehensive eye exam every 1–2 years for adults, and annually for children, contact lens wearers, and anyone with an existing eye condition.' }
  ];

  db_set(DB_KEYS.users, users);
  db_set(DB_KEYS.patients, patients);
  db_set(DB_KEYS.appointments, appointments);
  db_set(DB_KEYS.prescriptions, prescriptions);
  db_set(DB_KEYS.eyewear, eyewear);
  db_set(DB_KEYS.inventory, inventory);
  db_set(DB_KEYS.invoices, invoices);
  db_set(DB_KEYS.notifications, notifications);
  db_set(DB_KEYS.faqs, faqs);
  db_set(DB_KEYS.seeded, true);
}

seedDatabase();

/* --------------------------------------------------------------------------
   Convenience accessors
   -------------------------------------------------------------------------- */
const Store = {
  users: () => db_get(DB_KEYS.users, []),
  saveUsers: (v) => db_set(DB_KEYS.users, v),
  patients: () => db_get(DB_KEYS.patients, []),
  savePatients: (v) => db_set(DB_KEYS.patients, v),
  appointments: () => db_get(DB_KEYS.appointments, []),
  saveAppointments: (v) => db_set(DB_KEYS.appointments, v),
  prescriptions: () => db_get(DB_KEYS.prescriptions, []),
  savePrescriptions: (v) => db_set(DB_KEYS.prescriptions, v),
  eyewear: () => db_get(DB_KEYS.eyewear, []),
  saveEyewear: (v) => db_set(DB_KEYS.eyewear, v),
  inventory: () => db_get(DB_KEYS.inventory, []),
  saveInventory: (v) => db_set(DB_KEYS.inventory, v),
  invoices: () => db_get(DB_KEYS.invoices, []),
  saveInvoices: (v) => db_set(DB_KEYS.invoices, v),
  notifications: () => db_get(DB_KEYS.notifications, []),
  saveNotifications: (v) => db_set(DB_KEYS.notifications, v),
  faqs: () => db_get(DB_KEYS.faqs, []),
  session: () => db_get(DB_KEYS.session, null),
  saveSession: (v) => db_set(DB_KEYS.session, v),
  clearSession: () => localStorage.removeItem(DB_KEYS.session)
};
