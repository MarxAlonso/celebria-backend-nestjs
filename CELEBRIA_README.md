# Celebria Backend - NestJS

Backend API para la plataforma de gestión de eventos Celebria, construida con NestJS, TypeScript, PostgreSQL y TypeORM.

## Características

- 🔐 Autenticación JWT completa con refresh tokens
- 👥 Gestión de usuarios con roles (Admin, Organizer, Guest)
- 📧 Sistema de invitaciones digitales con plantillas
- 📊 Gestión de RSVP y confirmaciones de asistencia
- 💳 Procesamiento de pagos
- 📨 Notificaciones por email
- 📱 API REST documentada con Swagger
- 🛡️ Autorización basada en roles
- 📦 Validación de datos con class-validator

## Tecnologías

- **Framework:** NestJS
- **Lenguaje:** TypeScript
- **Base de datos:** PostgreSQL
- **ORM:** TypeORM
- **Autenticación:** Passport.js con JWT
- **Documentación:** Swagger/OpenAPI
- **Validación:** class-validator
- **Testing:** Jest

## Requisitos previos

- Node.js (v16 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd celebria-backend-nestjs
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar el archivo `.env` con tus configuraciones:

```env
# Aplicación
NODE_ENV=development
PORT=3000

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=celebria_db

# JWT
JWT_SECRET=tu_secreto_jwt_super_seguro
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=tu_refresh_secreto_super_seguro
JWT_REFRESH_EXPIRES_IN=7d

# Frontend (para CORS)
FRONTEND_URL=http://localhost:3001

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña_app

# Pagos (opcional)
CULQI_PUBLIC_KEY=tu_clave_publica_culqi
CULQI_PRIVATE_KEY=tu_clave_privada_culqi
MERCADOPAGO_ACCESS_TOKEN=tu_token_mercadopago

# Redis (opcional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=tu_contraseña_redis
```

4. Crear la base de datos:
```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE celebria_db;
\q
```

5. Ejecutar migraciones (si las hay):
```bash
npm run migration:run
```

6. Iniciar el servidor:
```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

## Uso

Una vez iniciado el servidor, puedes acceder a:

- **API REST:** http://localhost:3000
- **Documentación Swagger:** http://localhost:3000/api

## Endpoints principales

### Autenticación
- `POST /auth/register` - Registro de usuarios
- `POST /auth/login` - Inicio de sesión
- `POST /auth/refresh` - Refrescar token
- `GET /auth/profile` - Perfil del usuario

### Usuarios
- `GET /users` - Listar usuarios (Admin)
- `POST /users` - Crear usuario (Admin)
- `GET /users/:id` - Obtener usuario
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario (Admin)

### Invitaciones
- `GET /invitations` - Listar invitaciones
- `POST /invitations` - Crear invitación
- `GET /invitations/:id` - Obtener invitación
- `PATCH /invitations/:id` - Actualizar invitación
- `POST /invitations/:id/guests` - Agregar invitado

### RSVP
- `GET /rsvp` - Listar RSVPs
- `POST /rsvp` - Crear RSVP
- `GET /rsvp/:id` - Obtener RSVP
- `PATCH /rsvp/:id` - Actualizar RSVP
- `GET /rsvp/invitation/:invitationId/stats` - Estadísticas

### Pagos
- `GET /payments` - Listar pagos
- `POST /payments` - Crear pago
- `GET /payments/:id` - Obtener pago
- `PATCH /payments/:id/status` - Actualizar estado
- `GET /payments/stats` - Estadísticas

## Estructura del proyecto

```
src/
├── auth/                 # Módulo de autenticación
├── users/                # Módulo de usuarios
├── templates/            # Módulo de plantillas
├── invitations/          # Módulo de invitaciones
├── rsvp/                 # Módulo de RSVP
├── payments/             # Módulo de pagos
├── email/                # Servicio de email
├── database/             # Configuración y entidades de BD
├── config/               # Configuraciones
├── common/               # Guards, decoradores, utilidades
└── main.ts               # Punto de entrada
```

## Desarrollo

### Ejecutar en modo desarrollo:
```bash
npm run start:dev
```

### Ejecutar tests:
```bash
npm run test
```

### Ejecutar tests e2e:
```bash
npm run test:e2e
```

### Linting:
```bash
npm run lint
```

## Despliegue

1. Construir el proyecto:
```bash
npm run build
```

2. Configurar variables de entorno para producción

3. Iniciar el servidor:
```bash
npm run start:prod
```

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT.