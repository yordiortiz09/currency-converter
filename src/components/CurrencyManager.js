// src/components/CurrencyManager.js
import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const CurrencyManager = () => {
  const [currencies, setCurrencies] = useState(['USD', 'MXN', 'EUR', 'JPY', 'GBP']);
  const [newCurrency, setNewCurrency] = useState('');
  const [search, setSearch] = useState('');

  const handleAddCurrency = () => {
    if (newCurrency && !currencies.includes(newCurrency.toUpperCase())) {
      setCurrencies([...currencies, newCurrency.toUpperCase()]);
      setNewCurrency('');
    } else {
      alert("La moneda ya existe o no es válida.");
    }
  };

  const filteredCurrencies = currencies.filter(currency =>
    currency.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Divisas</Typography>
      <TextField
        label="Buscar Divisa"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <List>
        {filteredCurrencies.map((currency) => (
          <ListItem key={currency}>
            <ListItemText primary={currency} />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Nueva Divisa"
        fullWidth
        margin="normal"
        value={newCurrency}
        onChange={(e) => setNewCurrency(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddCurrency} fullWidth>
        Agregar Divisa
      </Button>
    </Box>
  );
};

export default CurrencyManager;
