DROP TABLE IF EXISTS events;

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT,
  city TEXT NOT NULL,
  venue TEXT NOT NULL,
  address TEXT,
  price TEXT,
  ticketUrl TEXT,
  poster TEXT,
  description TEXT
);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

INSERT INTO events (id, title, date, time, city, venue, address, price, ticketUrl, poster, description) VALUES
('seed-vina', '"MYRIAM" - Show de stand-up comedy', '2026-06-19', '21:00', 'Viña del Mar', 'Barbones Comedy Enjoy Viña', 'Av. San Martín 199 (Casino Enjoy Viña del Mar)', 'Consultar', 'https://linktr.ee/sumosacerdote_', 'https://strapi.grafitica.com/uploads/events_zngzk3gj_publish_compressed_1e25c7638e.jpg', 'Un show de stand up comedy que se forja como un chisme que se salió de las manos.'),
('seed-concepcion', '"MYRIAM" - Show de stand-up comedy', '2026-07-11', '20:30', 'Concepción', 'Teatro Lihuén', 'Teatro Lihuén, Concepción, Chile', 'Consultar', 'https://linktr.ee/sumosacerdote_', 'https://strapi.grafitica.com/uploads/events_zngzk3gj_publish_compressed_1e25c7638e.jpg', 'La historia de todo lo que puede salir mal, de lo que no debió pasar y cuyo único alivio es el ridículo y la exposición.'),
('seed-valdivia', '"MYRIAM" - Show de stand-up comedy', '2026-07-18', '21:00', 'Valdivia', 'La Bota Cervecera', 'La Bota Cervecera, Valdivia, Chile', 'Consultar', 'https://linktr.ee/sumosacerdote_', 'https://strapi.grafitica.com/uploads/events_zngzk3gj_publish_compressed_1e25c7638e.jpg', 'Están cordialmente invitad@s a mi nuevo show de stand-up comedy. Un chisme que se salió de las manos.'),
('seed-temuco', '"MYRIAM" - Show de stand-up comedy', '2026-07-31', '21:00', 'Temuco', 'Casa Birra', 'Casa Birra, Temuco, Chile', 'Consultar', 'https://linktr.ee/sumosacerdote_', 'https://strapi.grafitica.com/uploads/events_zngzk3gj_publish_compressed_1e25c7638e.jpg', 'La historia de todo lo que puede salir mal. Para las y los incautos del amor.'),
('seed-pucon', '"MYRIAM" - Show de stand-up comedy', '2026-08-01', '20:00', 'Pucón', 'Monkey Bros Bar', 'Monkey Bros Bar, Pucón, Chile', 'Consultar', 'https://linktr.ee/sumosacerdote_', 'https://strapi.grafitica.com/uploads/events_zngzk3gj_publish_compressed_1e25c7638e.jpg', 'Un show que representa mi verdad, pero también una verdad compartida por las y los incautos del amor.'),
('seed-palermo', '"MYRIAM" - Show de stand-up comedy', '2026-08-05', '21:00', 'Santiago', 'Palermo Teatro Bar', 'José Manuel Infante 1414, Providencia', 'GENERAL $9.000', 'https://www.comediaticket.cl/shop/events_details/pau-san-martin-en-palermo-teatro-bar_wk99s', 'https://strapi.grafitica.com/uploads/events_zngzk3gj_publish_compressed_1e25c7638e.jpg', 'La historia de todo lo que puede salir mal. El chisme que se salió de las manos.'),
('seed-aysen', '"MYRIAM" - Show de stand-up comedy', '2026-08-21', '21:00', 'Aysén', 'Bar Río Cuervo', 'Sargento Aldea 1680, Aysén, Chile', 'GENERAL $10.000', 'https://www.comediaticket.cl/shop/events_details/pau-san-martin-en-aysen_3qnqr', 'https://cdn.comediaticket.cl/events/1/events-hhoaphi8-publish.png', '"Myriam" es la historia de todo lo que puede salir mal, de lo que no debió pasar y cuyo único alivio es el ridículo y la exposición. Un chisme que se salió de las manos.'),
('seed-coyhaique', '"MYRIAM" - Show de stand-up comedy', '2026-08-22', '21:00', 'Coyhaique', 'Kuruf Patagonia', 'Kuruf Patagonia, Coyhaique, Chile', 'GENERAL $10.000', 'https://www.comediaticket.cl/shop/events_details/pau-san-martin-en-coyhaique_qrn0x', 'https://cdn.comediaticket.cl/events/1/events-z3y6nlxj-publish.png', 'Una verdad compartida por las y los incautos del amor. Show de stand-up comedy en gira nacional.');
