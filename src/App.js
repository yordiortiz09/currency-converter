// src/App.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Box, AppBar, IconButton } from '@mui/material';
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

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const renderSection = () => {
    switch (currentSection) {
      case 'Inicio':
        return <CurrencyConverter />;
      case 'Divisas':
        return <CurrencyManager />;
      case 'Empresas':
        return <CompanyManager />;
      default:
        return <CurrencyConverter />;
    }
  };

  return (
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

      {/* Drawer configurado como temporary */}
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
    </Box>
  );
};

export default App;
