import * as S from './Layout.styles';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <S.Container>
      <S.Header>
        <S.Title>🌍 Swoop 경제 숲</S.Title>
      </S.Header>

      <NavigationBar />

      <S.Main>{children}</S.Main>

      <Footer />
    </S.Container>
  );
}
