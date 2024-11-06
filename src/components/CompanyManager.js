// src/components/CompanyManager.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CompanyManager = ({ companies, onAddCompany, onDeleteCompany }) => {
  const [companyName, setCompanyName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // Para rastrear qué empresa se está editando

  const handleAddOrEditCompany = () => {
    const trimmedName = companyName.trim();
    if (!trimmedName) {
      alert("Por favor ingresa un nombre de empresa válido.");
      return;
    }

    if (editingIndex !== null) {
      // Modo edición
      onDeleteCompany(companies[editingIndex]); // Primero elimina la empresa anterior
      onAddCompany(trimmedName); // Luego agrega la empresa editada
      setEditingIndex(null);
    } else {
      // Modo agregar
      onAddCompany(trimmedName);
    }

    setCompanyName('');
  };

  const handleEditCompany = (index) => {
    setEditingIndex(index);
    setCompanyName(companies[index]);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 3, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Gestión de Empresas
      </Typography>
      
      <TextField
        label="Nombre de la Empresa"
        fullWidth
        margin="normal"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        helperText={editingIndex !== null ? "Editando empresa seleccionada" : "Ingresa el nombre de la empresa que deseas agregar"}
      />
      
      <Button 
        variant="contained" 
        onClick={handleAddOrEditCompany} 
        fullWidth 
        sx={{ mt: 2, mb: 2 }}
      >
        {editingIndex !== null ? "Guardar Cambios" : "Agregar Empresa"}
      </Button>
      
      <Paper variant="outlined" sx={{ maxHeight: 200, overflowY: 'auto', p: 2 }}>
        {companies.length > 0 ? (
          <List>
            {companies.map((company, index) => (
              <ListItem
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingY: 1,
                }}
              >
                <ListItemText primary={company} />
                <Box>
                  <IconButton color="primary" onClick={() => handleEditCompany(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDeleteCompany(company)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary" align="center">
            No hay empresas registradas.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CompanyManager;
