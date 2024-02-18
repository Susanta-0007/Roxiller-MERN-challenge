import React, { useEffect, useState } from "react";

const Transactions = () => {
  const API = "http://localhost:8000/transactions";
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectMonth, setSelectMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchDataFromDB();
  }, []);

  const fetchDataFromDB = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setData(data);
      filterData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    filterData(data);
  }, [searchTerm, selectMonth, data, currentPage, itemsPerPage]);

  const filterData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredResults = data
      .filter(
        (d) =>
          (selectMonth === "" ||
            d.dateOfSale.substring(5, 7) === selectMonth) &&
          (d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.price.toString().includes(searchTerm) ||
            d.category.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .slice(startIndex, endIndex);
    setFilteredData(filteredResults);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex gap-5 pb-2 justify-around mt-5 ">
        <div className="flex w-[300px] border-[#E4E4E4] border-2 p-2 rounded-md">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none border-none"
            type="text"
            placeholder="Search"
          />
        </div>
        <div>
          <select
            value={selectMonth}
            onChange={(e) => setSelectMonth(e.target.value)}
            className="bg-[#F5F5F5] p-2 border-1 rounded-md"
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
      <div>
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-md leading-5 text-[#050505] ">
              <th className="px-6 py-3 text-left font-medium">ID</th>
              <th className="px-6 py-3 text-left font-medium">Title</th>
              <th className="px-6 py-3 text-left font-medium">Description</th>
              <th className="px-6 py-3 text-left font-medium">Price</th>
              <th className="px-6 py-3 text-left font-medium">Category</th>
              <th className="px-6 py-3 text-left font-medium">Sold</th>
              <th className="px-6 py-3 text-left font-medium">Image</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d) => (
              <tr key={d.id} className="border-b border-gray-200">
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="leading-5 text-gray-900">
                    <p className="text-md font-semibold">{d.id}</p>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900 font-semibold">
                    {d.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900 font-semibold">
                    {d.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                  <div className="text-sm leading-5 text-gray-900 font-semibold">
                    {d.price}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                  <div className="text-sm leading-5 text-gray-900 font-semibold">
                    {d.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                  <div className="text-sm leading-5 text-gray-900 font-semibold">
                    {d.sold ? "SOLD" : "NOT SOLD"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                  <div className="text-sm leading-5 text-gray-900 font-semibold">
                    <img
                      src={d.image}
                      className="h-10 w-10"
                      alt="product-img"
                    />
                    {}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-2 flex justify-center gap-10">
        
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mr-2 bg-gray-200 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={filteredData.length < itemsPerPage}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Transactions;
