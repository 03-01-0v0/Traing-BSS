import { Heading, Card, DataTable } from "@shopify/polaris";
import store from "store-js";
import gql from "graphql-tag";
import { Query } from "react-apollo";
export default function ProductPricing() {
  const GET_PRODUCTS_BY_COLLECTIONS = gql`
    query nodes($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Collection {
          title
          id
          products(first: 10) {
            edges {
              node {
                title
                handle
                id
                images(first: 1) {
                  edges {
                    node {
                      originalSrc
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const productPricings = [
    ["T-Shirt", "All variant prices - 20%"],
    ["Gift Card", "All variant prices - 20%"],
    ["Stitch", "160.000đ"],
    ["Ayres Chambray", "All variant prices - 20%"],
    ["Derlay Tier Backpack", "All variant prices - 20%"],
    ["Chevron", "All variant prices - 20%"],
    ["% 5 Panel Camp Cap", "All variant prices - 20%"],
  ];

  return (
    <Card sectioned>
      <Heading>Show products pricing details</Heading>
      <DataTable
        columnContentTypes={["text", "text"]}
        headings={["Title", "Modified Price"]}
        rows={productPricings}
      />
    </Card>
  );
}
