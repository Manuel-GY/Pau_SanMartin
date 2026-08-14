# 🎤 Pau San Martín · Web demo

Sitio demo entretenido para la comediante chilena **Pau San Martín** (aka `@sumosacerdote_`): stand-up comedy, podcasts y fechas en vivo, con un **panel admin** para cargar y borrar eventos.

> Demo no oficial, hecha con cariño para Pau. Los datos de fechas salieron de su Linktree y ComediaTicket.

## ✨ Qué incluye

- **Landing con onda comediante**: marquesina con chistes, sección del show "MYRIAM", próxima fechas en vivo, biografía "de profe a comediante", podcasts y links (Linktree, YouTube, Instagram, Spotify, ComediaTicket).
- **Panel admin** en `/admin.html`: iniciar sesión con PIN, **agregar** nuevas fechas (título, fecha, hora, ciudad, lugar, precio, link de entradas) y **borrar** las antiguas.
- **Backend**: API REST (Express) con persistencia en `data/events.json`. Solo una dependencia (`express`).

## 🚀 Cómo correrlo

Requisitos: [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm start
```

Abrí http://localhost:3000

| Ruta | Qué es |
| --- | --- |
| `/` | Landing pública con fechas |
| `/admin.html` | Panel admin de fechas |

## 🔑 Admin

- PIN por defecto: `myriam2026` (se puede cambiar con la variable de entorno `ADMIN_PIN`).
- El PIN se guarda en `sessionStorage` del navegador para la sesión admin.

## 🔌 API

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/events` | Lista todos los eventos ordenados por fecha |
| `POST` | `/api/events` | Crea un evento (header `x-admin-token: <PIN>`) |
| `DELETE` | `/api/events/:id` | Elimina un evento (header `x-admin-token: <PIN>`) |
| `POST` | `/api/login` | Valida PIN y devuelve el token `{ "pin": "..." }` |

Campos de un evento: `title*`, `date*` (AAAA-MM-DD), `time`, `city*`, `venue*`, `address`, `price`, `ticketUrl`, `description`. (`*` obligatorios)

## 📁 Estructura

```
pau-sanmartin-demo/
├── server.js            # API + servidor estático
├── package.json
├── data/
│   └── events.json      # "Base de datos" de fechas
└── public/
    ├── index.html       # Landing
    ├── admin.html       # Panel admin
    ├── css/style.css
    └── js/
        ├── app.js       # Lógica de la landing
        └── admin.js     # Lógica del panel
```

## 🛠️ Próximos pasos posibles

- Usar una DB real (SQLite/PostgreSQL) o un servicio como Supabase.
- Subir con Docker o desplegar en Render / Railway / Vercel.
- Proteger el admin con contraseña por entorno (no "hardcodeada").
