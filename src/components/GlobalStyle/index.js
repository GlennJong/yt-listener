import { createGlobalStyle, keyframes } from 'styled-components';
import { color } from '../../constant/color';
const fontFamily = `'Pingfang TC', '微軟正黑體', 'Microsoft JhengHei', sans-serif`;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: ${fontFamily};
        font-weight: 400;
        font-size: 16px;
        background: ${color.dark};
    }
    #app {
        display: flex;
        flex-direction: column;
    }
    ul {
        padding-inline-start: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        list-style-type: none;
    }
    a {
        text-decoration: none;
        cursor: pointer;
        color: currentColor;
    }
    button {
        outline: none;
        cursor: pointer;
    }
    dd {
        margin-inline-start: 0;
    }

    h1, h2, h3, h4, p {
        margin: 0;
        padding: 0;
    }

    input, textarea, select, button, a {
        font-family: ${fontFamily};
        font-weight: 400;
        font-size: 14px;
    }
`

export default GlobalStyle;
