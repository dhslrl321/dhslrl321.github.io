/**
 * FRED API 클라이언트
 */

const FRED_BASE_URL = 'https://api.stlouisfed.org/fred';

export class FredApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * 현재 날짜를 YYYY-MM-DD 형식으로 반환
   */
  getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * FRED API에서 시계열 데이터 가져오기
   * @param {string} seriesId - 시리즈 ID (예: 'FEDFUNDS')
   * @param {string} observationStart - 시작 날짜 (YYYY-MM-DD)
   * @param {string|null} frequency - 빈도 ('d', 'w', 'm', 'q', 'a' 또는 null)
   * @returns {Promise<Object>} FRED API 응답
   */
  async fetchSeriesObservations(seriesId, observationStart, frequency = null) {
    const observationEnd = this.getTodayDate();

    let url = `${FRED_BASE_URL}/series/observations?series_id=${seriesId}&api_key=${this.apiKey}&file_type=json&observation_start=${observationStart}&observation_end=${observationEnd}`;

    if (frequency) {
      url += `&frequency=${frequency}`;
    }

    console.log(`  Requesting data from ${observationStart} to ${observationEnd}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`FRED API request failed for ${seriesId}: ${response.status}`);
    }

    return response.json();
  }

  /**
   * 여러 시리즈의 데이터를 배치로 가져오기
   * @param {Array<Object>} seriesList - 시리즈 목록
   * @returns {Promise<Array<Object>>} 결과 배열
   */
  async fetchMultipleSeries(seriesList) {
    const results = [];

    for (const series of seriesList) {
      try {
        console.log(`Fetching ${series.seriesId}...`);

        const payload = await this.fetchSeriesObservations(
          series.seriesId,
          series.observationStart,
          series.frequency
        );

        const observations = payload.observations || [];
        const latestObservation = observations[observations.length - 1];

        console.log(`  Latest data point: ${latestObservation?.date || 'N/A'}`);
        console.log(`  Total observations: ${observations.length}`);

        results.push({
          seriesId: series.seriesId,
          seriesName: series.seriesName,
          observationStart: series.observationStart,
          frequency: series.frequency,
          payload,
          success: true,
        });

        console.log(`✓ Successfully fetched ${series.seriesId}\n`);
      } catch (error) {
        console.error(`✗ Failed to fetch ${series.seriesId}:`, error.message, '\n');

        results.push({
          seriesId: series.seriesId,
          seriesName: series.seriesName,
          success: false,
          error: error.message,
        });
      }
    }

    return results;
  }
}
