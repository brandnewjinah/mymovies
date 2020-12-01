import React from "react";
import PropTypes from "prop-types";

//import components
import Section from "../../components/Section";
import PosterList from "../../components/PosterList";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../store/movies";

//import styles and assets
import styled from "styled-components";

const RatePresenter = (props) => {
  const handleLike = (movie) => {
    props.likeItem(movie);
  };

  const handleDislike = (movie) => {
    props.dislikeItem(movie);
  };

  return (
    <Container>
      {props.topRated && props.topRated.length > 0 && (
        <Section title="Now Playing">
          {props.topRated.map((movie) => (
            <PosterList
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date}
              liked={props.liked && props.liked.find((id) => id === movie.id)}
              disliked={
                props.disliked && props.disliked.find((id) => id === movie.id)
              }
              onClick1={(movie) => handleLike(movie)}
              onClick2={(movie) => handleDislike(movie)}
            />
          ))}
        </Section>
      )}
    </Container>
  );
};

RatePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  topRated: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const Container = styled.div`
  padding: 0px 10px;
`;

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
    disliked: state.disliked,
  };
};

export default connect(mapStateToProps, { likeItem, dislikeItem })(
  RatePresenter
);
