// scripts/update-data.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '..', 'public', 'data.json');
const FRED_API_KEY = process.env.API_KEY || '089008ad0f401bb844a1e4adf24ad2bb';
const FRED_BASE_URL = 'https://api.stlouisfed.org/fred';

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '{}', 'utf-8');
}

function readJson() {
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function writeJson(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

async function fetchFredData(seriesId, observationStart, frequency = null) {
  let url = `${FRED_BASE_URL}/series/observations?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&observation_start=${observationStart}`;
  
  if (frequency) {
    url += `&frequency=${frequency}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`FRED API request failed for ${seriesId}: ${res.status}`);
  return res.json();
}

async function main() {
  ensureFile();
  const data = readJson();

  // 수집할 시리즈 목록
  const seriesToFetch = [
    {
      seriesId: 'FEDFUNDS',
      seriesName: 'Federal Funds Effective Rate',
      observationStart: '2015-06-01',
      frequency: null,
    },
    {
      seriesId: 'T10Y2Y',
      seriesName: '10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant Maturity',
      observationStart: '2015-06-01',
      frequency: 'm', // monthly
    },
  ];

  for (const series of seriesToFetch) {
    try {
      console.log(`Fetching ${series.seriesId}...`);
      const payload = await fetchFredData(
        series.seriesId,
        series.observationStart,
        series.frequency
      );

      // series_id를 키로 사용하여 데이터 저장/업데이트
      data[series.seriesId] = {
        id: crypto.randomUUID(),
        seriesId: series.seriesId,
        seriesName: series.seriesName,
        fetchedAt: new Date().toISOString(),
        observationStart: series.observationStart,
        frequency: series.frequency,
        payload,
      };

      console.log(`✓ Successfully fetched ${series.seriesId}`);
    } catch (error) {
      console.error(`✗ Failed to fetch ${series.seriesId}:`, error.message);
    }
  }

  writeJson(data);
  console.log(`\nUpdated data.json. Total series: ${Object.keys(data).length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
