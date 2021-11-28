import { createGlobalStyle } from "styled-components";
import { typeScale, neutral } from "./token";

const GlobalStyle = createGlobalStyle`
 * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html {
        width: 100%;
        height: 100%;
    }
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: white;
        font-size: 1rem;
        line-height: 1.875rem;
        font-weight: 400;
        color: ${neutral[700]}
    }
    h1 {
        font-weight: 600;
        font-size: ${typeScale.header1};
        line-height: ${typeScale.header1};
        }
        h2 {
        font-weight: 600;
        font-size: ${typeScale.header2};
        line-height: ${typeScale.header2};
    }
    h3 {
        font-weight: 600;
        font-size: ${typeScale.header3};
        line-height: ${typeScale.header3};
    }
    h4 {
        font-weight: 600;
        font-size: ${typeScale.header4};
        line-height: ${typeScale.header4};
    }
    h5 {
        font-weight: 500;
        font-size: ${typeScale.header5};
        line-height: ${typeScale.header5};
    }
    h6 {
        font-weight: 500;
        font-size: ${typeScale.header6};
        line-height: ${typeScale.header6};
    }
    a {
        text-decoration: none;
        text-decoration-skip-ink: auto;
        color: inherit;
        cursor: pointer;
        transition: opacity 0.2s ease-in-out;
 
        &:hover,
        &:focus {
          outline: 0;
          opacity: 0.75;
        }
    }
`;

export default GlobalStyle;
