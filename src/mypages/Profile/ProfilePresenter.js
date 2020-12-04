import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import _ from "lodash";
import { HorizontalBar } from "react-chartjs-2";

//import components
import Indicator from "../../components/Indicator";

//redux
import { connect } from "react-redux";

//data
import { lanList } from "../../data/language";

//import styles and assets
import styled from "styled-components";

const ProfilePresenter = (props) => {
  const [language, setLanguage] = useState([]);
  const [genre, setGenre] = useState([]);
  const liked = props.liked.length;
  const disliked = props.disliked.length;
  const total = liked + disliked;

  const array = props.liked;

  const countLan = () => {
    let count = {};
    array.forEach((el) => {
      count[el.original_language] = (count[el.original_language] || 0) + 1;
    });
    let result = Object.keys(count).map((e) => {
      return { key: e, count: count[e] };
    });
    const sorted = _.orderBy(result, "count", "desc");
    setLanguage(sorted);
  };

  const countGenre = () => {
    let count = {};
    array.map((m) => {
      m.genre_ids.forEach((el) => {
        count[el] = (count[el] || 0) + 1;
      });
    });
    let result = Object.keys(count).map((e) => {
      return { key: e, count: count[e] };
    });
    const sorted = _.orderBy(result, "count", "desc");
    setGenre(sorted);
  };

  useEffect(() => {
    countLan();
    countGenre();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {props.loading ? (
        <Indicator />
      ) : (
        <>
          <Analyser>
            <div>
              <HorizontalBar
                data={{
                  datasets: [
                    {
                      label: "Liked",
                      data: [(100 * liked) / total],
                      backgroundColor: "#D6E9C6", // green
                    },
                    {
                      label: "Disliked",
                      data: [(100 * disliked) / total],
                      backgroundColor: "#FAEBCC", // yellow
                    },
                  ],
                }}
                height={400}
                width={600}
                options={{
                  maintainAspectRatio: false,

                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                          drawOnChartArea: false,
                          drawTicks: false,
                        },
                        stacked: true,
                        ticks: {
                          display: false,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        gridLines: {
                          display: false,
                          drawOnChartArea: false,
                          drawTicks: false,
                        },
                        stacked: true,
                        ticks: {
                          display: false,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
            <h4>You rated {total} movies</h4>
            <h4>You liked {liked} movies</h4>
            <h4>You disliked {disliked} movies</h4>
            <h4>language</h4>
            {language.map((g, idx) => {
              const found = lanList.find((item) => item.code === g.key);
              return (
                <div key={idx}>
                  {found.english}: {g.count}
                </div>
              );
            })}
            <h4>genre</h4>
            {genre.map((g, idx) => {
              const found = props.genres.find(
                (item) => item.id === parseInt(g.key)
              );
              return (
                <div key={idx}>
                  {found.name}: {g.count}
                </div>
              );
            })}
          </Analyser>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 4em auto;
  width: 100%;
  max-width: 1260px;
`;

const Analyser = styled.div`
  margin: 2em 0;

  h4 {
    font-size: 1.125rem;
    margin: 1.5em 0;
    text-rendering: optimizeLegibility;
  }
`;

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
    disliked: state.disliked,
  };
};

export default connect(mapStateToProps, null)(ProfilePresenter);
