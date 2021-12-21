import React from "react";
import PropTypes from "prop-types";

//import styles and assets
import styled from "styled-components";

const Section = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
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

const Container = styled.div`
  /* margin: 60px 10px; */
  /* margin: 0 auto;
  width: 100%;
  max-width: 1260px; */
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
`;

export default Section;
