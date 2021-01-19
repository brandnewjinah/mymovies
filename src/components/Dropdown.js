import React, { useState } from "react";

//import styles and assets
import styled from "styled-components";
import { ChevronDown } from "../assets/Icons";

const Dropdown = ({ selected, data, handleSelection }) => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleSelect = (name) => {
    handleSelection(name);
    handleVisible();
  };

  return (
    <div>
      <Flat onClick={handleVisible}>
        <Label>{selected}</Label>
        <ChevronDown width="20" height="20" color="#000" stroke="2" />
      </Flat>
      {visible ? (
        <Selection>
          <ul>
            {data.map((d) => (
              <li key={d.name} onClick={() => handleSelect(d)}>
                {d.name}
              </li>
            ))}
          </ul>
        </Selection>
      ) : null}
    </div>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const Flat = styled(Container)`
  border-radius: 0.125em;
`;

const Label = styled.div`
  padding: 0.75em 1em;
  font-size: 1.05rem;
`;

const Selection = styled.ul`
  width: 100%;
  position: relative;
  z-index: 10;

  ul {
    position: absolute;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  }

  li {
    padding: 0.85em 1.2em;
    font-size: 0.875rem;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

export default Dropdown;
