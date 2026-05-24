import { Link, useLocation } from "react-router-dom";

export default function Navegacion() {
    const location = useLocation()

    return (
        <nav className="navbar navbar-expand-lg mb-4 sticky-top">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <span className="me-2">⚡</span> RH Manager
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="navMain" className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto"> 
                        <li className="nav-item">
                            <Link 
                                className={`nav-link me-2 ${location.pathname === '/' ? 'active' : ''}`} 
                                to="/"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${location.pathname === '/agregar' ? 'active' : ''}`} 
                                to="/agregar"
                            >
                                Registrar Personal
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}