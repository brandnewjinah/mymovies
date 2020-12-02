import React from "react";
import PropTypes from "prop-types";

//import components
import Section from "../../components/Section2";
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
      <Header>
        <h2>Please rate at least 30 movies you watched</h2>
        <div>{props.liked.length + props.disliked.length} / 30</div>
        <button onClick={props.prevPage}>Prev</button>
        <button onClick={props.nextPage}>Next</button>
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

      <Footer>
        <div>You rated {props.liked.length + props.disliked.length} / 30</div>
        <button>Next</button>
      </Footer>
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
  margin: 4em auto;
  width: 100%;
  max-width: 1260px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
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
