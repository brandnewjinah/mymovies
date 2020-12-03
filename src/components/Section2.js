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

const Container = styled.div``;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 25px;
`;

const Grid2 = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 25px;
`;
