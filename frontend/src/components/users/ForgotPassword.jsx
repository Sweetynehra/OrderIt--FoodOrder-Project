import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";

const ForgotPassword = () => {
  const [email,setEmail] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const {error, loading , message} = useSelector((state)=>state.forgotPassword)

  useEffect(()=>{
  
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    if(message){
      alert.success(message);
    }
   }, [dispatch, alert, message, error]);
  
   const submitHandler= (e)=>{
    e.preventDefault();//reload or submit again relaoding prevent
    const formData = new FormData();
    formData.set("email",email);

    dispatch(forgotPassword(formData));//dispatch the form data
   };
  
   
  //  const onChange = (e)=>{
  //   if(e.target.name === "avatar"){
  //     const reader = new FileReader();
  //     reader.onload = ()=>{//create event listener
  //       if(reader.readyState === 2){//file read already, indicates reading is done
  //         setAvatarPreview(reader.result);
  //         setAvatar(reader.result); 
  //       }
  //     }
  //     reader.readAsDataURL(e.target.files[0]);//file reading process , trigers onload
  //   }else{
  //     setUser({...user, [e.target.name]: e.target.value})
  //   }
  //  };
  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field"> Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled = {loading ? true: false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
