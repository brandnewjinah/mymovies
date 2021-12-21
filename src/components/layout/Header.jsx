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
        {!location.pathname.includes("/rate") && (
          <Center open={open}>
            <List>
              <Item>
                {total > 9 ? (
                  <NavLink
                    to="/movies/recommend"
                    onClick={() => setOpen(false)}
                  >
                    Recommendations
                  </NavLink>
                ) : (
                  <NavLink
                    to="/movies/demorecommend"
                    onClick={() => setOpen(false)}
                  >
                    Recommendations
                  </NavLink>
                )}
              </Item>
              <Item>
                <NavLink to="/movies/continue" onClick={() => setOpen(false)}>
                  Rate
                </NavLink>
              </Item>
              <Item>
                <NavLink
                  to="/movies/collections"
                  onClick={() => setOpen(false)}
                >
                  Collections
                </NavLink>
              </Item>
              <Item>
                <NavLink to="/movies/search" onClick={() => setOpen(false)}>
                  Search
                </NavLink>
              </Item>
            </List>
            <MobileLink>
              <Item end="true">
                {total > 9 ? (
                  <NavLink to="/movies/profile" onClick={() => setOpen(false)}>
                    Profile
                  </NavLink>
                ) : (
                  <NavLink
                    to="/movies/demoprofile"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </NavLink>
                )}
              </Item>
            </MobileLink>
          </Center>
        )}
        <Right open={open}>
          {total > 9 ? (
            <NavLink to="/movies/profile">Profile</NavLink>
          ) : (
            <NavLink to="/movies/demoprofile">Profile</NavLink>
          )}
        </Right>
        {location.pathname.includes("/rate") ? (
          <MobileMenu>
            {total > 9 ? (
              <NavLink to="/movies/profile">Profile</NavLink>
            ) : (
              <NavLink to="/movies/demoprofile">Demo</NavLink>
            )}
          </MobileMenu>
        ) : (
          <MobileMenu>
            {open ? (
              <div onClick={() => setOpen(!open)}>Close</div>
            ) : (
              <div onClick={() => setOpen(!open)}>Menu</div>
            )}
          </MobileMenu>
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
    top: 4rem;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
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

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
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

const MobileMenu = styled.div`
  display: none;
  cursor: pointer;

  @media ${breakpoint.lg} {
    display: block;
  }
`;

export default Header;
