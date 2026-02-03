# Guía de Administración - Editor HTML

## 🔐 Acceso al Admin

### URLs de Acceso

**Producción:**
- **EXFR Event**: https://exfr.lippu.app/admin/
- **Demo Event**: https://demo.lippu.app/admin/ (cuando esté configurado)
- **Cualquier evento**: https://[slug-evento].lippu.app/admin/

**Local (desarrollo):**
- http://localhost:3001/admin/

### Credenciales
Usa tus credenciales de Netlify Identity para hacer login.

---

## 📝 Cómo Editar el HTML de un Evento

### Paso 1: Acceder al Admin
1. Ve a `https://exfr.lippu.app/admin/`
2. Haz login con tus credenciales
3. Verás el dashboard del CMS

### Paso 2: Seleccionar Evento
1. En el menú lateral, haz clic en **"Eventos"**
2. Verás una lista de todos los eventos (demo, exfr, etc.)
3. Haz clic en el evento que quieres editar

### Paso 3: Editar HTML
Una vez dentro del evento, verás estos campos:

#### 📌 Campos Principales

**1. Slug**
- URL del evento (ej: `exfr`, `demo`)
- No cambies esto a menos que sepas lo que haces

**2. URL de Checkout**
- Link de compra de boletos
- Ej: `https://lippu.app/eventwa/exfr`

**3. SEO** (colapsado)
- Título de la página
- Descripción meta
- Imagen Open Graph (opcional)

**4. Tema de Colores** (colapsado)
- Color Primario
- Color de Fondo
- Color de Texto

**5. Contenido HTML** ⭐ **AQUÍ EDITAS EL HTML**
```
┌─────────────────────────────────────┐
│ Contenido HTML                      │
├─────────────────────────────────────┤
│ 1  <section style="...">            │
│ 2    <h1>Mi Evento</h1>            │
│ 3    <p>Descripción...</p>         │
│ 4  </section>                       │
│                                     │
│ [Editor de código con              │
│  syntax highlighting]               │
└─────────────────────────────────────┘
```

**6. CSS Personalizado** (opcional)
- Agrega estilos CSS específicos para este evento
- Útil para animaciones o estilos complejos

---

## 🎨 Opciones para Crear HTML

### Opción 1: Usar una Plantilla
Las plantillas están en `public/templates/`:

1. **event-basic.html** - Diseño simple y limpio
2. **event-premium.html** - Diseño avanzado con animaciones
3. **event-minimal.html** - Diseño minimalista
4. **event-festival.html** - Para festivales multi-día

**Cómo usar:**
1. Abre el archivo de plantilla en tu editor
2. Copia todo el contenido
3. Pégalo en el campo "Contenido HTML" del admin
4. Modifica los textos, colores e imágenes según necesites

### Opción 2: Escribir HTML Directamente
Si sabes HTML/CSS, puedes escribir desde cero:

```html
<section style="padding: 100px 20px; text-align: center;">
  <h1 style="font-size: 3rem;">Mi Evento</h1>
  <p style="font-size: 1.2rem;">Descripción del evento</p>
  <a href="#tickets" style="background: #7B32FF; color: white; padding: 15px 40px; border-radius: 50px; text-decoration: none;">
    Comprar Boletos
  </a>
</section>
```

### Opción 3: Usar Gemini AI (Próximamente)
Una vez implementado, podrás:
1. Hacer clic en **"🤖 Asistente AI"**
2. Escribir un prompt: *"Crea un hero section con gradiente morado y botón de compra"*
3. El AI generará el HTML
4. Revisar y aplicar

---

## 🖼️ Cómo Subir Imágenes

### Desde el Editor HTML

1. **Haz clic en el botón "Media"** en la barra superior del admin
2. Se abrirá la biblioteca de medios
3. **Arrastra y suelta** tu imagen o haz clic en "Upload"
4. La imagen se subirá a `/public/images/events/`
5. **Copia la ruta** que aparece (ej: `/images/events/mi-imagen.jpg`)
6. **Úsala en tu HTML**:

```html
<img src="/images/events/mi-imagen.jpg" alt="Descripción" style="width: 100%;" />
```

### Rutas de Imágenes

**Imágenes subidas por ti:**
```html
<img src="/images/events/nombre-imagen.jpg" />
```

**Imágenes ya existentes en assets:**
```html
<img src="/assets/uploads/imagen.jpeg" />
```

**Imágenes externas (Unsplash, etc.):**
```html
<img src="https://images.unsplash.com/photo-123..." />
```

---

## 💾 Guardar Cambios

### Workflow de Guardado

