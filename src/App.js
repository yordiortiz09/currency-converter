// src/App.js
import React, { useState, useEffect } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Toolbar, Typography, Box, AppBar, IconButton, Snackbar, Alert
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessIcon from '@mui/icons-material/Business';
import MenuIcon from '@mui/icons-material/Menu';
import CurrencyConverter from './components/CurrencyConverter';
import CurrencyManager from './components/CurrencyManager';
import CompanyManager from './components/CompanyManager';

const App = () => {
  const [currentSection, setCurrentSection] = useState('Inicio');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [currencies, setCurrencies] = useState([
    { code: 'USD', value: 18.50 },
    { code: 'MXN', value: 1.0 },
    { code: 'EUR', value: 20.50 },
    { code: 'JPY', value: 0.17 },
    { code: 'GBP', value: 23.75 },
    { code: 'CAD', value: 14.75 },
    { code: 'AUD', value: 12.65 },
    { code: 'CHF', value: 19.20 },
    { code: 'CNY', value: 2.80 },
    { code: 'SEK', value: 1.85 },
    { code: 'NZD', value: 11.80 },
    { code: 'SGD', value: 13.50 },
    { code: 'HKD', value: 2.38 },
    { code: 'NOK', value: 1.78 },
    { code: 'KRW', value: 0.015 },
    { code: 'TRY', value: 1.03 },
    { code: 'INR', value: 0.22 },
    { code: 'BRL', value: 3.70 },
    { code: 'ZAR', value: 0.99 },
    { code: 'RUB', value: 0.20 },
    { code: 'DKK', value: 2.75 },
    { code: 'PLN', value: 4.50 },
    { code: 'THB', value: 0.53 },
    { code: 'IDR', value: 0.0013 },
    { code: 'HUF', value: 0.055 },
    { code: 'CZK', value: 0.85 }
  ]);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#388E3C', 
      },
      secondary: {
        main: '#388E3C', 
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 'bold',
            borderRadius: 8,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: '#4CAF50',
          },
        },
      },
    },
  });

  useEffect(() => {
    const savedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    setCompanies(savedCompanies);
  }, []);

  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleAddCurrency = (newCurrency) => {
    setCurrencies([...currencies, newCurrency]);
    showNotification("Divisa agregada exitosamente");
  };

  const handleAddCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
    showNotification("Empresa agregada exitosamente");
  };

  const handleDeleteCompany = (companyToDelete) => {
    setCompanies(companies.filter(company => company !== companyToDelete));
    showNotification("Empresa eliminada exitosamente");
  };

  const showNotification = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'Inicio':
        return <CurrencyConverter currencies={currencies || []} />;
      case 'Divisas':
        return <CurrencyManager currencies={currencies || []} onAddCurrency={handleAddCurrency} />;
      case 'Empresas':
        return <CompanyManager 
                  companies={companies} 
                  onAddCompany={handleAddCompany} 
                  onDeleteCompany={handleDeleteCompany} 
               />;
      default:
        return <CurrencyConverter currencies={currencies || []} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Convertidor de Divisas
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': { width: 240 },
          }}
        >
          <Toolbar />
          <List>
            <ListItem button onClick={() => { setCurrentSection('Inicio'); handleDrawerToggle(); }}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button onClick={() => { setCurrentSection('Divisas'); handleDrawerToggle(); }}>
              <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
              <ListItemText primary="Divisas" />
            </ListItem>
            <ListItem button onClick={() => { setCurrentSection('Empresas'); handleDrawerToggle(); }}>
              <ListItemIcon><BusinessIcon /></ListItemIcon>
              <ListItemText primary="Empresas" />
            </ListItem>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {renderSection()}
        </Box>

        {/* Snackbar para notificaciones */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default App;
