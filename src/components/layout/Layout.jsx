import styled from 'styled-components';
import Navbar from './NavigationBar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <Container>
      <Header>
        <Title>🌍 Macro Dashboard</Title>
      </Header>

      <Navbar />

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
`;

const Header = styled.header`
  padding: 28px 0 10px 0;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px 0 60px;
`;
