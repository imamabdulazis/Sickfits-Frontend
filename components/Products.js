import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Product from "../components/Products";
import ProductItem from "./ProductItem";

const ALL_PRODUCT_QUERY = gql`
  query ALL_PRODUCT_QUERY{
    products:allProducts{
      id
      name
      price
      description
      photo{
        id
        image{
          publicUrlTransformed
        }
      }
    }
  }
`

const ProductListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
`

export default function Products() {
  const { loading, data, error } = useQuery(ALL_PRODUCT_QUERY);

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error {error.message}</p>

  return (
    <div>
      <ProductListStyle>
        {data.products.map(product => (
          <ProductItem key={product.id} product={product}/>
        ))}
      </ProductListStyle>
    </div>
  )
}