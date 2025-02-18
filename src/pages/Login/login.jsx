import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../firebaseConfig";
import PopUpMsg from "../../components/PopUpMsg/PopUpMsg";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Logado com sucesso! Redirecionando...");
      setMsgType("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      setMessage(error.message);
      setMsgType("error");
    }
  };

  const handleClose = () => {
    setMessage("");
    setMsgType("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <img src="/images/Rectangular_Logo.png" alt="logo" />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="email">E-mail</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
            <label htmlFor="password">Senha</label>
          </div>
          <button type="submit" className={styles.submitButton}>
            Acessar minha conta
          </button>
        </form>
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.text}>Não possui conta? </h3>
        <a href="/signUp" className={styles.link}>
          Cadastre-se
        </a>
      </div>
      {message && (
        <PopUpMsg message={message} type={msgType} onClose={handleClose} />
      )}
    </div>
  );
}

export default Login;
