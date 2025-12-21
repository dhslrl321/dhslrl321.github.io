# 🌍 Macro Dashboard

경제 거시지표를 수집하고 시각화하는 대시보드입니다.

## 📋 Features

- FRED API를 통한 경제 지표 수집 (연방기금금리 등)
- Recharts를 활용한 데이터 시각화
- GitHub Actions를 통한 자동 데이터 업데이트 (매주 월요일)
- GitHub Pages 자동 배포

## 🚀 Getting Started

### 사전 요구사항

- Node.js 20 이상
- npm

### 설치

```bash
# 저장소 클론
git clone https://github.com/dhslrl321/dhslrl321.github.io.git
cd dhslrl321.github.io

# 의존성 설치
npm install
```

### 데이터 업데이트 및 실행

```bash
npm run update-data

npm run dev
```

## 🔄 자동화

### 데이터 자동 업데이트
- 매주 월요일 00:00 UTC에 GitHub Actions가 자동으로 실행
- FRED API에서 최신 경제 지표 데이터 수집
- `public/data.json` 파일 업데이트 후 자동 커밋

### 자동 배포
- `main` 브랜치에 푸시 시 자동으로 GitHub Pages에 배포
- Vite 빌드 후 `dist` 폴더를 GitHub Pages로 배포

## 🌐 Environment Variables

`.env` 파일에 다음 변수를 설정하세요:

```env
API_KEY=your_fred_api_key_here
```

GitHub Actions에서는 Repository Secrets에 설정:
- `API_KEY`: FRED API 키

## 📊 Data Source

[FRED (Federal Reserve Economic Data)](https://fred.stlouisfed.org/)에서 제공하는 경제 지표를 사용합니다.

현재 수집 중인 지표:
- **FEDFUNDS**: Federal Funds Effective Rate (연방기금금리)
- **T10Y2Y**: 10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant Maturity (장단기 금리차)

## 📝 License

MIT License

## 👤 Author

dhslrl321
