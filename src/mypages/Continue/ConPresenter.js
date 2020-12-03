import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//import components
import { Section } from "../../components/Section2";
import PosterList from "../../components/PosterList";
import Indicator from "../../components/Indicator";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../store/movies";

//import styles and assets
import styled from "styled-components";

const ConPresenter = (props) => {
  const [movies, setMovies] = useState([]);

  const handleLike = (movie) => {
    props.likeItem(movie);
  };

  const handleDislike = (movie) => {
    props.dislikeItem(movie);
  };

  useEffect(() => {
    unRated();
  }, []);

  const handleGenre = (genre) => {
    if (genre) {
      const genres = genre.map((g) => {
        const found = props.genres.find((item) => item.id === g);
        return found.name;
      });
      return genres.slice(0, 2);
    }
  };

  const unRated = () => {
    const liked = props.liked;
    const disliked = props.disliked;
    const filtered = props.topRated.filter(
      (d) =>
        !liked.find((id) => id.id === d.id) &&
        !disliked.find((id) => id.id === d.id)
    );
    setMovies(filtered);
  };

  return props.loading ? (
    <Indicator />
  ) : (
    <Container>
      <Header>
        <h2>Rate more movies</h2>
        <h4>Keep rating to get more personalized recommendations</h4>

        <div
          style={{
            display: "flex",
          }}
        >
          {props.page !== 1 ? (
            <Button onClick={props.prevPage}>Prev</Button>
          ) : null}
          <Button onClick={props.nextPage}>Next</Button>
        </div>
      </Header>

      {movies && movies.length > 0 && (
        <Section>
          {movies.map((movie) => (
            <PosterList
              key={movie.id}
              rate={true}
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
        <Button onClick={props.nextPage}>Next</Button>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.125rem;
    margin: 1.5em 0;
    text-rendering: optimizeLegibility;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: transparent;
  font-family: "Poppins", sans-serif;
  color: #172d6e;
  font-size: 1.125rem;
  font-weight: 400;
  border-bottom: 3px solid #172d6e;
  margin: 0 0.5em;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
`;

ConPresenter.propTypes = {
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
  ConPresenter
);
