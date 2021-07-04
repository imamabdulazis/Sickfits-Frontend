import { useState } from "react";

export default function useForm(initial = {}) {
  //create a state object for our input
  const [inputs, setInputs] = useState(initial);


  function handleChange(e) {
    let { value, name, type, files } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      value = files[0];
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(Object.entries(initial).map(([key, value]) => [key, '']),
    );
    setInputs(blankState)
  }

  //return the things we want to surface this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  }
}