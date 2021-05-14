import React, { useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

//import components
import Placeholder from "../../components/placeholders/Detail";
import ImageComponent from "./ImageComponent";
import Rate from "../../components/Rate";
import Awards from "../../components/Awards";
import Chips from "../../components/Chips";
import Recommend from "../../components/Recommend";

//import styles
import styled from "styled-components";
import {
  neutral,
  primaryColors,
  size,
  breakpoint,
} from "../../components/Token";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../store/movies";
import { addKeyword } from "../../reducers/keywordReducer";

const DetailPresenter = (props) => {
  const [isOpen, setOpen] = useState(false);

  const liked =
    props.liked && props.liked.find((item) => item.id === props.result.id)
      ? true
      : false;

  const disliked =
    props.disliked && props.disliked.find((item) => item.id === props.result.id)
      ? true
      : false;

  const handleLike = (movie) => {
    const thisMovie = {
      ...movie,
      director: { name: props.credits.name, id: props.credits.id },
    };
    props.likeItem(thisMovie);
  };

  const handleDislike = (movie) => {
    props.dislikeItem(movie);
  };

  const saveKeyword = (k) => {
    let key = { ...k, movieId: props.result.id };
    props.addKeyword(key);
  };

  //first filter all keywords that this movie is included in
  //then use that filtered arr to test in chips

  const filterKeywords = () => {
    const arr = props.keywords;
    const filtered = arr.filter((f) => f.movies.includes(props.result.id));
    return filtered;
  };

  return props.loading ? (
    <>
      <Placeholder />
      <Helmet>
        <title>Loading | Movie Rate</title>
      </Helmet>
    </>
  ) : (
    <Wrapper>
      <Helmet>
        <title>
          {props.result.title ? props.result.title : props.result.original_name}{" "}
          | MyMovie
        </title>
      </Helmet>
      <Content>
        <Main>
          <Data>
            <Header>
              {/* if original title exists in other language<Subtitle>
              {props.result.original_title && props.result.original_title}
            </Subtitle> */}
              <h4>
                {props.result.title
                  ? props.result.title
                  : props.result.original_name}
              </h4>
              <div className="info">
                <div>
                  {props.result.release_date
                    ? props.result.release_date.substring(0, 4)
                    : props.result.first_air_date.substring(0, 4)}
                </div>
                <div>
                  {props.result.genres &&
                    props.result.genres.map((genre, index) => (
                      <Link to={`/category/${genre.id}`} key={index}>
                        <span>{genre.name}</span>
                      </Link>
                    ))}
                </div>
                {/* <div>
                  <Link to={`/director/${props.credits.id}`}>
                    <span>Directed by </span>
                    <span>{props.credits.name}</span>
                  </Link>
                </div> */}
              </div>
            </Header>
            <Plot>{props.result.overview}</Plot>
            <Rate
              liked={liked}
              disliked={disliked}
              handleLike={() => handleLike(props.result)}
              handleDislike={() => handleDislike(props.result)}
            />
            <Awards movie={props.result.id} />
            {props.keyword.keywords && props.keyword.keywords.length > 0 && (
              <Section>
                <p className="header">Keywords</p>
                {liked && (
                  <p className="caption">
                    Please tell us why you liked this movie by highlighting the
                    check mark next to applicable keyword.
                  </p>
                )}

                <div className="group">
                  {props.keyword.keywords.map((k, idx) => (
                    <Chips
                      key={idx}
                      label={k.name}
                      url={k.id}
                      liked={liked}
                      saved={
                        filterKeywords().find((item) => item.id === k.id)
                          ? true
                          : false
                      }
                      saveKeyword={() => saveKeyword(k)}
                    />
                  ))}
                </div>
              </Section>
            )}
          </Data>
          <ImageContainer>
            <ImageComponent
              img={props.result.poster_path}
              video={props.result.videos.results}
              handleOpen={() => setOpen(true)}
              handleClose={() => setOpen(false)}
              isOpen={isOpen}
            />
          </ImageContainer>
        </Main>
        {props.recommend && props.recommend.length > 0 && (
          <RecommendContainer>
            <Recommend
              data={props.recommend && props.recommend}
              title="You may also like"
            />
          </RecommendContainer>
        )}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: ${size.xlg};
  margin: 7em auto;
  padding-bottom: 3em;

  h5 {
    font-weight: 600;
  }

  @media (max-width: 1180px) {
    padding: 0 2em 3em;
  }
`;

const Content = styled.div`
  /* width: 100%;
  height: 100%; */
`;

const Main = styled.main`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Data = styled.div`
  width: 58.5%;
  font-size: 0.875rem;
  padding-right: 5%;

  @media (max-width: 768px) {
    width: 100%;
    order: 2;
    margin: 0;
    padding: 1em 0;
  }
`;

const Header = styled.header`
  a {
    &:not(:last-child):after {
      content: ", ";
      color: ${neutral[200]};
    }
  }

  .info {
    display: flex;
    font-weight: 500;
    color: ${primaryColors.cornflower};
    margin: 1em 0;

    div {
      &:not(:last-child):after {
        content: " • ";
        color: ${neutral[200]};
        margin: 0 10px;
      }
    }
  }

  @media ${breakpoint.m} {
  }
`;

const Plot = styled.div`
  color: ${neutral[500]};
  line-height: 1.5rem;
`;

const Section = styled.div`
  border-top: 1px solid ${neutral[100]};
  padding: 2em 0;
  margin-top: 2em;
  /* background-color: lightcyan; */

  .header {
    font-weight: 600;
    text-transform: uppercase;
  }

  .caption {
    font-size: 0.75rem;
    color: ${neutral[400]};
  }

  .group {
    margin: 1em 0;
  }

  span {
    display: inline-block;
    background-color: #eee;
    padding: 0.3em 0.75em 0.3em 0.75em;
    border-radius: 1em;
    margin: 0.5em;

    &:first-child {
      margin-left: 0;
    }
  }

  h6 {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 2em 0 0;
  }
`;

const ImageContainer = styled.div`
  width: 41.5%;
  position: relative;
  padding-left: 5%;

  @media (max-width: 768px) {
    order: 1;
    width: 100%;
    padding-left: 0;
  }
`;

const RecommendContainer = styled.div`
  padding-top: 2em;
`;

DetailPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  result: PropTypes.object,
  resultError: PropTypes.string,
  recommend: PropTypes.array,
  recommendError: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    liked: state.rate.liked,
    disliked: state.rate.disliked,
    keywords: state.keywords.myKeywords,
  };
};

export default connect(mapStateToProps, {
  likeItem,
  dislikeItem,
  addKeyword,
})(DetailPresenter);
