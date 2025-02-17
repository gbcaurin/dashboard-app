import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import PropTypes from "prop-types";
import styles from "./sidebar.module.css";
import { BiMenuAltLeft } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { ImExit } from "react-icons/im";

function Sidebar() {
  // Estado para controlar se a sidebar está aberta ou fechada
  const [isOpen, setIsOpen] = useState(true);

  // Função para alternar o estado da sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen ? <BiMenuAltLeft size={30} /> : <BiMenu size={30} />}
      </div>

      {isOpen && (
        <div className={styles.menu}>
          <img
            src="/images/Rectangular_Logo.png"
            alt="Logo"
            className={styles.logo}
          />
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/dashboard">Visão Geral</Link>
            </li>
            <li className={styles.item}>
              <Link to="/reports">Relatórios</Link>
            </li>
            {/* <li className={styles.item}>
              <Link to="/settings">Configurações</Link>
            </li> */}
            <li className={styles.itemLogout}>
              <button
                className={styles.logout}
                onClick={() => {
                  auth.signOut();
                }}
              >
                <ImExit />
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.object,
  displayName: PropTypes.string,
};

export default Sidebar;
