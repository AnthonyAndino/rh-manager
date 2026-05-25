import { useEffect, useState } from 'react'
import { obtenerEmpleados, obtenerAsistencia, registrarAsistencia } from './empleadosApi'
import { Clock, CheckCircle, AlertTriangle, UserCheck } from 'lucide-react'

export default function ControlAsistencia() {
    const [empleados, setEmpleados] = useState([])
    const [asistencias, setAsistencias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [guardando, setGuardando] = useState(false)

    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('')
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })

    const cargarDatos = async () => {
        try {
            const resEmpleados = await obtenerEmpleados()
            const resAsistencias = await obtenerAsistencia()
            setEmpleados(resEmpleados.data)
            setAsistencias(resAsistencias.data)
        } catch (e) {
            console.error("Error al cargar datos", e)
        }
    }

    useEffect(() => {
        const boot = async () => {
            setCargando(true)
            await cargarDatos()
            setCargando(false)
        }
        boot()
    }, [])

    const handleMarcarEntrada = async (e) => {
        e.preventDefault()
        if (!empleadoSeleccionado) {
            setMensaje({ texto: 'Por favor selecciona un colaborador', tipo: 'danger'})
            return
        }

        try {
            setGuardando(true)
            setMensaje({ texto: '', tipo: '' })

            const ahora = new Date()
            const fecha = ahora.toISOString().split('T')[0]

            const hora = ahora.toTimeString().split(' ')[0]

            await registrarAsistencia({
                empleado: Number(empleadoSeleccionado),
                fecha: fecha,
                hora_entrada: hora
            })

            setMensaje({
                texto: 'Entrada registrada con exito! El sistema evaluo tu estado.',
                tipo: 'success'
            })
            setEmpleadoSeleccionado('')
            await cargarDatos()
        } catch (err) {
            setMensaje({ texto: 'No se pudo registrar la entrada. Ya marco hoy?', tipo: 'danger' })
        } finally {
            setGuardando(false)
        }
    }

    if (cargando) return <div className="text-center py-5"><p className="text-secondary">Cargando modulo de asistencia...</p></div>

    return (
        <div className="container-fluid px-0">
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header d-flex align-items-center gap-2">
                            <Clock className="text-info" size={20} />
                            <span>Checador Digital</span>
                        </div>
                        <div className="card-body">
                            <p className="text-secondary small mb-4">
                                Selecciona al empleado y haz click en registrar entrada. La hora limite de llegada sin retardo es a las <strong>09:00 AM</strong>
                            </p>

                            {mensaje.texto && (<div className={`alert alert-${mensaje.tipo} mb-3`} role="alert">{mensaje.texto}</div>)}

                            <form onSubmit={handleMarcarEntrada}>
                                <div className="mb-4">
                                    <label className="form-label text-secondary small">Colaborador</label>
                                    <select className="form-control" value={empleadoSeleccionado} onChange={(e) => setEmpleadoSeleccionado(e.target.value)}>
                                        <option value="">-- Selecciona un Empleado --</option>
                                        {empleados.map(emp => (
                                            <option key={emp.idEmpleado} value={emp.idEmpleado}>{emp.nombre} ({emp.departamento})</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                                    disabled={guardando}
                                ><UserCheck size={18} />
                                {guardando ? 'Registrando...' : 'Registrar Entrada'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>


                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            Registro de Asistencia Reciente
                        </div>
                        <div className="card-body p-0">
                            {asistencias.length === 0 ? (
                                <div className="p-5 text-center">
                                    <p className="mb-0 text-secondary">Aun no hay asistencias registradas hoy.</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead>
                                            <tr>
                                                <th>Empleado</th>
                                                <th>Fecha</th>
                                                <th>Hora de entrada</th>
                                                <th>Estado (MySQL Trigger)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {asistencias.map((asist) => (
                                                <tr key={asist.idAsistencia}>
                                                    <td className="fw-semibold text-light">{asist.nombre_empleado}</td>
                                                    <td className="text-secondary">{asist.fecha}</td>
                                                    <td className="font-monospace text-info">{asist.hora_entrada}</td>
                                                    <td>{asist.estado === 'A Tiempo' ? ( <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 d-inline-flex align-items-center gap-1.5 rounded-pill"><CheckCircle size={12} />A Tiempo</span>) : (
                                                        <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 d-inline-flex align-items-center gap-1.5 rounded-pill"><AlertTriangle size={12} /> Retardo </span>
                                                        )}
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
            </div>
        </div>
    )
}