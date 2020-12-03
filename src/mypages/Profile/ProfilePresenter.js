import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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

const ProfilePresenter = (props) => {
  const [language, setLanguage] = useState([]);
  const [genre, setGenre] = useState([]);
  const [discovered, setDiscovered] = useState([]);

  const array = props.liked;

  const handleGenre = (genre) => {
    if (genre) {
      const genres = genre.map((g) => {
        const found = props.genres.find((item) => item.id === g);
        return found.name;
      });
      return genres.slice(0, 2);
    }
  };

  const countLan = () => {
    let count = {};
    array.forEach((el) => {
      count[el.original_language] = (count[el.original_language] || 0) + 1;
    });
    let result = Object.keys(count).map((e) => {
      return { key: e, count: count[e] };
    });
    const sorted = _.orderBy(result, "count", "desc");
    setLanguage(sorted);
  };

  const countGenre = () => {
    let count = {};
    array.map((m) => {
      m.genre_ids.forEach((el) => {
        count[el] = (count[el] || 0) + 1;
      });
    });
    let result = Object.keys(count).map((e) => {
      return { key: e, count: count[e] };
    });
    const sorted = _.orderBy(result, "count", "desc");
    setGenre(sorted);
    const names = sorted.slice(0, 3).map((item) => {
      return parseInt(item["key"]);
    });
    handleReco(names);
  };

  const handleReco = (topGenre) => {
    props.topGenres(topGenre);
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
    countLan();
    countGenre();
    unRated();
  }, []);

  return (
    <Container>
      {props.loading ? (
        <Indicator />
      ) : (
        <>
          <Analyser>
            <h4>
              You rated {props.liked.length + props.disliked.length} movies
            </h4>
            <h4>You liked {props.liked.length} movies</h4>
            <h4>You disliked {props.disliked.length} movies</h4>
            <h4>language</h4>
            {language.map((g, idx) => {
              const found = lanList.find((item) => item.code === g.key);
              return (
                <div key={idx}>
                  {found.english}: {g.count}
                </div>
              );
            })}
            <h4>genre</h4>
            {genre.map((g, idx) => {
              const found = props.genres.find(
                (item) => item.id === parseInt(g.key)
              );
              return (
                <div key={idx}>
                  {found.name}: {g.count}
                </div>
              );
            })}
          </Analyser>
          <Recommendations>
            <h3>Based on your ratings we recommend</h3>
            {discovered && discovered.length > 0 && (
              <Section2>
                {discovered.map((movie) => (
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
              </Section2>
            )}
          </Recommendations>
          {props.liked && props.liked.length > 0 && (
            <Section2 title="Liked Movies">
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
            </Section2>
          )}
          {props.disliked && props.disliked.length > 0 && (
            <Section2 title="Disliked Movies">
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
            </Section2>
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

export default connect(mapStateToProps, null)(ProfilePresenter);
