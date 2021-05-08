import { createGlobalStyle } from "styled-components";
import { breakpoint, typeScale, typeScaleMobile } from "./Token";
import { black } from "./Colors";

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
        color: ${black.dark}
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
        font-size: 2rem;
        line-height: 2rem;
    }
    h5 {
        font-weight: 600;
        font-size: 1.5rem;
        line-height: 1.5rem;
    }
    h6 {
        font-weight: 500;
        font-size: ${typeScale.header6};
        line-height: ${typeScale.header6};
    }
    
    /* h2 {
        font-weight: 600;
        font-size: 3.75rem;
        line-height: 3.75rem;
    }
    h3 {
        font-weight: 600;
        font-size: 2.875rem;
        line-height: 2.875rem;
    }
    h4 {
        font-weight: 600;
        font-size: 2rem;
        line-height: 2rem;
    }
    h5 {
        font-weight: 600;
        font-size: 1.5rem;
        line-height: 1.5rem;
    }
    h6 {
        font-weight: 500;
        font-size: 1.25rem;
        line-height: 1.25rem;
    } */
    ul {
        list-style-position: inside;
        list-style-type: none;
        text-indent:-20px;
    }
    li {
        margin-left: 20px;
        margin-right: 20px;
    }
    a {
        /* display: inline-block; */
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
    code {
        font-size: 1.125rem;
        background-color: #edf2f7;
        padding: 0 .5rem;
    }

    @media ${breakpoint.m} {
    h1 {
        font-weight: 600;
        font-size: ${typeScaleMobile.header1};
        line-height: ${typeScaleMobile.header1};
    }
    h2 {
        font-weight: 600;
        font-size: ${typeScaleMobile.header2};
        line-height: ${typeScaleMobile.header2};
    }
    h3 {
        font-weight: 600;
        font-size: ${typeScaleMobile.header3};
        line-height: ${typeScaleMobile.header3};
    }
    h6 {
        font-weight: 500;
        font-size: ${typeScaleMobile.header6};
        line-height: ${typeScaleMobile.header6};
    } 
        
    }
`;

export default GlobalStyle;
