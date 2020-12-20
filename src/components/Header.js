import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { Film } from "../assets/Icons";
import { primary } from "./Colors";

const Header = ({ location: { pathname } }) => {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper open={open}>
      <Container>
        <Left>
          <Link to="/">
            <Film width="24" height="24" color="#000" stroke="2" />
          </Link>
        </Left>

        <Links open={open}>
          <Center>
            <Item current={pathname === "/recommend"}>
              <SLink to="/recommend" onClick={() => setOpen(false)}>
                Recommend
              </SLink>
            </Item>
            <Item current={pathname === "/movies"}>
              <SLink to="/" onClick={() => setOpen(false)}>
                Movies
              </SLink>
            </Item>
            <Item current={pathname === "/tv"}>
              <SLink to="/tv" onClick={() => setOpen(false)}>
                TV
              </SLink>
            </Item>
            <Item current={pathname === "/search"}>
              <SLink to="/search" onClick={() => setOpen(false)}>
                Search
              </SLink>
            </Item>
            <Item current={pathname === "/continue"}>
              <SLink to="/continue" onClick={() => setOpen(false)}>
                Rate
              </SLink>
            </Item>
          </Center>
          <Right>
            <Link to="/profile" onClick={() => setOpen(false)}>
              Profile
            </Link>
          </Right>
        </Links>
        <Mobile>
          {open ? (
            <div onClick={() => setOpen(!open)}>Close</div>
          ) : (
            <div onClick={() => setOpen(!open)}>Menu</div>
          )}
        </Mobile>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  height: 5em;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: space-between;
  background: ${primary.beige};
  z-index: 1;
  /* box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05); */
  padding: 0 2em;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1360px;
  display: flex;
  align-items: center;
  color: ${primary.blue};
  margin: 0 auto;

  div {
    font-size: 16px;
    font-weight: 600;
  }
`;

const Left = styled.div`
  flex: 1 1 33.33%;
`;

const Links = styled.div`
  display: flex;
  flex: 1 1 66.66%;

  @media (max-width: 980px) {
    height: 100vh;
    flex-direction: column;
    background-color: #fff;
    position: absolute;
    top: 3em;
    left: 0;
    right: 0;
    overflow: hidden;
    padding: 1em;
    text-align: center;
    font-size: 1.75rem;
    font-weight: 500;
    z-index: 2;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
    /* transition: all 300ms; */

    a {
      margin: 0.5em;
    }
  }
`;

const Center = styled.div`
  display: flex;

  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

const Right = styled.div`
  display: flex;
  margin-left: auto;

  @media (max-width: 980px) {
    flex-direction: column;
    margin-left: 0;
    div {
      margin-left: 0;
    }
  }
`;

const Item = styled.div`
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

const Mobile = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 980px) {
    display: block;
  }
`;

export default withRouter(Header);
