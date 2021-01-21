import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Film } from "../assets/Icons";
import { gray } from "./Colors";

const Poster = ({ id, imageUrl, title, year, genre }) => {
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
          <p className="title">{title}</p>
          <p>{year.substring(0, 4)}</p>
          <p>
            {genre && genre.join(" \u00B7 ").length > 20
              ? `${genre && genre.join(" \u00B7 ").substring(0, 20)}...`
              : genre && genre.join(" \u00B7 ")}
          </p>
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
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 150%;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ImageContainer = styled(Flex)`
  width: 100%;
  height: 80%;
  position: relative;

  &:hover {
    ${Image} {
      opacity: 0.5;
    }
  }
`;

const Detail = styled(Flex)`
  width: 100%;
  flex-direction: column;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.25rem;

  .title {
    width: 180px;
    display: inline-block;
    font-size: 0.95rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0.65em 0 0.25em;
  }

  @media (max-width: 1090px) {
    .title {
      width: 160px;
    }
  }

  @media (max-width: 800px) {
    .title {
      width: 130px;
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
