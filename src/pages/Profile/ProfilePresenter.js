import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import { primary } from "../../components/Colors";

const ProfilePresenter = (props) => {
  const [language, setLanguage] = useState([]);
  const [genre, setGenre] = useState([]);
  const [display, setDisplay] = useState([...props.liked, ...props.disliked]);
  const liked = props.liked.length;
  const disliked = props.disliked.length;
  const total = liked + disliked;

  const array = props.liked;

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
      m.genre_ids &&
        m.genre_ids.forEach((el) => {
          count[el] = (count[el] || 0) + 1;
        });
    });
    array.map((m) => {
      m.genres &&
        m.genres.forEach((el) => {
          count[el.id] = (count[el.id] || 0) + 1;
        });
    });
    let result = Object.keys(count).map((e) => {
      return { key: e, count: count[e] };
    });

    const sorted = _.orderBy(result, "count", "desc");
    setGenre(sorted);
  };

  useEffect(() => {
    countLan();
    countGenre();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenre = (genre) => {
    if (genre.some((obj) => Object.keys(obj).includes("id"))) {
      const genres = genre.map((g) => {
        return g.name;
      });
      return genres.slice(0, 2);
    } else if (genre) {
      const genres = genre.map((g) => {
        const found = props.genres.find((item) => item.id === g);
        return found.name;
      });
      return genres.slice(0, 2);
    }
  };

  const loadMovies = (arr) => {
    setDisplay(arr);
  };

  const filterGenre = (id) => {
    const result = props.liked.filter(
      (m) => m.genre_ids && m.genre_ids.includes(id)
    );
    setDisplay(result);
  };

  const filterLanguage = (code) => {
    const result = props.liked.filter(
      (m) => m.original_language && m.original_language === code
    );
    setDisplay(result);
  };

  const keywordtest = () => {
    const sorted = _.orderBy(
      props.keywords,
      (key) => {
        return key.movies.length;
      },
      ["desc"]
    );
    return sorted;
  };

  return (
    <Container>
      {props.loading ? (
        <Indicator />
      ) : (
        <>
          <Header>
            <h2>My Movie Analyzer</h2>
          </Header>
          <Analyser>
            <h4>
              Out of{" "}
              <Underline
                onClick={() => loadMovies([...props.liked, ...props.disliked])}
              >
                {total}
              </Underline>{" "}
              movies watched, I liked{" "}
              <Underline onClick={() => loadMovies(props.liked)}>
                {liked}
              </Underline>{" "}
              and disliked{" "}
              <Underline onClick={() => loadMovies(props.disliked)}>
                {disliked}
              </Underline>{" "}
              movies. My favorite genre is{" "}
              {genre.slice(0, 1).map((g, idx) => {
                const found = props.genres.find(
                  (item) => item.id === parseInt(g.key)
                );
                return (
                  <Underline key={idx} onClick={() => filterGenre(found.id)}>
                    {found.name}
                  </Underline>
                );
              })}{" "}
              followed by{" "}
              {genre.slice(1, 4).map((g, idx, arr) => {
                const found = props.genres.find(
                  (item) => item.id === parseInt(g.key)
                );
                if (arr.length - 1 === idx) {
                  return (
                    <span key={idx}>
                      and{" "}
                      <Underline onClick={() => filterGenre(found.id)}>
                        {found.name}
                      </Underline>
                    </span>
                  );
                } else {
                  return (
                    <span key={idx}>
                      <Underline onClick={() => filterGenre(found.id)}>
                        {found.name}
                      </Underline>
                      ,{" "}
                    </span>
                  );
                }
              })}
              . I watched primarily in{" "}
              {language.slice(0, 1).map((g, idx) => {
                const found = lanList.find((item) => item.code === g.key);
                return (
                  <Underline
                    key={idx}
                    onClick={() => filterLanguage(found.code)}
                  >
                    {found.english}
                  </Underline>
                );
              })}{" "}
              but also watched foreign films in{" "}
              {language.slice(1).map((g, idx, arr) => {
                const found = lanList.find((item) => item.code === g.key);
                if (arr.length - 1 === idx) {
                  return (
                    found !== undefined && (
                      <span key={idx}>
                        and{" "}
                        <Underline onClick={() => filterLanguage(found.code)}>
                          {found.english}
                        </Underline>
                      </span>
                    )
                  );
                } else
                  return (
                    found !== undefined && (
                      <span key={idx}>
                        <Underline onClick={() => filterLanguage(found.code)}>
                          {found.english}
                        </Underline>
                        ,{" "}
                      </span>
                    )
                  );
              })}
              . Here are my liked movies:<span>{}</span>
            </h4>
            <h6>
              Some of the topics I enjoy the most are{" "}
              {keywordtest()
                .slice(0, 3)
                .map((k, idx, arr) =>
                  arr.length > 1 && idx === arr.length - 1 ? (
                    <span key={idx}>
                      and{" "}
                      <Link to={`/keyword/${k.id}`}>
                        <Underline>{k.name}</Underline>
                      </Link>
                      .
                    </span>
                  ) : idx === arr.length - 1 ? (
                    <Link to={`/keyword/${k.id}`}>
                      <Underline key={idx}>{k.name}</Underline>
                    </Link>
                  ) : (
                    <span key={idx}>
                      <Link to={`/keyword/${k.id}`}>
                        <Underline>{k.name}</Underline>
                      </Link>
                      ,{" "}
                    </span>
                  )
                )}
            </h6>
          </Analyser>
          <Liked>
            {/* {array && array.length > 0 && (
              <Section2>
                {array.map((movie) => (
                  <PosterList
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    genre={handleGenre(movie.genre_ids || movie.genres)}
                    toDetail={true}
                  />
                ))}
              </Section2>
            )} */}
            {display && display.length > 0 && (
              <Section2>
                {display.map((movie) => (
                  <PosterList
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    genre={handleGenre(movie.genre_ids || movie.genres)}
                    toDetail={true}
                  />
                ))}
              </Section2>
            )}
          </Liked>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  padding: 1em 0;
  margin: 5em auto;
  color: ${primary.blue};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em 0;

  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }
`;

const Analyser = styled.div`
  margin: 2em auto;
  width: 100%;
  max-width: 960px;

  h4 {
    font-size: 1.5rem;
    line-height: 2.8rem;
    letter-spacing: 0.125rem;
    margin: 1.5em 0;
    text-rendering: optimizeLegibility;
  }

  span {
    /* position: relative;
    cursor: pointer;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 3px solid #e89161;
    } */
  }
`;

const Underline = styled.span`
  position: relative;

  cursor: pointer;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 3px solid #e89161;
  }
`;

const Liked = styled.div`
  margin: 6em auto;
  width: 100%;
`;

const Graph = styled.div`
  margin: 2em auto;
  width: 100%;
  max-width: 960px;
`;

const mapStateToProps = (state) => {
  return {
    liked: state.rate.liked,
    disliked: state.rate.disliked,
    keywords: state.keywords.myKeywords,
  };
};

export default connect(mapStateToProps, null)(ProfilePresenter);
