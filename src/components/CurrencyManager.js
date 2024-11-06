// src/components/CurrencyManager.js
import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const CurrencyManager = ({ currencies, onAddCurrency }) => {
  const [newCurrency, setNewCurrency] = useState('');
  const [newCurrencyValue, setNewCurrencyValue] = useState('');
  const [search, setSearch] = useState('');

  const handleAddCurrency = () => {
    const currencyCode = newCurrency.trim().toUpperCase();
    const currencyValue = parseFloat(newCurrencyValue);
    
    if (currencyCode && currencyValue > 0 && !currencies.some(({ code }) => code === currencyCode)) {
      onAddCurrency({ code: currencyCode, value: currencyValue });
      setNewCurrency('');
      setNewCurrencyValue('');
    } else {
      alert("La moneda ya existe o el valor no es válido.");
    }
  };

  const filteredCurrencies = currencies.filter(({ code }) =>
    code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Divisas
      </Typography>
      
      <TextField
        label="Buscar Divisa"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
        <List>
          {filteredCurrencies.map(({ code, value }) => (
            <ListItem key={code}>
              <ListItemText primary={`${code} - ${value} MXN`} />
            </ListItem>
          ))}
        </List>
      </Paper>
      
      <TextField
        label="Código de Nueva Divisa"
        fullWidth
        margin="normal"
        value={newCurrency}
        onChange={(e) => setNewCurrency(e.target.value)}
        helperText="Ejemplo: USD, EUR, JPY"
      />
      <TextField
        label="Valor en MXN"
        type="number"
        fullWidth
        margin="normal"
        value={newCurrencyValue}
        onChange={(e) => setNewCurrencyValue(e.target.value)}
        helperText="Ejemplo: 18.50"
      />
      
      <Button variant="contained" onClick={handleAddCurrency} fullWidth sx={{ mt: 2 }}>
        Agregar Divisa
      </Button>
    </Box>
  );
};

export default CurrencyManager;
