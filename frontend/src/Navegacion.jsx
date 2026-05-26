import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Users, Clock, DollarSign, Briefcase, LogOut } from "lucide-react";

export default function Navegacion() {
    const location = useLocation()
    const navigate = useNavigate()
    const { logout, user } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg mb-4 sticky-top">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <Briefcase size={22} className="text-info animate-pulse" />
                    <span>RH Enterprise</span>
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="navMain" className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto gap-3 align-items-center">
                        <li className="nav-item">
                            <Link 
                                className={`nav-link d-flex align-items-center gap-2 ${location.pathname === '/' ? 'active' : ''}`} 
                                to="/"
                            >
                                <Users size={16} />
                                Personal
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link d-flex align-items-center gap-2 ${location.pathname === '/asistencia' ? 'active' : ''}`} 
                                to="/asistencia"
                            >
                                <Clock size={16} />
                                Asistencia
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link d-flex align-items-center gap-2 ${location.pathname === '/nominas' ? 'active' : ''}`} 
                                to="/nominas"
                            >
                                <DollarSign size={16} />
                                Nómina
                            </Link>
                        </li>
                        
                        {user && (
                            <li className="nav-item border-start ps-3 d-flex align-items-center gap-3">
                                <span className="small text-secondary fw-semibold">
                                    {user.username}
                                </span>
                                <button 
                                    onClick={handleLogout} 
                                    className="btn btn-sm btn-outline-danger border-0 p-2 d-flex align-items-center justify-content-center rounded-circle"
                                    title="Cerrar Sesión"
                                >
                                    <LogOut size={16} />
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}