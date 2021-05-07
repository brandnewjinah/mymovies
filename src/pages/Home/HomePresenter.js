import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

//import styles and assets
import styled, { css } from "styled-components";
import { breakpoint, size, primaryColors } from "../../components/Token";

const HomePresenter = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>My Movies</title>
      </Helmet>
      <Container>
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
      </Container>
    </Wrapper>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  ${Flex}
  width: 100vw;
  min-height: 100vh;
  background: ${primaryColors.beige};
`;

const Container = styled.main`
  width: 100%;
  max-width: ${size.xlg};
  color: ${primaryColors.blue};
  padding: 0 2em;
  margin: 0 auto;

  h1 {
    hyphens: auto;
  }

  @media ${breakpoint.m} {
    padding: 0 4em;
  }
`;

const Links = styled.div`
  text-decoration: underline;
  margin: 2em 0;
  cursor: pointer;

  a {
    display: block;
    margin: 1em 0;
  }
`;

export default HomePresenter;
