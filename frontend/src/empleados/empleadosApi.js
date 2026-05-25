import axios from 'axios'
import { urlBase } from '../config'

const apiRoot = urlBase.substring(0, urlBase.lastIndexOf('/'))

export function obtenerEmpleados() {
    return axios.get(urlBase)
}

export function obtenerEmpleado(idEmpleado) {
    return axios.get(`${urlBase}/${idEmpleado}`)
}

export function crearEmpleado(empleado) {
    return axios.post(urlBase, empleado)
}

export function actualizarEmpleado(idEmpleado, empleado) {
    return axios.put(`${urlBase}/${idEmpleado}`, empleado)
}

export function eliminarEmpleado(idEmpleado) {
    return axios.delete(`${urlBase}/${idEmpleado}`)
}

export function obtenerAsistencia() {
    return axios.get(`${apiRoot}/asistencias`)
}

export function registrarAsistencia(datosAsistencia) {
    return axios.post(`${apiRoot}/asistencias`, datosAsistencia)
}

export function obtenerNominas() {
    return axios.get(`${apiRoot}/nominas`)
}