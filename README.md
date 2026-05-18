# jamsil

출근길에 한눈에 보는 매크로 지표 · 시장 지수 · 대표 ETF 대시보드.

## 컨셉

- 차트는 직접 그리지 않는다. 기성 서비스(FRED, TradingView)가 훨씬 잘 그린다.
- 사용자가 매일 아침 보고 싶은 정보만 빠르게 보여주고, 자세한 차트는 외부 링크로 이동.
- 지수/ETF는 **전일 대비 %**, **전주 대비 %**만 표시.
- 매크로 지표는 최신값과 발표일자, 전월 대비 변화량.

## 섹션

1. **매크로 지표** (FRED 월간 발표)
   - 연방기금금리, 장단기 금리차, CPI, Core CPI, 비농업 고용자수, 실업률

2. **시장 지수** (FRED daily)
   - S&P 500, NASDAQ Composite, Dow Jones, VIX, 10Y Treasury, DXY

3. **대표 ETF** (TradingView 링크)
   - SPY, QQQ, DIA, IWM, TLT, HYG, GLD, USO, XLK, XLF, XLE, SOXX

## 빠른 시작

```bash
npm install
npm run update-data   # FRED에서 최신 데이터 수집
npm run dev
npm run build
```

## 기술 스택

- React 19 + Vite
- styled-components
- 데이터 소스: FRED API
- 자동 수집: GitHub Actions
- 배포: GitHub Pages

## 데이터 갱신 주기

매주 월요일 GitHub Actions가 `npm run update-data`를 실행하여 `public/data.json` 갱신.

## 라이선스

MIT
