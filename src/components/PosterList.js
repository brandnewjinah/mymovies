import React from "react";
import PropTypes from "prop-types";

//import styles and assets
import styled from "styled-components";
import { Heart, BrokenHeart } from "../assets/Icons";

const Poster = ({
  imageUrl,
  liked,
  disliked,
  title,
  year,
  genre,
  onClick1,
  onClick2,
}) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src={
            imageUrl
              ? `https://image.tmdb.org/t/p/w500${imageUrl}`
              : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
          }
        />
        <Rating>
          <div
            style={liked ? { backgroundColor: "#91b04f" } : null}
            onClick={() => onClick1()}
          >
            <Heart width="26" height="26" fill="#fff" />
          </div>
          <div
            style={disliked ? { backgroundColor: "#de7747" } : null}
            onClick={() => onClick2()}
          >
            <BrokenHeart width="26" height="26" fill="#fff" />
          </div>
        </Rating>
      </ImageContainer>

      <Title>
        {title.length > 18 ? `${title.substring(0, 20)}...` : title}
      </Title>
      <Details>
        <div>{year.substring(0, 4)}</div>
        <div>{genre.join(" \u00B7 ")}</div>
      </Details>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  transition: opacity 0.1s linear;
`;

const Rating = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
  display: flex;

  div {
    margin: 0 1em;
    padding: 1em;
    cursor: pointer;
    background-color: #999999;
    border-radius: 100%;
    display: flex;
  }
`;

const ImageContainer = styled.div`
  position: relative;

  &:hover {
    ${Image} {
      opacity: 0.3;
    }

    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;
  font-size: 1.025rem;
  margin: 0.5em 0;
`;

const Details = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    font-size: 0.75rem;
    margin: 0.25em 0;

    /* &:not(:last-child):after {
      content: " \\B7\\a0 ";
    } */
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
