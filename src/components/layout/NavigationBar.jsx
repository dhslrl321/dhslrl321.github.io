import * as S from './NavigationBar.styles';

const NAV_ITEMS = [
  { id: 'market', label: '시장 데이터', isExternal: false },
  { id: 'recent', label: '경제 지표', isExternal: false },
  {
    id: 'kb-think',
    label: '시장 동향 분석',
    url: 'https://kbthink.com/investment/trend.html',
    isExternal: true,
  },
];

export default function NavigationBar({ activeTab, onTabChange }) {
  const handleClick = (e, item) => {
    if (item.isExternal) return;
    e.preventDefault();
    onTabChange(item.id);
  };

  return (
    <S.Nav>
      {NAV_ITEMS.map((item) => (
        <S.NavItem
          key={item.id}
          href={item.url || '#'}
          className={activeTab === item.id ? 'active' : ''}
          onClick={(e) => handleClick(e, item)}
          target={item.isExternal ? '_blank' : undefined}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
        >
          {item.label}
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
