import React, { useState, useContext } from 'react';
import {
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import PedidosContext from '../providers/context';

function FormularioPedido() {
  const { agregarPedido } = useContext(PedidosContext);

  // Estados del formulario
  const [nombreCliente, setNombreCliente] = useState('');
  const [tipoPedido, setTipoPedido] = useState('Combo');
  const [total, setTotal] = useState('');
  const [medioPago, setMedioPago] = useState('Efectivo');

  // Estado del Toast (Snackbar)
  const [toastOpen, setToastOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones de negocio
    if (!nombreCliente.trim()) {
      setErrorMsg('El nombre del cliente es obligatorio.');
      return;
    }

    const valorTotal = parseFloat(total);
    if (isNaN(valorTotal) || valorTotal <= 0) {
      setErrorMsg('El total debe ser un número mayor a 0.');
      return;
    }

    // Si todo está correcto, agregamos al context
    agregarPedido({
      id: Date.now(),
      nombreCliente: nombreCliente.trim(),
      tipoPedido,
      total: valorTotal,
      medioPago,
    });

    // Limpiar formulario y mostrar toast de éxito
    setNombreCliente('');
    setTipoPedido('Combo');
    setTotal('');
    setMedioPago('Efectivo');
    setErrorMsg('');
    setToastOpen(true);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Ingresar Pedido
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* 1. Nombre del Cliente */}
        <TextField
          label="Nombre del Cliente *"
          variant="outlined"
          fullWidth
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* 2. Tipo de Pedido */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tipo de Pedido</InputLabel>
          <Select
            value={tipoPedido}
            label="Tipo de Pedido"
            onChange={(e) => setTipoPedido(e.target.value)}
          >
            <MenuItem value="Combo">Combo</MenuItem>
            <MenuItem value="Solo Hamburguesa">Solo Hamburguesa</MenuItem>
          </Select>
        </FormControl>

        {/* 3. Total */}
        <TextField
          label="Total ($)"
          type="number"
          variant="outlined"
          fullWidth
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          inputProps={{ min: "0.01", step: "any" }}
          sx={{ mb: 2 }}
        />

        {/* 4. Medio de Pago */}
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <FormLabel component="legend">Medio de Pago</FormLabel>
          <RadioGroup
            row
            value={medioPago}
            onChange={(e) => setMedioPago(e.target.value)}
          >
            <FormControlLabel value="Efectivo" control={<Radio />} label="Efectivo" />
            <FormControlLabel value="Tarjeta" control={<Radio />} label="Tarjeta" />
          </RadioGroup>
        </FormControl>

        {/* Mensaje de error si falla la validación */}
        {errorMsg && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {errorMsg}
          </Typography>
        )}

        {/* 5. Botón Agregar */}
        <Button type="submit" variant="contained" color="primary" fullWidth size="large">
          Agregar Pedido
        </Button>
      </form>

      {/* Toast de Confirmación */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%' }}>
          ¡Pedido ingresado con éxito!
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default FormularioPedido;