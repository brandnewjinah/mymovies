import React from "react";
import PropTypes from "prop-types";

//import styles and assets
import styled from "styled-components";

const Section = ({ children }) => {
  return (
    <Container>
      <Grid>{children}</Grid>
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const Container = styled.div``;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  /* grid-template-columns: repeat(auto-fill, 125px); */
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 25px;
`;

export default Section;
