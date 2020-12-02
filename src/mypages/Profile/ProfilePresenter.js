import React from "react";
import PropTypes from "prop-types";

//import components
import Indicator from "../../components/Indicator";
import Section from "../../components/Section";
import PosterList from "../../components/PosterList";

//import styles and assets
import styled from "styled-components";

const ProfilePresenter = ({
  movies,
  shows,
  keyword,
  onChange,
  onSubmit,
  loading,
}) => {
  return (
    <Container>
      {loading ? (
        <Indicator />
      ) : (
        <>
          {movies && movies.length > 0 && (
            <Section title="Movie Results">
              {movies.map((movie) => (
                <PosterList
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date}
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
  padding: 0px 20px;
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

export default ProfilePresenter;
