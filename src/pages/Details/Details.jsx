import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

//components
import Placeholder from "../../components/placeholder/Details";
import Rate from "../../components/Rate";
import Chips from "../../components/Chips";
import ImageComponent from "./ImageComponent";
import Recommend from "../../components/Recommend";

//token
import {
  breakpoint,
  neutral,
  primaryColors,
  size,
} from "../../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails } from "../../redux/detailsRedux";
import { dislikeMovie, likeMovie } from "../../redux/rateRedux";
import { getKeywords, saveKeyword } from "../../redux/keywordRedux";
import { getRecommened } from "../../redux/movieRedux";

const Details = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  let { id } = useParams();
  id = parseInt(id);

  useEffect(() => {
    dispatch(getMovieDetails(id));
    dispatch(getKeywords(id));
    dispatch(getRecommened(id));
  }, [dispatch, id]);

  const { loading, ...details } = useSelector((state) => state.details);
  const rate = useSelector((state) => state.rate);
  const keyword = useSelector((state) => state.keyword);
  const { recommended } = useSelector((state) => state.movie);

  const liked =
    rate.liked && rate.liked.find((item) => item.id === parseInt(id))
      ? true
      : false;

  const disliked =
    rate.disliked && rate.disliked.find((item) => item.id === parseInt(id))
      ? true
      : false;

  const filterKeywords = () => {
    const arr = keyword.myKeywords;
    const filtered = arr.filter((f) => f.movies.includes(id));
    return filtered;
  };

  return (
    <Container>
      {loading ? (
        <Placeholder />
      ) : (
        <>
          <Main>
            <Info>
              <Header>
                <h4>{details.title ? details.title : details.original_name}</h4>
                <div className="info">
                  <div>
                    {details.release_date
                      ? details.release_date.substring(0, 4)
                      : details.first_air_date.substring(0, 4)}
                  </div>
                  <div>
                    {details.genres &&
                      details.genres.map((genre, index) => (
                        <Link to={`/movies/genre/${genre.id}`} key={index}>
                          <span>{genre.name}</span>
                        </Link>
                      ))}
                  </div>
                </div>
              </Header>
              <Plot>{details.overview}</Plot>
              <Rate
                liked={liked}
                disliked={disliked}
                handleLike={() => dispatch(likeMovie(id))}
                handleDislike={() => dispatch(dislikeMovie(id))}
              />

              <Section>
                <header>Keywords</header>
                {liked && (
                  <p className="caption">
                    Please tell us why you liked this movie by highlighting the
                    check mark next to applicable keyword.
                  </p>
                )}
                <div className="group">
                  {keyword.keywords.map((keyword, idx) => (
                    <Chips
                      key={idx}
                      label={keyword.name}
                      url={keyword.id}
                      liked={liked}
                      saved={
                        filterKeywords().find((item) => item.id === keyword.id)
                          ? true
                          : false
                      }
                      saveKeyword={() =>
                        dispatch(saveKeyword({ ...keyword, movieId: id }))
                      }
                    />
                  ))}
                </div>
              </Section>
            </Info>
            <ImageContainer>
              <ImageComponent
                img={details.poster_path}
                video={details.videos.results}
                handleOpen={() => setOpen(true)}
                handleClose={() => setOpen(false)}
                isOpen={isOpen}
              />
            </ImageContainer>
          </Main>
          {recommended && recommended.length > 0 && (
            <RecommendContainer>
              <Recommend
                data={recommended && recommended}
                title="You may also like"
              />
            </RecommendContainer>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: ${size.xlg};
  margin: 7em auto;
  padding-bottom: 3em;

  @media ${breakpoint.lg} {
    padding: 0 2rem 3rem;
  }
`;

const Main = styled.section`
  display: flex;
  gap: 6rem;
  justify-content: space-between;

  @media ${breakpoint.lg} {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Info = styled.div`
  flex: 3;
  font-size: 0.875rem;

  @media ${breakpoint.lg} {
    width: 100%;
    order: 2;
    margin: 0;
    padding: 1em 0;
  }
`;

const Header = styled.header`
  .info {
    display: flex;
    font-weight: 500;
    color: ${primaryColors.cornflower};
    margin: 1rem 0;

    div {
      &:not(:last-child):after {
        content: " • ";
        color: ${neutral[200]};
        margin: 0 0.875rem;
      }
    }

    a {
      &:not(:last-child):after {
        content: ", ";
        color: ${neutral[200]};
      }
    }
  }
`;

const Plot = styled.div`
  color: ${neutral[500]};
  line-height: 1.5rem;
`;

const ImageContainer = styled.div`
  flex: 2;

  @media ${breakpoint.lg} {
    order: 1;
    width: 100%;
    padding-left: 0;
  }
`;

const Section = styled.section`
  border-top: 1px solid ${neutral[100]};
  padding: 1rem 0;
  margin-top: 2rem;

  header {
    font-weight: 600;
    text-transform: uppercase;
  }

  .caption {
    font-size: 0.75rem;
    color: ${neutral[400]};
    padding: 0 0 0.5rem;
  }
`;

const RecommendContainer = styled.section`
  width: 100%;
  padding-top: 2em;
`;

export default Details;
