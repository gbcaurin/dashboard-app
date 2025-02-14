import styles from "./signup.module.css";

function SignUp() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.formHeader}>
              <img src="/images/Rectangular_Logo.png" alt="logo" />
            </div>
            <div className={styles.inputGroup}>
              <input type="text" id="name" autoComplete="off" />
              <label htmlFor="name">Nome</label>
            </div>
            <div className={styles.inputGroup}>
              <input type="email" id="email" autoComplete="off" />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className={styles.inputGroup}>
              <input type="password" id="password" autoComplete="off" />
              <label htmlFor="password">Senha</label>
            </div>
            <div className={styles.inputGroup}>
              <input type="password" id="confirmPassword" autoComplete="off" />
              <label htmlFor="confirmPassword">Confirmar Senha</label>
            </div>
            <button type="submit" className={styles.submitButton}>
              Criar conta
            </button>
          </form>
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.text}>Já possui conta? Faça o</h3>
          <a href="/" className={styles.link}>
            Login
          </a>
        </div>
      </div>
    </>
  );
}

export default SignUp;
