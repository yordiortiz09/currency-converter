// src/components/CurrencySelector.js
import React from 'react';

const CurrencySelector = ({ selectedCurrency, onChangeCurrency, currencies }) => {
  return (
    <select
      className="currency-selector"
      value={selectedCurrency}
      onChange={(e) => onChangeCurrency(e.target.value)}
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
