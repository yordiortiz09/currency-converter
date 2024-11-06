// src/components/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Select, MenuItem, Typography
} from '@mui/material';

const CurrencyConverter = ({ currencies }) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('MXN');
  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    const fromValue = currencies.find(currency => currency.code === fromCurrency)?.value || 1;
    const toValue = currencies.find(currency => currency.code === toCurrency)?.value || 1;
    setConversionResult((amount * toValue / fromValue).toFixed(2));
  }, [amount, fromCurrency, toCurrency, currencies]);

  return (
    <Box sx={{ bgcolor: '#f4f6f8', p: 3, maxWidth: 400, mx: 'auto', mt: 5, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Convertidor de Divisas
      </Typography>
      <TextField
        label="Monto"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        fullWidth
        displayEmpty
        sx={{ mb: 2 }}
      >
        {currencies.map(({ code }) => (
          <MenuItem key={code} value={code}>
            {code}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        fullWidth
        displayEmpty
        sx={{ mb: 2 }}
      >
        {currencies.map(({ code }) => (
          <MenuItem key={code} value={code}>
            {code}
          </MenuItem>
        ))}
      </Select>
      {conversionResult && (
        <Typography variant="h6" align="center" sx={{ mt: 2, mb: 2 }}>
          {amount} {fromCurrency} = {conversionResult} {toCurrency}
        </Typography>
      )}
    </Box>
  );
};

export default CurrencyConverter;
