import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { breakpoint, size } from "../token";

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Main = styled.main`
  width: 100%;
  max-width: ${size.xlg};
  padding-top: calc(4rem + 2rem);
  padding-bottom: 62px;
  margin: 0 auto;

  @media ${breakpoint.lg} {
    padding-top: 4rem;
  }
`;

export default Layout;
