# 📸 Guía: Cómo Subir Imágenes para el Evento EXFR

## 🎯 Imágenes que Necesitas Subir

Para el evento EXFR (Rancho El Descanso), necesitas subir estas imágenes:

### 1. **Logo del Rancho** (logo-rancho.png)
- Tamaño recomendado: 400x400px o similar
- Formato: PNG con fondo transparente
- Uso: Header y footer

### 2. **Logo de KFPS** (logo-kfps.png)
- Tamaño recomendado: 400x400px
- Formato: PNG con fondo transparente
- Uso: Header junto al logo del rancho

### 3. **Banner Hero** (hero-banner.jpg)
- Tamaño recomendado: 1920x1080px
- Formato: JPG o WebP
- Uso: Imagen de fondo del hero section
- Contenido sugerido: Caballos frisones, el rancho, paisaje

### 4. **Galería** (gallery-1.jpg hasta gallery-6.jpg)
- Tamaño recomendado: 800x600px cada una
- Formato: JPG
- Contenido sugerido:
  - gallery-1.jpg: Caballo frisón en pista
  - gallery-2.jpg: Otro caballo frisón
  - gallery-3.jpg: Vista del Rancho El Descanso
  - gallery-4.jpg: Inspección KFPS (evento anterior)
  - gallery-5.jpg: Jueces de KFPS
  - gallery-6.jpg: Público/asistentes

---

## 📤 Método 1: Subir desde el Admin de Netlify CMS (RECOMENDADO)

### Paso 1: Acceder al Admin
```
https://exfr.lippu.app/admin/
```

### Paso 2: Ir a la Sección de Eventos
1. Haz clic en **"Eventos"** en el menú lateral
2. Haz clic en **"exfr"** para editar el evento

### Paso 3: Subir Imágenes
1. En la barra superior del editor, busca el botón **"Media"**
2. Haz clic en **"Media"**
3. Se abrirá la biblioteca de medios

```
┌─────────────────────────────────────────────────────────┐
│ Media Library                                      [×]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [📤 Upload]  [🔍 Search]                              │
│                                                         │
│  Arrastra archivos aquí o haz clic en Upload           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Paso 4: Subir Archivos
**Opción A: Arrastrar y soltar**
- Arrastra tus imágenes directamente a la ventana

**Opción B: Hacer clic en Upload**
- Haz clic en **"Upload"**
- Selecciona las imágenes de tu computadora
- Haz clic en **"Abrir"**

### Paso 5: Copiar la Ruta
Una vez subida la imagen:
1. Haz clic en la imagen en la biblioteca
2. Verás la ruta: `/images/events/nombre-imagen.jpg`
3. Copia esta ruta

### Paso 6: Pegar en el HTML
1. Ve al campo **"Contenido HTML"**
2. Busca los placeholders:
   ```html
   <img src="/images/events/logo-rancho.png" alt="Rancho El Descanso" />
   ```
3. Reemplaza el nombre del archivo con el que subiste:
   ```html
   <img src="/images/events/mi-logo-rancho.png" alt="Rancho El Descanso" />
   ```

### Paso 7: Guardar y Publicar
1. Haz clic en **"Save"** (arriba a la derecha)
2. Haz clic en **"Publish"**
3. Espera 1-2 minutos para el deploy
4. Verifica en `https://exfr.lippu.app/`

---

## 📤 Método 2: Subir Manualmente via Git (Para Desarrolladores)

### Paso 1: Copiar Imágenes a la Carpeta
```bash
cd /Users/alexmac/Desktop/lippu-event-sites
cp ~/Downloads/logo-rancho.png public/images/events/
cp ~/Downloads/logo-kfps.png public/images/events/
cp ~/Downloads/hero-banner.jpg public/images/events/
cp ~/Downloads/gallery-*.jpg public/images/events/
```

### Paso 2: Commit y Push
```bash
git add public/images/events/
git commit -m "feat: add images for EXFR event"
git push origin main
```

### Paso 3: Actualizar el HTML en el Admin
1. Ve a `https://exfr.lippu.app/admin/#/collections/events/entries/exfr`
2. Las rutas ya están correctas en el HTML
3. Solo haz **Save** y **Publish**

---

## 🔄 Mapeo de Imágenes en el HTML

Aquí está dónde se usa cada imagen en el HTML:

