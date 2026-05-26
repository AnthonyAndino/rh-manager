from rest_framework import generics
from .models import Empleado, Asistencia, Nomina
from .serializers import EmpleadoSerializer, AsistenciaSerializer, NominaSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny, IsAuthenticated

class EmpleadoListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated] 
    queryset = Empleado.objects.all().order_by('idEmpleado')
    serializer_class = EmpleadoSerializer
class EmpleadoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated] 
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class AsistenciaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Asistencia.objects.all().order_by('-fecha', '-hora_entrada')
    serializer_class = AsistenciaSerializer   
     
class NominaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Nomina.objects.all().order_by('-fecha_pago')
    serializer_class = NominaSerializer
    
class RegistroView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        if not username or not email or not password:
            return Response({'error': 'Por favor rellena todos los campos'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'El nombre de usuario ya está en uso'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, email=email, password=password)
        
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_201_CREATED)
class CustomObtainAuthToken(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': {
                    'username': user.username,
                    'email': user.email
                }
            })
        else:
            return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_400_BAD_REQUEST)
class RecuperarPasswordView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'El correo es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        
        usuario_existe = User.objects.filter(email=email).exists()
        
        if usuario_existe:
            return Response({'message': 'Se ha enviado un enlace de recuperación a su correo electrónico.'})
        else:
            return Response({'error': 'No encontramos ninguna cuenta con ese correo electrónico.'}, status=status.HTTP_404_NOT_FOUND)