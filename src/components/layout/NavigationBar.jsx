import * as S from './NavigationBar.styles';

const TABS = [
  { id: 'market', label: '시장 · 매크로' },
  { id: 'ticker', label: '티커 분석' },
];

export default function NavigationBar({ activeTab, onTabChange }) {
  return (
    <S.Nav>
      {TABS.map(tab => (
        <S.NavItem
          key={tab.id}
          as="button"
          className={activeTab === tab.id ? 'active' : ''}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </S.NavItem>
      ))}

      <S.CoffeeButton
        href="https://buymeacoffee.com/dhslrl321"
        target="_blank"
        rel="noopener noreferrer"
      >
        ☕ Buy me a coffee
      </S.CoffeeButton>
    </S.Nav>
  );
}
