import { Tag, Autocomplete, TextContainer, Stack } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import gql from "graphql-tag";
import store from "store-js";
import { Query } from "react-apollo";

export default function ProductCollections() {
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
  const deselectedProductCollections = [];
  const [selectCollections, setSelectCollections] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedProductCollections);

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
      optionCollections.splice(optionCollections.indexOf(tag, 1));
      setSelectCollections(optionCollections);
    },
    [selectCollections]
  );

  function titleCase(string) {
    return string
      .toString()
      .toLowerCase()
      .split(" ")
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join("");
  }

  const CollectionMarkup = selectCollections.map((option) => {
    var Collectionlb = "";
    Collectionlb = option.replace(("_", " "));
    Collectionlb = titleCase(Collectionlb);
    return (
      <Tag key={`option${option}`} onRemove={removeCollection(option)}>
        {Collectionlb}
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
