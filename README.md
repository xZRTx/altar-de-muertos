# El Altar de Muertos, nivel por nivel

Sitio web educativo bilingüe (es/en) que explica los 7 niveles del altar de muertos, con un chatbot integrado.

Sitio en línea: https://altardemuertos.free.nf

## Estructura
- index.html: estructura de la página
- css/: estilos del sitio y del chatbot
- js/data.js: contenido de los 7 niveles (es/en)
- js/app.js: renderizado y cambio de idioma
- js/asistente.js: chatbot (motor local + Gemini vía Cloudflare Worker)
- js/config.js: dirección del Worker (CHAT_ENDPOINT)

## Cómo ejecutarlo
1. Descarga el repositorio y abre index.html en el navegador, o colócalo en la carpeta htdocs de XAMPP.
2. Para usar solo el chatbot local, deja CHAT_ENDPOINT vacío en js/config.js.
3. Para usar Gemini, crea un Cloudflare Worker con la clave GEMINI_API_KEY como secreto y pon su URL en CHAT_ENDPOINT.
