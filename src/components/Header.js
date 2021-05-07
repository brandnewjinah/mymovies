import React, { useState, useEffect } from "react";
import { Link, withRouter, useLocation } from "react-router-dom";

//styles and assets
import { Film } from "../assets/Icons";
import styled, { css } from "styled-components";
import { primaryColors, breakpoint, size } from "./Token";

//redux
import { connect } from "react-redux";

const Header = ({ location: { pathname }, liked, disliked }) => {
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  let location = useLocation();

  useEffect(() => {
    const handleRated = () => {
      const totalRated = liked.length + disliked.length;
      setTotal(totalRated);
    };

    handleRated();
  }, [liked, disliked]);

  return (
    <Wrapper>
      <Container>
        <Logo>
          <Link to="/">
            <Film width="24" height="24" color="#000" stroke="2" />
          </Link>
        </Logo>
        {location.pathname.includes("/rate") ? (
          <Links>
            <Left></Left>
            <Right>
              <Link to="/demoprofile" onClick={() => setOpen(false)}>
                Skip
              </Link>
            </Right>
          </Links>
        ) : (
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
        )}

        {location.pathname.includes("/rate") ? (
          <Mobile>
            <Link to="/demoprofile" onClick={() => setOpen(false)}>
              Skip
            </Link>
          </Mobile>
        ) : (
          <Mobile>
            {open ? (
              <div onClick={() => setOpen(!open)}>Close</div>
            ) : (
              <div onClick={() => setOpen(!open)}>Menu</div>
            )}
          </Mobile>
        )}
      </Container>
    </Wrapper>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  ${Flex}
  background-color: #fff;
  width: 100%;
  height: 5em;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 2em;
  z-index: 10;

  @media ${breakpoint.m} {
    padding: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: ${size.xlg};
  ${Flex}
  justify-content: space-between;
  color: ${primaryColors.blue};
  margin: 0 auto;

  div {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const Logo = styled.div`
  flex: 0 1 33.3333%;
`;

const Links = styled.div`
  ${Flex}
  flex: 0 1 66.6666%;

  @media ${breakpoint.mobile} {
    background-color: #fff;
    height: 100vh;
    flex-direction: column;
    position: absolute;
    top: 3em;
    left: 0;
    right: 0;
    text-align: center;
    overflow: hidden;
    padding: 1em;
    z-index: 1;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};

    a {
      margin: 0.5em;
    }
  }
`;

const Left = styled.div`
  ${Flex}
  flex: 0 1 50%;
  justify-content: space-between;
  z-index: 2;

  @media ${breakpoint.mobile} {
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;
  }
`;

const Right = styled.div`
  ${Flex}
  flex: 0 1 50%;
  justify-content: flex-end;
  z-index: 2;

  @media ${breakpoint.mobile} {
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

  @media ${breakpoint.mobile} {
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

  @media ${breakpoint.mobile} {
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
