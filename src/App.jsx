import { useState } from 'react';
import Dashboard from './pages/Dashboard.jsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyles';
import Layout from './components/layout/Layout.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('market');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        <Dashboard activeTab={activeTab} />
      </Layout>
    </ThemeProvider>
  );
}
