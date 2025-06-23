# Pororó_safe - API Challenge

Este proyecto es una API básica que permite el registro de usuarios y su autenticación, así como la búsqueda de películas con uso opcional de palabra clave. El usuario también tiene la capacidad de registrar películas a sus favoritos y luego ver una lista de las mismas.

## Funcionalidades

- Registro de usuarios con validación y hash de contraseña.
- Login con generación de JWT.
- Autorización.
- Agregado, listado y eliminación de películas favoritas.
- Búsqueda de películas usando [The Movie DB API](https://www.themoviedb.org/documentation/api).
- Persistencia de usuarios y favoritos.

## Tecnologías

- Node.js
- Express
- bcryptjs
- axios
- dotenv

## Ejecución de PororóSafe

### Prerrequisitos

- npm y node

### Iniciar el servidor:

- npm install
- node app.js
- npx nodemmon app.js (hot reloading)

### Clonar el repositorio

```bash
git clone <https://github.com/emitss/pororosafe>
cd pororosafe
```

### Crear archivo .env:

```bash
PORT=3000
TMDB_API_KEY= "api key"
JWT_SECRET= "contra"
JWT_EXPIRES_IN=1h
```

## Endpoints

### Postman Collection:

https://www.postman.com/martian-rocket-963392/workspace/workspace-pblico/collection/26131167-222fde9e-efd0-4d6b-96d1-1461ee910286?action=share&creator=26131167

### Autenticación

- POST /api/register - Registra un nuevo usuario.

```bash
    Body:
    {
    "email": "user@example.com",
    "firstName": "Nombre",
    "lastName": "Apellido",
    "password": "123456"
    }
    Respuesta:
    {
    "message": "Usuario registrado con éxito"
    }
```

- POST /api/login - Inicia sesión y devuelve un JWT.

```bash
    Body:
    {
    "email": "user@example.com",
    "password": "123456"
    }
    Respuesta:
    {
    "token": "JWT_TOKEN"
    }
```

### Películas

GET /api/movies?keyword=matrix - Busca películas por palabra clave. Si no se especifica keyword, devuelve películas populares.

```bash
Respuesta:
[
  {
    "id": 603,
    "title": "The Matrix",
    "suggestionScore": 85,
    ...
  }
]
```

### Favoritos

```bash
Headers:
Authorization: Bearer <TOKEN>
```

GET /api/favorites - Devuelve los favoritos del usuario autenticado.

```bash
Respuesta:
[
  {
    "id": 603,
    "title": "The Matrix",
    "suggestionForTodayScore": 72,
    ...
  }
]
```

POST /api/favorites - Agrega una película a favoritos.

```bash
Body:
{
  "id": 603,
  "title": "The Matrix"
}
Respuesta:
{
  "message": "Película agregada a favoritos"
}
```

DELETE /api/favorites/:id - Elimina una película de favoritos.

```bash
Respuesta:
{
  "message": "Película eliminada de favoritos"
}
```
