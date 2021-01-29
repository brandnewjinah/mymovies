import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { Film } from "../assets/Icons";
import { primary } from "./Colors";

//redux
import { connect } from "react-redux";

const Header = ({ location: { pathname }, liked, disliked }) => {
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const handleRated = () => {
      const totalRated = liked.length + disliked.length;
      setTotal(totalRated);
    };

    handleRated();
  }, [liked, disliked]);

  console.log(total);

  return (
    <Wrapper open={open}>
      <Container>
        <Logo>
          <Link to="/">
            <Film width="24" height="24" color="#000" stroke="2" />
          </Link>
        </Logo>

        <Links open={open}>
          <Left>
            <Item current={pathname === "/recommend"}>
              {total > 9 ? (
                <SLink to="/recommend" onClick={() => setOpen(false)}>
                  Recommend
                </SLink>
              ) : (
                <SLink to="/demorecommend" onClick={() => setOpen(false)}>
                  Recommend
                </SLink>
              )}
            </Item>
            <Item current={pathname === "/continue"}>
              <SLink to="/continue" onClick={() => setOpen(false)}>
                Rate
              </SLink>
            </Item>
            <Item current={pathname === "/search"}>
              <SLink to="/search" onClick={() => setOpen(false)}>
                Search
              </SLink>
            </Item>
          </Left>
          <Right>
            {total > 9 ? (
              <Link to="/profile" onClick={() => setOpen(false)}>
                Profile
              </Link>
            ) : (
              <Link to="/demoprofile" onClick={() => setOpen(false)}>
                Profile
              </Link>
            )}
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

const Flex = styled.div`
  display: flex;
`;

const Wrapper = styled(Flex)`
  background-color: #fff;
  width: 100%;
  height: 5em;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  @media (max-width: 1180px) {
    padding: 0 2em;
  }
`;

const Container = styled(Flex)`
  width: 100%;
  max-width: 1140px;
  justify-content: space-between;
  align-items: center;
  color: ${primary.blue};
  margin: 0 auto;

  div {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const Logo = styled.div`
  flex: 0 1 33.3333%;

`;

const Links = styled(Flex)`
  flex: 0 1 66.6666%;


  @media (max-width: 780px) {
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
    z-index: 1;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
    /* transition: all 300ms; */

    a {
      margin: 0.5em;
    }
  }
`;

const Left = styled(Flex)`
  flex: 0 1 50%;
  justify-content: space-between;
  z-index: 2;

  @media (max-width: 780px) {
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;
  }
`;

const Right = styled(Flex)`
  flex: 0 1 50%;
  justify-content: flex-end;
  z-index: 2;
  /* background-color: beige; */

  @media (max-width: 780px) {
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;

    div {
      margin-left: 0;
    }
  }
`;

const Item = styled.div`
  margin: 0 0.75em;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 5px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;

  @media (max-width: 780px) {
    border-bottom: 0;
  }
`;

const SLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Mobile = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 780px) {
    display: block;
  }
`;

const mapStateToProps = (state) => {
  return {
    liked: state.rate.liked,
    disliked: state.rate.disliked,
  };
};

export default withRouter(connect(mapStateToProps)(Header));
