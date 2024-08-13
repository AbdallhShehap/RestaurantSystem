import React from 'react';
import './MenuForm.css';

export default function MenuForm({ formState, menuItems = [], handleMenuItemsClick, handleServingTimeChange, readOnly }) {
  return (
    <div className='menu-form-container'>
      <form className='menu-form'>
        <h1 className='mb-5'>Menu form:</h1>
        <div className='from-row'>
          <div className='from-group col-md-12'>
            <label htmlFor='MenuItems'>Item Selection:</label>
            <div className='items-btn-container'>
              {menuItems.map(item => (
                <div className='items-btn mb-5' key={item.id}>
                  <span className='items-name'>
                    <button type='button' onClick={() => handleMenuItemsClick(item.id)} className={`btn ${formState?.selectedItems?.includes(item.id) ? "btn-primary" : "btn-secondary"} btn-menu`} disabled={readOnly}>
                      {item.name}
                    </button>
                  </span>
                  {(formState?.selectedItems?.includes(item.id)) && (
                    <div className='serving-times-input'>
                      <div>
                        <label>Start Time:</label>
                        <input
                          type="time"
                          value={formState?.servingTimes[item.id]?.startTime || ''}
                          onChange={(e) => handleServingTimeChange(e, item.id, 'startTime')}
                          readOnly={readOnly}
                        />
                      </div>
                      <div>
                        <label>End Time:</label>
                        <input
                          type="time"
                          value={formState?.servingTimes[item.id]?.endTime || ''}
                          onChange={(e) => handleServingTimeChange(e, item.id, 'endTime')}
                          readOnly={readOnly}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
