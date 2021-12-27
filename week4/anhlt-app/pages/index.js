import {
  Page,
  Frame,
  Card,
  FormLayout,
  TextField,
  Select,
  Layout,
  ChoiceList,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import SpecificProduct from "./components/SpecificProduct";
import ProductCollections from "./components/ProductCollections";
import ProductTags from "./components/ProductTags";
import ProductPricing from "./components/ProductPricing";
import store from "store-js";

export default function Index() {
  // Name
  const [name, setName] = useState("");
  const handleChangeName = useCallback((name) => setName(name), []);
  // End Name
  // General Information Status
  const [selected, setSelected] = useState("");
  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "Enable", value: "enable" },
    { label: "Disable", value: "disable" },
  ];
  // End General Information Status

  const [valuePriority, setValuePriority] = useState("0");

  const handleChangePriority = useCallback(
    (valuePriority) => setValuePriority(valuePriority),
    []
  );

  // Apply products radio button
  const [applytoProductChoice, setApplytoProductChoice] = useState(
    "All_products"
  );
  const handleChange = useCallback(
    async (value) => setApplytoProductChoice(value),
    []
  );
  const renderChildrenSpecificProduct = useCallback(
    (isSelected) =>
      isSelected && (
        <SpecificProduct data={synchronized} childtoParent={childtoParent} />
      ),
    []
  );
  const renderChildrenProductCollections = useCallback(
    (isSelected) =>
      isSelected && <ProductCollections childtoParent={childtoParent} />,
    []
  );
  const renderChildrenProductTags = useCallback(
    (isSelected) => isSelected && <ProductTags childtoParent={childtoParent} />,
    []
  );
  // End Apply products radio button

  // Radio Button in Custom Price

  const [valueApplyProducts, setValueApplyProducts] = useState(["apply_price"]);
  const handleChangeValueCustomPrices = useCallback((valueApplyProducts) => {
    setValueApplyProducts(valueApplyProducts),
      setValueAmount("0"),
      store.set("custom_price", valueApplyProducts);
  }, []);

  // End Radio Button in Custom Price

  // Amount in Custom Prices
  const [valueAmount, setValueAmount] = useState("0");
  const handleChangeAmount = useCallback(
    (valueAmount) => setValueAmount(valueAmount),
    []
  );
  // End Amount in Custom Prices

  const [synchronized, setSynchronized] = useState("");

  const childtoParent = async (childdata) => {
    console.log("check");
    await setSynchronized(childdata);
  };

  store.set("ids", []);
  store.set("tags", []);
  store.set("collections", []);

  return (
    <Frame>
      <Page title="New Pricing Rule">
        <Layout>
          <Layout.Section>
            <Card title="General Information" sectioned>
              <FormLayout>
                <TextField
                  label="Name"
                  value={name}
                  onChange={handleChangeName}
                  autoComplete="off"
                  error={name === "" ? "Please, Enter Name" : ""}
                />
                <TextField
                  label="Priority"
                  type="number"
                  value={valuePriority}
                  pattern="[0-9]{1,2}"
                  min="0"
                  max="99"
                  error={valuePriority === "" ? "Please, Enter Priority" : ""}
                  onChange={handleChangePriority}
                  autoComplete="off"
                />
                <Select
                  label="Status"
                  options={options}
                  onChange={handleSelectChange}
                  value={selected}
                />
              </FormLayout>
            </Card>
            <Card title="Apply to Products" sectioned>
              <FormLayout>
                <ChoiceList
                  title=""
                  choices={[
                    { label: "All products", value: "All_products" },
                    {
                      label: "Specific products",
                      value: "Specific_products",
                      renderChildren: renderChildrenSpecificProduct,
                    },
                    {
                      label: "Product collections",
                      value: "Product_collections",
                      renderChildren: renderChildrenProductCollections,
                    },
                    {
                      label: "Product Tags",
                      value: "Product_Tags",
                      renderChildren: renderChildrenProductTags,
                    },
                  ]}
                  selected={applytoProductChoice}
                  onChange={handleChange}
                />
              </FormLayout>
            </Card>
            <Card title="Custom Prices" sectioned>
              <FormLayout>
                <ChoiceList
                  title=""
                  choices={[
                    {
                      label: "Apply a price to selected products",
                      value: "apply_price",
                    },
                    {
                      label:
                        "Decrease a fixed amount of the original prices of selected products",
                      value: "fixed_amount",
                    },
                    {
                      label:
                        "Decrease the original prices of selected products by a percentage (%)",
                      value: "percentage_prices",
                    },
                  ]}
                  selected={valueApplyProducts}
                  onChange={handleChangeValueCustomPrices}
                />
                <TextField
                  label="Amount"
                  type="number"
                  value={valueAmount}
                  onChange={handleChangeAmount}
                  min={0}
                  max={100}
                  error={
                    valueAmount === ""
                      ? "Please, Enter Value Amount"
                      : valueAmount > 100
                      ? "Amount should not be greater than 100"
                      : valueAmount < 0
                      ? "Amount should not be less than 0"
                      : ""
                  }
                  autoComplete="off"
                />
              </FormLayout>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <ProductPricing
              data={synchronized}
              applyProducttoChoice={applytoProductChoice}
              custom_price={valueApplyProducts}
              amount={valueAmount}
            />
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
