import { GET_USER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS } from './Action.Types';
import axios from 'axios';


export const SignupApi = (data) => dispatch => {
  axios
    .post('http://localhost:5000/user/register',data)
    .then(res => dispatch({ type: SIGNUP_SUCCESS, payload: res.data }))
    .catch(err => console.log(err));
};

let email;
export const LoginApi = (data) => dispatch =>{
    email=data.email
    axios
    .post('http://localhost:5000/user/login',data)
    .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
    .catch(err => console.log(err));
}

export const LogoutApi = () => dispatch =>{
    axios
    .get('http://localhost:5000/user/logout',)
    .then(res => dispatch({ type: LOGOUT_SUCCESS, payload: res.data }))
    .catch(err => console.log(err));
}


export const getData = () => dispatch => {
    axios
    .post('http://localhost:5000/home/')
    .then(res => dispatch({ type: GET_USER_SUCCESS, payload: res.data }))
    .catch(err => console.log(err));
}