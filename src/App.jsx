import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from './layouts/Header';

function App() {
  return (
    <PedidosProvider> 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Header tittle="Mi Aplicación"/>
    
    </LocalizationProvider>
    </PedidosProvider>
  );
}

export default App;
