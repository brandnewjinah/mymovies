import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

//token
import { primaryColors, size, breakpoint } from "../../components/token";

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <h1>
          Rate movies you've watched. Get a personalized movie profile. Get
          recommendations based on your watch history.
        </h1>

        <Links>
          <Link to="/movies/rate">
            <h3>Start rating</h3>
          </Link>
          <Link to="/movies/demoprofile">
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
  padding: 0 4rem;
  margin: 0 auto;

  h1 {
    hyphens: auto;
  }

  @media ${breakpoint.m} {
    padding: 0 2rem;
  }
`;

const Links = styled.div`
  text-decoration: underline;
  margin: 2rem 0;
  cursor: pointer;

  a {
    display: block;
    margin: 1rem 0;
  }
`;

export default Home;
