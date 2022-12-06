import { GET_USER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS } from "../actions/Action.Types";

const initialstate = {
    isAuth : false,
    msg: '',
    data:{}
}

export const loginReducer = (state = initialstate, {type, payload}) => {
    switch(type){
        case SIGNUP_SUCCESS :{
            // console.log(payload)
            // alert(`${payload}`)
            return {
                ...state,
                msg: payload
            }
        }
        case LOGIN_SUCCESS :{
            console.log(payload)
            alert(`${payload.message}`)
            return {
                ...state,
                msg: payload.message,
                isAuth: payload.isAuth
            }
        }
        case LOGOUT_SUCCESS :{
            alert(`${payload.message}`)
            // console.log(payload)
            return {
                ...state,
                msg: payload.message,
                isAuth: payload.isAuth
            }
        }

        case GET_USER_SUCCESS :{
            // console.log(payload,'payload')
            return {
                ...state,
                data: payload
            }
        }
        default: return state;
    }

}