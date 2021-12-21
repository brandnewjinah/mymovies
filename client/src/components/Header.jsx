import React from "react";
import styled from "styled-components";
import { breakpoint, fontSize, primaryColors } from "./token";

export const Header = ({ title, subtitle }) => {
  return (
    <Container>
      <h1>{title}</h1>
      {subtitle && <Sub>{subtitle}</Sub>}
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: ${primaryColors.blue};
  padding: 2rem 0;

  h1 {
    font-weight: 600;
  }

  .underline {
    position: relative;
    white-space: nowrap;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 3px solid #e89161;
    }
  }

  .highlight {
    display: inline-block;
    background-color: #f7d0ba;
    line-height: 0.75rem;
    padding: 0 0.25rem;
  }

  @media ${breakpoint.m} {
    padding: 0;

    h1 {
      font-size: 1.5rem;
      line-height: 1.75rem;
    }
  }
`;

const Sub = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;

  .link {
    border-bottom: 3px solid #172d6e;
    margin-left: 6px;
  }

  @media ${breakpoint.m} {
    font-size: ${fontSize.lg1};
    line-height: 1.5rem;
    font-weight: 400;
    text-align: center;
    flex-direction: column;
  }
`;
