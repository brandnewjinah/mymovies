import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

//import styles and assets
import { Heart, BrokenHeart, Film } from "../assets/Icons";
import { primaryColors, neutral, breakpoint, typeScale } from "./token";

const Poster = ({
  id,
  rate,
  imageUrl,
  liked,
  disliked,
  title,
  year,
  genre,
  handleLike,
  handleDislike,
}) => {
  const [emptyImg, setEmptyImg] = useState(false);

  const handleNoImg = (error) => {
    if (error.type === "error") {
      setEmptyImg(true);
    }
  };

  const rateMovie = (
    <>
      <div
        style={liked ? { backgroundColor: primaryColors.cornflower } : null}
        onClick={() => handleLike()}
      >
        <Heart width="26" height="26" fill="#fff" />
      </div>
      <div
        style={disliked ? { backgroundColor: primaryColors.tangerine } : null}
        onClick={() => handleDislike()}
      >
        <BrokenHeart width="26" height="26" fill="#fff" />
      </div>
    </>
  );

  return (
    <Container>
      <ImageContainer>
        {emptyImg ? (
          <EmptyImg>
            <Film width="24" height="24" color="#000" stroke="2" />
          </EmptyImg>
        ) : (
          <Image
            onError={handleNoImg}
            src={
              imageUrl
                ? `https://image.tmdb.org/t/p/w500${imageUrl}`
                : setEmptyImg(true)
            }
          />
        )}
        {rate && (
          <Rating liked={liked} disliked={disliked}>
            {rateMovie}
          </Rating>
        )}
      </ImageContainer>

      <Detail>
        <Link to={`/movies/movie/${id}`}>
          <p className="title">{title}</p>
          <p>{year.substring(0, 4)}</p>
          <p>{genre && genre.join(" \u00B7 ")}</p>
        </Link>

        {rate && <div className="ratingmobile">{rateMovie}</div>}
      </Detail>
    </Container>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.li`
  display: flex;
  flex-direction: column;

  @media ${breakpoint.m} {
    flex-direction: row;
  }
`;

const EmptyImg = styled.div`
  ${Flex}
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 150%;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  transition: opacity 0.1s linear;
`;

const Rating = styled.div`
  ${Flex}
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${(props) => (props.liked ? 1 : props.disliked ? 1 : 0)};

  div {
    display: flex;
    border-radius: 100%;
    background-color: ${neutral[400]};
    padding: 1em;
    margin: 0 1em;
    cursor: pointer;

    :hover {
      background-color: ${neutral[500]};
    }
  }

  @media ${breakpoint.m} {
    display: none;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 150%;
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    ${Image} {
      opacity: 0.5;
    }

    ${Rating} {
      opacity: 1;
    }
  }

  @media ${breakpoint.m} {
    flex: 0 1 30%;
    padding-bottom: 45%;

    &:hover {
      ${Image} {
        opacity: 1;
      }
    }
  }
`;

const Detail = styled.div`
  ${Flex}
  width: 100%;
  text-align: center;
  font-size: ${typeScale.helper};
  line-height: 1.25rem;

  .title {
    width: 180px;
    display: inline-block;
    font-size: ${typeScale.body};
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0.65em 0 0.25em;
  }

  .ratingmobile {
    display: none;
  }

  @media ${breakpoint.m} {
    flex: 0 1 70%;
    align-items: start;
    text-align: left;
    padding-left: 1.5em;

    .title {
      width: auto;
      white-space: normal;
      display: block;
      line-height: 1.5rem;
    }

    .ratingmobile {
      display: flex;

      div {
        display: flex;
        background-color: ${neutral[400]};
        padding: 0.875em;
        border-radius: 100%;
        margin: 1em 1em 0 0;
        cursor: pointer;
      }
    }
  }
`;

export default Poster;
