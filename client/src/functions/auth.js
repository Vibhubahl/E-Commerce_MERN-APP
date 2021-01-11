import axios from 'axios';

export const userUpdate = async (authtoken) =>{
    return await axios.post('http://localhost:4000/updateUser', {} , {
        headers:{
            authtoken
        }
    })
} 

export const currentUser = async (authtoken) => {
    return await axios.post('http://localhost:4000/getUser',
    {}, 
    {
        headers:{
            authtoken
        }
    })
}

export const currentAdmin = async (authtoken) =>{
    return await axios.post('http://localhost:4000/getUserAdmin', 
    {}, 
    {
        headers:{
            authtoken
        }
    })
}