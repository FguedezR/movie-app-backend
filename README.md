# Movie App Backend 🎬

Este es el backend oficial de la aplicación de películas "Movie App". Está construido con **Node.js**, **Express**, y **MongoDB**, proporcionando una API RESTful para autenticación de usuarios, consultas de películas usando la API de TMDB (The Movie Database), gestión de reseñas y de listas de seguimiento (Watchlist).

## 🚀 Tecnologías Principales

- **Node.js & Express**: Framework web backend para manejar las rutas y los controladores.
- **MongoDB & Mongoose**: Base de datos NoSQL y ODM para modelado de datos (Usuarios, Reseñas, Watchlist).
- **JSON Web Tokens (JWT) & bcryptjs**: Autenticación segura y encriptación de contraseñas.
- **Axios**: Cliente HTTP estandarizado para realizar peticiones a la API externa de TMDB.
- **CORS**: Manejo de políticas de intercambio de recursos de distintos orígenes para proteger el API.

## 📂 Arquitectura y Estructura del Proyecto

El proyecto sigue una estructura modular basada en la separación de responsabilidades:

```bash
movie-app-back/
├── api/                    # Funciones Serverless (configuradas para despliegues en Vercel)
├── src/                    
│   ├── config/             # Archivos de configuración (ej. db.js para conectar con MongoDB)
│   ├── controllers/        # Controladores de las rutas separando la lógica de las peticiones (auth, movies, reviews)
│   ├── middleware/         # Middlewares (ej. auth.middleware.js para protección de rutas con JWT)
│   ├── models/             # Modelos de base de datos de Mongoose definiendo schemas (User, Review, Watchlist)
│   ├── routes/             # Endpoints y enrutador de la API (index, auth, movie, review, watchlist)
│   ├── services/           # Lógica dedicada a la interacción con terceros (ej. tmdb.service.js)
│   ├── app.js              # Configuración de inicialización de la app, CORS y middlewares principales
│   └── server.js           # Punto de entrada para levantar el servidor y conectarse a la DB
├── package.json            # Dependencias y scripts de ejecución
└── .env                    # Entorno (puertos, URI de MongoDB, JWT Secret, etc.)
```

## 🛠 Instalación y Configuración Local

Sigue estos pasos para desplegar el servidor localmente de manera correcta:

1. **Clonar repositorio e instalar dependencias:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd movie-app-back
   npm install
   ```

2. **Configurar el archivo `.env`:**
   Crea un archivo `.env` en la raíz del proyecto. Deberás incluir variables como las siguientes (ajusta según tus propias credenciales):
   ```env
   PORT=4000
   FRONTEND_URL=http://localhost:5173  # O la URL de producción
   MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/<tu_bd>
   JWT_SECRET=tu_secreto_super_seguro
   TMDB_API_KEY=tu_api_key_v3_de_tmdb
   TMDB_API_READ_ACCESS_TOKEN=tu_access_token_v4_de_tmdb # (Opcional, según lo que utilices)
   ```

3. **Ejecutar el servidor:**
   En modo de desarrollo (usando `nodemon`):
   ```bash
   npm run dev
   ```
   En modo de producción:
   ```bash
   npm start
   ```

## 📡 Endpoints Principales

La API tiene un prefijo principal configurado en `/api`.

### 🔑 Autenticación (`/api/auth`)
- `POST /api/auth/register`: Registro de un nuevo usuario.
- `POST /api/auth/login`: Iniciar sesión de usuario y recibir un JWT de acreditación.

### 🎬 Películas (`/api/movies`)
Consigue los datos actuando como un puente o proxy intermedio hacia la API de TMDB. Ésto previene exponer tokens en el lado del cliente y soluciona bloqueos de CORS.
- Enruta las llamadas a `/api/movies/...` hacia el servicio en `tmdb.service.js` para extraer las películas populares, por tendencia, detalles de un título, etc.

### ⭐ Reseñas (`/api/reviews`)
- `GET /api/reviews/:movieId`: Obtiene las reseñas referentes a una película en específico.
- `POST /api/reviews/`: Crear una reseña (Ruta protegida por JWT).
- `PUT /api/reviews/:id`: Permite a un usuario modificar su reseña (Ruta protegida por JWT).
- `DELETE /api/reviews/:id`: Permite a un usuario borrar su propia reseña (Ruta protegida por JWT).

### 📋 Watchlist (`/api/watchlist`)
- `GET /api/watchlist`: Obtiene la lista de películas guardadas temporalmente o de seguimiento para el usuario logueado.
- `POST /api/watchlist`: Añade una película a la lista (Ruta protegida).
- `DELETE /api/watchlist/:movieId`: Remueve la película en particular del listado.

## 🔒 Middlewares Destacados

- **`auth.middleware.js`**: Verifica el header de `Authorization` para obtener y decodificar el Bearer Token con `jsonwebtoken`. Si es válido, avanza o de otra forma prohíbe el paso al cliente con un status 401/403.

## 🤝 Contribución

1. Haz un **Fork** de este repositorio.
2. Crea una **Rama** con tu nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Haz un **Commit** y sube la rama (`git commit -m 'Añade nueva funcionalidad' && git push origin feature/nueva-funcionalidad`).
4. Abre un **Pull Request** para revisión.
