import React from "react";
import PropTypes from "prop-types";

//import components
import Indicator from "../../components/Indicator";
import { Section } from "../../components/Section2";
import PosterList from "../../components/PosterList";

//redux
import { connect } from "react-redux";

//import styles and assets
import styled from "styled-components";

const ProfilePresenter = (props) => {
  const handleGenre = (genre) => {
    if (genre) {
      const genres = genre.map((g) => {
        const found = props.genres.find((item) => item.id === g);
        return found.name;
      });
      return genres.slice(0, 2);
    }
  };

  return (
    <Container>
      {props.loading ? (
        <Indicator />
      ) : (
        <>
          {props.liked && props.liked.length > 0 && (
            <Section title="Liked Movies">
              {props.liked.map((movie) => (
                <PosterList
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date}
                  genre={handleGenre(movie.genre_ids)}
                />
              ))}
            </Section>
          )}
          {props.disliked && props.disliked.length > 0 && (
            <Section title="Disliked Movies">
              {props.disliked.map((movie) => (
                <PosterList
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date}
                  genre={handleGenre(movie.genre_ids)}
                />
              ))}
            </Section>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 4em auto;
  width: 100%;
  max-width: 1260px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
    disliked: state.disliked,
  };
};

export default connect(mapStateToProps, null)(ProfilePresenter);
