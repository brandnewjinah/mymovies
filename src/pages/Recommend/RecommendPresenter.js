import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import _ from "lodash";
import Carousel from "react-elastic-carousel";
import { movieApi } from "../../api";

//import utils
import { CountGenres } from "../../util/LikeCounter";

//import components
import Indicator from "../../components/Indicator";
import { Section } from "../../components/Section2";
import PosterList from "../../components/PosterList";

//redux
import { connect } from "react-redux";

//import styles and assets
import styled from "styled-components";

const RecommendPresenter = (props) => {
  // const getGenre = (genre) => {
  //   if (genre) {
  //     const genres = genre.map((g) => {
  //       const found = movies.genres.find((item) => item.id === g);
  //       return found.name;
  //     });
  //     return genres.slice(0, 2);
  //   }
  // };
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 640, itemsToShow: 5 },
    { width: 1200, itemsToShow: 5 },
  ];

  return (
    <Container>
      {props.loading ? (
        <Indicator />
      ) : (
        <>
          <Recommendations>
            <Heading>
              <h3>Because you like {props.likedMovie.title}</h3>
            </Heading>
            {props.recommended && props.recommended.length > 0 && (
              <Section>
                {props.recommended.slice(0, 5).map((movie) => (
                  <PosterList
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    // genre={getGenre(movie.genre_ids)}
                    toDetail={true}
                  />
                ))}
              </Section>
            )}
            <div>
              <Carousel breakPoints={breakPoints}>
                {props.recommended.map((movie) => (
                  <PosterList
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    // genre={getGenre(movie.genre_ids)}
                    toDetail={true}
                  />
                ))}
              </Carousel>
            </div>

            {/* <Heading>
              <h3>Based on your favorite genres we recommend</h3>
            </Heading>
            {props.filteredGenres && props.filteredGenres.length > 0 && (
              <Section>
                {props.filteredGenres.slice(0, 5).map((movie) => (
                  <PosterList
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    genre={getGenre(movie.genre_ids)}
                    toDetail={true}
                  />
                ))}
              </Section>
            )} */}
            {/* 
            <Heading>
              <h3>{likedKeyword}</h3>
            </Heading>
            {props.filteredKeywords && props.filteredKeywords.length > 0 && (
              <Section>
                {props.filteredKeywords.slice(0, 5).map((movie) => (
                  <PosterList
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    genre={getGenre(movie.genre_ids)}
                    toDetail={true}
                  />
                ))}
              </Section>
            )} */}
          </Recommendations>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  padding: 2em 0;
  margin: 5em auto 0;

  @media (max-width: 840px) {
    margin: 2em;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;

  .pagination {
    display: flex;
  }

  .prev {
    margin-right: 0.5em;
  }
`;

const Recommendations = styled.div`
  h3 {
    font-size: 1.5rem;
  }
`;

const mapStateToProps = (state) => {
  return {
    liked: state.rate.liked,
    disliked: state.rate.disliked,
    keywords: state.keywords.myKeywords,
  };
};

export default connect(mapStateToProps, null)(RecommendPresenter);
