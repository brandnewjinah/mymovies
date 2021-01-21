import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//data
import { Oscars } from "../data/awards";

//styles and assets
import styled from "styled-components";
import { gray } from "./Colors";

const Awards = ({ movie }) => {
  const [award, setAward] = useState({});

  useEffect(() => {
    const checkAwards = () => {
      const collection = Oscars.find((c) =>
        c.winners.find((m) => m.id === movie)
      );
      setAward(collection);
      // setAward(Oscars);
    };

    checkAwards();
  }, [movie]);

  return (
    <>
      {award && (
        <Container>
          <p className="title">Awards</p>
          <Section>
            <Link to={`/collection/${award.year}`}>
              <div className="award">
                <span>{award && award.year} </span>
                <span>{award && award.name}</span>
              </div>
            </Link>
            <div className="winner">
              {award &&
                award.winners &&
                award.winners
                  .filter((m) => m.id === movie)
                  .map((m, idx) => (
                    <Link to={`/collection/${m.award_id}`}>
                      <span key={idx}>{m.award}</span>
                    </Link>
                  ))}
            </div>
          </Section>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  border-top: 1px solid ${gray.lightergray};
  padding-top: 2em;
  margin-top: 2em;
  /* background-color: lightgoldenrodyellow; */

  .title {
    font-weight: 600;
    text-transform: uppercase;
    margin: 0.5em 0;
  }
`;

const Section = styled.div`
  color: ${gray.darkergray};
  line-height: 1.5rem;

  .award {
    text-transform: uppercase;
    font-weight: 500;
  }

  .winner {
    a {
      &:not(:last-child):after {
        content: " • ";
        color: ${gray.gray};
      }
    }
  }
`;

export default Awards;
