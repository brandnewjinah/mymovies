import React from "react";
import PropTypes from "prop-types";

//import styles and assets
import styled from "styled-components";

export const Grid = ({ children, title }) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <Section>{children}</Section>
    </Container>
  );
};

export const Grid2 = ({ children, title }) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <Section2>{children}</Section2>
    </Container>
  );
};

const Container = styled.div`
  margin: 2em auto;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2em;

  @media (max-width: 1092px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2em;
  }

  @media (max-width: 880px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2em;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2em;
  }
`;

const Section2 = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 2em;
  grid-row-gap: 4em;

  /* @media (max-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 2em;
  } */

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

Grid.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Grid2.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
