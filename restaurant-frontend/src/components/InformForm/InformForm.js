import React, { useState, useRef, useContext } from 'react';
import { RestaurantContext } from '../../ContextRestorant/RestaurantContext';
import './InformForm.css';

const FormRow = ({ children }) => <div className='form-row'>{children}</div>;

const FormGroup = ({ label, id, type, placeholder, value, onChange, readOnly, error, inputRef }) => (
  <div className={`form-group col-md-${type === 'time' ? '3' : '6'}`}>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      className={`form-control ${error ? 'error-border' : ''}`}  
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      ref={inputRef}
    />
    {error && <div className='error-message'>{error}</div>}  
  </div>
);

export default function InformForm({
  formState = {}, handleInputChange, handleAddLandmark, handleEditLandmark, handleDeleteLandmark, readOnly
}) {
  const landmarkInputRef = useRef(null);
  const [landmarkAdded, setLandmarkAdded] = useState(false);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (!(name === 'currentLandmark' && landmarkAdded)) {
      validate(name, value);
    }

    handleInputChange(e);
    setLandmarkAdded(false);  
  };

  const handleAddLandmarkWrapper = () => {
    handleAddLandmark();
    setLandmarkAdded(true);  
  };

  const handleEditClick = (index) => {
    handleEditLandmark(index);
    if (landmarkInputRef.current) {
      landmarkInputRef.current.focus();
    }
  };

  const { validate, errors } = useContext(RestaurantContext);

  return (
    <div className='inform-form-container'>
      <form className='inform-form'>
        <h1 className='mb-5'>Basic information form:</h1>
        <FormRow>
          <FormGroup
            label='Restaurant Name'
            id='inputRestaurantName'
            type='text'
            value={formState.inputRestaurantName || ''}
            onChange={handleChange}
            placeholder='Restaurant Name'
            readOnly={readOnly}
            error={errors?.inputRestaurantName}
          />
          <FormGroup
            label='Phone number'
            id='inputPhoneNumber'
            type='number'
            value={formState.inputPhoneNumber || ''}
            onChange={handleChange}
            placeholder='Phone number'
            readOnly={readOnly}
            error={errors?.inputPhoneNumber}
          />
        </FormRow>
        <FormRow>
          <FormGroup
            label='Street name'
            id='inputStreetName'
            type='text'
            value={formState.inputStreetName || ''}
            onChange={handleChange}
            placeholder='Street name'
            readOnly={readOnly}
            error={errors?.inputStreetName}
          />
        </FormRow>
        <FormRow>
          <FormGroup
            label='Start Time'
            id='startTime'
            type='time'
            value={formState.startTime || ''}
            onChange={handleChange}
            readOnly={readOnly}
            error={errors?.startTime}
          />
          <FormGroup
            label='End Time'
            id='endTime'
            type='time'
            value={formState.endTime || ''}
            onChange={handleChange}
            readOnly={readOnly}
            error={errors?.endTime}
          />
        </FormRow>
        <FormRow>
          <FormGroup
            label='List of nearby landmarks:'
            id='currentLandmark'
            type='text'
            placeholder='Nearby landmarks'
            value={formState.currentLandmark || ''}
            onChange={handleChange}
            readOnly={readOnly}
            error={errors?.currentLandmark}
            inputRef={landmarkInputRef}
          />
          {!readOnly && (
            <div className='landmark-btn col-md-3'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleAddLandmarkWrapper}
              >
                {formState.editIndex >= 0 ? 'Update Landmark' : 'Add Landmark'}
              </button>
            </div>
          )}
        </FormRow>
        <ul className='form-row'>
          {(formState.landmarks || []).map((landmark, index) => (
            <li key={index} className='landmark-list form-row'>
              <div className='form-group col-md-6' style={{ overflow: "auto" }}>{landmark}</div>
              {!readOnly && (
                <>
                  <div className='form-group col-md-3'>
                    <button type='button' className='btn btn-secondary ml-3' onClick={() => handleEditClick(index)}>
                      Update
                    </button>
                  </div>
                  <div className='form-group col-md-3'>
                    <button type='button' className='btn btn-danger ml-3' onClick={() => handleDeleteLandmark(index)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

