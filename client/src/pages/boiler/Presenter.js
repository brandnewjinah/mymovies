import React from "react";

//redux
import { connect } from "react-redux";

//import styles and assets
import styled from "styled-components";

const Presenter = () => {
  return (
    <Container>
      <Content>
        <h1>h1 Headline 1</h1>
        <h2>h2 Headline 2</h2>
        <h3>h3 Headline 3</h3>
        <h4>h4 Headline 4</h4>
        <h5>h5 Headline 5</h5>
        <h6>h6 Headline 6</h6>
        <p>paragraph is 1rem that equals to 16px</p>
      </Content>
      <Material>
        <h1>h1 Headline 1</h1>
        <h2>h2 Headline 2</h2>
        <h3>h3 Headline 3</h3>
        <h4>h4 Headline 4</h4>
        <h5>h5 Headline 5</h5>
        <h6>h6 Headline 6</h6>
        <p>paragraph is 1rem that equals to 16px</p>
      </Material>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 7em auto;
`;

const Content = styled.div`
  margin: 2em 0;

  @media (max-width: 780px) {
    h1 {
      font-size: 2.15rem;
      line-height: 2.35rem;
    }

    h3 {
      font-size: 1.65rem;
    }

    h6 {
      font-size: 1.125rem;
      line-height: 1.5rem;
    }
  }
`;

const Material = styled.div`
  margin: 2em 0;

  h1 {
    font-size: 5.8125rem;
  }

  h2 {
    font-size: 3.625rem;
  }

  h3 {
    font-size: 2.875rem;
  }

  h4 {
    font-size: 2.0625rem;
  }

  h5 {
    font-size: 1.4375rem;
  }

  h6 {
    font-size: 1.1875rem;
  }

  p {
    font-size: 0.9375rem;
  }
`;

export default Presenter;
