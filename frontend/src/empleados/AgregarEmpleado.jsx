import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { crearEmpleado } from "./empleadosApi"
import EmpleadoForm from "./EmpleadosForm"


const empleadoInicial = {
    nombre: '',
    departamento: '',
    sueldo: 0,
}

export default function AgregarEmpleado() {
    const [empleado, setEmpleado] = useState(empleadoInicial)
    const [enviando, setEnviando] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const actualizaCampo = (campo, valor) => {
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
            setError('Completa Nombre, departamento y un sueldo mayor a 0')
            return
        }

        try {
            setEnviando(true)

            await crearEmpleado({
                nombre: nombreOk,
                departamento: deptoOk,
                sueldo: sueldoOk,
            })

            navigate('/')
        } catch (e) {
            setError('No se pudo guardar el empleado')
        } finally {
            setEnviando(false)
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <strong>Agregar Empleado</strong>
            </div>
            <div className="card-body">
                {error && <div className="alert alert-danger mb-3">{error}</div>}

                <EmpleadoForm 
                    empleado={empleado}
                    enviando={enviando}
                    textoBoton="Guardar"
                    onChange={actualizaCampo}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    )
}