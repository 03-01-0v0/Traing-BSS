import { Heading, Card, DataTable } from "@shopify/polaris";
import store from "store-js";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useEffect, useState } from "react";
export default function ProductPricing(props) {
  if (props.data != "" && props.applyProducttoChoice == "Specific_products")
    store.set("ids", props.data);

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

  const GET_PRODUCT_BY_TAGS = gql`
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

  var tmp = [
    // ["T-Shirt", "All variant prices - 20%"],
    // ["Gift Card", "All variant prices - 20%"],
    // ["Stitch", "160.000đ"],
    // ["Ayres Chambray", "All variant prices - 20%"],
    // ["Derlay Tier Backpack", "All variant prices - 20%"],
    // ["Chevron", "All variant prices - 20%"],
    // ["% 5 Panel Camp Cap", "All variant prices - 20%"],
  ];
  var productPricings = [];

  return props.applyProducttoChoice == "Specific_products" ? (
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
          productPricings.forEach((e) =>
            e.push(
              props.custom_price[0] === "apply_price"
                ? "Apply a price: " + props.amount
                : props.custom_price[0] === "fixed_amount"
                ? "Decrease a fixed amount: -" + props.amount + "$"
                : "Decrease the original prices: -" + props.amount + "%"
            )
          );
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
  ) : props.applyProducttoChoice == "Product_collections" ? (
    <>
      <Query
        query={GET_PRODUCTS_BY_COLLECTIONS}
        variables={{ ids: store.get("collections") }}
      >
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>{error.message}</div>;

          data.nodes.forEach((d) => {
            d.products.edges.forEach((e) => {
              tmp.push(e.node.title);
            });
          });

          productPricings = [];
          tmp.forEach((e) => productPricings.push([e, ""]));
          productPricings.forEach(
            (e) =>
              (e[1] =
                props.custom_price[0] === "apply_price"
                  ? "Apply a price: " + props.amount
                  : props.custom_price[0] === "fixed_amount"
                  ? "Decrease a fixed amount: -" + props.amount + "$"
                  : "Decrease the original prices: -" + props.amount + "%")
          );
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
  ) : (
    <>
      <Query query={GET_PRODUCT_BY_TAGS}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>{error.message}</div>;
          const currentTags = store.get("tags");
          tmp = [];
          currentTags.forEach((e) => {
            data.products.edges.forEach((d) => {
              if (d.node.tags.indexOf(e) != -1) tmp.push(d.node.title);
            });
          });
          productPricings = [];
          tmp.forEach((e) => productPricings.push([e, ""]));
          productPricings.forEach(
            (e) =>
              (e[1] =
                props.custom_price[0] === "apply_price"
                  ? "Apply a price: " + props.amount
                  : props.custom_price[0] === "fixed_amount"
                  ? "Decrease a fixed amount: -" + props.amount + "$"
                  : "Decrease the original prices: -" + props.amount + "%")
          );
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
