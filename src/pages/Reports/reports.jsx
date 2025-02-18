import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "/src/firebaseConfig.js";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./reports.module.css";
import { PulseLoader } from "react-spinners";
import { getSalesData } from "../../dataService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(
    JSON.parse(localStorage.getItem("chartData")) || null
  );
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
      setChartData(JSON.parse(storedSalesData));
    } else {
      getSalesData().then((data) => {
        setChartData(data);
        localStorage.setItem("chartData", JSON.stringify(data));
      });
    }
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <PulseLoader color="#000" size={15} />
      </div>
    );
  }

  if (!user) {
    localStorage.removeItem("chartData");
    return (
      <div className={styles.containerUnlogged}>
        <h2 className={styles.titleUnlogged}>Você não está logado!</h2>
        <button onClick={() => navigate("/")} className={styles.buttonUnlogged}>
          Ir para a página de login
        </button>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className={styles.loading}>
        <PulseLoader color="#000" size={15} />
      </div>
    );
  }

  const dataLine = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Vendas Mensais",
        data: chartData.data.map((item) => item.vendas),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Relatório de Vendas" },
    },
    scales: {
      x: { title: { display: true, text: "Mês" } },
      y: { title: { display: true, text: "Vendas" } },
    },
  };

  const dataBar = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Novos Usuários",
        data: chartData.data.map((item) => item.usuarios),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  const optionsBar = { responsive: true };

  const dataBar2 = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Produtos Vendidos",
        data: chartData.data.map((item) => item.produtos),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  const dataBarTransactions = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Transações",
        data: chartData.data.map((item) => item.transacoes),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Sidebar onToggle={setIsSidebarOpen} />
      <div
        className={`${styles.mainContent} ${
          isSidebarOpen ? styles.contentWithSidebar : styles.contentFull
        }`}
      >
        <div className={styles.graphDiv}>
          <h2 className={styles.graphTitle}>Vendas Mensais</h2>
          <Line data={dataLine} options={optionsLine} />
        </div>
        <div className={styles.graphDiv}>
          <h2 className={styles.graphTitle}>Novos Usuários</h2>
          <Bar data={dataBar} options={optionsBar} />
        </div>
        <div className={styles.graphDiv}>
          <h2 className={styles.graphTitle}>Produtos Vendidos</h2>
          <Bar data={dataBar2} options={optionsBar} />
        </div>
        <div className={styles.graphDiv}>
          <h2 className={styles.graphTitle}>Transações</h2>
          <Bar data={dataBarTransactions} options={optionsBar} />
        </div>
      </div>
    </div>
  );
}

export default Reports;
