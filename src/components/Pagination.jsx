import React from "react";
import styled from "styled-components";

//components
import { TextButton } from "./Button";
import { primaryColors } from "./token";

const Pagination = ({ page, total_pages, handlePrevPage, handleNextPage }) => {
  return (
    <Container>
      {page !== 1 ? (
        <TextButton
          label="Prev"
          color={primaryColors.blue}
          handleClick={handlePrevPage}
        />
      ) : null}
      {page !== total_pages ? (
        <TextButton
          label="Next"
          color={primaryColors.blue}
          handleClick={handleNextPage}
        />
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export default Pagination;
