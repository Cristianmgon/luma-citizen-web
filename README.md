# 🛡️ Luma Protect · Portal Ciudadano & Verificador Web

> **Iniciativa de Investigación Aplicada e Inteligencia Civil · Licenciatura en Ciberseguridad (UNSO)**  
> Plataforma ciudadana orientada a la mitigación del fraude digital, secuestros virtuales y suplantación de identidad mediante procesamiento semántico **100% local en el navegador (Zero-PII)**.

---

## 🌟 Principios de Arquitectura & Seguridad

1. **Zero-PII & Privacidad Estricta (Ley 25.326):**
   - El análisis heurístico y semántico se ejecuta en el cliente (navegador del usuario).
   - Ningún mensaje, número de teléfono, clave bancaria ni dato privado sale del dispositivo.
2. **Superficie de Ataque Cero (Zero-Surface):**
   - Este proyecto está desacoplado del plano de gobernanza interna (LGP).
   - Cero dependencias de base de datos SQL/Prisma en el frontend.
   - Resiliente contra escaneos agresivos, DDoS y pruebas de penetración estudiantiles.
3. **Distribución Directa de APK:**
   - Aloja el binario oficial compilado `luma-protect-preview.apk` con cabeceras MIME adecuadas para descarga directa desde dispositivos Android.

---

## 🚀 Despliegue en Vercel (Paso a Paso)

Este repositorio está preparado para ser desplegado en **Vercel** en 30 segundos:

### Opción 1: Repositorio GitHub Independiente
1. Subir esta carpeta a un nuevo repositorio (ej. `github.com/tu-usuario/luma-citizen-web`).
2. En el panel de Vercel: **Add New... ➔ Project ➔ Import Git Repository**.
3. Framework Preset: **Next.js** (detectado automáticamente).
4. Clic en **Deploy**.
5. Asignar el dominio público (ej. `lumaprotect.app` o `luma-protect.vercel.app`).

### Opción 2: Desde el Monorepo `charming-einstein`
1. En Vercel: **Add New... ➔ Project ➔ charming-einstein**.
2. En la configuración de proyecto:
   - **Root Directory**: `luma_citizen_web`
3. Clic en **Deploy**.

---

## 🧪 Pruebas Locales

```bash
# Instalar dependencias
npm install

# Ejecutar tests unitarios del evaluador semántico
npm test

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

---

## 📂 Estructura del Proyecto

```
luma_citizen_web/
├── public/                 # Favicons, imágenes, materiales educativos y APK
│   └── downloads/          # luma-protect-preview.apk
├── src/
│   ├── app/
│   │   ├── page.tsx        # Landing institucional con impacto UFECI y guías
│   │   ├── verificador/    # Verificador semántico interactivo en navegador
│   │   ├── radar/          # Radar de patrones y taxonomía de estafas
│   │   ├── educacion/      # Simuladores y materiales por perfil de usuario
│   │   ├── terminos/       # Términos legales, descargo de responsabilidad y Ley 25.326
│   │   ├── robots.ts       # Configuración canónica para indexación en Google/Bing
│   │   ├── sitemap.ts      # Mapa del sitio dinámico
│   │   └── api/            # Endpoints ligeros de telemetría y feedback con rate-limiting
│   ├── components/
│   │   ├── citizen-navigation.tsx  # Barra de navegación ciudadana optimizada para móviles
│   │   └── public-footer.tsx       # Pie institucional con enlaces y disclaimers
│   └── lib/
│       ├── client-scam-evaluator.ts # Motor semántico client-side (6 paquetes LKP + casos recientes)
│       └── zero-pii.ts              # Sanitizador de datos sensibles
```
