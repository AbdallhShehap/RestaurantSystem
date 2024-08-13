import React,{useContext} from 'react'
import {RestaurantContext} from '../../ContextRestorant/RestaurantContext'
import hamburgerMenu from '../../assets/hamburger-menu.png'
import { Link } from "react-router-dom";

import "./menu.css"

export default function Menu() {

 const {formState,setFormState} = useContext(RestaurantContext);
 
 function handelselectedRestaurant(){
  setFormState({...formState , selectedRestaurant:null})
}



  return (
      
      <div className="menu-Restaurant">
      <div className="menu-Restaurant-details">
   

     <div className='left-side-menu'>
     
     <p> <Link to='/' className='Link' onClick={handelselectedRestaurant} >Logo Restaurant </Link> </p>
    

     </div>

     <div className='right-side-menu'>
     <p style={{color:"white"}}>Menu item </p>
     <p style={{color:"white"}}>Menu item </p>
     <p style={{color:"white"}}>Menu item </p>
     <p style={{color:"white"}}>Menu item </p>

     </div>
      
      
     <div className='hamburger-menu'>
            <img src={hamburgerMenu} />
          </div>

      </div>
    </div>
  );
}
