import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import useForm from '../lib/useForm';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # whic variable ara getting passed in? and what type are they
    $name:String!
    $description:String!
    $price:Int!
    $image:Upload
  ){
      createProduct(
        data:{
          name:$name
          description:$description
          price:$price
          status:"AVAILABLE"
          photo:{ create:{ image:$image altText:$name } }
        }
      ){
        id
      }
    }
`;

function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Nice shoues',
    price: 12323,
    description: 'The Nice Shoes'
  });


  const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs
  })


  return (
    <FormStyles onSubmit={async (e) => {
      e.preventDefault();
      console.log(inputs);
      // submit input from the backend
      const res = await createProduct();

      console.log(res);
    }}>
      {error && <DisplayError />}
      <fieldset disabled={loading} aria-busy={loading}>
        Image
        <label htmlFor="image"  >
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </FormStyles>
  )
}

export default CreateProduct;
