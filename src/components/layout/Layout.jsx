import * as S from './Layout.styles';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

export default function Layout({ children, activeTab, onTabChange }) {
  return (
    <S.Container>
      <S.Header>
        <S.Title>🌍 Macro Dashboard</S.Title>
      </S.Header>

      <NavigationBar activeTab={activeTab} onTabChange={onTabChange} />

      <S.Main>{children}</S.Main>

      <Footer />
    </S.Container>
  );
}
