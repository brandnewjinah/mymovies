import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import _ from "lodash";

//import components
import Indicator from "../../components/Indicator";
import { Section2 } from "../../components/Section2";
import PosterList from "../../components/PosterList";

//redux
import { connect } from "react-redux";

//data
import { lanList } from "../../data/language";

//import styles and assets
import styled from "styled-components";

const RecommendPresenter = (props) => {
  const [language, setLanguage] = useState("");
  const [likedMovie, setLikedMovie] = useState("");
  const [discovered, setDiscovered] = useState([]);

  const liked = props.liked;

  //see if there's non-en movie in your liked movies

  const handleForeign = () => {
    let count = {};
    liked.forEach((el) => {
      count[el.original_language] = (count[el.original_language] || 0) + 1;
    });
    let result = Object.keys(count).map((e) => {
      return { key: e, count: count[e] };
    });
    const sorted = _.orderBy(result, "count", "desc");
    const foreign = sorted.filter((lan) => lan.key !== "en");
    const code = foreign.slice(0, 1).map((item) => {
      return item.key;
    });
    props.topLan(code.toString());
    const found = lanList.find((item) => item.code === code.toString());
    setLanguage(found.english);
  };

  //get random movie from your liked movies - to find similar movies

  const similarMovie = () => {
    let random = Math.floor(Math.random() * liked.length);
    const likedMovie = liked[random];
    props.findSimilar(likedMovie.id);
    setLikedMovie(likedMovie.title);
  };

  //recommend based on your top 3 favorite genres

  const countGenre = () => {
    let count = {};
    liked.map((m) => {
      m.genre_ids &&
        m.genre_ids.forEach((el) => {
          count[el] = (count[el] || 0) + 1;
        });
    });
    liked.map((m) => {
      m.genres &&
        m.genres.forEach((el) => {
          count[el.id] = (count[el.id] || 0) + 1;
        });
    });
    let result = Object.keys(count).map((e) => {
      return { key: e, count: count[e] };
    });
    const sorted = _.orderBy(result, "count", "desc");
    const names = sorted.slice(0, 3).map((item) => {
      return parseInt(item["key"]);
    });
    props.findGenres(names.toString());
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

  const unRated = () => {
    const liked = props.liked;
    const disliked = props.disliked;
    const filtered = props.discovered.filter(
      (d) =>
        !liked.find((id) => id.id === d.id) &&
        !disliked.find((id) => id.id === d.id)
    );
    setDiscovered(filtered);
  };

  useEffect(() => {
    handleForeign();
    similarMovie();
    countGenre();
    unRated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {props.loading ? (
        <Indicator />
      ) : (
        <>
          <Analyser>
            {/* <h4>language</h4>
            {language.map((g, idx) => {
              const found = lanList.find((item) => item.code === g.key);
              return (
                <div key={idx}>
                  {found.english}: {g.count}
                </div>
              );
            })} */}
            {/* <h4>genre</h4>
            {genre.map((g, idx) => {
              const found = props.genres.find(
                (item) => item.id === parseInt(g.key)
              );
              return (
                <div key={idx}>
                  {found.name}: {g.count}
                </div>
              );
            })} */}
          </Analyser>
          <Recommendations>
            {/* <h3>Because you like (Foreign)</h3>
            {foreign && foreign.length > 0 && <div>foreign exist</div>} */}
            <h3>Based on your ratings we recommend</h3>
            {props.unRated && props.unRated.length > 0 && (
              <Section2>
                {props.unRated.slice(0, 8).map((movie) => (
                  <PosterList
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    genre={handleGenre(movie.genre_ids)}
                    toDetail={true}
                  />
                ))}
              </Section2>
            )}
            <h3>Because you like {likedMovie}</h3>
            {props.similar && props.similar.length > 0 && (
              <Section2>
                {props.similar.slice(0, 8).map((movie) => (
                  <PosterList
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    genre={handleGenre(movie.genre_ids)}
                    toDetail={true}
                  />
                ))}
              </Section2>
            )}
            {props.foreign && props.foreign.length > 0 && (
              <>
                <h3>Because you like {language}</h3>
                <Section2>
                  {props.foreign.slice(0, 8).map((movie) => (
                    <PosterList
                      key={movie.id}
                      id={movie.id}
                      imageUrl={movie.poster_path}
                      title={movie.title}
                      rating={movie.vote_average}
                      year={movie.release_date}
                      toDetail={true}
                    />
                  ))}
                </Section2>
              </>
            )}
          </Recommendations>
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

const Analyser = styled.div`
  margin: 2em 0;

  h4 {
    font-size: 1.125rem;
    margin: 1.5em 0;
    text-rendering: optimizeLegibility;
  }
`;

const Recommendations = styled.div`
  h3 {
    font-size: 1.5rem;
  }
`;

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
    disliked: state.disliked,
  };
};

export default connect(mapStateToProps, null)(RecommendPresenter);
