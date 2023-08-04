import "../../styles/button.css";

const getClassNameByMode = (mode) => {
  if (mode === "azul") {
    return "button-blue";
  } else if (mode === "azul-suave") {
    return "button-softblue";
  }else if(mode === "gris"){
    return "button-gray"
  }
  return "button-yellow"
}

export const Button = ({ id, className, type, textContent, mode, onClick, disabled }) => {
  
  const modeClass = getClassNameByMode(mode);

  return (
    <button id={id} className={`button ${modeClass} ${className}`} type={type} onClick={onClick} disabled = {disabled}>
      {textContent}
    </button>
  );
};
