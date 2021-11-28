import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

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
  padding-bottom: 62px;
`;

export default Layout;
