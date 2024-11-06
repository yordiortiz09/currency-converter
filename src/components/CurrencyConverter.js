// src/components/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('MXN');
  const [conversionResult, setConversionResult] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencies, setCurrencies] = useState([
    'USD', 'MXN', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK'
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCurrency, setNewCurrency] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const result = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        setExchangeRates(result.data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (exchangeRates[toCurrency]) {
      const result = (amount * exchangeRates[toCurrency]).toFixed(2);
      setConversionResult(result);
    }
  }, [amount, toCurrency, exchangeRates]);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => {
    setDialogOpen(false);
    setNewCurrency('');
  };

  const handleAddCurrency = () => {
    const currencyCode = newCurrency.trim().toUpperCase();
    if (currencyCode && !currencies.includes(currencyCode)) {
      setCurrencies([...currencies, currencyCode]);
      closeDialog();
    } else if (currencies.includes(currencyCode)) {
      alert("La moneda ya existe.");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#f4f6f8',
        p: 3,
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
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
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
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
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
      {conversionResult && (
        <Typography variant="h6" align="center" sx={{ mt: 2, mb: 2 }}>
          {amount} {fromCurrency} = {conversionResult} {toCurrency}
        </Typography>
      )}
      <Button
        variant="contained"
        fullWidth
        onClick={openDialog}
        sx={{ mt: 2 }}
      >
        Agregar Moneda
      </Button>

      {/* Dialogo para agregar nueva moneda */}
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Agregar Nueva Moneda</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Código de Moneda"
            fullWidth
            value={newCurrency}
            onChange={(e) => setNewCurrency(e.target.value)}
            helperText="Ejemplo: USD, EUR, JPY"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancelar</Button>
          <Button onClick={handleAddCurrency} variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CurrencyConverter;
