# Aventura Submarina — Mi Estudio

Proyecto original de plataformas pixel art, con controles táctiles.

## Probar
Abrí `index.html` en un navegador moderno. Para probar la instalación PWA, publicá la carpeta en un alojamiento HTTPS y abrila desde Chrome en Android; elegí **Instalar aplicación** o **Añadir a pantalla de inicio**.

## Preparación para Android con Capacitor
Este ZIP contiene el proyecto web y la configuración inicial de Capacitor. **Todavía no contiene APK ni AAB compilados.**

Requisitos: una computadora, Node.js LTS, Android Studio y Android SDK.

Desde una terminal, dentro de esta carpeta:
1. `npm install`
2. `npx cap add android`
3. `npx cap sync android`
4. `npx cap open android`
5. En Android Studio, probá la app en un dispositivo/emulador.
6. Para generar el paquete de Play Store, usá **Build > Generate Signed Bundle / APK > Android App Bundle** y seguí el asistente de firma.

Antes de publicar:
- Revisá nombre, icono, capturas y descripción.
- Completá la clasificación de contenido, seguridad de datos y demás formularios de Play Console.
- La cuenta de desarrollador de Google Play debe ser gestionada por una persona adulta si quien crea el juego es menor de 18 años.
- Google revisa las aplicaciones; crear el AAB no significa que ya esté publicado.

## Identidad
- Título: Aventura Submarina
- Creador mostrado: Mi Estudio
- Personaje y arte: diseño original de buzo submarino; no usa personajes ni marcas de terceros.

## Archivos principales
- `index.html`: pantalla principal
- `style.css`: estilo y controles
- `game.js`: mecánicas del juego
- `manifest.webmanifest` y `sw.js`: instalación y caché PWA
- `icon.svg`: icono
- `package.json` y `capacitor.config.json`: configuración inicial Android/Capacitor
