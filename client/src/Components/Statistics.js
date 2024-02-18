import React, { useEffect, useState } from "react";

const Statistics = () => {
  const API = "http://localhost:8000/transactions";
  const [data, setData] = useState([]);
  const [selectMonth, setSelectMonth] = useState("");
  const [totalSale, setTotalSale] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);

  useEffect(() => {
    fetchDataFromDB();
  }, []);

  useEffect(() => {
    calculateStatistics();
  }, [data, selectMonth]);

  const fetchDataFromDB = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateStatistics = () => {
    if (!data || data.length === 0) return;

   
    const filteredData = selectMonth
      ? data.filter(transaction => transaction.dateOfSale.substring(5, 7) === selectMonth)
      : data;

    
    let totalSale = 0;
    let totalSoldItems = 0;
    let totalNotSoldItems = 0;

    filteredData.forEach(transaction => {
      totalSale += transaction.price;
      if (transaction.sold) {
        totalSoldItems++;
      } else {
        totalNotSoldItems++;
      }
    });

    setTotalSale(totalSale.toFixed(2));
    setTotalSoldItems(totalSoldItems);
    setTotalNotSoldItems(totalNotSoldItems);
  };

  return (
    <div className="mt-5">
      <div className="flex justify-center items-center gap-10">
        <div className="text-xl font-semibold ">Statistics</div>
        <div>
          <select
            value={selectMonth}
            onChange={(e) => setSelectMonth(e.target.value)}
            className="bg-[#F5F5F5] p-2 border-2 border-gray-400 font-semibold rounded-md"
          >
            <option value="">All Months</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <div className="mt-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[400px] text-xl h-[300px] p-5 m-auto font-semibold">
        <div>Total Sale: {totalSale}</div>
        <div>Total Sold Items: {totalSoldItems}</div>
        <div>Total Not Sold Items: {totalNotSoldItems}</div>
      </div>
    </div>
  );
};

export default Statistics;
