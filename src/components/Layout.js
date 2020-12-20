import React from "react";

import Header from "./Header";

//import styles and assets
import styled from "styled-components";
import { primary } from "./Colors";

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
  background: ${primary.beige};
`;

export default Layout;
