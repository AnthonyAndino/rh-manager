from django.urls import path
from .views import (
    EmpleadoListCreateAPIView,
    EmpleadoRetrieveUpdateDestroyAPIView,
    AsistenciaListCreateAPIView,
    NominaListCreateAPIView
)

urlpatterns = [
    path('api/empleados', EmpleadoListCreateAPIView.as_view(), name='empleado-list-create'),
    path('api/empleados/<int:pk>', EmpleadoRetrieveUpdateDestroyAPIView.as_view(), name='empleado-detail'),
    path('api/asistencias', AsistenciaListCreateAPIView.as_view(), name='asistencia-list-create'),
    path('api/nominas', NominaListCreateAPIView.as_view(), name='nomina-list'),
]