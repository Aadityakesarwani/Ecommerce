import { loginFailure, loginStart, loginSuccess, registrationSuccess,registrationFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";
// import { useHistory } from "react-router-dom";



export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));

  } catch (err) {
    dispatch(loginFailure());
  }
};


export const register = async (dispatch, user) => {

  try {
    const res = await publicRequest.post("/auth/register", user);
    console.log('Registration successful:', res.data);
  } catch (error) {
    console.error('Registration error:', error.data);
  }
};



// export const register = async (user) => {
//   try {
//     // Define the registration endpoint URL
//     const res = await publicRequest.post("/auth/register", user);
//     const response = await axios.post(res, user);
//     console.log('Registration successful:', response.data);
//   } catch (error) {
//     console.error('Registration error:', error);
//   }
// };