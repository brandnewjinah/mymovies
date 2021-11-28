import React from "react";
import styled from "styled-components";
import { breakpoint, primaryColors } from "./token";

export const HeaderH2 = ({ title, subtitle }) => {
  return (
    <Container>
      <h2>{title}</h2>
      {subtitle && <Sub>{subtitle}</Sub>}
    </Container>
  );
};

export const HeaderH4 = ({ title, subtitle }) => {
  return (
    <Container>
      <h4>{title}</h4>
      {subtitle && <Sub>{subtitle}</Sub>}
    </Container>
  );
};

export const HeaderH5 = ({ title }) => {
  return (
    <Container>
      <h5>{title}</h5>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .secondary {
    color: ${primaryColors.warning};
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
`;

const Sub = styled.h6`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;

  .link {
    border-bottom: 3px solid #172d6e;
    margin-left: 6px;
  }

  @media ${breakpoint.m} {
    line-height: 1.5rem;
    text-align: center;
    flex-direction: column;
  }
`;
