// src/components/AppHeader.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AppHeader = ({ onAddCurrency }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Convertidor de Divisas
        </Typography>
        <IconButton color="inherit" onClick={onAddCurrency}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
