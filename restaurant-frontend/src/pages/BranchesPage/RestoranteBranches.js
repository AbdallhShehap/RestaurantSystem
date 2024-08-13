import React, { useContext } from 'react';
import { RestaurantContext } from '../../ContextRestorant/RestaurantContext';
import { Link } from "react-router-dom";
import "./Branches.css"

export default function RestoranteBranches() {
  const {
    formState, handleBranchClick, handleAddNewRestaurant
  } = useContext(RestaurantContext);

  return (
    <div className='branches-container'>
      <form className='branches-form'>
        <h1 className='mb-5'>Restaurant Branches:</h1>
        <div className='from-row'>
          <div className='from-group col-md-12'>
            <label>Branches Selection:</label>
            <div className='branches-btn-container'>
              {formState.restaurants.map(item => (
                <div className='branches-btn mb-5' key={item.id}>
                  <span className='branches-name'>
                    <Link to="/forms">
                      <button type='button' className='btn btn-primary btn-menu' onClick={() => handleBranchClick(item.id)}>
                        {item.inputRestaurantName}
                      </button>
                    </Link>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
      <div style={{ textAlign: "center" }}>
        <Link to="/forms">
          <button type='button' className='btn btn-primary mb-3 btn-add-branch' onClick={handleAddNewRestaurant}>
            Add Branch
          </button>
        </Link>
      </div>
    </div>
  );
}
