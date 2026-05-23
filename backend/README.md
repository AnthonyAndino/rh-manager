# Backend RH

API REST para gestion de empleados construida con Django, Django REST Framework y MySQL.

## Requisitos

- Python 3.12+
- MySQL

## Instalacion

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

## Variables de entorno

El archivo `.env.example` incluye los valores configurables:

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

## Ejecucion

```bash
python manage.py migrate
python manage.py runserver
```

## Endpoints

| Metodo | Endpoint | Descripcion |
| --- | --- | --- |
| GET | `/api/empleados` | Lista empleados |
| POST | `/api/empleados` | Crea empleado |
| GET | `/api/empleados/<id>` | Obtiene empleado |
| PUT/PATCH | `/api/empleados/<id>` | Actualiza empleado |
| DELETE | `/api/empleados/<id>` | Elimina empleado |

