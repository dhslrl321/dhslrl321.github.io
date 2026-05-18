import * as S from './NavigationBar.styles';

const NAV_ITEMS = [
  {
    id: 'kb-think',
    label: '시장 동향 분석',
    url: 'https://kbthink.com/investment/trend.html',
  },
  {
    id: 'fred',
    label: 'FRED',
    url: 'https://fred.stlouisfed.org/',
  },
  {
    id: 'tradingview',
    label: 'TradingView',
    url: 'https://www.tradingview.com/',
  },
];

export default function NavigationBar() {
  return (
    <S.Nav>
      {NAV_ITEMS.map(item => (
        <S.NavItem key={item.id} as="a" href={item.url} target="_blank" rel="noopener noreferrer">
          {item.label} ↗
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
