// src/components/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, TextField, Select, MenuItem, Typography, Button,
  Card, CardContent, Grid, IconButton, Divider, Paper
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const CurrencyConverter = ({ currencies }) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('MXN');
  const [conversionResult, setConversionResult] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const [historicalData, setHistoricalData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

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

      if (response.data && response.data.rates) {
        const data = Object.keys(response.data.rates).map(date => ({
          date,
          rate: response.data.rates[date][toCurrency] || 0,
        }));
        setHistoricalData(data);
      }
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  const fetchComparisonData = () => {
    const majorCurrencies = ['EUR', 'JPY', 'GBP', 'CAD', 'AUD'];
    const data = majorCurrencies.map(code => ({
      currency: code,
      rate: exchangeRates[code] ? exchangeRates[code].toFixed(2) : null,
    })).filter(item => item.rate !== null);
    setComparisonData(data);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetchComparisonData();
  }, [exchangeRates]);

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        <AttachMoneyIcon fontSize="large" /> Convertidor de Divisas
      </Typography>

      <Paper sx={{ p: 3, mt: 3, mb: 4, borderRadius: 2, bgcolor: '#f9f9f9' }}>
        <Grid container spacing={2} alignItems="center">
          {}
          <Grid item xs={5}>
            <Typography variant="subtitle2" gutterBottom color="textSecondary">Desde</Typography>
            <TextField
              label="Monto"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            >
              {currencies.map(({ code }) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Icono de Cambio de Moneda */}
          <Grid item xs={2} textAlign="center">
            <IconButton onClick={handleSwapCurrencies} sx={{ bgcolor: '#e0f7fa', borderRadius: '50%' }}>
              <SwapHorizIcon />
            </IconButton>
          </Grid>

          {}
          <Grid item xs={5}>
            <Typography variant="subtitle2" gutterBottom color="textSecondary">Hacia</Typography>
            <TextField
              label="Resultado"
              value={conversionResult || '...'}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
              sx={{ mb: 2, bgcolor: '#f1f8e9', fontWeight: 'bold' }}
            />
            <Select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            >
              {currencies.map(({ code }) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Paper>

      <Card variant="outlined" sx={{ mb: 4, bgcolor: '#e8f5e9', borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center">
            {amount} {fromCurrency} = {conversionResult || '...'} {toCurrency}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Tasa de cambio actualizada automáticamente
          </Typography>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h6">
          <CompareArrowsIcon /> Comparación de {fromCurrency} con otras monedas principales
        </Typography>
        {comparisonData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="currency" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No hay datos disponibles para mostrar la comparación.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CurrencyConverter;
