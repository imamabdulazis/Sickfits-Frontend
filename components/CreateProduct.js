import { useState } from 'react';
import useForm from '../lib/useForm';
import FormStyles from './styles/Form';

function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Nice shoues',
    price: 12323,
    description: 'The Nice Shoes'
  });


  return (
    <FormStyles onSubmit={(e) => {
      e.preventDefault();
      console.log(inputs)
    }}>
      <fieldset>
        Image
        <label htmlFor="image"  >
          <input type="file" id="image" onChange={handleChange} />
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

export default CreateProduct
