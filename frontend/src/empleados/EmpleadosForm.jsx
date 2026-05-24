import { NumericFormat } from "react-number-format"

export default function EmpleadoForm({
    empleado,
    enviando,
    textoBoton,
    onChange,
    onSubmit,
    onCancel,
}) {
    return (
        <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input 
                    className="form-control"
                    value={empleado.nombre}
                    onChange={(e) => onChange('nombre', e.target.value)}
                    placeholder="Nombre completo"
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Departamento</label>
                <input 
                    className="form-control"
                    value={empleado.departamento}
                    onChange={(e) => onChange('departamento', e.target.value)}
                    placeholder="Area o departamento"
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Sueldo</label>
                <NumericFormat 
                    className="form-control"
                    value={empleado.sueldo}
                    thousandSeparator=","
                    decimalSeparator="."
                    decimalScale
                    allowNegative={false}
                    prefix="$"
                    onValueChange={({ floatValue}) => onChange('sueldo', floatValue ?? 0)}
                />
            </div>

            <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={enviando}>
                    {enviando ? 'Guardando...' : textoBoton}
                </button>

                {onCancel && (
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Regresar
                    </button>
                )}
            </div>
        </form>
    )
}