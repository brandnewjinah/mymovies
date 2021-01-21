import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Heart, BrokenHeart, Film } from "../assets/Icons";
import { primary, gray } from "./Colors";

const RatePoster = ({
  id,
  rate,
  imageUrl,
  liked,
  disliked,
  title,
  year,
  genre,
  onClick1,
  onClick2,
}) => {
  const [emptyImg, setEmptyImg] = useState(false);

  const handleNoImg = (e) => {
    if (e.type === "error") {
      setEmptyImg(true);
    }
  };

  const rateMovie = (
    <>
      <div
        style={liked ? { backgroundColor: primary.cornflower } : null}
        onClick={() => onClick1()}
      >
        <Heart width="26" height="26" fill="#fff" />
      </div>
      <div
        style={disliked ? { backgroundColor: primary.tangerine } : null}
        onClick={() => onClick2()}
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
        {rate && <Rating>{rateMovie}</Rating>}
      </ImageContainer>

      <Detail>
        <Link to={`/movie/${id}`}>
          <p className="title">{title}</p>
          <p className="titleMobile">{title}</p>
          <p>{year.substring(0, 4)}</p>
          <p>
            {genre && genre.join(" \u00B7 ").length > 20
              ? `${genre && genre.join(" \u00B7 ").substring(0, 20)}...`
              : genre && genre.join(" \u00B7 ")}
          </p>
        </Link>

        {rate && <div className="ratingmobile">{rateMovie}</div>}
      </Detail>
    </Container>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled(Flex)`
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const EmptyImg = styled(Flex)`
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: opacity 0.1s linear;
`;

const Rating = styled(Flex)`
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;

  div {
    display: flex;
    border-radius: 100%;
    background-color: ${gray.darkgray};
    padding: 1em;
    margin: 0 1em;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ImageContainer = styled(Flex)`
  width: 100%;
  height: 80%;
  position: relative;

  &:hover {
    ${Image} {
      opacity: 0.5;
    }

    ${Rating} {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    flex: 0 1 30%;
    height: 100%;

    &:hover {
      ${Image} {
        opacity: 1;
      }
    }
  }
`;

const Detail = styled(Flex)`
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.25rem;

  .title {
    width: 180px;
    display: inline-block;
    font-size: 0.95rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0.65em 0 0.25em;
  }

  .titleMobile {
    display: none;
  }

  .ratingmobile {
    display: none;
  }

  @media (max-width: 768px) {
    flex: 0 1 70%;
    align-items: start;
    text-align: left;
    padding-left: 1.5em;

    .title {
      display: none;
    }

    .titleMobile {
      display: block;
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 1.75rem;
    }

    .ratingmobile {
      display: flex;

      div {
        display: flex;
        background-color: ${gray.darkgray};
        padding: 0.65em;
        border-radius: 100%;
        margin: 1em 1em 0 0;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 425px) {
    .titleMobile {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
`;

RatePoster.propTyes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
};

export default RatePoster;
