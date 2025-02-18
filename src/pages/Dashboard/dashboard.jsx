import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import { PulseLoader } from "react-spinners";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Bar } from "react-chartjs-2";
import { getSalesData } from "../../dataService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedSalesData = localStorage.getItem("salesData");

    if (storedSalesData) {
      setSalesData(JSON.parse(storedSalesData));
    } else {
      const fetchSalesData = async () => {
        const data = await getSalesData();
        setSalesData(data);
        localStorage.setItem("salesData", JSON.stringify(data));
      };
      fetchSalesData();
    }
  }, []);

  const totalSales =
    salesData?.data.reduce((total, item) => total + item.vendas, 0) || 0;
  const totalOrders =
    salesData?.data.reduce((total, item) => total + item.pedidos, 0) || 0;

  const data = {
    labels: salesData?.labels || [],
    datasets: [
      {
        label: "Vendas",
        data: salesData?.data.map((monthData) => monthData.vendas) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <PulseLoader color="#000" size={15} />
      </div>
    );
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
      <div className={styles.container}>
        <Sidebar onToggle={setIsSidebarOpen} />
        <div
          className={`${styles.mainContent} ${
            isSidebarOpen ? styles.contentWithSidebar : styles.contentFull
          }`}
        >
          <h1 className={styles.text}>
            Boas-vindas, {user.displayName || "Usuário"}
          </h1>

          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Total de Vendas</h3>
              <p className={styles.statValue}>R$ {totalSales.toFixed(2)}</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Total de Pedidos</h3>
              <p className={styles.statValue}>{totalOrders}</p>
            </div>
            <div className={styles.graphContainer}>
              <Bar data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
