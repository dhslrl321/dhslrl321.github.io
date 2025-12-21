import styled from 'styled-components';
import Navbar from './NavigationBar';
import Footer from './Footer';

export default function Layout({ children, activeTab, onTabChange }) {
  return (
    <Container>
      <Header>
        <Title>🌍 Macro Dashboard</Title>
      </Header>

      <Navbar activeTab={activeTab} onTabChange={onTabChange} />

      <Main>{children}</Main>

      <Footer />
    </Container>
  );
}

/* ---------- Styles ---------- */

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Header = styled.header`
  padding: 28px 0 10px 0;

  @media (max-width: 768px) {
    padding: 20px 0 8px 0;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 20px 0 60px;

  @media (max-width: 768px) {
    padding: 16px 0 40px;
  }
`;
