import "../../styles/input.css";

export const Input = ({
  type,
  name,
  clase,
  placeholder,
  id,
  labelText,
  error,
  value,
  onChange,
  readOnly,
  classNameContainer
}) => {
  return (
    <div className={"input_container " + classNameContainer}>
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        className={clase}
        name={name}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
      <span id={id} className="error-message" style={{ color: "red" }}>
        {error}
      </span>
    </div>
  );
};
