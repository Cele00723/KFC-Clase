---
name: scaffold-react-mui-bootstrap
description: >-
  Use this skill when the user asks to scaffold, initialize, or generate a new project or module based on the React + MUI + Bootstrap hybrid architecture specified in SPEC.md.
---

# Scaffold React + MUI + Bootstrap Architecture

This skill automates the creation and setup of a new React project using Material UI (MUI) and Bootstrap 5 (Grid and Utilities only), configuring dependencies, project structure, and base setup.

> **Regla de Ejecución**: Solo instalar dependencias, configurar estilos e inicializar la estructura de carpetas y el esqueleto base (`App.jsx` y `Header.jsx`). **NO** crear formularios, vistas ni contenedores con lógica de negocio prefabricada (como `ItemForm`, `ItemView`, `ItemsContainer`).

---

## Workflow Steps

### 1. Verify Working Directory & Existing Files
Ensure you are in the target root folder for the new project.
If starting in an empty directory or initializing a new Vite app:
- Verify if `package.json` already exists.
- If not, initialize a new React project with Vite.

### 2. Scaffold Vite + React (if not already initialized)
Run the Vite scaffolding tool:
```bash
npm create vite@latest . -- --template react
```
*(On Windows environments where powershell script execution may be restricted, execute via `cmd.exe /c "npm create vite@latest . -- --template react"`).*

### 3. Install Required Dependencies
Install the exact dependency suite required by the hybrid architecture:

```bash
# Core MUI & Emotion Engine
npm install @mui/material @emotion/react @emotion/styled @fontsource/roboto

# MUI Date Pickers & Dayjs
npm install @mui/x-date-pickers dayjs

# Bootstrap (Grid & Utilities only)
npm install bootstrap
```

### 4. Configure Selective CSS Imports
Ensure full Bootstrap CSS is **NEVER** imported. Edit or create `src/index.css` with the selective imports:

```css
@import '@fontsource/roboto/300.css';
@import '@fontsource/roboto/400.css';
@import '@fontsource/roboto/500.css';
@import '@fontsource/roboto/700.css';
@import 'bootstrap/dist/css/bootstrap-grid.min.css';
@import 'bootstrap/dist/css/bootstrap-utilities.min.css';
```
*(Remove default Vite `src/App.css` if present to prevent CSS conflicts).*

### 5. Setup Project Folder Structure
Create the standard directory layout:
- `src/components/` (Presentational / Dumb components - created empty)
- `src/containers/` (Smart / Stateful components & event handlers - created empty)
- `src/layouts/` (Global headers, footers, navbars)
- `src/assets/` (Static image and vector assets)

### 6. Create Base Templates (Minimal Shell)

#### A. Global Layout (`src/layouts/Header.jsx`)
```jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header({ title = 'Mi Aplicación' }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
```

#### B. Root Application Provider (`src/App.jsx`)
Wrap the application tree in MUI's `LocalizationProvider` configured with `AdapterDayjs` and an empty container skeleton:
```jsx
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from './layouts/Header';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Header />
      <main className="container mt-4">
        {/* Los componentes y contenedores se añadirán aquí según los requerimientos */}
      </main>
    </LocalizationProvider>
  );
}

export default App;
```

> **Nota**: No generar `ItemForm.jsx`, `ItemView.jsx` ni `ItemsContainer.jsx`. El usuario definirá los componentes y vistas según los requerimientos específicos de su aplicación.

### 7. Copy SPEC.md
Ensure a copy of `SPEC.md` exists in the root of the new project for ongoing reference and AI compliance.
