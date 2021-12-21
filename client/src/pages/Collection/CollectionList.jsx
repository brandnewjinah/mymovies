import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { Header } from "../../components/Header";
import { neutral } from "../../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getCollections } from "../../redux/collectionRedux";

const Collection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCollections());
  }, [dispatch]);

  const { collections, loading } = useSelector((state) => state.collection);

  return (
    <>
      <Header title="Collections" />
      <Grid>
        {collections &&
          collections.length > 0 &&
          collections.map((collection) => (
            <Item
              to={`/movies/collection/${collection._id}`}
              key={collection._id}
            >
              <Top>
                <ImgContainer>
                  <div>
                    {collection.cover.map((img) => (
                      <img key={img} src={img} alt="Collection Thumbnail" />
                    ))}
                  </div>
                </ImgContainer>
              </Top>
              <Text>
                <p className="title">{collection.name}</p>
              </Text>
            </Item>
          ))}
      </Grid>
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 2em;
  grid-row-gap: 4em;
  padding: 2rem 0;
`;

const Item = styled(Link)``;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgContainer = styled.div`
  width: 202px;
  height: 303px;
  background-color: ${neutral[200]};
  border-radius: 8px;
  overflow: hidden;

  div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.25rem;

  .title {
    width: 100%;
    display: inline-block;
    font-size: 0.95rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0.65em 0 0.25em;
  }
`;

export default Collection;
