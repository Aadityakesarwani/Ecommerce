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


export const register = async (ḍispatch,user) => {

  try {
    const res = await publicRequest.post("/auth/register", user);
    ḍispatch(registrationSuccess(res.data));
  } catch (error) {
    console.error('Registration err:', error.stack);
    ḍispatch(registrationFailure(error));
  }
};

