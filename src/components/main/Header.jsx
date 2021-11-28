import React, { useState, useEffect } from "react";
import { Link, withRouter, useLocation } from "react-router-dom";

//styles and assets
import styled, { css } from "styled-components";
import { Film } from "../../assets/Icons";
import { primaryColors, breakpoint, size } from "../token";

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
          <Link to="/movies">
            <Film width="24" height="24" color="#000" stroke="2" />
          </Link>
        </Logo>
        {location.pathname.includes("/rate") ? (
          <Links>
            <Left></Left>
            <Right>
              <Link to="/movies/demoprofile" onClick={() => setOpen(false)}>
                Skip
              </Link>
            </Right>
          </Links>
        ) : (
          <Links open={open}>
            <Left>
              <Item current={pathname === "/movies/recommend"}>
                {total > 9 ? (
                  <SLink to="/movies/recommend" onClick={() => setOpen(false)}>
                    Recommendation
                  </SLink>
                ) : (
                  <SLink
                    to="/movies/demorecommend"
                    onClick={() => setOpen(false)}
                  >
                    Recommend
                  </SLink>
                )}
              </Item>
              <Item current={pathname === "/movies/continue"}>
                <SLink to="/movies/continue" onClick={() => setOpen(false)}>
                  Rate
                </SLink>
              </Item>
              <Item current={pathname === "/movies/search"}>
                <SLink to="/movies/search" onClick={() => setOpen(false)}>
                  Search
                </SLink>
              </Item>
              <Item current={pathname === "/movies/collection"}>
                <SLink to="/movies/collection" onClick={() => setOpen(false)}>
                  Collection
                </SLink>
              </Item>
            </Left>
            <Right>
              {total > 9 ? (
                <Link to="/movies/profile" onClick={() => setOpen(false)}>
                  Profile
                </Link>
              ) : (
                <Link to="/movies/demoprofile" onClick={() => setOpen(false)}>
                  Profile
                </Link>
              )}
            </Right>
          </Links>
        )}

        {location.pathname.includes("/rate") ? (
          <Mobile>
            <Link to="/movies/demoprofile" onClick={() => setOpen(false)}>
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
  background-color: #fff;
  width: 100%;
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Container = styled.nav`
  ${Flex}
  width: 100%;
  max-width: ${size.xlg};
  justify-content: space-between;
  color: ${primaryColors.blue};
  padding: 0.75rem 0;
  margin: 0 auto;

  div {
    font-weight: 600;
  }
`;

const Logo = styled.div`
  flex: 0 1 33.3333%;
`;

const Links = styled.div`
  ${Flex}
  flex: 0 1 66.6666%;

  @media ${breakpoint.lg} {
    background-color: #fff;
    height: 100vh;
    flex-direction: column;
    position: absolute;
    top: 3rem;
    left: 0;
    right: 0;
    text-align: center;
    overflow: hidden;
    padding: 1rem;
    z-index: 1;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};

    a {
      margin: 0.5rem;
    }
  }
`;

const Left = styled.div`
  ${Flex}
  flex: 0 1 50%;
  justify-content: space-between;
  z-index: 2;

  @media ${breakpoint.lg} {
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

  @media ${breakpoint.lg} {
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;

    div {
      margin-left: 0;
    }
  }
`;

const Item = styled.div`
  margin: 0 0.75rem;
  text-align: center;
  border-bottom: 5px solid
    ${(props) => (props.current ? primaryColors.blue : "transparent")};
  transition: border-bottom 0.5s ease-in-out;

  @media ${breakpoint.lg} {
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

  @media ${breakpoint.lg} {
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