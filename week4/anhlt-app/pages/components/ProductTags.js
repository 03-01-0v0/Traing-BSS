import store from "store-js";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useCallback, useState } from "react";
import { Autocomplete, Stack, TextContainer, Tag } from "@shopify/polaris";

export default function ProductTags() {
  const GET_TAGS = gql`
    {
      products(query: "tag:", first: 5, sortKey: TITLE) {
        edges {
          node {
            id
            title
            tags
          }
        }
      }
    }
  `;

  const fill = new Set();
  const deselectedProductTag = [];
  const [selectProductTags, setSelectProductTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedProductTag);

  const updateTextProductTags = useCallback(
    (value) => {
      setInputValue(value);
      if (value == "") {
        setOptions(deselectedProductTag);
        return;
      }
      const filterRegexTags = new RegExp(value, "i");
      const resultOptionTags = deselectedProductTag.filter((e) =>
        e.label.match(filterRegexTags)
      );
      setOptions(resultOptionTags);
    },
    [options]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const optionTags = [...selectProductTags];
      optionTags.splice(optionTags.indexOf(tag), 1);
      store.set("collection", optionTags);
      setSelectProductTags(optionTags);
    },
    [selectProductTags]
  );
  const tagsMarkup = selectProductTags.map((option) => {
    store.set("tags", selectProductTags);
    var taglb = "";
    taglb = option.replace("_", " ");
    taglb = titleCase(taglb);
    return (
      <Tag key={`option${option}`} onRemove={removeTag(option)}>
        {taglb}
      </Tag>
    );
  });
  const textFieldProductTags = (
    <Autocomplete.TextField
      onChange={updateTextProductTags}
      value={inputValue}
      placeholder="Vintage, cotton, summer"
    />
  );

  function titleCase(string) {
    return string
      .toString()
      .toLowerCase()
      .split(" ")
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join("");
  }

  return (
    <>
      <Query query={GET_TAGS}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>{error.message}</div>;
          data.products.edges.forEach((d) => {
            d.node.tags.forEach((tag) => fill.add(tag));
            fill.forEach((tag) => {
              deselectedProductTag.push({
                value: tag,
                label: tag,
              });
            });
          });
          return (
            <Autocomplete
              allowMultiple
              options={options}
              selected={selectProductTags}
              textField={textFieldProductTags}
              onSelect={setSelectProductTags}
              listTitle="Suggested Collections"
            />
          );
        }}
      </Query>
      <br />
      <TextContainer>
        <Stack>{tagsMarkup}</Stack>
      </TextContainer>
    </>
  );
}
