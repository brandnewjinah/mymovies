import React from "react";
import PropTypes from "prop-types";

import Indicator from "../../components/Indicator";
import Poster from "../../components/Poster";
import Section from "../../components/Section";

//import styles
import styled from "styled-components";

const DetailPresenter = ({
  result,
  loading,
  resultError,
  similar,
  similarError,
}) => {
  return loading ? (
    <Indicator />
  ) : (
    <Container>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {console.log(result)}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {similar && similar.length > 0 && (
            <Section title="Similar">
              {similar.slice(0, 5).map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
        </Data>
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  result: PropTypes.object,
  resultError: PropTypes.string,
  similar: PropTypes.array,
  similarError: PropTypes.string,
};

const Container = styled.div`
  /* margin: 6em auto; */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
  margin-right: 30px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 16px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 15px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

export default DetailPresenter;
