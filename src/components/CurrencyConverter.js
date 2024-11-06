// src/components/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, TextField, Select, MenuItem, Typography, Button,
  Card, CardContent, CardActions, Grid, IconButton
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const CurrencyConverter = ({ currencies }) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('MXN');
  const [conversionResult, setConversionResult] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const result = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        setExchangeRates(result.data.rates);
        console.log("Exchange rates:", result.data.rates); // Verificar que las tasas de cambio se configuren
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
      console.log("Conversion result:", result); // Verificar que el resultado de la conversión se calcule
    }
  }, [amount, toCurrency, exchangeRates]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fetchHistoricalData = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
      const startStr = startDate.toISOString().split('T')[0];
      const endStr = endDate.toISOString().split('T')[0];

      const response = await axios.get(`https://api.exchangerate.host/timeseries`, {
        params: {
          start_date: startStr,
          end_date: endStr,
          base: fromCurrency,
          symbols: toCurrency,
        }
      });

      // Verificar que los datos se recibieron correctamente
      console.log("Response data:", response.data);

      if (response.data && response.data.rates) {
        const data = Object.keys(response.data.rates).map(date => ({
          date,
          rate: response.data.rates[date][toCurrency] || 0,
        }));
        
        setHistoricalData(data);
        console.log("Historical data set:", data);
      } else {
        console.error("No se encontraron datos históricos.");
      }
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [fromCurrency, toCurrency]);

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        <AttachMoneyIcon fontSize="large" /> Convertidor de Divisas
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
          <TextField
            label="Monto"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ bgcolor: '#f9f9f9', borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={2} textAlign="center">
          <IconButton onClick={handleSwapCurrencies} sx={{ bgcolor: '#e0f7fa', borderRadius: '50%' }}>
            <SwapHorizIcon />
          </IconButton>
        </Grid>

        <Grid item xs={5}>
          <Select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            fullWidth
            sx={{ bgcolor: '#f9f9f9', borderRadius: 2 }}
          >
            {currencies.map(({ code }) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={5}>
          <Select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            fullWidth
            sx={{ bgcolor: '#f9f9f9', borderRadius: 2 }}
          >
            {currencies.map(({ code }) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ mt: 3, bgcolor: '#e8f5e9', borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center">
            {amount} {fromCurrency} = {conversionResult || '...'} {toCurrency}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Conversión actualizada automáticamente
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5, fontWeight: 'bold' }}
          >
            Convertir
          </Button>
        </CardActions>
      </Card>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">
          <TrendingUpIcon /> Tendencia de Cambio (últimos 7 días)
        </Typography>
        {historicalData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="rate" />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No hay datos disponibles para mostrar el gráfico.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CurrencyConverter;
