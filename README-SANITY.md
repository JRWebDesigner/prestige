# Configuración de Sanity Studio

## Pasos para configurar Sanity

### 1. Crear cuenta en Sanity
1. Ve a [sanity.io](https://www.sanity.io/)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

### 2. Configurar variables de entorno
1. Copia `.env.local.example` a `.env.local`
2. Reemplaza los valores con los de tu proyecto:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=tu-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```

### 3. Acceder al Studio
- Ve a `/admin` en tu aplicación local
- Ejemplo: `http://localhost:3000/admin`

### 4. Configurar datos iniciales
1. Crea las categorías:
   - Masculino (valor: masculino)
   - Femenino (valor: femenino)
   - Unisex (valor: unisex)

2. Crea las marcas:
   - Dior
   - Yves Saint Laurent
   - Giorgio Armani
   - Chanel
   - Calvin Klein
   - Paco Rabanne

3. Crea los perfumes con sus respectivos datos

### 5. Migración de datos existentes
Los datos estáticos actuales se mantendrán como fallback si Sanity no está disponible.

### 6. Funcionalidades del CMS
- ✅ Gestión de perfumes
- ✅ Gestión de marcas
- ✅ Gestión de categorías
- ✅ Subida de imágenes
- ✅ Control de stock
- ✅ Productos destacados
- ✅ Múltiples tamaños y precios
- ✅ Notas olfativas

### 7. Estructura de URLs
- `/admin` - Sanity Studio
- `/perfume/[slug]` - Páginas de perfumes (usando slug de Sanity)

### 8. Deployment
Para producción, asegúrate de:
1. Configurar las variables de entorno en tu plataforma de hosting
2. Configurar CORS en Sanity para tu dominio de producción