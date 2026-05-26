import { Calendar } from 'lucide-react';

export default function DatePicker({ value, onChange, label, placeholder, style }) {
    return (
        <div className="datepicker-wrapper" style={style}>
            {label && <label className="form-label">{label}</label>}
            <div className="datepicker-input-group">
                <Calendar size={16} className="datepicker-icon" />
                <input
                    type="date"
                    className="datepicker-input"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || 'Seleccionar fecha'}
                />
            </div>
        </div>
    );
}
