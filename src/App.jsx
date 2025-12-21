import Dashboard from './pages/Dashboard.jsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyles';
import Layout from './components/layout/Layout.jsx';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
}
