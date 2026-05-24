import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { obtenerEmpleado, actualizarEmpleado } from "./empleadosApi"
import EmpleadoForm from "./EmpleadosForm"

const empleadoInicial = {
    nombre: '',
    departamento: '',
    sueldo: 0,
}

export default function EditarEmpleado() {
    const { idEmpleado } = useParams()
    const navigate = useNavigate()

    const [empleado, setEmpleado] = useState(empleadoInicial)
    const [cargando, setCargando] = useState(true)
    const [enviando, setEnviando] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const cargar = async () => {
            try {
                const { data } = await obtenerEmpleado(idEmpleado)

                setEmpleado({
                    nombre: data?.nombre ?? '',
                    departamento: data?.departamento ?? '',
                    sueldo: Number(data?.sueldo) || 0,
                })
            } catch (e) {
                setError('No se pudo cargar el empleado')
            } finally {
                setCargando(false)
            }
        }

        cargar()
    }, [idEmpleado])

    const actualizarCampo = (campo, valor) => {
        setEmpleado((actual) => ({
            ...actual,
            [campo]: valor,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const nombreOk = empleado.nombre.trim()
        const deptoOk = empleado.departamento.trim()
        const sueldoOk = Number(empleado.sueldo) || 0

        if (!nombreOk || !deptoOk || sueldoOk <= 0) {
            setError('Completa Nombre, departamento y un sueldo mayor a 0.')
            return
        }

        try {
            setEnviando(true)

            await actualizarEmpleado(idEmpleado, {
                nombre: nombreOk,
                departamento: deptoOk,
                sueldo: sueldoOk,
            })

            navigate('/')
        } catch (err) {
            setError('No se pudo guardar los cambios del empleado')
        } finally {
            setEnviando(false)
        }
    }

    if (cargando) {
        return <p className="text-secondary">Cargando...</p>
    }

    return (
        <div className="card">
            <div className="card-header">
                <strong>Editar empleado #{idEmpleado}</strong>
            </div>
            <div className="card-body">
                {error && <div className="alert alert-danger mb-3">{error}</div>}

                <EmpleadoForm
                    empleado={empleado}
                    enviando={enviando}
                    textoBoton="Guardar"
                    onChange={actualizarCampo}
                    onSubmit={onSubmit}
                    onCancel={() => navigate(-1)}
                />
            </div>
        </div>
    )
}