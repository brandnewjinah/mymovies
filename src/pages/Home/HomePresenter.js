import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { primary } from "../../components/Colors";

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

        <div className="start">
          <Link to="/rate">
            <h3>Start rating</h3>
          </Link>
          <Link to="/demoprofile">
            <h6>See a demo profile</h6>
          </Link>
        </div>
      </Container>
    </Wrapper>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(Flex)`
  width: 100vw;
  min-height: 100vh;
  background: ${primary.beige};
`;

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  color: ${primary.blue};
  padding: 0 4em;
  margin: 0 auto;

  h1 {
    hyphens: auto;
  }

  .start {
    margin: 2em 0;
    text-decoration: underline;
    cursor: pointer;

    h6 {
      margin: 1em 0;
    }
  }

  @media (max-width: 780px) {
    padding: 2em;

    h1 {
      font-size: 2.15rem;
      line-height: 2.35rem;
    }

    h3 {
      font-size: 1.65rem;
    }
  }
`;

export default HomePresenter;
