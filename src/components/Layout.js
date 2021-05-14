import React from "react";

import Header from "./Header";

//import styles and assets
import styled from "styled-components";
import { primaryColors, spacing, typeScale } from "./Token";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <div>{children}</div>
      <Footer>footer</Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  /* background-color: #fff6f5; */
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  background-color: ${primaryColors.lightblue};
  font-size: ${typeScale.helper};
  padding: ${spacing.m} 0;
`;

export default Layout;
