import React from "react";

import Header from "./Header";

//import styles and assets
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <div>{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  /* background-color: #fff6f5; */
`;

export default Layout;
