/**
 * 파일 시스템 유틸리티
 */
import fs from 'fs';

/**
 * 파일이 존재하지 않으면 생성
 * @param {string} filePath - 파일 경로
 * @param {string} defaultContent - 기본 내용
 */
export function ensureFile(filePath, defaultContent = '{}') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultContent, 'utf-8');
  }
}

/**
 * JSON 파일 읽기
 * @param {string} filePath - 파일 경로
 * @returns {Object} 파싱된 JSON 객체
 */
export function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`Failed to read ${filePath}, returning empty object`);
    return {};
  }
}

/**
 * JSON 파일 쓰기
 * @param {string} filePath - 파일 경로
 * @param {Object} data - 저장할 데이터
 */
export function writeJsonFile(filePath, data) {
  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonString, 'utf-8');
}
