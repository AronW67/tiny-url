import './App.css';
import UrlCard from './components/UrlCard';
import { ThemeProvider, createTheme } from '@mui/material';

/**
 * Creates MUI theme to override primary and secondary colours
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#0081a7',
    },
    secondary: {
      main: '#00afb9',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <h1>Free Url Shortener</h1>
        <UrlCard />
      </main>
    </ThemeProvider>
  )
}

export default App
