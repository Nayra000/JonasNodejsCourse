/* import axios from "axios"; */

import {showAlert} from './alert';

export const loginUser=async (email ,password) =>{
    try{  
        const res = await axios({
                method:'POST' ,
                url:'http://localhost:5000/api/v1/users/singin' ,
                data:{email ,password}
        }) 
        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    }
    catch(err){
        console.log(err);
        showAlert('error', 'Email or password is incorrect');
    }

}

export const logoutUser = async ()=>{
    try{
        const res = await axios({
            method :'GET' ,
            url :'http://localhost:5000/api/v1/users/logout'
        })
        if (res.data.status === 'success') {
            showAlert('success', 'Logged out successfully!');
            /* window.location.href ='/'; */
            
            window.setTimeout(() => {
                location.reload(true);
                location.assign('/');
            }, 1000);
            
            
        }
    }
    catch(err){
        console.log(err);
        showAlert('error', err.response.data.message);   
    }
    

}



