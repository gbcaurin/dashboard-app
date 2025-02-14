import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <p>Carregando...</p>;
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
