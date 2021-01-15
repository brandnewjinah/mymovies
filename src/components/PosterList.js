import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Heart, BrokenHeart, Film } from "../assets/Icons";
import { primary, gray } from "./Colors";

const Poster = ({
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
  toDetail,
}) => {
  const history = useHistory();
  const [emptyImg, setEmptyImg] = useState(false);

  const handleNoImg = (e) => {
    if (e.type === "error") {
      setEmptyImg(true);
    }
  };

  const pushTo = () => {
    history.push(`/movie/${id}`);
  };

  const rateMovie = (
    <>
      <div
        style={liked ? { backgroundColor: primary.green } : null}
        onClick={() => onClick1()}
      >
        <Heart width="26" height="26" fill="#fff" />
      </div>
      <div
        style={disliked ? { backgroundColor: primary.orange } : null}
        onClick={() => onClick2()}
      >
        <BrokenHeart width="26" height="26" fill="#fff" />
      </div>
    </>
  );

  return (
    <Container
      onClick={toDetail && pushTo}
      style={toDetail && { cursor: `pointer` }}
    >
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
        <div onClick={pushTo} className="content">
          <h6 className="title">
            {title.length > 17 ? `${title.substring(0, 19)}...` : title}
          </h6>
          <h6 className="titleMobile">{title}</h6>
          <p>{year.substring(0, 4)}</p>
          <p>
            {genre && genre.join(" \u00B7 ").length > 20
              ? `${genre && genre.join(" \u00B7 ").substring(0, 20)}...`
              : genre && genre.join(" \u00B7 ")}
          </p>
        </div>
        {rate && <div className="ratingmobile">{rateMovie}</div>}
      </Detail>
    </Container>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;

  @media (max-width: 540px) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: opacity 0.1s linear;
`;

const EmptyImg = styled(Flex)`
  justify-content: center;
  width: 202px;
  height: 304px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Rating = styled(Flex)`
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

  @media (max-width: 540px) {
    display: none;
  }
`;

const ImageContainer = styled(Flex)`
  position: relative;
  height: 79%;

  &:hover {
    ${Image} {
      opacity: 0.3;
    }

    ${Rating} {
      opacity: 1;
    }
  }

  @media (max-width: 540px) {
    height: 100%;
    flex: 0 1 40%;

    &:hover {
      ${Image} {
        opacity: 1;
      }
    }
  }
`;

const Detail = styled(Flex)`
  width: 100%;
  height: 21%;
  flex-direction: column;
  justify-content: start;
  text-align: center;

  h6 {
    margin: 0.5em 0 0.25em;
    display: inline-block;
    width: 100%;
  }

  p {
    font-size: 0.75rem;
    line-height: 1.25rem;
  }

  .content {
    width: 100%;
    cursor: pointer;
  }

  .title {
    display: inline-block;
  }

  .titleMobile {
    display: none;
  }

  .ratingmobile {
    display: none;
  }

  @media (max-width: 540px) {
    height: 100%;
    flex: 0 1 60%;
    justify-content: center;
    align-items: start;
    text-align: left;
    padding-left: 1em;

    h6 {
      font-size: 0.875rem;
    }

    .title {
      display: none;
    }

    .titleMobile {
      display: block;
      line-height: 1.25rem;
    }

    .ratingmobile {
      display: flex;

      div {
        display: flex;
        background-color: ${gray.darkgray};
        padding: 0.5em;
        border-radius: 100%;
        margin: 1em 1em 0 0;
        cursor: pointer;
      }
    }
  }
`;

Poster.propTyes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
};

export default Poster;
