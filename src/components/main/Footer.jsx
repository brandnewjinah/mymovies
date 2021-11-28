import React from "react";
import styled from "styled-components";
import { primaryColors, typeScale } from "../token";

const Footer = () => {
  return <Container>Footer</Container>;
};

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${primaryColors.lightblue};
  font-size: ${typeScale.helper};
  padding: 1rem 0;
`;
export default Footer;