### Hero Section (Arriba)
```html
<!-- Background del hero -->
<section class="hero">  <!-- usa hero-banner.jpg como background -->
  
  <!-- Logos en el header -->
  <div class="hero-logos">
    <img src="/images/events/logo-rancho.png" />  ← Logo Rancho
    <img src="/images/events/logo-kfps.png" />     ← Logo KFPS
  </div>
</section>
```

### Galería (Medio)
```html
<section class="gallery">
  <div class="gallery-grid">
    <img src="/images/events/gallery-1.jpg" />  ← Imagen 1
    <img src="/images/events/gallery-2.jpg" />  ← Imagen 2
    <img src="/images/events/gallery-3.jpg" />  ← Imagen 3
    <img src="/images/events/gallery-4.jpg" />  ← Imagen 4
    <img src="/images/events/gallery-5.jpg" />  ← Imagen 5
    <img src="/images/events/gallery-6.jpg" />  ← Imagen 6
  </div>
</section>
```

### Footer (Abajo)
```html
<section class="footer">
  <img src="/images/events/logo-rancho.png" />  ← Logo Rancho (mismo)
</section>
```

---

## 🎨 Tips para Optimizar Imágenes

### Antes de Subir
1. **Redimensiona** las imágenes al tamaño recomendado
2. **Comprime** usando [TinyPNG](https://tinypng.com/) o [Squoosh](https://squoosh.app/)
3. **Renombra** con nombres descriptivos (sin espacios, usa guiones)

### Herramientas Recomendadas
- **TinyPNG**: Comprime JPG y PNG sin perder calidad
- **Squoosh**: Convierte a WebP para mejor performance
- **Canva**: Redimensiona y edita imágenes fácilmente

### Tamaños Máximos
- **Logos**: < 200KB
- **Hero Banner**: < 500KB
- **Galería**: < 300KB cada una

---

## 🚨 Troubleshooting

### "La imagen no aparece"
1. Verifica que la ruta sea exacta: `/images/events/nombre.jpg`
2. Verifica que el archivo se haya subido correctamente
3. Limpia caché del navegador (Cmd+Shift+R)
4. Espera 1-2 minutos después de publicar

### "La imagen se ve pixelada"
1. Sube una imagen de mayor resolución
2. Usa el tamaño recomendado (1920x1080 para hero)

### "La imagen es muy pesada"
1. Comprime la imagen con TinyPNG
2. Convierte a WebP si es posible
3. Reduce la resolución si es muy grande

---

## 📋 Checklist de Imágenes

Usa este checklist para verificar que subiste todas las imágenes:

- [ ] **logo-rancho.png** - Logo del Rancho El Descanso
- [ ] **logo-kfps.png** - Logo de KFPS
- [ ] **hero-banner.jpg** - Imagen de fondo del hero
- [ ] **gallery-1.jpg** - Caballo frisón 1
- [ ] **gallery-2.jpg** - Caballo frisón 2
- [ ] **gallery-3.jpg** - Rancho El Descanso
- [ ] **gallery-4.jpg** - Inspección KFPS
- [ ] **gallery-5.jpg** - Jueces KFPS
- [ ] **gallery-6.jpg** - Evento anterior

---

## 🎯 Resultado Final

Una vez subidas todas las imágenes, tu página se verá así:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [Logo Rancho]  [Logo KFPS]                            │
│                                                         │
│  INSPECCIÓN DEL CABALLO FRISÓN EN MÉXICO POR LA KFPS  │
│  DEL 10 AL 12 DE MARZO                                 │
│  [REGISTRARME]                                         │
│                                                         │
│  (Fondo: hero-banner.jpg)                              │
└─────────────────────────────────────────────────────────┘

... (contenido del evento) ...

┌─────────────────────────────────────────────────────────┐
│  GALERÍA                                                │
│                                                         │
│  [gallery-1] [gallery-2] [gallery-3]                   │
│  [gallery-4] [gallery-5] [gallery-6]                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  [Logo Rancho]                                          │
│  MANTENTE EN CONTACTO CON NOSOTROS                      │
│  ©Copyright 2026 Rancho El Descanso                     │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Próximos Pasos

1. **Reúne las imágenes** que necesitas
2. **Optimízalas** (comprime y redimensiona)
3. **Súbelas** usando el método 1 (Admin) o método 2 (Git)
4. **Actualiza el HTML** con las rutas correctas
5. **Publica** y verifica en producción

¡Listo! Tu evento EXFR tendrá el mismo diseño profesional que Finca SANRO pero con la identidad de Rancho El Descanso.
