import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styles from "./signup.module.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert("Usuário criado com sucesso!");
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
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
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              placeholder=" "
            />
            <label htmlFor="name">Nome</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              placeholder=" "
            />
            <label htmlFor="email">E-mail</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              placeholder=" "
            />
            <label htmlFor="password">Senha</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              placeholder=" "
            />
            <label htmlFor="confirmPassword">Confirmar Senha</label>
          </div>
          {error && <p className={styles.error}>{error}</p>}
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
  );
}

export default SignUp;
