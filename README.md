# 🗳️ Sistema de Elecciones - Backend

Este es un proyecto desarrollado con [NestJS](https://nestjs.com/) que implementa la lógica de backend para un sistema
de elecciones. Incluye gestión de ciudadanos, circuitos, miembros de mesa, candidatos y más.

## 🚀 Tecnologías principales

- **NestJS** - Framework Node.js
- **MySQL** - Base de datos relacional
- **Docker** y **Docker Compose** - Orquestación de servicios

---

## 📦 Instalación y ejecución rápida

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Configurar variables de entorno

Crear un archivo .env en la raíz del proyecto con las variables que se encuentran en el archivo `.env.example`:

### 3. Levantar el entorno con Docker

```bash
   docker-compose up -d
```

Esto ejecutará:

- La base de datos MySQL

- El seeder básico con datos iniciales

- La aplicación NestJS ya conectada a la base de datos

✅ Al iniciar, la aplicación corre en: http://localhost:3000
