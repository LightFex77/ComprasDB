import items from "../menuItems.json";

export const Menu = () => {
  return (
    <nav className="menu">
      <ul>
        {items.map((item) => {
          return <span key={item.titulo}>{item.titulo}</span>;
        })}
      </ul>
    </nav>
  );
};
