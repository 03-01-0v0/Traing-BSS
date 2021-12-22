import { Heading, Card, DataTable } from "@shopify/polaris";
import store from "store-js";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useEffect, useState } from "react";
export default function ProductPricing(props) {
  const GET_PRODUCTS_BY_ID = gql`
    query getProducts($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Product {
          title
          handle
          descriptionHtml
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
  `;

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

  const tmp = [
    // ["T-Shirt", "All variant prices - 20%"],
    // ["Gift Card", "All variant prices - 20%"],
    // ["Stitch", "160.000đ"],
    // ["Ayres Chambray", "All variant prices - 20%"],
    // ["Derlay Tier Backpack", "All variant prices - 20%"],
    // ["Chevron", "All variant prices - 20%"],
    // ["% 5 Panel Camp Cap", "All variant prices - 20%"],
  ];
  var productPricings = [];

  return (
    <>
      <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: store.get("ids") }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>{error.message}</div>;

          data.nodes.forEach((d) => {
            const x = d.title;
            tmp.push({ x });
          });

          productPricings = [];
          tmp.forEach((e) => productPricings.push(Object.values(e)));
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
        }}
      </Query>
    </>
  );
}
