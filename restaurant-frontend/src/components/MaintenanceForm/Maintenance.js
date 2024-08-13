import React, { useContext } from 'react';
import { RestaurantContext } from '../../ContextRestorant/RestaurantContext';
import './Maintenance.css';
export default function Maintenance({
  maintenanceDateStart, setMaintenanceDateStart,
  maintenanceDateEnd, setMaintenanceDateEnd,
  impactRestaurant, setImpactRestaurant,
  maintenancePrice, setMaintenancePrice,
  comments, setComments, readOnly
}) {

  
  const {
    errors,validate
  } = useContext(RestaurantContext);
  

  const options = [
    { id: 'Complete', label: 'Complete shutdown', value: 'Complete shutdown' },
    { id: 'Partial', label: 'Partial shutdown', value: 'Partial shutdown' },
    { id: 'Normal', label: 'Normal operations', value: 'Normal operations' }
  ];


  const handleDateStartChange = (e) => {
    const { value } = e.target;
    setMaintenanceDateStart(value);
    validate('maintenanceDateStart', value);
  };

  const handleDateEndChange = (e) => {
    const { value } = e.target;
    setMaintenanceDateEnd(value);
    validate('maintenanceDateEnd', value);
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setMaintenancePrice(value);
    validate('maintenancePrice', value);
  };

  return (
    <div className='Maintenance-form-container'>
      <form className='Maintenance-form'>
        <h1 className='mb-5'>Maintenance history form:</h1>
        <div className='form-row mb-3'>
          <div className='from-group col-md-6'>
            <label htmlFor="MaintenanceDateStart">Maintenance Date Start:</label>
            <input
              type="date"
              className='form-control'
              id="MaintenanceDateStart"
              placeholder="Maintenance Date Start:"
              value={maintenanceDateStart}
              onChange={handleDateStartChange}
              readOnly={readOnly}
            />
            {errors.maintenanceDateStart && <div className='error-message'>{errors.maintenanceDateStart}</div>}
          </div>
          <div className='from-group col-md-6'>
            <label htmlFor="MaintenanceDateEnd">Maintenance Date End:</label>
            <input
              type="date"
              className='form-control'
              id="MaintenanceDateEnd"
              placeholder="Maintenance Date End:"
              value={maintenanceDateEnd}
              onChange={handleDateEndChange}
              readOnly={readOnly}
              min={maintenanceDateStart} 
            />
            {errors.maintenanceDateEnd && <div className='error-message'>{errors.maintenanceDateEnd}</div>}
          </div>
        </div>
        <div className='form-row'>
          <div className="form-group col-md-6">
            Impact on the Restaurant
            {options.map(option => (
              <div className="form-check" key={option.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  id={option.id}
                  name="maintenance"
                  value={option.value}
                  checked={impactRestaurant === option.value}
                  onChange={(e) => setImpactRestaurant(e.target.value)}
                  disabled={readOnly}
                />
                <label className="form-check-label" htmlFor={option.id}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className='form-group col-md-3'>
            <label htmlFor='inputPriceMaintenance'>Quota/Price of the maintenance</label>
            <input
              type='number'
              className='form-control'
              id='inputPriceMaintenance'
              placeholder='Price of the maintenance'
              value={maintenancePrice}
              onChange={handlePriceChange}
              readOnly={readOnly}
            />
            {errors.maintenancePrice && <div className='error-message'>{errors.maintenancePrice}</div>}
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-12'>
            <label htmlFor='inputComments'>Comments:</label>
            <textarea
              className='form-control'
              id='inputComments'
              placeholder='Comments'
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              readOnly={readOnly}
            />
          </div>
        </div>

      </form>

    </div>
  );
}
