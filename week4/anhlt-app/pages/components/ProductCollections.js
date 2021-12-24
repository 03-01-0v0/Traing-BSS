import { Tag, Autocomplete, TextContainer, Stack } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import gql from "graphql-tag";
import store from "store-js";
import { Query } from "react-apollo";

export default function ProductCollections(props) {
  const GET_COLLECTIONS = gql`
    {
      collections(first: 10) {
        edges {
          node {
            id
            title
            image {
              id
            }
          }
        }
      }
    }
  `;
  /**
   ["gid://shopify/Collection/378821837032", "gid://shopify/Collection/378898088168", "gid://shopify/Collection/393269608680"]
   * */

  const deselectedProductCollections = [];
  const [selectCollections, setSelectCollections] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedProductCollections);
  var storeCollections = [];

  const updateTextProductCollection = useCallback(
    (value) => {
      setInputValue(value);
      if (value == "") {
        setOptions(deselectedProductCollections);
        return;
      }
      const filterRegexCollections = new RegExp(value, "i");
      const resultOptionCollections = deselectedProductCollections.filter((e) =>
        e.label.match(filterRegexCollections)
      );
      setOptions(resultOptionCollections);
    },
    [options]
  );

  const removeCollection = useCallback(
    (tag) => () => {
      const optionCollections = [...selectCollections];
      optionCollections.splice(optionCollections.indexOf(tag), 1);
      setSelectCollections(optionCollections);
    },
    [selectCollections]
  );

  const CollectionMarkup = selectCollections.map((option) => {
    storeCollections = [];
    selectCollections.map((option) => {
      options.forEach((e) => {
        if (e.label == option) storeCollections.push(e.tag);
      });
      store.set("collections", storeCollections);
    });

    return (
      <Tag key={`option${option}`} onRemove={removeCollection(option)}>
        {option}
      </Tag>
    );
  });

  const textFieldProductCollection = (
    <Autocomplete.TextField
      onChange={updateTextProductCollection}
      value={inputValue}
      labelHidden
      placeholder="Vintage, cotton, summer"
    />
  );

  return (
    <>
      <Query query={GET_COLLECTIONS}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>{error.message}</div>;
          data.collections.edges.forEach((d) => {
            deselectedProductCollections.push({
              value: d.node.title,
              label: d.node.title,
              image: d.node.image,
              tag: d.node.id,
            });
          });
          return (
            <Autocomplete
              allowMultiple
              options={options}
              selected={selectCollections}
              textField={textFieldProductCollection}
              onSelect={setSelectCollections}
              listTitle="Suggested Collections"
            />
          );
        }}
      </Query>
      <br />
      <TextContainer>
        <Stack>{CollectionMarkup}</Stack>
      </TextContainer>
    </>
  );
}
