import { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { Link } from "react-router-dom"
import { obtenerEmpleados, eliminarEmpleado } from './empleadosApi'

export default function ListadoEmpleados() {
    const [empleados, setEmpleados] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')
    const [eliminandoId, setEliminandoId] = useState(null)
    
    const [busqueda, setBusqueda] = useState('')

    const cargar = async () => {
        try {
            const { data } = await obtenerEmpleados()
            setEmpleados(Array.isArray(data) ? data : [])
        } catch (e) {
            setError('No se puede cargar el listado de empleados')
        }
    }

    useEffect(() => {
        const boot = async () => {
            setCargando(true)
            await cargar()
            setCargando(false)
        }
        boot()
    }, [])

    const eliminar = async (idEmpleado) => {
        const ok = window.confirm('¿Seguro que deseas eliminar este empleado?')
        if (!ok) return
        
        try {
            setEliminandoId(idEmpleado)
            await eliminarEmpleado(idEmpleado)
            await cargar()
        } catch (e) {
            alert('No se pudo eliminar el empleado.')
        } finally {
            setEliminandoId(null)
        }
    }

    const totalEmpleados = empleados.length
    
    const nominaTotal = empleados.reduce((acumulado, emp) => {
        return acumulado + Number(emp.sueldo)
    }, 0)

    const sueldoPromedio = totalEmpleados > 0 ? (nominaTotal / totalEmpleados) : 0

    const empleadosFiltrados = empleados.filter((e) => {
        const termino = busqueda.toLowerCase()
        return (
            e.nombre.toLowerCase().includes(termino) ||
            e.departamento.toLowerCase().includes(termino)
        )
    })

    if (cargando) return <div className="text-center py-5"><p className="text-secondary">Cargando dashboard...</p></div>

    if (error) {
        return <div className="alert alert-danger my-4" role="alert">{error}</div>
    }

    return (
        <div className="container-fluid px-0">
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="metric-card">
                        <div className="metric-title">Colaboradores Activos</div>
                        <div className="metric-value">{totalEmpleados}</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="metric-card cyan">
                        <div className="metric-title">Nómina Mensual</div>
                        <div className="metric-value">
                            <NumericFormat
                                value={nominaTotal}
                                displayType="text"
                                thousandSeparator=","
                                decimalSeparator="."
                                prefix="$"
                                decimalScale={2}
                                fixedDecimalScale
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="metric-card">
                        <div className="metric-title">Salario Promedio</div>
                        <div className="metric-value">
                            <NumericFormat
                                value={sueldoPromedio}
                                displayType="text"
                                thousandSeparator=","
                                decimalSeparator="."
                                prefix="$"
                                decimalScale={2}
                                fixedDecimalScale
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4 align-items-center">
                <div className="col-md-8 col-sm-12 mb-2 mb-md-0">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Buscar por nombre o departamento..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
                <div className="col-md-4 col-sm-12 text-md-end">
                    <Link to="/agregar" className="btn btn-primary w-100 w-md-auto">
                        + Agregar Colaborador
                    </Link>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Listado de Personal
                </div>
                <div className="card-body p-0">
                    {empleadosFiltrados.length === 0 ? (
                        <div className="p-5 text-center">
                            <p className="mb-0 text-secondary">No se encontraron colaboradores registrados</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th style={{ width: 140 }}>ID</th>
                                        <th>Nombre Completo</th>
                                        <th>Departamento / Área</th>
                                        <th style={{ width: 180 }}>Sueldo Mensual</th>
                                        <th style={{ width: 180 }} className="text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {empleadosFiltrados.map((e) => (
                                        <tr key={e.idEmpleado}>
                                            <td className="text-secondary font-monospace">#{e.idEmpleado}</td>
                                            <td>
                                                <span className="fw-semibold text-light">{e.nombre}</span>
                                            </td>
                                            <td>
                                                <span className="badge bg-secondary-subtle text-light-emphasis px-2.5 py-1.5 border border-white-5">
                                                    {e.departamento}
                                                </span>
                                            </td>
                                            <td>
                                                <strong className="text-info">
                                                    <NumericFormat
                                                        value={e.sueldo}
                                                        displayType="text"
                                                        thousandSeparator=","
                                                        decimalSeparator="."
                                                        prefix="$"
                                                        decimalScale={2}
                                                        fixedDecimalScale
                                                    />
                                                </strong>
                                            </td>
                                            <td className="text-end">
                                                <Link to={`/editar/${e.idEmpleado}`} className="btn btn-sm btn-outline-light border-0 me-2 py-1.5 px-3">
                                                    Editar
                                                </Link>
                                                <button 
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger border-0 py-1.5 px-3"
                                                    onClick={() => eliminar(e.idEmpleado)}
                                                    disabled={eliminandoId === e.idEmpleado}
                                                >
                                                    {eliminandoId === e.idEmpleado ? 'Eliminando...' : 'Eliminar'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}