import { useState } from "react";
import "./App.css";
import FormInput from "./component/FormInput";

const App = () => {
  const [values, setValues] = useState({
    username: "",
    phone:"",
    email: "",
    nationalId:"",
    university:"",
    Faculty:"",
    GraduationYear:"",
  
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
     
      errorMessage:"Username should be 3-16 characters and shouldn't include any special character",
      label: "Username",
      pattern:/[(a-zA-Z)||(a-zA-Z ?:\s)]{3,16}?$/,
    required:true,
    },
    {
      id: 2,
      name: "phone",
      type: "number",
      errorMessage:"Invalid Phone Number",
      label: "Phone",
      pattern:"/^(02)?(01)[0125][0-9]{8}$/",
    required:true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
    //  pattern:"/^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/",
      errorMessage:"It should be a valid email address!",
      label: "email",
      required:true,
    },
    {
      id: 4,
      name: "NationalId",
      type: "number",
      pattern:"/^[0-9]{14}$/",
      errorMessage:"Invalid  Number",
      label: "National Id",
      required:true,
    },
    {
      id: 5,
      name: "University",
      type: "text",
    
      pattern:"/[(a-zA-Z)||(a-zA-Z ?:\s)]{3,16}?$/",
      errorMessage:"University should be 3-16 characters and shouldn't include any special character",
      label: "University",
      required:true,
    },
    {
      id: 6,
      name: "Faculty",
      type: "text",
    
      pattern:"/[(a-zA-Z)||(a-zA-Z ?:\s)]{3,16}?$/",
      errorMessage:"University should be 3-16 characters and shouldn't include any special character",
      label: "Faculty",
      required:true,
    },
    {
      id: 7,
      name: "GraduationYear",
      type: "date",
    
      label: "Graduation Year",
    
      required:true,
    },

  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    //alert("Successful  Creation");
    console.log(inputs)

  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  return (

    <><div className="position-fixed  m-4 z-1  ">
      <img src="/src/img/logo.svg" className="w-75" alt="" />
    </div>
    <div className="app">

        <div className="w-50 imgGroup">
          <img src="./src/img/Group.svg"  alt="" />
        </div>
        <div className="container me-2  p-2 w-50  ">
          <form onSubmit={handleSubmit} className=" group p-3 rounded-2 colorbody h-75 ">

            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange} />
            ))}
            <div className=" text-center  p-2 ">
              <button className="form-btn rounded-4 w-50 btn-primary" type="submit">Submit</button></div>
          </form>
        </div>
      </div></>
  );
};

export default App;