import * as S from './Dashboard.styles';
import MacroSection from '../components/MacroSection/MacroSection.jsx';
import MarketSection from '../components/MarketSection/MarketSection.jsx';
import MddSection from '../components/MddSection/MddSection.jsx';

export default function Dashboard() {
  return (
    <S.Container>
      <MddSection />
      <MarketSection />
      <MacroSection />
    </S.Container>
  );
}
