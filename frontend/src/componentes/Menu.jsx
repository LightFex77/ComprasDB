import items from "../menuItems.json";
import "../styles/menu.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../svg/mugi-hub.png";

export const Menu = () => {
  const history = useHistory();
  const [showLinks, setShowLinks] = useState({});

  const onShowLinks = (id) => {
    setShowLinks({
      ...showLinks,
      [id]: !showLinks[id],
    });
  };

  const handleSubMenuClick = (itemId, itemIndex) => {
    switch (itemId) {
      case 1:
        switch (itemIndex) {
          case 1:
            history.push("/compras/compras-de-hoy");
            break;
          default:
            history.push("/compras");
            break;
        }
        break;
      case 2:
        switch (itemIndex){
          case 1:
          console.log(itemId, itemIndex);
          break;
          default:
            history.push('/registro-de-clientes')
            break;
        }
        break;
      default:
        console.log(itemId);
        break;
    }
  };

  return (
    <nav className="menu">
      <div className="logo-mugi-hub">
        <img src={logo} alt="" />
      </div>
      <ul className="links-container">
        {items.map((item) => {
          const isExpanded = !!showLinks[item.id];

          return (
            <li
              key={item.titulo}
              className="title-links"
              onClick={() => onShowLinks(item.id)}
            >
              <span
                className={
                  isExpanded && item.submenu ? "title-style" : "title-no-style"
                }
              >
                {item.titulo}
              </span>

              {isExpanded && item.submenu && (
                <ul className="sub-links-container">
                  {item.submenu.map((sm, index) => {
                    return (
                      <li
                        key={index}
                        className="sub-links"
                        onClick={() => handleSubMenuClick(item.id, index)}
                      >
                        <span>{sm}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
