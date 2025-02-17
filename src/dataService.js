export const getSalesData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateRandomData());
    }, 1000);
  });
};

const generateRandomData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = months.map(() => ({
    vendas: getRandomNumber(1000, 5000),
    pedidos: getRandomNumber(50, 200),
    usuarios: getRandomNumber(10, 50),
    produtos: getRandomNumber(500, 3000),
    transacoes: getRandomNumber(1000, 10000),
  }));

  return {
    labels: months,
    data: data,
  };
};

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
