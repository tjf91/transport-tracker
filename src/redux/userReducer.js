
const initialState={
    name:'',
    id:null,
    d_id:null,
    profile_pic:null,
    isLoggedIn:false,        
}

const LOGIN_USER='LOGIN_USER'
const LOGOUT='LOGOUT'
const UPDATE_PIC='UPDATE_PIC'

export function loginUser(username){
    return{
        type:LOGIN_USER,
        payload:username
    }
}

export function logout(){
    return{
        type:LOGOUT
     }
}
export function updateProfilePic(pic){
    return{
        type:UPDATE_PIC,
        payload:pic    
       }
}

export default function userReducer(state=initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state,...action.payload,isLoggedIn:true}
        case LOGOUT:
            return initialState
        case UPDATE_PIC:
            return {...state,profile_pic:action.payload}
        default:
            return state
    }
}