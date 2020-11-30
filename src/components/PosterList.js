import React from "react";
import PropTypes from "prop-types";

//import styles and assets
import styled from "styled-components";
import noImage from "../assets/noimage.jpg";

const Poster = ({ id, imageUrl, title, rating, year }) => {
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
          <div>Liked</div>
          <div>Disliked</div>
        </Rating>
      </ImageContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 20)}...` : title}
      </Title>
      <Year>{year.substring(0, 4)}</Year>
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
    margin: 0 1.5em;
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
