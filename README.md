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

## 🚀 Desplegar online (Render, gratis)

Es lo más simple: Render lee el `render.yaml` y levanta todo solo.

1. Andá a **https://render.com/deploy?repo=https://github.com/Manuel-GY/Pau_SanMartin** (o botón "Deploy to Render" en GitHub).
2. Ingresá con tu cuenta de GitHub (o creala).
3. Confirmá el nombre y el plan **Free** → **Apply**.
4. Esperá ~2-3 minutos hasta que muestre `Live` y te dé una URL tipo `https://pau-sanmartin.onrender.com`.

Esa URL es el link que podés mandarle a Pau 🎤

> Notas del plan gratis de Render:
> - La instancia se "duerme" tras ~15 min sin visitas y tarda ~30-60 s en despertar con el primer click.
> - Los cambios hechos desde el panel admin se pierden si la instancia se reinicia (vuelve a las fechas del `data/events.json`). Para persistencia real conviene usar una DB (ver próximos pasos).

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

- Usar una DB real (SQLite/PostgreSQL) o un servicio como Supabase para que los cambios del admin persistan.
- Desplegar en Render (listo con `render.yaml`) y migrar a un plan pago si se quiere persistencia.
- Proteger el admin con contraseña por entorno (no "hardcodeada").
