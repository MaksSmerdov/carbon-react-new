import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Bitter", sans-serif',
  },
  palette: {
    primary: {
      main: '#1b5e20', 
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f', 
      contrastText: '#ffffff',
    },
  },
});
