import { Heading, Page, Frame, Card, FormLayout, TextField, Select, RadioButton, Stack } from "@shopify/polaris";
import React, {useCallback, useState} from "react";
import styles from '../Styles/index.module.css'

export default function Index()
{

  // General Information Status
  const [selected, setSelected] = useState('today');
  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    {label: 'Enable', value: 'enable'},
    {label: 'Disable', value: 'disable'}
  ];
  // End General Information Status

  const [valuePriority, setValuePriority] = useState('0');

  const handleChangePriority = useCallback((newValue) => setValue(newValue), []);

  // Apply products radio button
  const [value, setValue] = useState('disabled');

  const handleChange = useCallback(
    (_checked, newValue) => setValue(newValue),
    [],
  );
  // End Apply products radio button

  return (
      <Frame>
        <Heading>New Pricing Rule</Heading>
        <Page>
          <Card title="General Information" sectioned>
            <FormLayout>
              <TextField label="Name" onChange={() => {}} autoComplete="off" />
              <TextField
                label="Priority"
                type="number"
                value={valuePriority}
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
          <Card title="Apply to Products" >
            <Stack vertical>
              <RadioButton
                label="All products"
                checked={value === 'all products'}
                id="all products"
                name="accounts"
                onChange={handleChange}
              />
              <RadioButton
                label="Specific products"
                id="specific products"
                name="accounts"
                checked={value === 'specific products'}
                onChange={handleChange}
              />
              <RadioButton
                label="Product collections"
                id="product collections"
                name="accounts"
                checked={value === 'product collections'}
                onChange={handleChange}
              />
              <RadioButton
                label="Product Tags"
                id="product tags"
                name="accounts"
                checked={value === 'product tags'}
                onChange={handleChange}
              />
            </Stack>
          </Card>
        </Page>
        <Page>
          <Card title="Custom Prices" >
            <Stack vertical>
              <RadioButton
                label="Apply a price to selected products"
                checked={value === 'apply selected products'}
                id="apply selected products"
                name="accounts"
                onChange={handleChange}
              />
              <RadioButton
                label="Decrease a fixed amount of the original prices of selected products"
                id="Decrease a fixed amount"
                name="accounts"
                checked={value === 'Decrease a fixed amount'}
                onChange={handleChange}
              />
              <RadioButton
                label="Decrease the original prices of selected products by a percentage (%)"
                id="Decrease the original prices"
                name="accounts"
                checked={value === 'Decrease the original prices'}
                onChange={handleChange}
              />

            </Stack>
          </Card>
        </Page>
      </Frame>
    )
}


