import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyles';
import Layout from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('macro');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        <Dashboard activeTab={activeTab} />
      </Layout>
    </ThemeProvider>
  );
}
