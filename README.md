# 🌍 Swoop (숲) - 실시간 경제지표 대시보드

연방기금금리, 장단기 금리차, VIX 등 주요 경제지표를 실시간으로 한눈에 확인하세요.

## ✨ 주요 기능

- 📊 **실시간 경제 지표**: FRED API를 통한 최신 데이터 수집
- 📈 **인터랙티브 차트**: Recharts 기반의 시각화
- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- 🔄 **자동 업데이트**: GitHub Actions로 매주 자동 데이터 수집
- 💡 **지표 설명**: 각 경제 지표에 대한 상세 설명 제공

## 🎯 수집 지표

### 경제 지표
- **FEDFUNDS**: 연방기금금리
- **T10Y2Y**: 장단기 금리차 (10년물 - 2년물)

### 시장 데이터
- **VIXCLS**: VIX 변동성 지수

## 🚀 빠른 시작

```bash
# 패키지 설치
npm install

# 데이터 수집
npm run update-data

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 📁 프로젝트 구조

자세한 구조는 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)를 참고하세요.

```
src/
├── config/           # 설정 (경제 지표 메타데이터)
├── utils/            # 유틸리티 함수
├── hooks/            # 커스텀 훅
├── components/       # React 컴포넌트
│   ├── DataCard/     # 차트 카드
│   ├── SummarySection/  # 요약 섹션
│   └── layout/       # 레이아웃
├── pages/            # 페이지 컴포넌트
└── styles/           # 전역 스타일
```

## 🔧 새로운 지표 추가하기

1. `src/config/seriesConfig.js`에 지표 설정 추가
2. `scripts/update-data.js`에 FRED API 수집 설정 추가
3. `npm run update-data` 실행

자세한 방법은 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md#-새로운-지표-추가-방법)를 참고하세요.

## 🛠️ 기술 스택

- **Framework**: React 18 + Vite
- **Styling**: Styled Components
- **Charts**: Recharts
- **Data Source**: FRED API (Federal Reserve Economic Data)
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📊 데이터 수집

- **주기**: 매주 월요일 자동 수집
- **방법**: GitHub Actions + FRED API
- **저장**: `public/data.json`

## 📈 Google Analytics

방문자 통계를 Google Analytics 4로 추적합니다.
- 측정 ID: G-M8HSLXGFMW

## 🔍 SEO

- Sitemap: `https://dhslrl321.github.io/sitemap.xml`
- Robots.txt: 검색엔진 크롤링 허용
- Structured Data: JSON-LD 스키마 적용

## 📝 라이선스

MIT License

## 🤝 기여

이슈 및 PR은 언제나 환영합니다!

## ☕ 후원

이 프로젝트가 도움이 되셨나요?
[Buy me a coffee](https://buymeacoffee.com/dhslrl321)

## 📧 문의

dhslrl321@gmail.com
