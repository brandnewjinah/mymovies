import React from "react";
import PropTypes from "prop-types";

//import styles and assets
import styled from "styled-components";

export const Section = ({ children, title }) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <Grid>{children}</Grid>
    </Container>
  );
};

export const Section2 = ({ children, title }) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <Grid2>{children}</Grid2>
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Section2.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const Container = styled.div`
  margin: 2em auto;

  @media (max-width: 1200px) {
    /* margin: 2em; */
  }
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const Grid = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* grid-auto-rows: 1fr; */
  grid-gap: 2em;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2em;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2em;
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2em;
  }
`;

const Grid2 = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 2em;
  padding: 0 2em;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2em;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2em;
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2em;
  }
`;
