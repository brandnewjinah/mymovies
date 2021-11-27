import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

//import styles and assets
import styled, { css } from "styled-components";
import {
  breakpoint,
  size,
  primaryColors,
  spacing,
} from "../../components/Token";

const HomePresenter = () => {
  return (
    <Container>
      <Helmet>
        <title>My Movies</title>
      </Helmet>
      <Wrapper>
        <h1>
          Rate movies you've watched. Get a personalized movie profile. Get
          recommendations based on your watch history.
        </h1>
        <Links>
          <Link to="/rate">
            <h3>Start rating</h3>
          </Link>
          <Link to="/demoprofile">
            <h6>See a demo profile</h6>
          </Link>
        </Links>
      </Wrapper>
    </Container>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  ${Flex}
  width: 100vw;
  min-height: 100vh;
  background: ${primaryColors.beige};
`;

const Wrapper = styled.main`
  width: 100%;
  max-width: ${size.xlg};
  color: ${primaryColors.blue};
  padding: 0 ${spacing.xxxl};
  margin: 0 auto;

  h1 {
    hyphens: auto;
  }

  @media ${breakpoint.m} {
    padding: 0 ${spacing.xxl};
  }
`;

const Links = styled.div`
  text-decoration: underline;
  margin: ${spacing.xxl} 0;
  cursor: pointer;

  a {
    display: block;
    margin: ${spacing.m} 0;
  }
`;

export default HomePresenter;
