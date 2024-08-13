import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  
    const initialState = {
    
      restaurants: [],
      selectedRestaurant: null,
      addRestaurant: null,
    }
  

   const [formState, setFormState] = useState(() => {
    const savedState = localStorage.getItem('formState');
    return savedState ? JSON.parse(savedState) : initialState;
  });


  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/restaurants');
        setFormState((prevState) => ({
          ...prevState,
          restaurants: response.data,
        }));
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    localStorage.setItem('formState', JSON.stringify(formState));
  }, [formState]);



  const formatDateForInput = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  

  const handleBranchClick = (id) => {
    const selectedRestaurant = formState.restaurants.find(restaurant => restaurant.id === id);
    if (selectedRestaurant) {
      setFormState((prevState) => ({
        ...prevState,
        selectedRestaurant: {
          ...selectedRestaurant,
          maintenanceDateStart: selectedRestaurant.maintenanceDateStart ? formatDateForInput(selectedRestaurant.maintenanceDateStart) : '',
          maintenanceDateEnd: selectedRestaurant.maintenanceDateEnd ? formatDateForInput(selectedRestaurant.maintenanceDateEnd) : '',
        },
      }));
    }
  };
  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setFormState((prevState) => ({
      ...prevState,
      addRestaurant: {
        ...prevState.addRestaurant,
        [name]: value,
      },
    }));
  
    validate(name, value);
  };
  

  const handleAddLandmark = () => {
    if (formState.addRestaurant.currentLandmark.trim() !== '') {
      const updatedLandmarks = [...formState.addRestaurant.landmarks];
      if (formState.addRestaurant.editIndex >= 0) {
        updatedLandmarks[formState.addRestaurant.editIndex] = formState.addRestaurant.currentLandmark;
        setFormState((prevState) => ({
          ...prevState,
          addRestaurant: {
            ...prevState.addRestaurant,
            editIndex: -1,
          },
        }));
      } else {
        updatedLandmarks.push(formState.addRestaurant.currentLandmark);
      }
      setFormState((prevState) => ({
        ...prevState,
        addRestaurant: {
          ...prevState.addRestaurant,
          landmarks: updatedLandmarks,
          currentLandmark: '',
        },
      }));
    }
  };

  const handleEditLandmark = (index) => {
    setFormState((prevState) => ({
      ...prevState,
      addRestaurant: {
        ...prevState.addRestaurant,
        currentLandmark: prevState.addRestaurant.landmarks[index],
        editIndex: index,
      },
    }));
  };

  const handleDeleteLandmark = (index) => {
    const updatedLandmarks = formState.addRestaurant.landmarks.filter((_, i) => i !== index);
    setFormState((prevState) => ({
      ...prevState,
      addRestaurant: {
        ...prevState.addRestaurant,
        landmarks: updatedLandmarks,
        currentLandmark: prevState.addRestaurant.editIndex === index ? '' : prevState.addRestaurant.currentLandmark,
        editIndex: prevState.addRestaurant.editIndex === index ? -1 : prevState.addRestaurant.editIndex,
      },
    }));
  };

  const handleMenuItemsClick = (id) => {
    const updatedSelectedItems = formState.addRestaurant.selectedItems.includes(id)
      ? formState.addRestaurant.selectedItems.filter(itemId => itemId !== id)
      : [...formState.addRestaurant.selectedItems, id];

    setFormState(prevState => ({
      ...prevState,
      addRestaurant: {
        ...prevState.addRestaurant,
        selectedItems: updatedSelectedItems,
      },
    }));
  };

  const handleServingTimeChange = (e, id, timeType) => {
    const value = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      addRestaurant: {
        ...prevState.addRestaurant,
        servingTimes: {
          ...prevState.addRestaurant.servingTimes,
          [id]: {
            ...prevState.addRestaurant.servingTimes[id],
            [timeType]: value,
          },
        },
      },
    }));
  };
  

  const handleAddNewRestaurant = () => {
    const newRestaurant = {
      inputRestaurantName: '',
      inputPhoneNumber: '',
      inputStreetName: '',
      landmarks: [],
      currentLandmark: '',
      editIndex: -1,
      startTime: '',
      endTime: '',
      selectedItems: [],
      servingTimes: {},
      impactRestaurant: '',
      maintenanceDateStart: '',
      maintenanceDateEnd: '',
      maintenancePrice: '',
      comments: '',
      menuItems: [
        { id: 1, name: "Burger" },
        { id: 2, name: "Shawerma" },
        { id: 3, name: "Hummos" },
        { id: 4, name: "Turkey" },
        { id: 5, name: "Zenger" },
        { id: 6, name: "Salad" },
        { id: 7, name: "Falafel" },
        { id: 8, name: "Chicken" },
      ],
    };

    console.log("newRestaurant : "+ newRestaurant)
    setFormState((prevState) => ({
      ...prevState,
      addRestaurant: newRestaurant,
    }));
  };

  const addNewRestaurantToState = async () => {
    if (formState.addRestaurant) {
      try {
        await axios.post('http://localhost:8080/api/restaurants', formState.addRestaurant);
        setFormState((prevState) => ({
          ...prevState,
          restaurants: [...prevState.restaurants, prevState.addRestaurant],
          addRestaurant: null,
        }));
      } catch (error) {
        console.error('Error adding new restaurant:', error);
      }
    }
  };


  

  const [errors, setErrors] = useState({});

  
  const validate = (name, value) => {
    let error = '';
    
    if (!value) {
      if (name === 'currentLandmark') {
        error = '';
      } else {
        error = 'This field is required';
      }
    } else {
      switch (name) {
        case 'inputRestaurantName':
          if (!/^[A-Za-z\s]+$/.test(value)) error = 'Restaurant name must contain only letters';
          break;
        case 'inputPhoneNumber':
          if (!/^\d+$/.test(value)) {
            error = 'Phone number must be numeric';
          } else if (value.length < 10 || value.length > 15) {
            error = 'Phone number must be between 10 and 15 digits';
          }
          break;
        case 'startTime':
        case 'endTime':
          if (!/^\d{2}:\d{2}$/.test(value)) error = 'Invalid time format';
          break;
        case 'maintenanceDateStart':
          if (new Date(value) > new Date(formState.addRestaurant.maintenanceDateEnd)) {
            error = 'Start date cannot be after end date';
          }
          break;
        case 'maintenanceDateEnd':
          if (new Date(value) < new Date(formState.addRestaurant.maintenanceDateStart)) {
            error = 'End date cannot be before start date';
          }
          break;
        case 'maintenancePrice':
          if (value <= 0) error = 'Price must be a positive number';
          break;
        default:
          break;
      }
    }
    
    setErrors(prev => {
      const updatedErrors = { ...prev, [name]: error };
      if (!error) delete updatedErrors[name];
      return updatedErrors;
    });
  };
  




  return (
    <RestaurantContext.Provider
      value={{
        formState,
        setFormState,
        handleBranchClick,
        handleInputChange,
        handleAddLandmark,
        handleEditLandmark,
        handleDeleteLandmark,
        handleMenuItemsClick,
        handleServingTimeChange,
        handleAddNewRestaurant,
        addNewRestaurantToState,
        errors, setErrors,validate
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};