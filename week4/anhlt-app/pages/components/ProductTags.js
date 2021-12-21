import store from "store-js";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useCallback, useState } from "react";
import { Autocomplete, Stack, TextContainer, Tag } from "@shopify/polaris";

export default function ProductTags() {
  const GET_TAGS = gql`
    {
      tags(first: 10) {
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
  const deselectedProductTag = [
    { value: "gold", label: "Gold" },
    { value: "black", label: "Black" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" },
    { value: "pink", label: "Pink" },
  ];
  const [selectProductTags, setSelectProductTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedProductTag);

  const updateTextProductTags = useCallback(
    (value) => {
      selectProductTags(value);
      if (value == "") {
        selectProductTags(deselectedProductTag);
        return;
      }
      const filterRegexTags = new RegExp(value, "1");
      const resultOptionTags = options.filter((e) =>
        e.label.match(filterRegexTags)
      );
      setOptions(resultOptionTags);
    },
    [options]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const optionTags = [...selectProductTags];
      optionTags.splice(optionTags.indexOf(tag, 1));
      selectProductTags(optionTags);
    },
    [selectProductTags]
  );
  const tagsMarkup = selectProductTags.map((e) => {
    var taglb = "";
    taglb = e.replace("_", " ");
    taglb = titleCase(taglb);
    return (
      <Tag key={`option${e}`} onRemove={removeTag(e)}>
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
      <Query query={GET_TAGS}></Query>
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectProductTags}
        textField={textFieldProductTags}
        onSelect={setSelectProductTags}
        listTitle="Suggested Tags"
      />
      <br />
      <TextContainer>
        <Stack>{tagsMarkup}</Stack>
      </TextContainer>
    </>
  );
}
