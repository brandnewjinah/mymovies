import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Film } from "../assets/Icons";
import { primary, gray } from "./Colors";

const Poster = ({
  id,
  imageUrl,
  title,
  year,
  genre,

  toDetail,
}) => {
  const history = useHistory();
  const [emptyImg, setEmptyImg] = useState(false);

  const handleNoImg = (e) => {
    if (e.type === "error") {
      setEmptyImg(true);
    }
  };

  const pushTo = () => {
    history.push(`/movie/${id}`);
  };

  return (
    <Container
      onClick={toDetail && pushTo}
      style={toDetail && { cursor: `pointer` }}
    >
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
        <div onClick={pushTo} className="content">
          <h6>{title.length > 10 ? `${title.substring(0, 12)}...` : title}</h6>

          <p>{year.substring(0, 4)}</p>
          <p>
            {genre && genre.join(" \u00B7 ").length > 18
              ? `${genre && genre.join(" \u00B7 ").substring(0, 18)}...`
              : genre && genre.join(" \u00B7 ")}
          </p>
        </div>
      </Detail>
    </Container>
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
  height: 74%;

  &:hover {
    ${Image} {
      opacity: 0.3;
    }
  }

  @media (max-width: 540px) {
    &:hover {
      ${Image} {
        opacity: 1;
      }
    }
  }
`;

const Detail = styled(Flex)`
  width: 100%;
  height: 26%;
  flex-direction: column;
  justify-content: start;
  text-align: center;

  h6 {
    margin: 0.5em 0 0.25em;
  }

  p {
    font-size: 0.75rem;
    line-height: 1.25rem;
  }

  .content {
    cursor: pointer;
  }

  @media (max-width: 540px) {
    h6 {
      font-size: 0.875rem;
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
