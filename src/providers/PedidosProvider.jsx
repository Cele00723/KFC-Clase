import React from 'react'
import PedidosContext from './context';

function PedidosProvider({ children }) {
    
    const [pedidos, setPedidos] = React.useState([]);

    const globalState = {
        pedidos,
        setPedidos
    }

  return (
    <PedidosContext.Provider value={globalState}>
      {children}
    </PedidosContext.Provider>

  )
}

export default PedidosProviderchildren
