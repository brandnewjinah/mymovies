import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

export default withRouter(({ location: { pathname } }) => (
  <Container>
    <Header>
      <div>
        <Link to="/">Logo</Link>
      </div>

      <List>
        <ul>
          <Item current={pathname === "/recommend"}>
            <SLink to="/recommend">Recommend</SLink>
          </Item>
          <Item current={pathname === "/"}>
            <SLink to="/">Movies</SLink>
          </Item>
          <Item current={pathname === "/tv"}>
            <SLink to="/tv">TV</SLink>
          </Item>
          <Item current={pathname === "/search"}>
            <SLink to="/search">Search</SLink>
          </Item>
          <Item current={pathname === "/continue"}>
            <SLink to="/continue">Rate</SLink>
          </Item>
        </ul>
      </List>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
    </Header>
  </Container>
));

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  z-index: 1;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  width: 100%;
  height: 100;
  max-width: 1260px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  div {
    font-size: 16px;
    font-weight: 600;
  }
`;

const List = styled.div`
  ul {
    display: flex;
  }
`;

const Item = styled.li`
  margin: 0 0.75em;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 5px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
