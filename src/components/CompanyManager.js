// src/components/CompanyManager.js
import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CompanyManager = () => {
  const [companies, setCompanies] = useState([{ id: 1, name: "Empresa A" }]);
  const [newCompany, setNewCompany] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAddCompany = () => {
    if (newCompany) {
      setCompanies([...companies, { id: Date.now(), name: newCompany }]);
      setNewCompany('');
    }
  };

  const handleEditCompany = (id) => {
    const updatedCompanies = companies.map(company =>
      company.id === id ? { ...company, name: editName } : company
    );
    setCompanies(updatedCompanies);
    setEditId(null);
    setEditName('');
  };

  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Empresas</Typography>
      <TextField
        label="Nueva Empresa"
        fullWidth
        margin="normal"
        value={newCompany}
        onChange={(e) => setNewCompany(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddCompany} fullWidth>
        Agregar Empresa
      </Button>

      <List>
        {companies.map((company) => (
          <ListItem key={company.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => { setEditId(company.id); setEditName(company.name); }}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteCompany(company.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText
              primary={editId === company.id ? (
                <TextField
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleEditCompany(company.id)}
                />
              ) : (
                company.name
              )}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CompanyManager;
