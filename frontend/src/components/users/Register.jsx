import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, register } from "../../actions/userAction";

const Register = () => {

  const alert= useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

//state manage to get data from input- all 'form' user detail
const [user,setUser]= useState({
  name: "",
  email: "",
  password: "",
  passwordConfirm : "",
  phoneNumber: "",
})

//destruc obj
const {name, email, password, passwordConfirm, phoneNumber} = user;

const [avatar, setAvatar] = useState("");
const [avatarPreview, setAvatarPreview] = useState("/images/images.png");

const { isAuthenticated ,error, loading} = useSelector((state)=>state.auth);//if register successful then isauthenticated is true as mention in userReducer, here we do not use user as new user first register and send the data to db

//handle redirection with useeffect

 useEffect(()=>{
  if(isAuthenticated){
    navigate("/");//redirect to api home page auto triggered
  }
  if(error){
    alert.error(error);
    dispatch(clearErrors());
  }
 }, [dispatch, alert, isAuthenticated, error, navigate]);

 const submitHandler= (e)=>{
  e.preventDefault();//reload or submit again relaoding prevent

  if(password !== passwordConfirm){
    alert.error("Password do not matched");
    return;
  }
//create form data
  const formData = new FormData();
  formData.set("name", name);//{name: rahul,  ...} key val
  formData.set("email",email);
  formData.set("password",password);
  formData.set("passwordConfirm",passwordConfirm);
  formData.set("phoneNumber",phoneNumber);

  if(avatar === ""){
    formData.set("avatar","/images/images.png");//def img
  }else{
    formData.set("avatar",avatar)
  };

  dispatch(register(formData));//
 };

 //handle the files  and fetch them on db
 const onChange = (e)=>{
  if(e.target.name === "avatar"){
    //create a new instance read the content from user computer
    const reader = new FileReader();
    reader.onload = ()=>{//create event listener
      if(reader.readyState === 2){//file read already, indicates reading is done
        setAvatarPreview(reader.result);
        setAvatar(reader.result); 
      }
    }
    reader.readAsDataURL(e.target.files[0]);//file reading process , trigers onload
  }else{
    setUser({...user, [e.target.name]: e.target.value})
  }
 };
  

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5 registration-form">
          <form className="shadow-lg" encType="multipart/form-data" onSubmit={submitHandler}>
            <h1 className="mb-3">Register</h1>
            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm_field">Password Confirm</label>
              <input
                type="password"
                id="passwordConfirm_field"
                className="form-control"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={onChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber_field">Phone Number</label>
              <input
                type="number"
                id="phoneNumber_field"
                className="form-control"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  ></input>
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
