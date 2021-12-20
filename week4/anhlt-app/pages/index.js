import {
  Heading,
  Page,
  Frame,
  Card,
  FormLayout,
  TextField,
  Select,
  RadioButton,
  Stack,
  ChoiceList,
} from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import React, { useCallback, useState } from "react";
import SpecificProduct from "./components/SpecificProduct";
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
  const [value, setValue] = useState("");

  const handleChange = useCallback((value) => {
    setValue(value, []);
  });
  // End Apply products radio button

  // Radio Button in Apply to Products

  const [valueApplyProducts, setValueApplyProducts] = useState("");
  const handleChangeValueApplyProducts = useCallback(
    (valueApplyProducts) => setValueApplyProducts(valueApplyProducts),
    []
  );

  // End Raido Button in Aplly to Products

  // Amount in Custom Prices
  const [valueAmount, setValueAmount] = useState("0");
  const handleChangeAmount = useCallback(
    (valueAmount) => setValueAmount(valueAmount),
    []
  );
  // End Amount in Custom Prices

  // SpecificProduct
  const renderChildrenSpecificProduct = useCallback(
    (isSelected) =>
      isSelected && (
        <>
          <SpecificProduct />
          <br />
        </>
      )
  );
  // End Specific Product

  // Product Tags

  const renderChildrenProductTags = useCallback(
    (isSelected) => isSelected && <></>
  );

  // End Product Tags

  return (
    <Frame>
      <Heading>New Pricing Rule</Heading>
      <Page>
        <Card title="General Information" sectioned>
          <FormLayout>
            <TextField
              label="Name"
              value={name}
              onChange={handleChangeName}
              autoComplete="off"
            />
            <TextField
              label="Priority"
              type="number"
              value={valuePriority}
              pattern={"[0-9]{1,2}"}
              min={"0"}
              max={"99"}
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
      </Page>
      <Page>
        <Card title="Apply to Products" sectioned>
          <FormLayout>
            <ChoiceList
              title=""
              choices={[
                { label: "All products", value: "hidden" },
                {
                  label: "Specific products",
                  value: "Specific products",
                  renderChildren: renderChildrenSpecificProduct,
                },
                { label: "Product collections", value: "Product collections" },
                {
                  label: "Product Tags",
                  value: "Product Tags",
                  renderChildren: renderChildrenProductTags,
                },
              ]}
              selected={value}
              onChange={handleChange}
            />
          </FormLayout>
        </Card>
      </Page>
      <Page>
        <Card title="Custom Prices" sectioned>
          <FormLayout>
            <ChoiceList
              title=""
              choices={[
                {
                  label: "Apply a price to selected products",
                  value: "apply a price",
                },
                {
                  label:
                    "Decrease a fixed amount of the original prices of selected products",
                  value: "fixed amount",
                },
                {
                  label:
                    "Decrease the original prices of selected products by a percentage (%)",
                  value: "original prices",
                },
              ]}
              selected={valueApplyProducts}
              onChange={handleChangeValueApplyProducts}
            />
            <TextField
              label="Amount"
              type="number"
              value={valueAmount}
              onChange={handleChangeAmount}
              autoComplete="off"
            />
          </FormLayout>
        </Card>
      </Page>
    </Frame>
  );
}
