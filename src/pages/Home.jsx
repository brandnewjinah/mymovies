import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//token
import { primaryColors, size, breakpoint, fontSize } from "../components/token";

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <p>
          Rate movies you've watched. Get a personalized movie profile. Get
          recommendations based on your watch history.
        </p>
        <Links>
          <Link to="/movies/rate" className="main">
            Start rating
          </Link>
          <Link to="/movies/demoprofile" className="sub">
            See a demo profile
          </Link>
        </Links>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

  p {
    font-size: 3.5rem;
    line-height: 3.75rem;
    font-weight: 600;
    hyphens: auto;
  }

  @media ${breakpoint.m} {
    padding: 0 2rem;

    p {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }
  }
`;

const Links = styled.nav`
  text-decoration: underline;
  margin: 2rem 0;
  cursor: pointer;

  a {
    font-weight: 600;
    display: block;
    margin: 1rem 0;
  }

  .main {
    font-size: ${fontSize.lg3};
  }

  .sub {
    font-size: ${fontSize.lg1};
  }
`;

export default Home;
