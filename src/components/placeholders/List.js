import React from "react";

//import styles
import styled from "styled-components";
import { primary } from "../Colors";

const List = () => {
  return (
    <Container>
      <Section>
        <div className="title" />
        <Slider>
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
        </Slider>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Section = styled.div`
  margin: 2em 0;

  .title {
    width: 40%;
    height: 1em;
    background-color: ${primary.grayblue};
    margin: 0 auto;
  }
`;

const Slider = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;
  margin: 1em 0;

  .poster {
    width: 100%;
    height: 0;
    padding-top: 150%;
    background-color: ${primary.grayblue};

    &:first-child {
      margin-left: 0;
    }

    @media (max-width: 640px) {
      padding-top: 50%;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1em;
  }
`;

export default List;
