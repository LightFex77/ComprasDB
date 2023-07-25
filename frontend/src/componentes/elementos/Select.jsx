import "../../styles/select.css";

export const Select = ({
  name,
  labelText,
  id,
  selectTipo,
  value,
  onChange,
  options,
  error,
  onBlur
}) => {
  return (
    <div className="select-container">
      <label htmlFor={id}>{labelText}</label>
      <select name={name} id={id} value={value} onChange={onChange} onBlur={onBlur}>
        <option value="">{selectTipo}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.texto}
          </option>
        ))}
      </select>
      <span id={id} className="error-message" style={{ color: "red" }}>
        {error}
      </span>
    </div>
  );
};
