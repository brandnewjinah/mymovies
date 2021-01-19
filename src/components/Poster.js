import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Film } from "../assets/Icons";
import { gray } from "./Colors";

const Poster = ({ id, imageUrl, title, year }) => {
  const [emptyImg, setEmptyImg] = useState(false);

  const handleNoImg = (e) => {
    if (e.type === "error") {
      setEmptyImg(true);
    }
  };

  return (
    <Link to={`/movie/${id}`}>
      <Container>
        <ImageContainer>
          {emptyImg ? (
            <EmptyImg>
              <Film width="24" height="24" color="#000" stroke="2" />
            </EmptyImg>
          ) : (
            <Image
              onError={handleNoImg}
              src={
                imageUrl
                  ? `https://image.tmdb.org/t/p/w500${imageUrl}`
                  : setEmptyImg(true)
              }
            />
          )}
        </ImageContainer>

        <Detail>
          <div className="content">
            <h6 className="title">
              {title.length > 15 ? `${title.substring(0, 17)}...` : title}
            </h6>
            <h6 className="titleMobile">{title}</h6>
            <p>{year.substring(0, 4)}</p>
          </div>
        </Detail>
      </Container>
    </Link>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: opacity 0.1s linear;
`;

const EmptyImg = styled(Flex)`
  justify-content: center;
  width: 202px;
  height: 304px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled(Flex)`
  position: relative;
  height: auto;

  &:hover {
    ${Image} {
      opacity: 0.3;
    }
  }

  @media (max-width: 540px) {
    height: 100%;
    flex: 0 1 40%;

    &:hover {
      ${Image} {
        opacity: 1;
      }
    }
  }
`;

const Detail = styled(Flex)`
  width: 100%;
  height: 21%;
  flex-direction: column;
  justify-content: start;
  text-align: center;

  h6 {
    margin: 0.5em 0 0.25em;
    display: inline-block;
    width: 100%;
  }

  p {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .content {
    width: 100%;
    cursor: pointer;
  }

  .title {
    display: inline-block;
  }

  .titleMobile {
    display: none;
  }

  .ratingmobile {
    display: none;
  }

  @media (max-width: 540px) {
    height: 100%;
    justify-content: center;

    h6 {
      font-size: 0.875rem;
    }

    .title {
      display: none;
    }

    .titleMobile {
      display: block;
      line-height: 1.25rem;
    }

    .ratingmobile {
      display: flex;

      div {
        display: flex;
        background-color: ${gray.darkgray};
        padding: 0.5em;
        border-radius: 100%;
        margin: 1em 1em 0 0;
        cursor: pointer;
      }
    }
  }
`;

Poster.propTyes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  year: PropTypes.string,
};

export default Poster;
