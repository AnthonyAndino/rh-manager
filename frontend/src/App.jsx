import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./AuthContext"
import Navegacion from "./Navegacion"

// Vistas del Dashboard
import Dashboard from "./empleados/Dashboard"
import ListadoEmpleados from "./empleados/ListadoEmpleados"
import AgregarEmpleado from "./empleados/AgregarEmpleado"
import EditarEmpleado from "./empleados/EditarEmpleado"
import ControlAsistencia from "./empleados/ControlAsistencias"
import ControlNominas from "./empleados/ControlNominas"

// Vistas de Autenticación
import Login from "./Login"
import Register from "./Register"
import RecuperarPassword from "./RecuperarPassword"

// --- COMPONENTE DE RUTA PROTEGIDA ---
function RutaPrivada({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// --- COMPONENTE DE RUTA ADMINISTRATIVA ---
function RutaAdministrador({ children }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return user?.rol === 'admin' ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={isAuthenticated ? "app-wrapper animate-fade-in" : ""}>
      {/* Mostramos la barra de navegación lateral si el usuario ya inició sesión */}
      {isAuthenticated && <Navegacion />}
      
      {/* Contenedor principal con clases dinámicas según la sesión */}
      <main className={isAuthenticated ? "main-content" : ""}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/recuperar" element={<RecuperarPassword />} />

          {/* Rutas Privadas / Protegidas */}
          <Route path="/" element={<RutaPrivada><Dashboard /></RutaPrivada>} />
          <Route path="/asistencia" element={<RutaPrivada><ControlAsistencia /></RutaPrivada>} />
          
          {/* Rutas Protegidas Exclusivas para Administrador */}
          <Route path="/empleados" element={<RutaAdministrador><ListadoEmpleados /></RutaAdministrador>} />
          <Route path="/agregar" element={<RutaAdministrador><AgregarEmpleado /></RutaAdministrador>} />
          <Route path="/editar/:idEmpleado" element={<RutaAdministrador><EditarEmpleado /></RutaAdministrador>} />
          <Route path="/nominas" element={<RutaAdministrador><ControlNominas /></RutaAdministrador>} />

          {/* Redirección por defecto si la URL no existe */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}