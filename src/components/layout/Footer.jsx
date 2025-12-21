import * as S from './Footer.styles';

export default function Footer() {
  return (
    <S.FooterContainer>
      <S.FooterContent>
        <S.Copyright>© 2025 Macro Dashboard. All rights reserved.</S.Copyright>
        <S.RightSection>
          <S.Contact>
            문의: <S.EmailLink href="mailto:dhslrl321@gmail.com">dhslrl321@gmail.com</S.EmailLink>
          </S.Contact>
          <S.CoffeeButton
            href="https://buymeacoffee.com/dhslrl321"
            target="_blank"
            rel="noopener noreferrer"
          >
            ☕ Buy me a coffee
          </S.CoffeeButton>
        </S.RightSection>
      </S.FooterContent>
    </S.FooterContainer>
  );
}
