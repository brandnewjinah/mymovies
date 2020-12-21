import React from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Checkmark } from "../assets/Icons";
import { primary, gray } from "./Colors";

const Chips = ({ label, saved, url, saveKeyword }) => {
  return (
    <Container>
      <Flex>
        <Check onClick={saveKeyword} saved={saved}>
          <Checkmark width="16" height="16" color="#fff" stroke="3" />
        </Check>
        <Content>
          <Link to={`/keyword/${url}`}>{label}</Link>
        </Content>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  border-radius: 2em;
  background-color: rgba(0, 0, 0, 0.08);
  padding: 0.15em 0.5em;
  margin: 0.35em 0.5em 0.35em 0;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Check = styled(Flex)`
  padding: 0.15em;
  border-radius: 100%;
  /* background-color: rgba(0, 0, 0, 0.2); */
  background-color: ${({ saved }) => (saved ? primary.green : gray.gray)};
  opacity: 0.8;
  transition: opacity 0.1s linear;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const Content = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.015rem;
  margin: 0 0.5em 0 0.75em;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Chips;
