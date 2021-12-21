const ava = (
  <Thumbnail
    source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
    size="large"
    alt="Black choker necklace"
  />
);
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
const deselectedOptionsProductCollection = [
  // {value: 'rustic', label: 'Rustic'},
  // {value: 'antique', label: 'Antique'},
  // {value: 'vinyl', label: 'Vinyl'},
  // {value: 'vintage', label: 'Vintage'},
  // {value: 'refurbished', label: 'Refurbished'},
];
const [
  selectedOptionsProductCollection,
  setSelectedOptionsProductCollection,
] = useState([]);
const [inputValueProductCollection, setInputValueProductCollection] = useState(
  ""
);
const [optionsProductCollection, setOptionsProductCollection] = useState(
  deselectedOptionsProductCollection
);
const updateTextProductCollection = useCallback(
  (value) => {
    setInputValueProductCollection(value);

    if (value === "") {
      setOptionsProductCollection(deselectedOptionsProductCollection);
      return;
    }

    const filterRegex = new RegExp(value, "i");
    const resultOptions = deselectedOptionsProductCollection.filter((option) =>
      option.label.match(filterRegex)
    );
    let endIndex = resultOptions.length - 1;
    if (resultOptions.length === 0) {
      endIndex = 0;
    }
    setOptionsProductCollection(resultOptions);
  },
  [deselectedOptionsProductCollection]
);

const removeTagProductCollection = useCallback(
  (tag) => () => {
    const options = [...selectedOptionsProductCollection];
    options.splice(options.indexOf(tag), 1);
    setSelectedOptionsProductCollection(options);
  },
  [selectedOptionsProductCollection]
);

const tagsMarkupProductCollection = selectedOptionsProductCollection.map(
  (option) => {
    let tagLabel = "";
    tagLabel = option.replace("_", " ");
    tagLabel = titleCase(tagLabel);
    return (
      <Tag
        key={`option${option}`}
        onRemove={removeTagProductCollection(option)}
      >
        {tagLabel}
      </Tag>
    );
  }
);

const textFieldProductCollection = (
  <Autocomplete.TextField
    onChange={updateTextProductCollection}
    label="Tags"
    labelHidden
    value={inputValueProductCollection}
    placeholder="Vintage, cotton, summer"
  />
);
