# Frontend RH

Aplicacion React/Vite para consumir la API de empleados del backend Django.

## Requisitos

- Node.js
- npm

## Instalacion

```bash
npm install
copy .env.example .env
```

## Configuracion

Por defecto la app consume:

```text
http://localhost:8000/api/empleados
```

Puedes cambiarlo en `.env`:

```text
VITE_API_BASE_URL=http://localhost:8000/api/empleados
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

