import store from "store-js";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useCallback, useState } from "react";
import { Autocomplete, Stack, TextContainer, Tag } from "@shopify/polaris";

export default function ProductTags() {
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
      setInputValue(value);
      if (value == "") {
        setOptions(deselectedProductTag);
        return;
      }
      const filterRegexTags = new RegExp(value, "i");
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
      setSelectProductTags(optionTags);
    },
    [selectProductTags]
  );
  const tagsMarkup = selectProductTags.map((option) => {
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
