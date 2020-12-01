import React, { useState } from "react";
import PropTypes from "prop-types";

//import styles and assets
import styled from "styled-components";

const Poster = (props) => {
  // console.log(props.disliked);
  //if props.disliked includes current id, make it colorful

  return (
    <Container>
      <ImageContainer>
        <Image
          src={
            props.imageUrl
              ? `https://image.tmdb.org/t/p/w500${props.imageUrl}`
              : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
          }
        />
        <Rating>
          <div
            style={props.liked ? { backgroundColor: "yellow" } : null}
            onClick={() => props.onClick1(props.id)}
          >
            Liked
          </div>
          <div
            style={props.disliked ? { backgroundColor: "blue" } : null}
            onClick={() => props.onClick2(props.id)}
          >
            Disliked
          </div>
        </Rating>
      </ImageContainer>
      <Title>
        {props.title.length > 18
          ? `${props.title.substring(0, 20)}...`
          : props.title}
      </Title>
      <Year>{props.year.substring(0, 4)}</Year>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 1.5em;
`;

const Image = styled.img`
  max-width: 100%;
  height: 300px;
  object-fit: cover;
  transition: opacity 0.1s linear;
`;

const Rating = styled.div`
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
  display: flex;

  div {
    margin: 0 1em;
    background-color: white;
    color: black;
    padding: 0.5em;
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
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
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
`;

Poster.propTyes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
};

export default Poster;
