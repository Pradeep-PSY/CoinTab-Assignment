import { GET_USER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS } from './Action.Types';
import axios from 'axios';


export const SignupApi = (data) => dispatch => {
  axios
    .post('https://cointab-assign.onrender.com/user/register',data)
    .then(res => dispatch({ type: SIGNUP_SUCCESS, payload: res.data }))
    .catch(err => console.log(err));
};

let email;
export const LoginApi = (data) => dispatch =>{
    email=data.email
    axios
    .post('https://cointab-assign.onrender.com/user/login',data)
    .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
    .catch(err => console.log(err));
}

export const LogoutApi = () => dispatch =>{
    axios
    .get('https://cointab-assign.onrender.com/user/logout',)
    .then(res => dispatch({ type: LOGOUT_SUCCESS, payload: res.data }))
    .catch(err => console.log(err));
}


export const getData = () => dispatch => {
    axios
    .post('https://cointab-assign.onrender.com/home/',{email})
    .then(res => dispatch({ type: GET_USER_SUCCESS, payload: res.data }))
    .catch(err => console.log(err));
}