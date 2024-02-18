import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from './Components/Transactions';
import Statistics from './Components/Statistics';
import Barchart from './Components/Barchart';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/transactions' element={<Transactions/>} />
        <Route path='/statistics' element={<Statistics/>} />
        <Route path='/barchart' element={<Barchart/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App