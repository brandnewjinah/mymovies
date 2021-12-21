import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  fontSize,
  lineHeight,
  neutral,
  primaryColors,
} from "../../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  getCollections,
  getMovieDetails,
  getWatchProviders,
} from "../../redux/detailsRedux";
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
    dispatch(getWatchProviders(id));
    dispatch(getKeywords(id));
    dispatch(getRecommened(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCollections(id));
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
    <>
      <Helmet>
        <title>{details.title}</title>
      </Helmet>
      {loading ? (
        <Placeholder />
      ) : (
        <Container>
          <Main>
            <Info>
              <Header>
                <h1>{details.title ? details.title : details.original_name}</h1>
                <div className="info">
                  <p>
                    {details.release_date
                      ? details.release_date.substring(0, 4)
                      : details.first_air_date.substring(0, 4)}
                  </p>
                  <p>
                    {details.genres &&
                      details.genres.map((genre, index) => (
                        <Link to={`/movies/genre/${genre.id}`} key={index}>
                          <span>{genre.name}</span>
                        </Link>
                      ))}
                  </p>
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
                <h3>Keywords</h3>
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
              {details.collections && details.collections.length > 0 && (
                <Section>
                  <h3>Collections</h3>
                  {details.collections.map((collection) => (
                    <CollectionLink
                      to={`/movies/collection/${collection._id}`}
                      key={collection._id}
                    >
                      {collection.name}
                    </CollectionLink>
                  ))}
                </Section>
              )}
              {details.watchProviders && details.watchProviders.length > 0 && (
                <Section>
                  <h3>Watch on</h3>
                  <p className="caption">
                    Watch information provided by{" "}
                    <a
                      href="https://www.justwatch.com/"
                      className="provider"
                      target="_blank"
                    >
                      JustWatch
                    </a>
                    .
                  </p>
                  <ProviderLogos>
                    {details.watchProviders.map((provider) => (
                      <img
                        src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                        alt="logo"
                        key={provider.logo_path}
                      />
                    ))}
                  </ProviderLogos>
                </Section>
              )}
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
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  /* padding: 2rem 0 4rem; */
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
    padding: 1rem;
  }
`;

const ProviderLogos = styled.div`
  display: flex;
  gap: 0.5rem;

  img {
    width: 40px;
    height: 40px;
    border-radius: 6px;
  }
`;

const Header = styled.header`
  h1 {
    font-size: ${fontSize.lg2};
    font-weight: 500;
  }

  .info {
    display: flex;
    font-weight: 500;
    color: ${primaryColors.cornflower};
    margin: 1rem 0;

    p {
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
  font-size: ${fontSize.sm2};
  line-height: ${lineHeight.sm2};
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

  h3 {
    font-size: ${fontSize.sm2};
    font-weight: 600;
    text-transform: uppercase;
  }

  .caption {
    font-size: 0.75rem;
    color: ${neutral[400]};
    padding: 0 0 0.5rem;
  }

  .provider {
    text-decoration: underline;
  }
`;

const CollectionLink = styled(Link)`
  display: block;
  line-height: 1.5rem;
  color: ${primaryColors.cornflower};

  :hover {
    text-decoration: underline;
  }
`;

const RecommendContainer = styled.section`
  width: 100%;
  padding-top: 2rem;

  @media ${breakpoint.lg} {
    padding: 1rem;
  }
`;

export default Details;
