import React from "react";

//redux
import { connect } from "../collection/node_modules/react-redux";

//import styles and assets
import styled from "styled-components";

const Presenter = () => {
  return <Wrapper>Presenter</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  margin: 3em auto;
`;

const mapStateToProps = (state) => {
  return {
    health_goal: state.health_goal,
    height: state.height,
    weight: state.weight,
    goal_weight: state.goal_weight,
  };
};

export default connect(mapStateToProps, null)(Presenter);
