import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import _ from "lodash";

import CaptureResize from "../../util/CaptureResize";

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
    let count = {};

    //count genre id occurrence
    liked.map((m) => {
      m.genre_ids &&
        m.genre_ids.forEach((item) => {
          count[item] = (count[item] || 0) + 1;
        });
    });

    // liked.map((m) => {
    //   m.genres &&
    //     m.genres.forEach((item) => {
    //       count[item.id] = (count[item.id] || 0) + 1;
    //     });
    // });

    //convert into object and sort by highest
    let result = Object.keys(count).map((e) => {
      return { key: e, count: count[e] };
    });
    const sorted = _.orderBy(result, "count", "desc");

    //get top 3
    const names = sorted.slice(0, 3).map((item) => {
      return parseInt(item["key"]);
    });

    //api call
    props.findGenres(names.toString());
  };

  //send api based on your favorite keywords
  const basedonKeywords = () => {
    const sorted = _.orderBy(
      props.keywords,
      (key) => {
        return key.movies.length;
      },
      ["desc"]
    );

    //get top 3
    const names = sorted.slice(0, 1).map((item) => {
      return item.id;
    });

    // api call
    props.findKeywords(names.toString());
  };

  //send api based on random liked movie
  const [likedMovie, setLikedMovie] = useState("");
  const [likedMovie2, setLikedMovie2] = useState("");

  const basedonLiked = () => {
    //get two unique random numbers
    let random = [];
    while (random.length < 2) {
      let random1 = Math.floor(Math.random() * liked.length);
      if (random.indexOf(random1 === -1)) random.push(random1);
    }

    const likedMovie1 = liked[random[0]];
    const likedMovie2 = liked[random[1]];

    props.findSimilar1(likedMovie1.id);
    props.findSimilar2(likedMovie2.id);

    setLikedMovie(likedMovie1.title);
    setLikedMovie2(likedMovie2.title);
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
              <h3>Based on your ratings we recommend</h3>
            </Heading>
            {props.unRated && props.unRated.length > 0 && (
              <Section>
                {props.unRated.slice(0, 5).map((movie) => (
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
              <h3>Based on your favorite topics we recommend</h3>
            </Heading>
            {props.discoveredKeyword && props.discoveredKeyword.length > 0 && (
              <Section>
                {props.discoveredKeyword.slice(0, 5).map((movie) => (
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
            {props.similar && props.similar.length > 0 && (
              <Section>
                {props.similar
                  .slice(sliced.liked1.begin, sliced.liked1.end)
                  .map((movie) => (
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
              <h3>Because you like {likedMovie2}</h3>
              <div className="pagination">
                <div className="prev" onClick={() => handlePrevSlice("liked2")}>
                  prev
                </div>
                <div onClick={() => handleNextSlice("liked2")}>next</div>
              </div>
            </Heading>
            {props.similar2 && props.similar2.length > 0 && (
              <Section>
                {props.similar2
                  .slice(sliced.liked2.begin, sliced.liked2.end)
                  .map((movie) => (
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
