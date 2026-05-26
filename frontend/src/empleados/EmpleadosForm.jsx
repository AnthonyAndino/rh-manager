import { NumericFormat } from 'react-number-format';
import { Calendar, User, Mail, Phone, Image, Award, ToggleLeft } from 'lucide-react';

export default function EmpleadoForm({
    empleado,
    enviando,
    textoBoton,
    onChange,
    onSubmit,
    onCancel,
}) {
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onChange('foto_perfil', e.target.files[0]);
        }
    };

    return (
        <form onSubmit={onSubmit} className="row g-4 animate-fade-in">
            {/* Campo Nombre */}
            <div className="col-md-6">
                <label className="form-label">Nombre Completo</label>
                <div className="input-icon-group">
                    <User size={18} />
                    <input 
                        type="text"
                        className="form-control"
                        value={empleado.nombre}
                        onChange={(e) => onChange('nombre', e.target.value)}
                        placeholder="Juan Pérez"
                        required
                    />
                </div>
            </div>

            {/* Campo Puesto */}
            <div className="col-md-6">
                <label className="form-label">Puesto Organizacional</label>
                <div className="input-icon-group">
                    <Award size={18} />
                    <input 
                        type="text"
                        className="form-control"
                        value={empleado.puesto}
                        onChange={(e) => onChange('puesto', e.target.value)}
                        placeholder="Gerente de Operaciones"
                        required
                    />
                </div>
            </div>

            {/* Campo Departamento */}
            <div className="col-md-6">
                <label className="form-label">Departamento</label>
                <div className="input-icon-group">
                    <ToggleLeft size={18} />
                    <input 
                        type="text"
                        className="form-control"
                        value={empleado.departamento}
                        onChange={(e) => onChange('departamento', e.target.value)}
                        placeholder="Administración"
                        required
                    />
                </div>
            </div>

            {/* Campo Correo Corporativo */}
            <div className="col-md-6">
                <label className="form-label">Correo Corporativo</label>
                <div className="input-icon-group">
                    <Mail size={18} />
                    <input 
                        type="email"
                        className="form-control"
                        value={empleado.correo_corporativo}
                        onChange={(e) => onChange('correo_corporativo', e.target.value)}
                        placeholder="juan.perez@empresa.com"
                        required
                    />
                </div>
            </div>

            {/* Campo Teléfono */}
            <div className="col-md-6">
                <label className="form-label">Teléfono de Contacto</label>
                <div className="input-icon-group">
                    <Phone size={18} />
                    <input 
                        type="text"
                        className="form-control"
                        value={empleado.telefono}
                        onChange={(e) => onChange('telefono', e.target.value)}
                        placeholder="+52 55 1234 5678"
                    />
                </div>
            </div>

            {/* Campo Fecha Contratación */}
            <div className="col-md-6">
                <label className="form-label">Fecha de Contratación</label>
                <div className="input-icon-group">
                    <Calendar size={18} />
                    <input 
                        type="date"
                        className="form-control"
                        value={empleado.fecha_contratacion}
                        onChange={(e) => onChange('fecha_contratacion', e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Campo Sueldo */}
            <div className="col-md-6">
                <label className="form-label">Sueldo Mensual ($)</label>
                <NumericFormat 
                    className="form-control"
                    value={empleado.sueldo}
                    thousandSeparator=","
                    decimalSeparator="."
                    decimalScale={2}
                    fixedDecimalScale
                    allowNegative={false}
                    prefix="$"
                    onValueChange={({ floatValue }) => onChange('sueldo', floatValue ?? 0)}
                />
            </div>

            {/* Campo Estatus */}
            <div className="col-md-6">
                <label className="form-label">Estatus de Servicio</label>
                <select 
                    className="form-select"
                    value={empleado.estatus}
                    onChange={(e) => onChange('estatus', e.target.value)}
                >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Suspendido">Suspendido</option>
                </select>
            </div>

            {/* Campo Foto de Perfil */}
            <div className="col-md-12">
                <label className="form-label">Foto de Perfil (Opcional)</label>
                <div className="input-icon-group">
                    <Image size={18} />
                    <input 
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div>
                {empleado.foto_perfil && typeof empleado.foto_perfil === 'string' && (
                    <div className="mt-2 text-secondary small">
                        Imagen registrada: <a href={empleado.foto_perfil} target="_blank" rel="noreferrer" className="auth-link">Ver archivo actual</a>
                    </div>
                )}
            </div>

            {/* Botones de Envío */}
            <div className="col-12 d-flex gap-3 mt-4">
                <button type="submit" className="btn btn-primary px-4 py-2.5" disabled={enviando}>
                    {enviando ? 'Guardando...' : textoBoton}
                </button>

                {onCancel && (
                    <button type="button" className="btn btn-secondary px-4 py-2.5" onClick={onCancel}>
                        Regresar
                    </button>
                )}
            </div>
        </form>
    );
}