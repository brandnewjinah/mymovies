import React from "react";
import styled from "styled-components";

import { breakpoint, neutral } from "../token";

const Detail = () => {
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
        </Slider>
      </Section>
      <Section>
        <div className="title" />
        <Slider>
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
        </Slider>
      </Section>
      <Section>
        <div className="title" />
        <Slider>
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
  /* max-width: 1140px; */

  @media ${breakpoint.m} {
  }
`;

const Section = styled.div`
  margin: 2em 0;

  .test {
  }

  .title {
    width: 40%;
    height: 1em;
    background-color: ${neutral[200]};
  }

  @media ${breakpoint.m} {
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
    background-color: ${neutral[200]};

    &:first-child {
      margin-left: 0;
    }
  }

  @media ${breakpoint.m} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;
  }
`;

export default Detail;
