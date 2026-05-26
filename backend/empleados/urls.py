from django.urls import path
from .views import (
    EmpleadoListCreateAPIView,
    EmpleadoRetrieveUpdateDestroyAPIView,
    AsistenciaListCreateAPIView,
    AsistenciaRetrieveUpdateDestroyAPIView, # <-- NUEVO
    NominaListCreateAPIView,
    ConfiguracionNominaListCreateAPIView,   # <-- NUEVO
    DashboardAPIView,                       # <-- NUEVO
    RegistroView,            
    CustomObtainAuthToken,    
    RecuperarPasswordView 
)

urlpatterns = [
    path('api/empleados', EmpleadoListCreateAPIView.as_view(), name='empleado-list-create'),
    path('api/empleados/<int:pk>', EmpleadoRetrieveUpdateDestroyAPIView.as_view(), name='empleado-detail'),
    
    path('api/asistencias', AsistenciaListCreateAPIView.as_view(), name='asistencia-list-create'),
    path('api/asistencias/<int:pk>', AsistenciaRetrieveUpdateDestroyAPIView.as_view(), name='asistencia-detail'), # <-- NUEVO
    
    path('api/nominas', NominaListCreateAPIView.as_view(), name='nomina-list'),
    path('api/configuracion-nomina', ConfiguracionNominaListCreateAPIView.as_view(), name='configuracion-nomina-list-create'), # <-- NUEVO
    
    path('api/dashboard', DashboardAPIView.as_view(), name='dashboard'), # <-- NUEVO
    
    path('api/auth/register', RegistroView.as_view(), name='auth-register'),
    path('api/auth/login', CustomObtainAuthToken.as_view(), name='auth-login'),
    path('api/auth/recover-password', RecuperarPasswordView.as_view(), name='auth-recover-password'),
]