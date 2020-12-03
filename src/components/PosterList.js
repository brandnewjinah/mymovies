import React from "react";
import PropTypes from "prop-types";

//import styles and assets
import styled from "styled-components";
import { Heart, BrokenHeart } from "../assets/Icons";

const Poster = ({
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
        {rate && (
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
        )}
      </ImageContainer>

      <Title>
        {title.length > 20 ? `${title.substring(0, 22)}...` : title}
      </Title>
      <Details>
        <div>{year.substring(0, 4)}</div>
        <div>{genre && genre.join(" \u00B7 ")}</div>
      </Details>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 1.5em;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* background-color: Gainsboro;
  border: 1px solid black; */
`;

const Image = styled.img`
  width: 100%;
  /* height: auto; */
  min-height: 348px;
  object-fit: contain;
  border-radius: 8px;
  transition: opacity 0.1s linear;
  /* box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.1); */
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
  font-size: 1rem;
  font-weight: 500;
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
