import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//import components
import Section from "../../components/Section2";
import PosterList from "../../components/PosterList";
import Indicator from "../../components/Indicator";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../store/movies";

//import styles and assets
import styled from "styled-components";

//import data
import { lanList } from "../../data/language";

const RatePresenter = (props) => {
  const handleLike = (movie) => {
    props.likeItem(movie);
  };

  const handleDislike = (movie) => {
    props.dislikeItem(movie);
  };

  const handleGenre = (genre) => {
    if (genre) {
      const genres = genre.map((g) => {
        const found = props.genres.find((item) => item.id === g);
        return found.name;
      });
      return genres.slice(0, 2);
    }
  };

  return props.loading ? (
    <Indicator />
  ) : (
    <Container>
      <Header>
        <h2>Please rate at least 30 movies you watched</h2>
        <div>{props.liked.length + props.disliked.length} / 30</div>
        <button onClick={props.prevPage}>Prev</button>
        <button onClick={props.nextPage}>Next</button>
        <Link to="/profile">
          <button disabled={props.liked.length + props.disliked.length < 30}>
            Finish
          </button>
        </Link>
      </Header>

      {props.topRated && props.topRated.length > 0 && (
        <Section title="Rate movies you watched">
          {props.topRated.map((movie) => (
            <PosterList
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date}
              genre={handleGenre(movie.genre_ids)}
              liked={
                props.liked && props.liked.find((item) => item.id === movie.id)
              }
              disliked={
                props.disliked &&
                props.disliked.find((item) => item.id === movie.id)
              }
              onClick1={() => handleLike(movie)}
              onClick2={() => handleDislike(movie)}
            />
          ))}
        </Section>
      )}

      <Footer>
        <div>You rated {props.liked.length + props.disliked.length} / 30</div>
        <button>Next</button>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  margin: 4em auto;
  width: 100%;
  max-width: 1260px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 1.5rem;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
`;

RatePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  topRated: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
    disliked: state.disliked,
  };
};

export default connect(mapStateToProps, { likeItem, dislikeItem })(
  RatePresenter
);
