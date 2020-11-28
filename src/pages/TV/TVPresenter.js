import React from "react";
import PropTypes from "prop-types";

//import components
import Section from "../../components/Section";
import Indicator from "../../components/Indicator";

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
            <span>{show.name}</span>
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular">
          {popular.map((show) => (
            <span>{show.name}</span>
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated">
          {topRated.map((show) => (
            <span>{show.name}</span>
          ))}
        </Section>
      )}
      {thisWeek && thisWeek.length > 0 && (
        <Section title="This Week">
          {thisWeek.map((show) => (
            <span>{show.name}</span>
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
