import React, { useEffect, useState } from "react";

const Statistics = () => {
  const API = "http://localhost:8000/statistics";
  const [statistics, setStatistics] = useState({});
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");

  useEffect(() => {
    fetchDataFromDB();
  }, [selectMonth, selectYear]);

  const fetchDataFromDB = async () => {
    try {
      if (!selectMonth || !selectYear) return;

      const url = `${API}/${selectYear}/${selectMonth}`;
      const response = await fetch(url);
      const data = await response.json();

      setStatistics(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        <div>
          <select
            value={selectYear}
            onChange={(e) => setSelectYear(e.target.value)}
            className="bg-[#F5F5F5] p-2 border-2 border-gray-400 font-semibold rounded-md"
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            {/* Add options for other years */}
          </select>
        </div>
      </div>
      <div className="mt-5 border-2 border-green-300 rounded-xl  w-[400px] h-[300px] m-auto text-xl text-center pt-10 font-semibold">
        <div>Total Sale Amount: {statistics.totalSaleAmount}</div>
        <div>Total Sold Items: {statistics.totalSoldItems}</div>
        <div>Total Not Sold Items: {statistics.totalNotSoldItems}</div>
      </div>
    </div>
  );
};

export default Statistics;
