import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  if (!user) {
    return (
      <>
        <div className={styles.containerUnlogged}>
          <h2 className={styles.titleUnlogged}>Você não está logado!</h2>
          <button
            onClick={() => navigate("/")}
            className={styles.buttonUnlogged}
          >
            Ir para a página de login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h2>Bem-vindo, {user.displayName || "Usuário"}!</h2>
        <p>Email: {user.email}</p>
      </div>
      <button
        onClick={() => {
          auth.signOut();
          navigate("/");
        }}
      >
        Sair
      </button>
    </>
  );
}

export default Dashboard;
