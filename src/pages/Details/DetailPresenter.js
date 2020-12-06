import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

import Indicator from "../../components/Indicator";
import Poster from "../../components/Poster";
import Section from "../../components/Section";
import Awards from "../../components/Awards";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../store/movies";

//import styles
import styled from "styled-components";
import { Heart, BrokenHeart, Play } from "../../assets/Icons";

const DetailPresenter = (props) => {
  const [isOpen, setOpen] = useState(false);

  const handleLike = (movie) => {
    props.likeItem(movie);
  };

  const handleDislike = (movie) => {
    props.dislikeItem(movie);
  };

  return props.loading ? (
    <>
      <Indicator />
      <Helmet>
        <title>Loading | Movie Rate</title>
      </Helmet>
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {props.result.title ? props.result.title : props.result.original_name}
          | Movie Rate
        </title>
      </Helmet>
      {/* <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      /> */}
      <Content>
        <Header>
          <ImageContainer>
            <Image
              src={
                props.result.poster_path
                  ? `https://image.tmdb.org/t/p/original${props.result.poster_path}`
                  : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
              }
            />
            {props.result.videos.results &&
              props.result.videos.results.length > 0 && (
                <>
                  <ModalVideo
                    channel="youtube"
                    autoplay
                    isOpen={isOpen}
                    videoId={props.result.videos.results[0].key}
                    onClose={() => setOpen(false)}
                  />
                  <Video onClick={() => setOpen(true)}>
                    <Play width="50" height="50" fill="#eee" />
                  </Video>
                </>
              )}
          </ImageContainer>
          <Data>
            <Title>
              {props.result.title
                ? props.result.title
                : props.result.original_name}
            </Title>
            <Subtitle>
              {props.result.original_title && props.result.original_title}
            </Subtitle>
            <ItemContainer>
              <Item>
                {props.result.release_date
                  ? props.result.release_date.substring(0, 4)
                  : props.result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {props.result.genres &&
                  props.result.genres.map((genre, index) => (
                    <Link to={`/category/${genre.id}`}>
                      <span>{genre.name}</span>
                    </Link>
                  ))}
              </Item>

              <Rate>
                <div
                  style={
                    props.liked &&
                    props.liked.find((item) => item.id === props.result.id)
                      ? { backgroundColor: "#91b04f" }
                      : null
                  }
                  onClick={() => handleLike(props.result)}
                >
                  <Heart width="26" height="26" fill="#fff" />
                </div>
                <div
                  style={
                    props.disliked &&
                    props.disliked.find((item) => item.id === props.result.id)
                      ? { backgroundColor: "#de7747" }
                      : null
                  }
                  onClick={() => handleDislike(props.result)}
                >
                  <BrokenHeart width="26" height="26" fill="#fff" />
                </div>
              </Rate>
            </ItemContainer>
            <Overview>{props.result.overview}</Overview>
            <Part>
              <div>
                <Awards movie={props.result.id} />
              </div>
              {/* {Oscars.filter((m) =>
                m.winners.find((m) => m.id === props.result.id)
              ).map((m) => m.winners.map((m) => <div>{m.award}</div>))} */}
            </Part>
          </Data>
        </Header>
        {props.similar && props.similar.length > 0 && (
          <Section title="Similar">
            {props.similar.slice(0, 5).map((movie) => (
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
  height: 50%;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 150px,
      rgba(255, 255, 255, 0.84) 100%
    ),
    url(${(props) => props.bgImage});
  /* background-position: center; */
  background-size: cover;
  /* filter: blur(3px); */
  /* opacity: 0.5; */
  z-index: 0;
`;

const Content = styled.div`
  margin: 6em auto;
  width: 100%;
  max-width: 1260px;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: auto;
  border-radius: 5px;
  margin-right: 30px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  transition: opacity 0.1s linear;
`;

const Video = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 0.6;
  }
`;

const ImageContainer = styled.div`
  width: 25%;
  position: relative;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 4em;
`;

const Title = styled.h3`
  font-size: 2rem;
`;

const Subtitle = styled.h3`
  font-size: 1rem;
  margin: 0.65em 0;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 16px;

  a {
    &:not(:last-child):after {
      content: ", ";
    }
  }
`;

const Part = styled.div`
  font-size: 16px;
  margin: 1.5em 0;
`;

const Rate = styled.span`
  display: flex;
  margin: 2em 0;
  div {
    margin-right: 1em;
    padding: 1em;
    cursor: pointer;
    background-color: #999999;
    border-radius: 100%;
    display: flex;
  }
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 15px;
  opacity: 0.8;
  line-height: 1.5;
`;

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
    disliked: state.disliked,
  };
};

export default connect(mapStateToProps, { likeItem, dislikeItem })(
  DetailPresenter
);