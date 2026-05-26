import { useRef, useEffect } from 'react';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.css';

export default function TomSelectWrapper({ id, value, onChange, options, placeholder, className }) {
  const selectRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      instanceRef.current = new TomSelect(selectRef.current, {
        valueField: 'value',
        labelField: 'text',
        searchField: 'text',
        placeholder: placeholder || 'Seleccionar...',
        allowEmptyOption: true,
        onChange: (val) => {
          const native = selectRef.current;
          if (native) {
            native.value = val;
            native.dispatchEvent(new Event('change', { bubbles: true }));
          }
        },
      });
    }
    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      const currentVal = instanceRef.current.getValue();
      const strVal = value == null ? '' : String(value);
      if (currentVal !== strVal) {
        instanceRef.current.setValue(strVal);
      }
    }
  }, [value]);

  return (
    <select
      ref={selectRef}
      id={id}
      className={className || 'form-select'}
      value={value}
      onChange={(e) => onChange(e)}
      style={{ display: 'none' }}
      autoComplete="off"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  );
}
