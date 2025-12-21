import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>© 2025 Macro Dashboard. All rights reserved.</Copyright>
        <RightSection>
          <Contact>
            문의: <EmailLink href="mailto:dhslrl321@gmail.com">dhslrl321@gmail.com</EmailLink>
          </Contact>
          <CoffeeButton
            href="https://buymeacoffee.com/dhslrl321"
            target="_blank"
            rel="noopener noreferrer"
          >
            ☕ Buy me a coffee
          </CoffeeButton>
        </RightSection>
      </FooterContent>
    </FooterContainer>
  );
}

/* ---------- Styles ---------- */

const FooterContainer = styled.footer`
  border-top: 1px solid #e5e7eb;
  padding: 24px 0;
  margin-top: 60px;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const Contact = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const EmailLink = styled.a`
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }
`;

const CoffeeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #ffdd00 0%, #fbb034 100%);
  color: #78350f;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(251, 176, 52, 0.3);

  &:hover {
    background: linear-gradient(135deg, #fbb034 0%, #f59e0b 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(251, 176, 52, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 15px;
  }
`;
