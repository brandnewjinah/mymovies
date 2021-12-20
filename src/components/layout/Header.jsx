import React, { useState, useEffect } from "react";
import { Link, withRouter, useLocation } from "react-router-dom";

//styles and assets
import styled, { css } from "styled-components";
import { Film } from "../../assets/Icons";
import { primaryColors, breakpoint, size } from "../token";

//redux
import { useSelector } from "react-redux";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  let location = useLocation();
  let pathname = location.pathname;

  const { liked, disliked } = useSelector((state) => state.rate);

  useEffect(() => {
    const handleRated = () => {
      const totalRated = liked.length + disliked.length;
      setTotal(totalRated);
    };

    handleRated();
  }, [liked, disliked]);

  console.log(total);

  return (
    <Wrapper>
      <Nav>
        <Left>
          <Link to="/">
            <Film width="24" height="24" color="#000" stroke="2" />
          </Link>
        </Left>
        <Center open={open}>
          <List>
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
                  Recommendation
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
            <Item current={pathname === "/movies/collections"}>
              <SLink to="/movies/collections" onClick={() => setOpen(false)}>
                Collections
              </SLink>
            </Item>
          </List>
          <MobileLink>
            <Item end="true">
              <Link to="/movies/profile" onClick={() => setOpen(false)}>
                Profile
              </Link>
            </Item>
          </MobileLink>
        </Center>
        <Right open={open}>
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
        {location.pathname.includes("/rate") ? (
          <Mobile>
            {total > 9 ? (
              <Link to="/movies/profile" onClick={() => setOpen(false)}>
                Profile
              </Link>
            ) : (
              <Link to="/movies/demoprofile" onClick={() => setOpen(false)}>
                Skip
              </Link>
            )}
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
      </Nav>
    </Wrapper>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.header`
  ${Flex}
  background-color: #fff;
  width: 100%;
  height: 4rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Nav = styled.nav`
  ${Flex}
  width: 100%;
  max-width: ${size.xlg};
  justify-content: space-between;
  font-size: 0.925rem;
  color: ${primaryColors.blue};
  /* padding: 0.75rem 0; */
  margin: 0 auto;

  div {
    font-weight: 500;
  }

  @media ${breakpoint.xlg} {
    padding: 0.75rem 1rem;
  }
`;

const Left = styled.div`
  width: 100%;
  flex: 0 1 auto;
  justify-content: flex-start;

  svg {
    display: flex;
    align-items: center;
  }
`;

const Center = styled.nav`
  ${Flex}
  justify-content: center;
  width: 100%;

  @media ${breakpoint.lg} {
    position: absolute;
    top: 5rem;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
  }
`;

const MobileLink = styled.ul`
  display: none;
  list-style-type: none;

  @media ${breakpoint.lg} {
    display: block;
    ${Flex}
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;
  }
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

const List = styled.ul`
  ${Flex}
  justify-content: space-between;
  list-style-type: none;
  z-index: 2;

  @media ${breakpoint.lg} {
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;
  }
`;

const Right = styled.nav`
  ${Flex}
  width: 100%;
  flex: 0 1 auto;
  justify-content: flex-end;

  @media ${breakpoint.lg} {
    display: none;
  }
`;

const Item = styled.li`
  margin: 0 0.75rem;
  margin-right: ${(props) => props.end && 0};
  text-align: center;
  border-bottom: 2px solid
    ${(props) => (props.current ? primaryColors.blue : "transparent")};
  transition: border-bottom 0.5s ease-in-out;

  @media ${breakpoint.lg} {
    margin: 1rem 0.75rem;
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

export default Header;
