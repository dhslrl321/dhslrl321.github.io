import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    /* Reset */
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    /* 기본 폰트 + 전체 무드 */
    body {
        font-family: -apple-system, BlinkMacSystemFont, BlinkMacSystemFont,
        "Pretendard", system-ui, "Segoe UI", Helvetica, Arial, sans-serif;

        background-color: #f5f7fb;  /* 토스 느낌의 밝고 깨끗한 배경 */
        color: #1a1d23;             /* 진하고 선명한 텍스트 색 */

        -webkit-font-smoothing: antialiased;
    }

    /* headings 기본 세팅 */
    h1, h2, h3, h4, h5 {
        margin: 0;
        font-weight: 600;
        color: #1a1d23;
    }

    p {
        margin: 0;
        line-height: 1.6;
    }

    a {
        text-decoration: none;
        color: #2563eb;   /* 밝은 블루 포인트 */
    }

    /* 가벼운 스크롤바 스타일 */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background: #d4d8e0;
        border-radius: 4px;
    }
`;
