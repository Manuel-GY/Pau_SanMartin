const TOKEN_KEY = 'pau_admin_token';

const $ = (id) => document.getElementById(id);

const loginCard = $('login-card');
const adminCard = $('admin-card');
const listCard = $('list-card');
const eventsBox = $('admin-events');
const toast = $('toast');

let toastTimer;

function showToast(msg, isError = false) {
  toast.textContent = msg;
  toast.className = 'toast show' + (isError ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 2800);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || '';
}

function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers['x-admin-token'] = token;
  const res = await fetch(path, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

function dateLabel(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return isNaN(d) ? dateStr : d.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
}

async function loadEvents() {
  const { ok, data } = await api('/api/events');
  if (!ok) {
    eventsBox.innerHTML = '<p class="loading">No pude cargar las fechas.</p>';
    return;
  }
  if (data.length === 0) {
    eventsBox.innerHTML = '<p class="loading">No hay fechas. ¡Agrega la primera! 🎤</p>';
    return;
  }
  eventsBox.innerHTML = data
    .map((e) => `
      <div class="admin-event">
        <div class="admin-event-info">
          <strong>${e.title}</strong>
          <span>${dateLabel(e.date)}${e.time ? ' · ' + e.time : ''}</span><br />
          <span>${e.venue} · ${e.city}${e.price ? ' · ' + e.price : ''}</span>
        </div>
        <div class="admin-event-actions">
          <button class="small-btn" data-del="${e.id}" type="button" style="background:#e5484d;color:#fff">🗑️ Borrar</button>
        </div>
      </div>`)
    .join('');
  document.querySelectorAll('[data-del]').forEach((btn) => {
    btn.addEventListener('click', () => deleteEvent(btn.dataset.del));
  });
}

async function deleteEvent(id) {
  const { ok, data } = await api(`/api/events/${id}`, { method: 'DELETE' });
  if (!ok) {
    showToast(data.error || 'No se pudo borrar', true);
    return;
  }
  showToast('Fecha eliminada. Adiós, evento. 👋');
  loadEvents();
}

function showAdmin() {
  loginCard.hidden = true;
  adminCard.hidden = false;
  listCard.hidden = false;
  loadEvents();
}

function showLogin() {
  loginCard.hidden = false;
  adminCard.hidden = true;
  listCard.hidden = true;
}

$('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const { ok, data } = await api('/api/login', {
    method: 'POST',
    body: JSON.stringify({ pin: $('pin').value }),
  });
  if (!ok) {
    showToast(data.error || 'PIN incorrecto', true);
    return;
  }
  setToken(data.token);
  $('pin').value = '';
  showAdmin();
  showToast('¡Bienvenida al backstage, Pau! 🎉');
});

$('logout-btn').addEventListener('click', () => {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
  showLogin();
});

$('event-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    title: $('f-title').value,
    date: $('f-date').value,
    time: $('f-time').value,
    city: $('f-city').value,
    venue: $('f-venue').value,
    address: $('f-address').value,
    price: $('f-price').value,
    ticketUrl: $('f-ticket').value,
    description: $('f-desc').value,
  };
  const { ok, data } = await api('/api/events', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!ok) {
    showToast(data.error || 'No se pudo publicar', true);
    return;
  }
  e.target.reset();
  showToast('¡Fecha publicada! Que se llenen las sillas 🪑');
  loadEvents();
});

if (getToken()) {
  showAdmin();
} else {
  showLogin();
}
