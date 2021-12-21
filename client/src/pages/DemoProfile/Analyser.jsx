import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { breakpoint, fontSize } from "../../components/token";

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
  filterGenre,
  language,
  filterLanguage,
  crews,
  keywords,
}) => {
  return (
    <Container>
      <Section>
        <p>
          Out of <Underline onClick={filterAllMovies}>{total}</Underline> movies
          watched, I liked{" "}
          <Underline onClick={filterLikedMovies}>{liked}</Underline> and
          disliked{" "}
          <Underline onClick={filterDislikedMovies}>{disliked}</Underline>{" "}
          movies. My favorite genres are{" "}
          {topGenres.map((genre, idx, arr) => {
            const likedGenres = availGenres.find(
              (item) => item.id === parseInt(genre.key)
            );
            if (arr.length === 1) {
              return (
                <span key={idx}>
                  <Underline onClick={() => filterGenre(likedGenres.id)}>
                    {likedGenres.name}
                  </Underline>
                  .
                </span>
              );
            } else if (arr.length - 1 === idx) {
              return (
                <span key={idx}>
                  and{" "}
                  <Underline onClick={() => filterGenre(likedGenres.id)}>
                    {likedGenres.name}
                  </Underline>
                  .{" "}
                </span>
              );
            } else {
              return (
                <span key={idx}>
                  <Underline onClick={() => filterGenre(likedGenres.id)}>
                    {likedGenres.name}
                  </Underline>
                  ,{" "}
                </span>
              );
            }
          })}
          I watched primarily in{" "}
          {language.map((lan, idx, arr) => {
            const likedLanguage = lanList.find((item) => item.code === lan.key);
            if (arr.length === 1) {
              return (
                <span key={idx}>
                  <Underline onClick={() => filterLanguage(likedLanguage.code)}>
                    {likedLanguage.english}
                  </Underline>
                  .
                </span>
              );
            } else if (arr.length - 1 === idx) {
              return (
                <span key={idx}>
                  and{" "}
                  <Underline onClick={() => filterLanguage(likedLanguage.code)}>
                    {likedLanguage.english}
                  </Underline>
                  .{" "}
                </span>
              );
            } else {
              return (
                <span key={idx}>
                  <Underline onClick={() => filterLanguage(likedLanguage.code)}>
                    {likedLanguage.english}
                  </Underline>
                  ,{" "}
                </span>
              );
            }
          })}
        </p>
      </Section>
      <Section>
        <p>
          The directors I like are{" "}
          {crews.map((crew, idx, arr) => {
            if (arr.length === 1) {
              return (
                <span key={idx}>
                  <Link to={`/movies/director/${crew.id}`}>
                    <Underline>{crew.name}</Underline>
                  </Link>
                  .
                </span>
              );
            } else if (arr.length - 1 === idx) {
              return (
                <span key={idx}>
                  and{" "}
                  <Link to={`/movies/director/${crew.id}`}>
                    <Underline>{crew.name}</Underline>
                  </Link>
                  .{" "}
                </span>
              );
            } else {
              return (
                <span key={idx}>
                  <Link to={`/movies/director/${crew.id}`}>
                    <Underline>{crew.name}</Underline>
                  </Link>
                  ,{" "}
                </span>
              );
            }
          })}
        </p>
      </Section>
      <Section>
        {keywords && keywords.length > 0 && (
          <p>
            Some of the topics I enjoy the most are{" "}
            {keywords.slice(0, 3).map((k, idx, arr) => {
              if (arr.length === 1) {
                return (
                  <span key={idx}>
                    <Link to={`/movies/keyword/${k.id}`}>
                      <Underline>{k.name}</Underline>
                    </Link>
                    .
                  </span>
                );
              } else if (arr.length - 1 === idx) {
                return (
                  <span key={idx}>
                    and{" "}
                    <Link to={`/movies/keyword/${k.id}`}>
                      <Underline>{k.name}</Underline>
                    </Link>
                    .{" "}
                  </span>
                );
              } else {
                return (
                  <span key={idx}>
                    <Link to={`/movies/keyword/${k.id}`}>
                      <Underline>{k.name}</Underline>
                    </Link>
                    ,{" "}
                  </span>
                );
              }
            })}
          </p>
        )}
      </Section>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  padding: 0 2rem 2rem;
`;

const Section = styled.section`
  p {
    font-size: ${fontSize.lg1};
    font-weight: 500;
    line-height: 2rem;
    margin: 1.75em 0;
  }

  @media ${breakpoint.m} {
    padding: 0 1rem;
  }
`;

const Underline = styled.span`
  position: relative;
  cursor: pointer;
  white-space: nowrap;

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
