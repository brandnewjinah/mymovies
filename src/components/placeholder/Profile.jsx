import React from "react";
import styled from "styled-components";
import { breakpoint, neutral } from "../token";

const Profile = () => {
  return (
    <Container>
      <Section>
        <div className="title" />
        <div className="paragraph" />
        <div className="paragraph" />
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
    background-color: ${neutral[200]};
    margin: 0.5em auto;
  }

  .paragraph {
    width: 80%;
    height: 1em;
    background-color: ${neutral[200]};
    margin: 0.5em auto;
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

    @media ${breakpoint.m} {
      padding-top: 50%;
    }
  }

  @media ${breakpoint.m} {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1em;
  }
`;

export default Profile;
