import React, { useState, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";

//import utils
import { getGenre } from "../../util/getGenres";

//import components
import { Grid } from "../../components/Grid";
import RatePoster from "../../components/RatePoster";
import Placeholder from "../../components/placeholder/List";
import Dropdown from "../../components/Dropdown";
import Pagination from "../../components/Pagination";

//redux
import { useSelector, useDispatch } from "react-redux";

//data
import { dropdown } from "../../data/options";
import { breakpoint, primaryColors } from "../../components/token";
import { dislikeMovie, likeMovie } from "../../redux/rateRedux";

const Continue = (props) => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(dropdown[0].name);
  const { liked, disliked } = useSelector((state) => state.rate);

  const handleSelection = (option) => {
    setSelected(option.name);
    if (option.name === "Random") {
      let random = Math.floor(Math.random() * 404);
      props.handleSetPage(random);
    } else {
      props.handleSelectSort(option.path);
    }
  };

  const handleChange = (value) => {
    if (value === null) {
      props.handleSetExclude("");
    } else {
      const result = value.map((o) => o.id);
      props.handleSetExclude(result.toString());
    }
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      border: 0,
      borderRadius: 0,
      borderBottom: `2px solid #172d6e`,
      boxShadow: "none",
      paddingTop: `2px`,
      minWidth: `auto`,
    }),
    placeholder: (styles) => ({
      ...styles,
      fontSize: `1rem`,
      position: `static`,
      top: `auto`,
      transform: `none`,
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: `transparent`,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: `#de576d`,
      fontSize: `1rem`,
    }),
  };

  useEffect(() => {
    const totalRated = liked.length + disliked.length;
    setTotal(totalRated);
  }, [liked, disliked]);

  return (
    <>
      {props.loading ? (
        <>
          <Placeholder />
        </>
      ) : (
        <>
          <Header>
            <h1>Rate movies</h1>
            <DropdownWrapper>
              <Dropdown
                selected={selected}
                data={dropdown}
                handleSelection={(option) => handleSelection(option)}
              />
            </DropdownWrapper>
            <SelectWrapper>
              <p>Exclude</p>
              <Select
                isMulti
                menuPlacement="auto"
                menuPosition="fixed"
                placeholder="Select genres"
                styles={customStyles}
                defaultValue={[]}
                options={props.genres.map((item) => ({
                  label: item.name,
                  value: item.name,
                  id: item.id,
                }))}
                onChange={handleChange}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                  ClearIndicator: () => null,
                }}
              />
            </SelectWrapper>
          </Header>

          {props.results && props.results.length > 0 && (
            <section>
              <Grid>
                {props.results.map((movie) => (
                  <RatePoster
                    key={movie.id}
                    rate={true}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    genre={getGenre(props.genres, movie.genre_ids)}
                    liked={liked && liked.find((item) => item.id === movie.id)}
                    disliked={
                      disliked && disliked.find((item) => item.id === movie.id)
                    }
                    handleLike={() => dispatch(likeMovie(movie.id))}
                    handleDislike={() => dispatch(dislikeMovie(movie.id))}
                    isRate={true}
                  />
                ))}
              </Grid>
            </section>
          )}
          <Bottom>
            <span>You rated {total} / 10</span>
            <Pagination
              page={props.page}
              handleNextPage={() => props.handlePage("next")}
              handlePrevPage={() => props.handlePage("prev")}
            />
          </Bottom>
        </>
      )}
    </>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${primaryColors.blue};
  padding: 2rem 0;

  ul {
    list-style: none;
  }

  @media ${breakpoint.m} {
    padding: 1em 0;

    h4 {
      font-size: 1.75rem;
    }
  }
`;

const DropdownWrapper = styled.div`
  margin-top: 0.25rem;
`;

const SelectWrapper = styled(Flex)`
  width: 100%;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0 4rem;

  @media ${breakpoint.m} {
    flex-direction: column;

    div {
      padding: 1rem 0;
    }
  }
`;

export default Continue;
