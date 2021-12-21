import React from "react";
import styled from "styled-components";

//comp
import { Header } from "../../components/Header";
import Recommend from "../../components/Recommend";
import { breakpoint } from "../../components/token";

const Recommendation = (props) => {
  return (
    <>
      <Header
        title="Demo Recommendations"
        subtitle="Rate 10 movies to get personalized recommendations"
      />
      <Main>
        <Section>
          <Recommend
            data={props.basedOnLiked && props.basedOnLiked}
            title={`Because you liked ${props.recommend.likedMovie1}`}
          />
        </Section>
        <Section>
          <Recommend
            data={props.basedOnKeyword && props.basedOnKeyword}
            title={`Because you like keyword: ${props.keyword.first}`}
          />
        </Section>
        <Section>
          <Recommend
            data={props.basedOnGenre && props.basedOnGenre}
            title={`Because you like ${props.recommend.favoriteGenre}`}
          />
        </Section>
        <Section>
          <Recommend
            data={props.basedOnLiked2 && props.basedOnLiked2}
            title={`Because you liked ${props.recommend.likedMovie2}`}
          />
        </Section>
      </Main>
    </>
  );
};

const Main = styled.div`
  @media ${breakpoint.xlg} {
    padding: 0 1rem;
  }
`;

const Section = styled.section`
  padding: 2rem 0;
`;

export default Recommendation;
