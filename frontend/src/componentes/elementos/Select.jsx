import "../../styles/select.css";

export const Select = ({
  name,
  labelText,
  id,
  selectTipo,
  value,
  onChange,
  options
}) => {
  return (
    <div className="select-container">
      <label htmlFor={id}>{labelText}</label>
      <select name={name} id={id} value={value} onChange={onChange}>
        <option value="">{selectTipo}</option>
        {options.map(opt => (
          <option key={opt.id} value={opt.id}>{opt.texto}</option>
        ))}
      </select>
    </div>
  );
};
