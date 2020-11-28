import React from "react";
import PropTypes from "prop-types";

//import components
import Section from "../../components/Section";
import Indicator from "../../components/Indicator";
import Poster from "../../components/Poster";

//import styles and assets
import styled from "styled-components";

const TVPresenter = ({
  today,
  popular,
  topRated,
  thisWeek,
  loading,
  error,
}) => {
  return loading ? (
    <Indicator />
  ) : (
    <Container>
      {today && today.length > 0 && (
        <Section title="Airing Today">
          {today.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageurl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              year={show.first_air_date}
            />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular">
          {popular.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageurl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              year={show.first_air_date}
            />
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated">
          {topRated.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageurl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              year={show.first_air_date}
            />
          ))}
        </Section>
      )}
      {thisWeek && thisWeek.length > 0 && (
        <Section title="This Week">
          {thisWeek.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageurl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              year={show.first_air_date}
            />
          ))}
        </Section>
      )}
    </Container>
  );
};

TVPresenter.propTypes = {
  today: PropTypes.array,
  popular: PropTypes.array,
  topRated: PropTypes.array,
  thisWeek: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const Container = styled.div`
  padding: 0px 10px;
`;

export default TVPresenter;
