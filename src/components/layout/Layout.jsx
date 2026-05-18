import * as S from './Layout.styles';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <S.Container>
      <S.Header>
        <S.Title>jamsil</S.Title>
        <S.Tagline>출근길에 확인하는 매크로 · 시장 대시보드</S.Tagline>
      </S.Header>

      <NavigationBar />

      <S.Main>{children}</S.Main>

      <Footer />
    </S.Container>
  );
}
