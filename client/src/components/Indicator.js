import React from "react";

//import styles and assets
import styled from "styled-components";

const Indicator = () => {
  return (
    <Container>
      <span role="img" aria-label="Loading">
        😀
      </span>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 500px;
`;

export default Indicator;
