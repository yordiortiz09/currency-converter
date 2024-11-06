// src/components/CurrencyHistory.js
import React, { useEffect, useState } from 'react';
import '../css/CurrencyHistory.css';

const CurrencyHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <div className="currency-history">
      <h3>Conversion History</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.amount} {entry.fromCurrency} to {entry.toCurrency} = {entry.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyHistory;
