import axios from 'axios'
import { urlBase } from '../config'

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