import React from "react";
import styled from "styled-components";

//import utils
import { getGenre } from "../../util/getGenres";

//import components
import Indicator from "../../components/placeholder/Indicator";
import { Grid2 } from "../../components/Grid";
import Poster from "../../components/Poster";
import Pagination2 from "../../components/Pagination2";
import { SearchIcon } from "../../assets/Icons";

const Search = (props) => {
  return (
    <Container>
      <Form onSubmit={props.onSubmit}>
        <SearchIcon width="20" height="20" color="#000" stroke="2" />
        <Input
          placeholder="Search Movies"
          value={props.keyword}
          onChange={props.onChange}
        />
      </Form>
      {props.loading ? (
        <Indicator />
      ) : (
        <>
          {props.results && props.results.length > 0 && (
            <>
              <Grid2 title="Movie Results">
                {props.results.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    genre={getGenre(props.genres, movie.genre_ids)}
                    isMovie={true}
                  />
                ))}
              </Grid2>
              <Pagination2
                page={props.page}
                total_pages={props.total_pages}
                handlePage={(page) => props.handlePage(page)}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 2rem auto 0;

  @media (max-width: 1200px) {
    padding: 0 2em;
  }

  @media (max-width: 425px) {
    padding: 0 1em;
  }
`;

const Form = styled.form`
  position: relative;
  margin-bottom: 50px;
  width: 100%;

  svg {
    position: absolute;
    top: 5px;
    left: 10px;
  }
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
  padding-left: 3rem;
`;

export default Search;
