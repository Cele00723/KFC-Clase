import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import Header from './layouts/Header';
import PedidosProvider from './providers/PedidosProvider';
import FormularioPedido from './components/FormularioPedido';
import TablaPedidos from './components/TablaPedidos';

function App() {
  return (
    <PedidosProvider>
      <Header title="KFCMac - Registro de Órdenes a Cocina" />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Lado Izquierdo: Formulario */}
          <Grid item xs={12} md={5}>
            <FormularioPedido />
          </Grid>

          {/* Lado Derecho: Tabla de Pedidos */}
          <Grid item xs={12} md={7}>
            <TablaPedidos />
          </Grid>
        </Grid>
      </Container>
    </PedidosProvider>
  );
}

export default App;