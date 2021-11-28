import React, { FC } from "react";
import styled from "styled-components";

import { typeScale } from "./token";

export interface Props {
  color?: string;
  disabled?: boolean;
  label?: string;
  handleClick?: () => void;
}

export const TextButton: FC<Props> = ({
  label,
  color,
  disabled,
  handleClick,
}) => {
  return (
    <TextButtonContainer
      aria-label={label}
      color={color}
      disabled={disabled}
      onClick={handleClick}
    >
      <p>{label}</p>
    </TextButtonContainer>
  );
};

const TextButtonContainer = styled.button`
  font-weight: 500;
  font-size: ${typeScale.header6};
  background: transparent;
  color: ${(props) => props.color};
  border: 0;
  border-bottom: ${(props) =>
    props.color ? `3px solid ${props.color}` : `2px solid black`};
  transition: 0.1s;
  cursor: pointer;

  &:active {
    border-bottom-color: transparent;
  }

  &:disabled {
    color: gray;
    border-bottom-color: transparent;
    cursor: not-allowed;
  }
`;
