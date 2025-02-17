import styles from "./navbar.module.css";
import PropTypes from "prop-types";

function Navbar({ user }) {
  return (
    <div className={styles.navbar}>
      <h1>Bem-vindo, {user?.displayName || "Usuário"}</h1>{" "}
      <button className={styles.logout}>Sair</button>
    </div>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
  displayName: PropTypes.string,
};

export default Navbar;
