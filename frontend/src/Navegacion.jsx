import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Users, Clock, DollarSign, LayoutDashboard, LogOut } from "lucide-react";

export default function Navegacion() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Obtener la inicial del nombre de usuario
    const inicial = user?.username ? user.username.charAt(0).toUpperCase() : 'U';

    return (
        <aside className="sidebar">
            {/* Seccion de usuario */}
            <div className="sidebar-user">
                <div className="sidebar-avatar">
                    {inicial}
                </div>
                <div className="sidebar-user-name">{user?.username || 'Usuario'}</div>
                <div className="sidebar-user-role">{user?.rol || 'Empleado'}</div>
            </div>

            {/* Menu de navegacion */}
            <ul className="sidebar-menu">
                <li>
                    <Link 
                        className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`} 
                        to="/"
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>
                </li>
                
                {/* Solo administradores pueden gestionar el personal */}
                {user?.rol === 'admin' && (
                    <li>
                        <Link 
                            className={`sidebar-link ${location.pathname.startsWith('/empleados') || location.pathname === '/agregar' || location.pathname.startsWith('/editar') ? 'active' : ''}`} 
                            to="/empleados"
                        >
                            <Users size={18} />
                            Personal
                        </Link>
                    </li>
                )}
                
                <li>
                    <Link 
                        className={`sidebar-link ${location.pathname === '/asistencia' ? 'active' : ''}`} 
                        to="/asistencia"
                    >
                        <Clock size={18} />
                        Asistencias
                    </Link>
                </li>
                
                {/* Solo administradores pueden ver y calcular nóminas */}
                {user?.rol === 'admin' && (
                    <li>
                        <Link 
                            className={`sidebar-link ${location.pathname === '/nominas' ? 'active' : ''}`} 
                            to="/nominas"
                        >
                            <DollarSign size={18} />
                            Nóminas
                        </Link>
                    </li>
                )}

                {/* Boton de cerrar sesion */}
                <li style={{ marginTop: 'auto' }}>
                    <a 
                        href="#" 
                        onClick={handleLogout} 
                        className="sidebar-link sidebar-link-danger d-flex align-items-center gap-3"
                    >
                        <LogOut size={18} />
                        Cerrar Sesión
                    </a>
                </li>
            </ul>
        </aside>
    );
}