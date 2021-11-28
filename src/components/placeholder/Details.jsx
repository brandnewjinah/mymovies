import React from "react";
import styled from "styled-components";
import { breakpoint, neutral } from "../token";

const Detail = () => {
  return (
    <Container>
      <Main>
        <Data>
          <div className="title" />
          <div className="sub" />
          <div className="overview">
            <p></p>
            <p></p>
            <p></p>
          </div>
          <Slider>
            <div className="poster" />
            <div className="poster" />
            <div className="poster" />
            <div className="poster" />
            <div className="poster" />
          </Slider>
        </Data>
        <ImageContainer>
          <div className="image"></div>
        </ImageContainer>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 10em auto 0;

  @media ${breakpoint.m} {
    padding: 0;
    margin: 5em auto;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${breakpoint.m} {
    flex-direction: column;
    padding: 0 1.5em;
  }
`;

const ImageContainer = styled.div`
  width: 40%;

  .image {
    width: 100%;
    height: 0;
    padding-top: 150%;
    background-color: ${neutral[200]};
  }

  @media ${breakpoint.m} {
    order: 1;
    width: 100%;

    .image {
      width: 100%;
    }
  }
`;

const Data = styled.div`
  width: 60%;
  font-size: 0.875rem;
  padding-right: 5%;

  .title {
    width: 40%;
    height: 1.5em;
    background-color: ${neutral[200]};
    margin: 0.75em 0;
  }

  .sub {
    width: 70%;
    height: 1em;
    background-color: ${neutral[200]};
    margin: 0.75em 0;
  }

  .overview {
    margin: 2em 0;

    p {
      width: 90%;
      height: 1em;
      background-color: ${neutral[200]};
      margin: 0.75em 0;

      &:last-child {
        width: 80%;
      }
    }
  }

  @media ${breakpoint.m} {
    width: 100%;
    order: 2;
    margin: 0;
    padding: 1em 0;

    .title {
      width: 50%;
    }

    .overview {
      margin: 2em 0;

      p {
        width: 100%;

        &:last-child {
          width: 80%;
        }
      }
    }
  }
`;

const Slider = styled.div`
  display: flex;
  margin: 3em 0;

  .poster {
    width: 7em;
    height: 9em;
    background-color: ${neutral[200]};
    margin: 0 0.5em;

    &:first-child {
      margin-left: 0;
    }
  }

  @media ${breakpoint.m} {
    .poster {
      height: 7em;
    }
  }
`;

export default Detail;
