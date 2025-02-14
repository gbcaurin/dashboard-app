import styles from "./login.module.css";

function Login() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.formHeader}>
              <img src="/images/Rectangular_Logo.png" alt="logo" />
            </div>
            <div className={styles.inputGroup}>
              <input type="email" id="email" autoComplete="off" />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className={styles.inputGroup}>
              <input type="password" id="password" autoComplete="off" />
              <label htmlFor="password">Senha</label>
            </div>
            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </form>
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.text}>Não possui conta? Faça o</h3>
          <a href="/signUp" className={styles.link}>
            Sign Up
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
