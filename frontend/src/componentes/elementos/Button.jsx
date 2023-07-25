import "../../styles/button.css";

const getClassNameByMode = (mode) => {
  if (mode === "azul") {
    return "button-blue";
  } else if (mode === "azul-suave") {
    return "button-softblue";
  }
  return "button-yellow"
}

export const Button = ({ id, className, type, textContent, mode, onClick }) => {
  
  const modeClass = getClassNameByMode(mode);

  return (
    <button id={id} className={`button ${modeClass} ${className}`} type={type} onClick={onClick}>
      {textContent}
    </button>
  );
};
