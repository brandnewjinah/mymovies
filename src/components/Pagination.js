import React from "react";

//import styles
import styled from "styled-components";

export const Pagination = (props) => {
  return (
    <Container>
      {props.page !== 1 ? (
        <Button onClick={props.handlePrev}>Prev</Button>
      ) : (
        <div></div>
      )}
      <Button onClick={props.handleNext}>Next</Button>
    </Container>
  );
};

export const RatePagination = (props) => {
  return (
    <Container>
      <div>You rated {props.liked + props.disliked}</div>
      <Button onClick={props.handleNext}>More</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2em 0 4em;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: transparent;
  font-family: "Poppins", sans-serif;
  color: #172d6e;
  font-size: 1.125rem;
  font-weight: 400;
  border-bottom: 3px solid #172d6e;
  margin: 0 0.5em;
  cursor: pointer;
`;

export default Pagination;
