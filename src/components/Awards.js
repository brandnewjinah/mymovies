import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//data
import { Oscars } from "../data/awards";

//styles and assets
import styled from "styled-components";

const Awards = ({ movie }) => {
  const [award, setAward] = useState({});

  const checkAwards = () => {
    const collection = Oscars.find((c) =>
      c.winners.find((m) => m.id === movie)
    );
    setAward(collection);
    // setAward(Oscars);
  };

  useEffect(() => {
    checkAwards();
  }, [movie]);

  return (
    <>
      {award && (
        <Container>
          <Link to={`/collection/${award.year}`}>
            <div>
              <span>{award && award.year} </span>
              <span>{award && award.name}</span>
            </div>
          </Link>
          <Winner>
            {award &&
              award.winners &&
              award.winners
                .filter((m) => m.id === movie)
                .map((m, idx) => <span key={idx}>{m.award}</span>)}
          </Winner>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  font-size: 0.875rem;
  line-height: 1.125rem;
`;

const Winner = styled.div`
  span {
    &:not(:last-child):after {
      content: ", ";
    }
  }
`;

export default Awards;
