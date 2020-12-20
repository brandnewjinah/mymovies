import React from "react";
import { useHistory } from "react-router-dom";

//redux
import { connect } from "react-redux";

//import styles and assets
import styled from "styled-components";
import { primary } from "../../components/Colors";

const HomePresenter = () => {
  const history = useHistory();

  const handleNext = () => {
    history.push("/rate");
  };

  return (
    <Wrapper>
      <Container>
        <div>
          <h1>
            Rate movies you've watched. Get a personalized analyser. Get
            recommendations based on your watch history.
          </h1>
          <div className="start" onClick={handleNext}>
            <h2>Start rating</h2>
          </div>
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
  padding: 2em 6em;
  margin: 0 auto;

  h1 {
    font-size: 5rem;
    line-height: 1em;
    hyphens: auto;
  }

  h2 {
    font-size: 2.8rem;
    line-height: 1em;
  }

  .start {
    margin: 2em 0;
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: 940px) {
    padding: 2em 4em;
  }

  @media (max-width: 680px) {
    padding: 2em;

    h1 {
      font-size: 2.6rem;
      line-height: 1.2em;
    }

    h2 {
      font-size: 1.6rem;
      line-height: 1em;
    }
  }
`;

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, null)(HomePresenter);
