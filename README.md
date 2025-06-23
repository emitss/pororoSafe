# Pororó_safe - API Challenge

Este proyecto es una API básica que permite el registro de usuarios y su autenticación, así como la búsqueda de películas con uso opcional de palabra clave. El usuario también tiene la capacidad de registrar películas a sus favoritos y luego ver una lista de las mismas.

## Funcionalidades

- Registro de usuarios con validación y hash de contraseña.
- Login con generación de JWT.
- Autenticación.
- Agregado, listado y eliminación de películas favoritas.
- Búsqueda de películas usando [The Movie DB API](https://www.themoviedb.org/documentation/api).
- Persistencia de usuarios y favoritos.
- Separación por capas: Controller, Service, Infraestructura.

## Tecnologías

- Node.js
- Express
- bcryptjs
- axios
- dotenv

## Ejecución de PororóSafe

### Prerrequisitos

#### Instalación de dependencias:

- npm install
  - axios
  - dotenv
  - express
  - bcryptjs
  - jsonwebtoken

#### Iniciar el servidor:

- node app.js
- npx nodemmon app.js (opcional)

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
