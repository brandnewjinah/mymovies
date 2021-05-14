import React from "react";
import styled from "styled-components";
import { Heart, BrokenHeart } from "../assets/Icons";
import { neutral, primaryColors } from "./Token";

const Rate = ({ liked, disliked, handleLike, handleDislike }) => {
  return (
    <Wrapper>
      <div
        onClick={handleLike}
        style={
          liked
            ? { backgroundColor: primaryColors.cornflower }
            : { border: `1px solid ${neutral[200]}` }
        }
      >
        <Heart width="20" height="20" fill={liked ? "#fff" : neutral[200]} />
        <p style={liked ? { color: "#fff" } : null}>Liked</p>
      </div>
      <div
        onClick={handleDislike}
        style={
          disliked
            ? { backgroundColor: primaryColors.tangerine }
            : { border: `1px solid ${neutral[200]}` }
        }
      >
        <BrokenHeart
          width="20"
          height="20"
          fill={disliked ? "#fff" : neutral[200]}
        />
        <p style={disliked ? { color: "#fff" } : null}>Disliked</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 1.875em;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2em;
    padding: 0.3em 2em;
    margin-right: 1em;
    cursor: pointer;
  }

  p {
    font-size: 0.8rem;
    font-weight: 600;
    color: ${neutral[400]};
    margin-left: 0.5em;
  }
`;

export default Rate;
