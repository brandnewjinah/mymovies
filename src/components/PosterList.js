import React from "react";
import PropTypes from "prop-types";

//import styles and assets
import styled from "styled-components";
import noImage from "../assets/noimage.jpg";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../store/movies";

const Poster = (props) => {
  const handleLike = (movie) => {
    props.likeItem(movie);
  };

  const handleDislike = (movie) => {
    props.dislikeItem(movie);
  };

  console.log(props.disliked);

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
          <button onClick={() => handleLike(props.id)}>Liked</button>
          <button onClick={() => handleDislike(props.id)}>Disliked</button>
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

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
    disliked: state.disliked,
  };
};

export default connect(mapStateToProps, { likeItem, dislikeItem })(Poster);
