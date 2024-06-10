import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {UserAuth} from '../../context/authContext';
import { validateCreateForm } from '../../util/validate';

const Create = () => {
  const {submitProduct} = UserAuth();
  const [name, setName] = useState('');
  const [category, setCatergory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(name, category, price, image);
    console.log("name");
    setSuccessMessage('');
    const formErrors = validateCreateForm(name, category, price);
    if(formErrors){
      setErrorMessage(formErrors);
      return;
    }

    try {
      await submitProduct(name, category, price, image);
      console.log("submitted........")
      setSuccessMessage('Product submitted successfully');
    } catch (error) {
      setErrorMessage(error.message);
    }

  }
  return (
    <Fragment>
      <Header />
      <div>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              name="Name"
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              name="category"
              onChange={(e)=>setCatergory(e.target.value)}
              value={category}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"  name="Price" 
            onChange={(e)=>setPrice(e.target.value)}
            value={price}
            />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src=""></img>
            <br />
            <input type="file" accept='image/*' 
            onChange={(e)=>setImage(e.target.files[0])}
            />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
