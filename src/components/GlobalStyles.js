import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};

    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Source+Serif+Pro:wght@300;400;600;700&display=swap');

    a {
        text-decoration: none;
        color: inherit;
    }
    * {
        box-sizing: border-box;
    }
    body {
        font-family: 'Poppins', sans-serif;
        font-size: 12px;
        /* background-color: rgba(20, 20, 20, 1); */
        background-color: #fff;
        color: #172d6e;
        padding-top: 50px; 
    }
`;

export default globalStyles;
