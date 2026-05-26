import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./AuthContext"
import Navegacion from "./Navegacion"
import ListadoEmpleados from "./empleados/ListadoEmpleados"
import AgregarEmpleado from "./empleados/AgregarEmpleado"
import EditarEmpleado from "./empleados/EditarEmpleado"
import ControlAsistencia from "./empleados/ControlAsistencias"
import ControlNominas from "./empleados/ControlNominas"
import Login from "./Login"
import Register from "./Register"
import RecuperarPassword from "./RecuperarPassword"

function RutaPrivada({ children }) {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? children : <Navigate to="/login" />;
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
    <>
      {isAuthenticated && <Navegacion />}
      
      <div className="container pb-5">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/recuperar" element={<RecuperarPassword />} />
          <Route path="/" element={<RutaPrivada><ListadoEmpleados /></RutaPrivada>} />
          <Route path="/agregar" element={<RutaPrivada><AgregarEmpleado /></RutaPrivada>} />
          <Route path="/editar/:idEmpleado" element={<RutaPrivada><EditarEmpleado /></RutaPrivada>} />
          <Route path="/asistencia" element={<RutaPrivada><ControlAsistencia /></RutaPrivada>} />
          <Route path="/nominas" element={<RutaPrivada><ControlNominas /></RutaPrivada>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  )
}