1. **Edita el HTML** en el campo "Contenido HTML"
2. **Vista Previa** (opcional):
   - El CMS muestra un preview en tiempo real a la derecha
   - Verifica que todo se vea bien
3. **Guardar**:
   - Haz clic en **"Save"** en la parte superior
   - Esto crea un commit en GitHub
4. **Publicar**:
   - Haz clic en **"Publish"** 
   - Esto hace push a GitHub
   - Netlify detecta el cambio y rebuilds automáticamente
5. **Espera ~1-2 minutos** para que Netlify termine el deploy
6. **Verifica** en `https://[tu-evento].lippu.app/`

---

## 🎯 Tips y Mejores Prácticas

### HTML
- ✅ Usa estilos inline (`style="..."`) para máximo control
- ✅ Usa `clamp()` para tamaños responsive: `font-size: clamp(2rem, 5vw, 4rem);`
- ✅ Usa flexbox y grid para layouts
- ❌ Evita JavaScript complejo (usa solo para cosas simples como countdown)

### Imágenes
- ✅ Optimiza imágenes antes de subir (usa TinyPNG, Squoosh, etc.)
- ✅ Usa formatos modernos (WebP si es posible)
- ✅ Tamaño recomendado: máximo 1920px de ancho
- ✅ Siempre incluye `alt` text para accesibilidad

### Colores
- ✅ Usa los colores del tema cuando sea posible
- ✅ Asegura buen contraste (texto legible sobre fondo)
- ✅ Usa `rgba()` para transparencias: `rgba(255,255,255,0.1)`

### Performance
- ✅ Minimiza el HTML (quita espacios innecesarios)
- ✅ Usa lazy loading para imágenes: `loading="lazy"`
- ✅ Evita muchas animaciones pesadas

---

## 🔧 Estructura del Admin

```
https://exfr.lippu.app/
├── /                    → Página del evento (público)
├── /admin/              → Panel de administración
│   ├── #/               → Dashboard
│   ├── #/collections/events  → Lista de eventos
│   ├── #/collections/events/exfr  → Editar evento EXFR
│   └── #/media          → Biblioteca de medios
└── /admin/index.html    → Archivo del CMS
```

---

## 📱 Acceso Móvil

El admin de Netlify CMS funciona en móvil, pero **se recomienda usar desktop** para editar HTML por comodidad.

Si necesitas editar desde móvil:
1. Usa un editor de código móvil (ej: Koder, Textastic)
2. O edita directamente en GitHub desde el navegador móvil

---

## 🆘 Troubleshooting

### "No puedo ver mis cambios"
1. Verifica que hiciste **Save** y **Publish**
2. Espera 1-2 minutos para el deploy de Netlify
3. Limpia caché del navegador (Cmd+Shift+R en Mac)

### "Mi HTML no se ve bien"
1. Verifica que cerraste todas las etiquetas HTML
2. Revisa la consola del navegador (F12) para errores
3. Usa el preview del CMS para debugging

### "No puedo subir imágenes"
1. Verifica que la imagen sea < 10MB
2. Verifica que tengas permisos en Netlify
3. Intenta con otro formato (JPG, PNG, WebP)

### "El admin no carga"
1. Verifica que Netlify Identity esté habilitado
2. Verifica que estés logueado
3. Limpia cookies y vuelve a intentar

---

## 📚 Recursos Útiles

### Plantillas
- [event-basic.html](file:///Users/alexmac/Desktop/lippu-event-sites/public/templates/event-basic.html)
- [event-premium.html](file:///Users/alexmac/Desktop/lippu-event-sites/public/templates/event-premium.html)
- [event-minimal.html](file:///Users/alexmac/Desktop/lippu-event-sites/public/templates/event-minimal.html)
- [event-festival.html](file:///Users/alexmac/Desktop/lippu-event-sites/public/templates/event-festival.html)

### Documentación
- [Netlify CMS Docs](https://www.netlifycms.org/docs/)
- [HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)

### Herramientas
- [TinyPNG](https://tinypng.com/) - Optimizar imágenes
- [Coolors](https://coolors.co/) - Paletas de colores
- [Google Fonts](https://fonts.google.com/) - Fuentes
- [Unsplash](https://unsplash.com/) - Imágenes gratis

---

## 🚀 Próximos Pasos

Una vez que se implemente Gemini AI, podrás:
1. Generar HTML con prompts en lenguaje natural
2. Pedir al AI que mejore secciones existentes
3. Obtener sugerencias de diseño
4. Crear variaciones de un diseño

**Ejemplo de uso futuro:**
```
Prompt: "Crea una sección de lineup con 6 artistas en grid,
        con fotos circulares y hover effects"

AI: [Genera el HTML completo listo para usar]
```
