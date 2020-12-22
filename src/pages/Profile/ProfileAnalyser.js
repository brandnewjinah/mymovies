import React from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";

//data
import { lanList } from "../../data/language";

const Analyser = ({
  total,
  liked,
  disliked,
  filterAllMovies,
  filterLikedMovies,
  filterDislikedMovies,
  topGenres,
  availGenres,
  filterGenre1,
  filterGenre2,
  filterGenre3,
  language,
  filterLanguage1,
  filterLanguage2,
  filterLanguage3,
  crew,
  keywords,
}) => {
  return (
    <Container>
      <Section>
        <h4>
          Out of <Underline onClick={filterAllMovies}>{total}</Underline> movies
          watched, I liked{" "}
          <Underline onClick={filterLikedMovies}>{liked}</Underline> and
          disliked{" "}
          <Underline onClick={filterDislikedMovies}>{disliked}</Underline>{" "}
          movies. My favorite genres are{" "}
          {topGenres.slice(0, 3).map((g, idx, arr) => {
            const likedGenres = availGenres.find(
              (item) => item.id === parseInt(g.key)
            );
            if (arr.length === 1) {
              return (
                <span key={idx}>
                  <Underline onClick={() => filterGenre1(likedGenres.id)}>
                    {likedGenres.name}
                  </Underline>
                  .
                </span>
              );
            } else if (arr.length - 1 === idx) {
              return (
                <span key={idx}>
                  and{" "}
                  <Underline onClick={() => filterGenre2(likedGenres.id)}>
                    {likedGenres.name}
                  </Underline>
                  .{" "}
                </span>
              );
            } else {
              return (
                <span key={idx}>
                  <Underline onClick={() => filterGenre3(likedGenres.id)}>
                    {likedGenres.name}
                  </Underline>
                  ,{" "}
                </span>
              );
            }
          })}
          I watched primarily in{" "}
          {language.slice(0, 3).map((g, idx, arr) => {
            const likedLanguage = lanList.find((item) => item.code === g.key);
            if (arr.length === 1) {
              return (
                <span key={idx}>
                  <Underline
                    onClick={() => filterLanguage1(likedLanguage.code)}
                  >
                    {likedLanguage.english}
                  </Underline>
                  .
                </span>
              );
            } else if (arr.length - 1 === idx) {
              return (
                <span key={idx}>
                  and{" "}
                  <Underline
                    onClick={() => filterLanguage2(likedLanguage.code)}
                  >
                    {likedLanguage.english}
                  </Underline>
                  .{" "}
                </span>
              );
            } else {
              return (
                <span key={idx}>
                  <Underline
                    onClick={() => filterLanguage3(likedLanguage.code)}
                  >
                    {likedLanguage.english}
                  </Underline>
                  ,{" "}
                </span>
              );
            }
          })}
        </h4>
      </Section>
      <Section>
        <h4>
          The directors I like are{" "}
          {crew.slice(0, 3).map((c, idx, arr) => {
            if (arr.length === 1) {
              return (
                <span key={idx}>
                  <Link to={`/director/${c.id}`}>
                    <Underline>{c.name}</Underline>
                  </Link>
                  .
                </span>
              );
            } else if (arr.length - 1 === idx) {
              return (
                <span key={idx}>
                  and{" "}
                  <Link to={`/director/${c.id}`}>
                    <Underline>{c.name}</Underline>
                  </Link>
                  .{" "}
                </span>
              );
            } else {
              return (
                <span key={idx}>
                  <Link to={`/director/${c.id}`}>
                    <Underline>{c.name}</Underline>
                  </Link>
                  ,{" "}
                </span>
              );
            }
          })}
        </h4>
      </Section>
      <Section>
        {keywords && keywords.length > 0 && (
          <h6>
            Some of the topics I enjoy the most are{" "}
            {keywords.slice(0, 3).map((k, idx, arr) => {
              if (arr.length === 1) {
                return (
                  <span key={idx}>
                    <Link to={`/keyword/${k.id}`}>
                      <Underline>{k.name}</Underline>
                    </Link>
                    .
                  </span>
                );
              } else if (arr.length - 1 === idx) {
                return (
                  <span key={idx}>
                    and{" "}
                    <Link to={`/keyword/${k.id}`}>
                      <Underline>{k.name}</Underline>
                    </Link>
                    .{" "}
                  </span>
                );
              } else {
                return (
                  <span key={idx}>
                    <Link to={`/keyword/${k.id}`}>
                      <Underline>{k.name}</Underline>
                    </Link>
                    ,{" "}
                  </span>
                );
              }
            })}
          </h6>
        )}
      </Section>
    </Container>
  );
};

const Container = styled.div`
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
`;

const Section = styled.div``;

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

export default Analyser;
