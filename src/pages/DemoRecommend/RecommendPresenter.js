import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

//import components
import Recommend from "../../components/Recommend";
import Placeholder from "../../components/placeholders/Recommned";

//import styles and assets
import styled from "styled-components";
import { primary } from "../../components/Colors";

const RecommendPresenter = (props) => {
  return (
    <Container>
      {props.loading ? (
        <Placeholder />
      ) : (
        <>
          <Header>
            <h5>Demo Recommendations</h5>
            <div>
              <span>To see recommendations for you, </span>
              <Link to="/rate">
                <span className="link">rate at least 10 movies</span>
              </Link>
            </div>
          </Header>
          <Section>
            {props.basedonLiked && props.basedonLiked.length > 0 && (
              <Recommend
                data={props.basedonLiked && props.basedonLiked}
                title={`Because you liked ${props.likedMovie.title}`}
              />
            )}
          </Section>
          <Section>
            {props.basedonKeyword && props.basedonKeyword.length > 0 && (
              <Recommend
                data={props.basedonKeyword && props.basedonKeyword}
                title={`Because you liked keyword: ${props.topKeyword.name}`}
              />
            )}
          </Section>
          <Section>
            {props.basedonGenres && props.basedonGenres.length > 0 && (
              <Recommend
                data={props.basedonGenres && props.basedonGenres}
                title={`Because you like ${props.currentGenre}`}
                genres={props.genres}
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${primary.blue};
  padding: 0.5em 0;

  h5 {
    text-align: center;
    margin-bottom: 0.25em;
  }

  .link {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
  }
`;

const Section = styled.div`
  margin: 3em 0 4em;

  @media (max-width: 768px) {
    margin: 3em 0;
  }
`;

export default RecommendPresenter;
