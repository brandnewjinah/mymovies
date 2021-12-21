import React from "react";

//import styles and assets
import styled from "styled-components";
import { breakpoint } from "./token";

export const Grid = ({ children, title }) => {
  return <Section>{children}</Section>;
};

export const Grid2 = ({ children, title }) => {
  return <Section2>{children}</Section2>;
};

const Section = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;
  padding: 2rem 0;

  @media ${breakpoint.xlg} {
    padding: 2rem 1rem;
  }

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }

  @media ${breakpoint.m} {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2rem;
  }
`;

const Section2 = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
  padding: 2rem 0;

  @media ${breakpoint.xlg} {
    grid-template-columns: repeat(4, 1fr);
    padding: 2rem 1rem;
  }

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${breakpoint.m} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
