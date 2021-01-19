import React from "react";
import Helmet from "react-helmet";
// import PropTypes from "prop-types";

//import components
import Recommend from "../../components/Recommend";
import Placeholder from "../../components/placeholders/Recommned";

//import styles and assets
import styled from "styled-components";

const RecommendPresenter = (props) => {
  return (
    <Container>
      {props.loading ? (
        <Placeholder />
      ) : (
        <>
          <Section>
            {props.basedonLiked && props.basedonLiked.length > 0 && (
              <Recommend
                data={props.basedonLiked && props.basedonLiked}
                title={`Because you like ${props.likedMovie.title}`}
              />
            )}
          </Section>
          <Section>
            {props.basedonKeyword && props.basedonKeyword.length > 0 && (
              <Recommend
                data={props.basedonKeyword && props.basedonKeyword}
                title={`Based on your liked keyword: ${props.topKeyword.name}`}
              />
            )}
          </Section>
          <Section>
            {props.basedonGenres && props.basedonGenres.length > 0 && (
              <Recommend
                data={props.basedonGenres && props.basedonGenres}
                title={`Based on your liked genre: ${props.currentGenre}`}
              />
            )}
          </Section>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 7em auto 0;

  @media (max-width: 1180px) {
    padding: 0 2em;
  }
`;

const Section = styled.div``;

export default RecommendPresenter;
