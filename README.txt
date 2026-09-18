DataLabs | Automatización Datos Estructurados
Dominio: https://automatizaciondatosestructurados.com/
Repositorio: https://github.com/inmaculadaoc81/DataLabs

Web estática con formulario POST a /api/contacto (función serverless Vercel). El formulario NO redirige a WhatsApp.

Variables de entorno necesarias en Vercel para activar el envío del formulario:
SMTP_HOST, SMTP_USER, SMTP_PASS; opcionales SMTP_PORT (465 por defecto), SMTP_SECURE (true para SSL, false para STARTTLS), CONTACT_EMAIL (por defecto SMTP_USER).

Chat n8n: usa webhook configurado del Grupo N8nLabs. Se carga tras la aceptación de cookies. El rechazo no activa el chat; si se desea abrirlo después, se deben actualizar las preferencias guardadas del navegador.

Mapa y reseñas: https://maps.app.goo.gl/PrSmQPWtxDjcyWbo9
Contacto: +34 910 05 40 12 | WhatsApp +34 638 61 95 88

Archivos activos: index.html, datalabs.css, datalabs-hero-chat-fix.css, datalabs.js, datalabs-hero-pattern.svg, img/icono-automatizacion-datos.svg, api/contacto.js.

────────────────────────────────────────────────────────────
REVISIÓN COMPLETA (a petición del cliente: "haz la revisión", mismo
alcance que en FlujoPro — todo bien enlazado y funcionando en
escritorio y móvil)
────────────────────────────────────────────────────────────

BUG REAL — datalabs-hero-chat-fix.css existía en el repositorio pero
no estaba enlazado en el <head> de index.html (tampoco figuraba en la
lista de "Archivos activos" de este README). Sin él:
- El fondo degradado del hero (patrón + radial-gradients en azul
  corporativo) no se veía — datalabs.css solo definía background-size
  para esas capas, no background-image.
- Los <label> propios de cada campo del formulario (Nombre, Empresa,
  Teléfono, Correo electrónico, Tu consulta) no tenían ningún estilo.
- El botón de chat que crea datalabs.js en tiempo real
  (.datalabs-chat-entry, visible antes de que cargue el widget de
  n8n) se renderizaba sin posición fija, sin forma ni color — un
  <button> suelto en el flujo normal del documento en vez de un
  botón flotante circular.
Corregido añadiendo <link rel="stylesheet" href="datalabs-hero-chat-fix.css">
justo después de datalabs.css.

VERIFICADO (todo correcto, sin cambios necesarios):
- Title, meta description, canonical, og:*, JSON-LD: coinciden con la
  marca y el dominio reales.
- Teléfono y WhatsApp: mismos 8 usos consistentes que en el resto de
  la familia, todos bien enlazados (tel:/wa.me).
- Enlace de Google Maps: 4 apariciones correctas.
- El cliente pasó un iframe de Google Maps embed, pero apuntaba al
  place_id de FlujoPro (otro repositorio), no al de DataLabs — no se
  ha usado. La sección .map de DataLabs ya tenía su propia solución
  correcta (embed por dirección, sin depender de un place_id
  concreto), así que no hacía falta.
- robots.txt y sitemap.xml: dominio correcto.
- Todas las anclas internas (#inicio, #soluciones, #beneficios,
  #como-funciona, #cita, #nosotros, #contacto) tienen su id
  correspondiente.
- Formulario: los nombres de campo coinciden exactamente con lo que
  espera api/contacto.js; envío real por fetch con estados de carga/
  éxito/error y botón deshabilitado mientras envía.
- api/contacto.js: remitente y asunto correctos ("DataLabs"),
  validación de email, variables de entorno con mensajes de error
  claros si faltan.
- package.json con el nombre correcto del paquete.
- Sin ninguna referencia cruzada a SmartSheets, FlujoPro ni otras
  marcas de la familia en ningún archivo.
