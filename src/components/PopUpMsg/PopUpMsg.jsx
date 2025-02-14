import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./PopUpMsg.module.css";

function PopUpMsg({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={styles.popupContainer}>
      <div className={`${styles.popup} ${styles[type]}`} role="alert">
        <p>{message}</p>
      </div>
    </div>
  );
}

PopUpMsg.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error", "info", "warning"]),
  onClose: PropTypes.func.isRequired,
};

export default PopUpMsg;
