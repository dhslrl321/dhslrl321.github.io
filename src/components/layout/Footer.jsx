import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>© 2025 Macro Dashboard. All rights reserved.</Copyright>
        <Contact>
          문의: <EmailLink href="mailto:dhslrl321@gmail.com">dhslrl321@gmail.com</EmailLink>
        </Contact>
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
