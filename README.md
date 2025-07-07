# 🗳️ Sistema de Elecciones - Backend

Este es un proyecto desarrollado con [NestJS](https://nestjs.com/) que implementa la lógica de backend para un sistema
de elecciones. Incluye gestión de ciudadanos, circuitos, miembros de mesa, candidatos y más.

## 🚀 Tecnologías principales

- **NestJS** – Framework Node.js
- **MySQL** – Base de datos relacional
- **Docker & Docker Compose** – Orquestación de servicios

---

## 📦 Instalación y ejecución rápida

### 1. Clonar el repositorio

```
git clone https://github.com/tu-usuario/tu-repo.git

cd tu-repo
```

### 2. Configurar variables de entorno

Crear un archivo .env en la raíz del proyecto basándote en .env.example:

```
cp .env.example .env
```

Asegurate de setear la variable USE_LOCAL_DB según el entorno deseado:

```
USE_LOCAL_DB=true     # Usa base de datos local levantada por Docker
USE_LOCAL_DB=false  # Usa una base de datos remota (no levanta contenedor `db`)
```

También podés configurar los datos de conexión a la base de datos en ese mismo archivo.

Entonces para el caso de la conexión remota a la base de datos con las credenciales bridadas (mysql.reto-ucu.net), es necesario setear las credenciales necesarias indicadas en el archivo `.env.example`


### 3. Levantar el entorno con Docker

Usá el script de arranque para levantar el entorno según el valor de USE_LOCAL_DB:

```
./start.sh
```

Esto hará lo siguiente:

Si USE_LOCAL_DB=true:
🔹 Levanta contenedor MySQL con datos iniciales + backend NestJS

Si USE_LOCAL_DB=false:
🔹 Solo levanta el backend NestJS (asumiendo conexión a una base remota)

✅ Al iniciar, la aplicación corre en: http://localhost:3000

## 🧪 Endpoints y documentación

Podés acceder a la documentación Swagger en:

📄 http://localhost:3000/api

