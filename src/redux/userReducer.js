
const initialState={
    name:'',
    id:null,
    d_id:null,
    isLoggedIn:false,        
}

const LOGIN_USER='LOGIN_USER'
const LOGOUT='LOGOUT'

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
// export function updateLocation(){
//     return{
        
//     }
// }

export default function userReducer(state=initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state,...action.payload,isLoggedIn:true}
        case LOGOUT:
            return initialState
        default:
            return state
    }
}