import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --bg: #0d1117;
        --bg-elev: #11161e;
        --card: #161b22;
        --card-hover: #1c232d;
        --border: #2a2f3a;
        --border-soft: #21262d;
        --text: #e6edf3;
        --text-2: #9aa4b2;
        --text-3: #6e7681;
        --accent: #58a6ff;
        --accent-strong: #1f6feb;
        --up: #ff7b72;        /* 상승 (한국식 빨강) */
        --up-bg: rgba(255, 123, 114, 0.14);
        --down: #58a6ff;      /* 하락 (파랑) */
        --down-bg: rgba(88, 166, 255, 0.14);
        --flat: #8b949e;
        --flat-bg: #21262d;
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Pretendard", system-ui,
            "Segoe UI", Helvetica, Arial, sans-serif;
        background-color: var(--bg);
        color: var(--text);
        -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5 {
        margin: 0;
        font-weight: 700;
        color: var(--text);
    }

    p {
        margin: 0;
        line-height: 1.6;
    }

    a {
        text-decoration: none;
        color: var(--accent);
    }

    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    ::-webkit-scrollbar-track {
        background: var(--bg);
    }

    ::-webkit-scrollbar-thumb {
        background: #2a2f3a;
        border-radius: 5px;
        border: 2px solid var(--bg);
    }
`;
