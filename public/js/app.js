const MONTHS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

const DATE_FORMAT = new Intl.DateTimeFormat('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  if (isNaN(d)) return dateStr;
  const label = DATE_FORMAT.format(d);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function monthShort(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return isNaN(d) ? '' : MONTHS[d.getMonth()];
}

function dayNum(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return isNaN(d) ? '' : String(d.getDate());
}

function isUpcoming(event) {
  return new Date(event.date + 'T23:59:59') >= new Date();
}

async function loadEvents() {
  const res = await fetch('/api/events');
  if (!res.ok) throw new Error('No pude cargar las fechas');
  return res.json();
}

function renderEvents(events) {
  const list = document.getElementById('events-list');
  const upcoming = events.filter(isUpcoming);
  const past = events.filter((e) => !isUpcoming(e));

  if (upcoming.length === 0 && past.length === 0) {
    list.innerHTML = '<div class="empty-state">No hay fechas publicadas por ahora. Volvé pronto… o invitala a tu ciudad. 😉</div>';
    return;
  }

  let html = '';
  for (const e of upcoming) html += eventCard(e);
  if (past.length > 0) {
    html += '<p class="section-sub" style="margin-top:36px">🗂️ Lo que ya fue (y quedó en la memoria):</p>';
    for (const e of past) html += eventCard(e, true);
  }
  list.innerHTML = html;
}

function eventCard(e, muted = false) {
  const ticket = e.ticketUrl
    ? `<a class="btn btn-primary" style="padding:10px 20px;font-size:0.9rem" href="${e.ticketUrl}" target="_blank" rel="noopener">🎟️ Entradas</a>`
    : '<span class="event-price">Proximamente</span>';

  const poster = e.poster
    ? `<a class="event-poster" href="${e.poster}" target="_blank" rel="noopener" aria-label="Afiche del evento">
         <img src="${e.poster}" alt="Afiche: ${e.title}" loading="lazy" />
       </a>`
    : `<div class="event-poster event-poster-empty" aria-hidden="true">
         <span>🎭</span><small>Afiche próximamente</small>
       </div>`;

  return `
    <article class="event-card" ${muted ? 'style="opacity:0.6"' : ''}>
      ${poster}
      <div class="event-date">
        <span class="day">${dayNum(e.date)}</span>
        <span class="mon">${monthShort(e.date)}</span>
      </div>
      <div class="event-body">
        <h3>${e.title}</h3>
        <p><strong>${e.venue}</strong> · ${e.city}${e.address ? ' · ' + e.address : ''}</p>
        <div class="event-meta">
          <span>🕘 ${e.time || 'A confirmar'}</span>
          <span>📍 ${e.city}</span>
          <span>💰 <strong>${e.price || 'Consultar'}</strong></span>
        </div>
        ${e.description ? `<p class="event-desc">${e.description}</p>` : ''}
      </div>
      <div class="event-side">${ticket}</div>
    </article>`;
}

async function init() {
  try {
    const events = await loadEvents();
    renderEvents(events);
  } catch (err) {
    document.getElementById('events-list').innerHTML =
      `<div class="empty-state">Ups… no pude cargar las fechas. <br><small>${err.message}</small></div>`;
  }
}

init();
