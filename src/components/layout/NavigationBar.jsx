import * as S from './NavigationBar.styles';

const NAV_ITEMS = [
  { id: 'macro', label: '경제 지표' },
  { id: 'market', label: '시장 데이터' },
  {
    id: 'kb-think',
    label: '시장 동향 분석',
    url: 'https://kbthink.com/investment/trend.html',
    isExternal: true,
  },
];

export default function NavigationBar({ activeTab, onTabChange }) {
  return (
    <S.Nav>
      {NAV_ITEMS.map((item) =>
        item.isExternal ? (
          <S.NavItem
            key={item.id}
            as="a"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.label}
          </S.NavItem>
        ) : (
          <S.NavItem
            key={item.id}
            as="button"
            className={activeTab === item.id ? 'active' : ''}
            onClick={() => onTabChange(item.id)}
          >
            {item.label}
          </S.NavItem>
        )
      )}

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
