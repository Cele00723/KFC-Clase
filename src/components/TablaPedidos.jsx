import React, { useContext } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood'; // Ícono para Combo
import LunchDiningIcon from '@mui/icons-material/LunchDining'; // Ícono para Hamburguesa
import PedidosContext from '../providers/context';

function TablaPedidos() {
  const { pedidos } = useContext(PedidosContext);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Pedidos Ingresados
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Nombre del Cliente</strong></TableCell>
              <TableCell><strong>Total de Compra</strong></TableCell>
              <TableCell align="center"><strong>Tipo</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No hay pedidos ingresados aún.
                </TableCell>
              </TableRow>
            ) : (
              pedidos.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell>{pedido.nombreCliente}</TableCell>
                  {/* Formato de dinero con $ a la izquierda */}
                  <TableCell>${pedido.total.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                      {pedido.tipoPedido === 'Combo' ? (
                        <>
                          <FastfoodIcon color="warning" />
                          <span>Combo</span>
                        </>
                      ) : (
                        <>
                          <LunchDiningIcon color="action" />
                          <span>Solo Hamburguesa</span>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TablaPedidos;