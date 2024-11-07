// src/components/CompanyManager.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, Paper, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

const CompanyManager = ({ companies, onAddCompany, onDeleteCompany }) => {
  const [companyName, setCompanyName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrEditCompany = () => {
    const trimmedName = companyName.trim();
    if (!trimmedName) {
      alert("Por favor ingresa un nombre de empresa válido.");
      return;
    }

    if (editingIndex !== null) {
      companies[editingIndex] = trimmedName;
      setEditingIndex(null);
    } else {
      onAddCompany(trimmedName);
    }

    setCompanyName('');
  };

  const handleEditCompany = (index) => {
    setEditingIndex(index);
    setCompanyName(companies[index]);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setCompanyName('');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: '#f4f6f8' }}>
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

      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleAddOrEditCompany} 
          fullWidth
          sx={{ fontWeight: 'bold' }}
        >
          {editingIndex !== null ? "Guardar Cambios" : "Agregar Empresa"}
        </Button>
        
        {editingIndex !== null && (
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleCancelEdit} 
            sx={{ fontWeight: 'bold' }}
          >
            Cancelar
          </Button>
        )}
      </Box>

      <Paper variant="outlined" sx={{ maxHeight: 300, overflowY: 'auto', mt: 3, p: 1 }}>
        {companies.length > 0 ? (
          <List>
            {companies.map((company, index) => (
              <Box key={index}>
                <ListItem
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
                {index < companies.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            No hay empresas registradas.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CompanyManager;
