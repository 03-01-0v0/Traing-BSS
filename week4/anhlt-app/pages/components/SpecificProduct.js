import { useCallback, useRef, useState } from "react";
import { Modal } from "@shopify/app-bridge-react";
import { TextField } from "@shopify/polaris";

export default function SpecificProduct() {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");
  const handleChange = useCallback(() => setActive(!active), []);
  const search = useCallback(
    (value) => {
      setValue(value);
      handleChange();
    },
    [value]
  );
  const activator = (
    <TextField
      // value={name}
      label="Search product"
      labelHidden
      placeholder="Search product"
      onChange={search}
    />
  );
  return (
    <>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="SELECT SPECIFIC PRODUCTS"
        primaryAction={{
          content: "Select product",
          onAction: handleChange,
        }}
      >
        <Modal.Section>
          <p></p>
        </Modal.Section>
      </Modal>
    </>
  );
}
