import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import _ from "lodash";

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
  // global
  const liked = props.liked;

  const getGenre = (genre) => {
    if (genre) {
      const genres = genre.map((g) => {
        const found = props.genres.find((item) => item.id === g);
        return found.name;
      });
      return genres.slice(0, 2);
    }
  };

  // handle prev next pagination
  const [sliced, setSliced] = useState({
    liked1: { begin: 0, end: 5 },
    liked2: { begin: 0, end: 5 },
  });

  const handleNextSlice = (item) => {
    let newSliced = { ...sliced };
    let newLiked = { ...newSliced[item] };
    if (newLiked.begin < 15) {
      newLiked = { begin: newLiked.begin + 5, end: newLiked.end + 5 };
      newSliced = { ...newSliced, [item]: newLiked };
      setSliced(newSliced);
    }
  };

  const handlePrevSlice = (item) => {
    let newSliced = { ...sliced };
    let newLiked = { ...newSliced[item] };
    if (newLiked.begin !== 0) {
      newLiked = { begin: newLiked.begin - 5, end: newLiked.end - 5 };
      newSliced = { ...newSliced, [item]: newLiked };
      setSliced(newSliced);
    }
  };

  //send api based on your top 3 favorite genres
  const basedonGenres = () => {
    //get liked genres
    const sorted = CountGenres(liked);

    //get top 3
    const names = sorted.slice(0, 3).map((item) => {
      return parseInt(item["key"]);
    });

    //api call
    props.findGenres(names.toString());
  };

  //send api based on your favorite keywords
  const [likedKeyword, setlikedKeyword] = useState("");

  const basedonKeywords = () => {
    const sorted = _.orderBy(
      props.keywords,
      (key) => {
        return key.movies.length;
      },
      ["desc"]
    );

    let random = Math.floor(Math.random() * 3);
    const names = sorted[random];

    // api call
    props.findKeywords(names.id.toString());
    setlikedKeyword(names.name);
  };

  //send api based on random liked movie
  const [likedMovie, setLikedMovie] = useState("");

  const basedonLiked = () => {
    // //get two unique random numbers
    // let random = [];
    // while (random.length < 2) {
    //   let random1 = Math.floor(Math.random() * liked.length);
    //   if (random.indexOf(random1 === -1)) random.push(random1);
    // }

    let random = Math.floor((Math.random() + 0.1) * liked.length);
    const likedMovie = liked[random];

    props.findSimilar(likedMovie.id);
    setLikedMovie(likedMovie.title);
    console.log(likedMovie.id);
  };

  useEffect(() => {
    basedonGenres();
    basedonKeywords();
    basedonLiked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {props.loading ? (
        <Indicator />
      ) : (
        <>
          <Recommendations>
            <Heading>
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
            )}

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
            )}

            <Heading>
              <h3>Because you like {likedMovie}</h3>
              <div className="pagination">
                <div className="prev" onClick={() => handlePrevSlice("liked1")}>
                  prev
                </div>
                <div onClick={() => handleNextSlice("liked1")}>next</div>
              </div>
            </Heading>
            {props.Recommended && props.Recommended.length > 0 && (
              <Section>
                {props.Recommended.slice(
                  sliced.liked1.begin,
                  sliced.liked1.end
                ).map((movie) => (
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
            )}
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
