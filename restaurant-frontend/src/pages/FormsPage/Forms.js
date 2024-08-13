import React, { useContext } from "react";
import { RestaurantContext } from '../../ContextRestorant/RestaurantContext';
import InformForm from "../../components/InformForm/InformForm";
import Maintenance from "../../components/MaintenanceForm/Maintenance";
import MenuForm from "../../components/MenuForm/MenuForm";
import { Link, useNavigate } from "react-router-dom";
import "./allForms.css";
import { toast } from "react-hot-toast";

export default function Forms() {
  const navigate = useNavigate();

  
  const {
    formState,
    setFormState,
    handleInputChange,
    handleAddLandmark,
    handleEditLandmark,
    handleDeleteLandmark,
    handleMenuItemsClick,
    handleServingTimeChange,
    addNewRestaurantToState, errors, setErrors,validate
  } = useContext(RestaurantContext);

  const { selectedRestaurant, addRestaurant } = formState;
  

  const handleSubmit = (event) => {
    event.preventDefault();
  
    setErrors({});
  
    let validationErrors = {};
  
    Object.keys(addRestaurant).forEach((field) => {
      validate(field, addRestaurant[field]);
      if (errors[field]) {
        validationErrors[field] = errors[field];
      }
    });
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please check the input data.");
      return;
    }
  
    toast.promise(
      new Promise((resolve, reject) => {
        try {
          addNewRestaurantToState(); 
          resolve(); 
        } catch (error) {
          reject(); 
        }
      }),
      {
        loading: 'Saving...',
        success: <b>Restaurant branch added successfully!</b>,
        error: <b>Could not save.</b>,
      }
    );
  
    setTimeout(() => {
      navigate('/');
    }, 2500);
  };
  


  function handleSelectedRestaurant() {
    toast(
      "Back to Restaurant branches ",
      {
        duration: 6000,
      }
    );

    setFormState({ ...formState, selectedRestaurant: null });
  }

  const renderReadOnlyForms = () => (
    <form>
      <h1 style={{ textAlign: "center", marginTop: "1.2rem" }}>View Only</h1>
      <div>
        <InformForm formState={selectedRestaurant} readOnly={true} />
      </div>
      <div>
        <MenuForm
          formState={selectedRestaurant}
          menuItems={selectedRestaurant?.menuItems || []}
          selectedItems={selectedRestaurant?.selectedItems || []}
          servingTimes={selectedRestaurant?.servingTimes || {}}
          handleMenuItemsClick={handleMenuItemsClick}
          handleServingTimeChange={handleServingTimeChange}
          readOnly={true}
        />
      </div>
      <div>
      <Maintenance
  maintenanceDateStart={selectedRestaurant?.maintenanceDateStart || ''}
  setMaintenanceDateStart={(date) =>
    setFormState((prevState) => ({
      ...prevState,
      selectedRestaurant: {
        ...prevState.selectedRestaurant,
        maintenanceDateStart: date,
      },
    }))
  }
  maintenanceDateEnd={selectedRestaurant?.maintenanceDateEnd || ''}
  setMaintenanceDateEnd={(date) =>
    setFormState((prevState) => ({
      ...prevState,
      selectedRestaurant: {
        ...prevState.selectedRestaurant,
        maintenanceDateEnd: date,
      },
    }))
  }
  impactRestaurant={selectedRestaurant?.impactRestaurant || ''}
          setImpactRestaurant={(impact) =>
            setFormState((prevState) => ({
              ...prevState,
              selectedRestaurant: {
                ...prevState.selectedRestaurant,
                impactRestaurant: impact,
              },
            }))
          }
          maintenancePrice={selectedRestaurant?.maintenancePrice || ''}
          setMaintenancePrice={(price) =>
            setFormState((prevState) => ({
              ...prevState,
              selectedRestaurant: {
                ...prevState.selectedRestaurant,
                maintenancePrice: price,
              },
            }))
          }
          comments={selectedRestaurant?.comments || ''}
          setComments={(comments) =>
            setFormState((prevState) => ({
              ...prevState,
              selectedRestaurant: {
                ...prevState.selectedRestaurant,
                comments: comments,
              },
            }))
          }
          readOnly={true}
/>

      </div>
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <button type="submit" className="btn btn-primary mb-3 btn-submit" onClick={handleSelectedRestaurant}>
            Back to Branches
          </button>
        </Link>
      </div>
    </form>
  );

  const renderEditableForms = () => (
    <form>
      <h1 style={{ textAlign: "center", marginTop: "1.2rem" }}>Add New Restaurant</h1>
      <div>
        <InformForm
          formState={addRestaurant || {}}
          handleInputChange={handleInputChange}
          handleAddLandmark={handleAddLandmark}
          handleEditLandmark={handleEditLandmark}
          handleDeleteLandmark={handleDeleteLandmark}
          readOnly={false}
        />
      </div>
      <div>
        <MenuForm
          formState={addRestaurant || {}}
          menuItems={addRestaurant?.menuItems || []}
          selectedItems={addRestaurant?.selectedItems || []}
          servingTimes={addRestaurant?.servingTimes || {}}
          handleMenuItemsClick={handleMenuItemsClick}
          handleServingTimeChange={handleServingTimeChange}
          readOnly={false}
        />
      </div>
      <div>
        <Maintenance
          maintenanceDateStart={addRestaurant?.maintenanceDateStart || ''}
          setMaintenanceDateStart={(date) =>
            setFormState((prevState) => ({
              ...prevState,
              addRestaurant: {
                ...prevState.addRestaurant,
                maintenanceDateStart: date,
              },
            }))
          }
          maintenanceDateEnd={addRestaurant?.maintenanceDateEnd || ''}
          setMaintenanceDateEnd={(date) =>
            setFormState((prevState) => ({
              ...prevState,
              addRestaurant: {
                ...prevState.addRestaurant,
                maintenanceDateEnd: date,
              },
            }))
          }
          impactRestaurant={addRestaurant?.impactRestaurant || ''}
          setImpactRestaurant={(impact) =>
            setFormState((prevState) => ({
              ...prevState,
              addRestaurant: {
                ...prevState.addRestaurant,
                impactRestaurant: impact,
              },
            }))
          }
          maintenancePrice={addRestaurant?.maintenancePrice || ''}
          setMaintenancePrice={(price) =>
            setFormState((prevState) => ({
              ...prevState,
              addRestaurant: {
                ...prevState.addRestaurant,
                maintenancePrice: price,
              },
            }))
          }
          comments={addRestaurant?.comments || ''}
          setComments={(comments) =>
            setFormState((prevState) => ({
              ...prevState,
              addRestaurant: {
                ...prevState.addRestaurant,
                comments: comments,
              },
            }))
          }
          readOnly={false}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <button type="submit" className="btn btn-primary mb-3 btn-submit" onClick={handleSubmit}>
          Add Branch
        </button>
      </div>
    </form>
  );

  return (
    <div>
      {selectedRestaurant ? renderReadOnlyForms() : renderEditableForms()}
    </div>
  );
}
