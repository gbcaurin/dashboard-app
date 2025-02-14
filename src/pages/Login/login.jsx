import { useState } from "react";
import { auth } from "../../firebaseConfig";
import styles from "./login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      alert("Logado com sucesso!");
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form className={styles.form}>
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
              />
              <label htmlFor="password">Senha</label>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button
              type="submit"
              className={styles.submitButton}
              onClick={handleSubmit}
            >
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
      </div>
    </>
  );
}

export default Login;
