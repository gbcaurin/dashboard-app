import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./sidebar.module.css";

function Sidebar({ user }) {
  return (
    <div className={styles.sidebar}>
      <h3>Bem-vindo, {user?.displayName || "Usuário"}</h3>
      <ul>
        <li>
          <Link to="/dashboard">Visão Geral</Link>
        </li>
        <li>
          <Link to="/reports">Relatórios</Link>
        </li>
        <li>
          <Link to="/settings">Configurações</Link>
        </li>
        <li>
          <button className={styles.logout}>Sair</button>
        </li>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.object,
  displayName: PropTypes.string,
};

export default Sidebar;
