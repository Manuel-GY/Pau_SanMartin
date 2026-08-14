# 🎤 Pau San Martín · Web demo

Sitio demo entretenido para la comediante chilena **Pau San Martín** (aka `@sumosacerdote_`): stand-up comedy, podcasts y fechas en vivo, con un **panel admin** para cargar y borrar eventos.

> Demo no oficial, hecha con cariño para Pau. Los datos de fechas salieron de su Linktree y ComediaTicket.

## ✨ Qué incluye

- **Landing con onda comediante**: marquesina con chistes, sección del show "MYRIAM", próxima fechas en vivo, biografía "de profe a comediante", podcasts y links (Linktree, YouTube, Instagram, Spotify, ComediaTicket).
- **Panel admin** en `/admin.html`: iniciar sesión con PIN, **agregar** nuevas fechas (título, fecha, hora, ciudad, lugar, precio, link de entradas, afiche) y **borrar** las antiguas.
- **Dos backends con la misma API**:
  - **Local**: Express con persistencia en `data/events.json` (solo para desarrollo).
  - **Producción**: Cloudflare Pages Functions + **D1** (SQLite) — los cambios del admin **persisten** para siempre.

## 🚀 Producción (Cloudflare Pages + Functions + D1)

**URL pública: https://pau-sanmartin.pages.dev**

### Cómo se hizo / cómo desplegar

1. **DB D1**: crear `pau-events` (dashboard de Cloudflare → Workers & Pages → D1, o `wrangler d1 create pau-events`) y pegar su `database_id` en `wrangler.toml`.
2. **Seed**: `npm run d1:seed:remote` (aplica `schema.sql` con el CREATE TABLE + 8 fechas).
3. **Deploy**: `npm run pages:deploy` (sube `public/` + `functions/` al proyecto `pau-sanmartin`).
4. **Secret**: `wrangler pages secret bulk` con `{"ADMIN_PIN": "myriam2026"}` (o en el dashboard) → **redesplegar** para que tome efecto.
5. Alternativa: conectar el repo en el dashboard (Pages → Connect to Git) para auto-deploy por push.

> Notas: `NODE_TLS_REJECT_UNAUTHORIZED=0` y `CLOUDFLARE_API_TOKEN` pueden ser necesarios en redes corporativas. En el plan gratis de Workers/D1 no hay "sueño" de la página y los datos persisten.

## 🚀 Correrlo en local (desarrollo)

Requisitos: [Node.js](https://nodejs.org) 18+.

**Opción A — Express (rápido, Node 18+):**
```bash
npm install
npm start
```
Abrí http://localhost:3000

**Opción B — Emulando Cloudflare (Node 22+, wrangler):**
```bash
npm install
npm run d1:seed:local     # aplica schema.sql a la D1 local
npx wrangler pages dev public
```
Abrí http://127.0.0.1:8788 (usa `.dev.vars` con `ADMIN_PIN`)

| Ruta | Qué es |
| --- | --- |
| `/` | Landing pública con fechas |
| `/admin.html` | Panel admin de fechas |

## 🔑 Admin

- PIN por defecto: `myriam2026` (en producción es el secret `ADMIN_PIN`).
- El PIN se guarda en `sessionStorage` del navegador para la sesión admin.

## 🔌 API

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/events` | Lista todos los eventos ordenados por fecha |
| `POST` | `/api/events` | Crea un evento (header `x-admin-token: <PIN>`) |
| `DELETE` | `/api/events/:id` | Elimina un evento (header `x-admin-token: <PIN>`) |
| `POST` | `/api/login` | Valida PIN y devuelve el token `{ "pin": "..." }` |

Campos de un evento: `title*`, `date*` (AAAA-MM-DD), `time`, `city*`, `venue*`, `address`, `price`, `ticketUrl`, `poster`, `description`. (`*` obligatorios)

## 📁 Estructura

```
pau-sanmartin-demo/
├── server.js               # Backend local (Express + events.json)
├── functions/              # Backend de producción (Cloudflare Pages Functions)
│   ├── _middleware.js      # No-caché de la API
│   └── api/
│       ├── _utils.js       # Helpers compartidos
│       ├── events.js       # GET listar + POST crear
│       ├── events/[id].js  # DELETE
│       └── login.js        # POST login
├── schema.sql              # CREATE TABLE events + seed (D1)
├── wrangler.toml           # Config Cloudflare (binding D1)
├── render.yaml             # Deploy alternativo en Render (opcional)
├── package.json
├── data/
│   └── events.json         # Datos para el backend local
└── public/
    ├── index.html          # Landing
    ├── admin.html          # Panel admin
    ├── css/style.css
    └── js/
        ├── app.js          # Lógica de la landing
        └── admin.js        # Lógica del panel
```

## 🛠️ Próximos pasos posibles

- Conectar el repo a Cloudflare Pages (dashboard) para auto-deploy por push.
- Cambiar el PIN a algo que maneje Pau (secret `ADMIN_PIN`).
- Agregar avatares/fotos locales en lugar de hotlinkearlas.
