import axios from 'axios'
import { urlBase } from '../config'

// urlBase = 'http://localhost:8000/api/empleados'
// apiRoot = 'http://localhost:8000'
const apiRoot = urlBase.substring(0, urlBase.lastIndexOf('/api/'))

// ─── EMPLEADOS ────────────────────────────────────────────────────────────────

export function obtenerEmpleados() {
    return axios.get(`${apiRoot}/api/empleados`)
}

export function obtenerEmpleado(idEmpleado) {
    return axios.get(`${apiRoot}/api/empleados/${idEmpleado}`)
}

/** Crea un empleado. El payload debe ser un FormData si se sube foto. */
export function crearEmpleado(empleadoData) {
    const isForm = empleadoData instanceof FormData
    return axios.post(`${apiRoot}/api/empleados`, empleadoData, {
        headers: isForm ? { 'Content-Type': 'multipart/form-data' } : {}
    })
}

/** Actualiza un empleado. El payload puede ser JSON o FormData (con foto). */
export function actualizarEmpleado(idEmpleado, empleadoData) {
    const isForm = empleadoData instanceof FormData
    // PATCH es más seguro que PUT cuando no enviamos todos los campos
    return axios.patch(`${apiRoot}/api/empleados/${idEmpleado}`, empleadoData, {
        headers: isForm ? { 'Content-Type': 'multipart/form-data' } : {}
    })
}

export function eliminarEmpleado(idEmpleado) {
    return axios.delete(`${apiRoot}/api/empleados/${idEmpleado}`)
}

// ─── ASISTENCIAS ──────────────────────────────────────────────────────────────

/** Obtiene el listado de asistencias. Acepta parámetros de filtro opcionales. */
export function obtenerAsistencias({ empleado_id, fecha_inicio, fecha_fin } = {}) {
    const params = new URLSearchParams()
    if (empleado_id) params.append('empleado_id', empleado_id)
    if (fecha_inicio) params.append('fecha_inicio', fecha_inicio)
    if (fecha_fin)    params.append('fecha_fin', fecha_fin)
    const query = params.toString() ? `?${params.toString()}` : ''
    return axios.get(`${apiRoot}/api/asistencias${query}`)
}

/** Registra la hora de ENTRADA de un empleado. */
export function registrarEntrada(datos) {
    return axios.post(`${apiRoot}/api/asistencias`, datos)
}

/** Registra la hora de SALIDA actualizando un registro existente con PATCH. */
export function registrarSalida(idAsistencia, horaSalida) {
    return axios.patch(`${apiRoot}/api/asistencias/${idAsistencia}`, {
        hora_salida: horaSalida
    })
}

// ─── NÓMINAS ──────────────────────────────────────────────────────────────────

export function obtenerNominas() {
    return axios.get(`${apiRoot}/api/nominas`)
}

/** Llama al Stored Procedure 'GenerarNominaMensual' enviando la fecha_pago. */
export function generarNominaMensual(fecha_pago) {
    return axios.post(`${apiRoot}/api/nominas`, { fecha_pago })
}

// ─── CONFIGURACIÓN DE NÓMINA ──────────────────────────────────────────────────

export function obtenerConfiguracionNomina() {
    return axios.get(`${apiRoot}/api/configuracion-nomina`)
}

export function guardarConfiguracionNomina(config) {
    return axios.post(`${apiRoot}/api/configuracion-nomina`, config)
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

export function obtenerDashboard() {
    return axios.get(`${apiRoot}/api/dashboard`)
}