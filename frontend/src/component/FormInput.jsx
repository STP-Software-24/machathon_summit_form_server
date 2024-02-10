/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import "./FormInput.css";
const FormInput =(props)=> {
  const[focused,setFocused]=useState(false);
const {label,errorMessage ,onChange, id, ...inputProps}= props;

const handleFocus=(e)=>{
  setFocused(false);
};

  return(
    <div className="p-2 border-rounded-2 ">
     <label >{label}</label  > 
      <input 
      {...inputProps} 
      onChange={onChange} 
      onBlur={handleFocus} 
      onFocus={()=>
        inputProps.name===""||setFocused(true)}
        focused ={focused.toString()}
        className="form-control  "/> 
      <span>{errorMessage}</span>
   
    </div> 

  );
};
export default FormInput;
