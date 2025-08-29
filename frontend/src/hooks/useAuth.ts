import axios from "axios"
const env = import.meta.env;

const verify = async () =>{
    try {
        const token = localStorage.getItem('token');
        if(!token){
            return {loggedIn:false};
        }
        const response = await axios.get(`${env.VITE_BACKEND_URL}/api/verify-user`,{
            headers:{
                'Authorization':'Bearer '+token
            }
        });
        return {
            loggedIn:true,
            name:response.data.user.name,
            email:response.data.user.email
        }
    } catch (error) {
        return {
            loggedIn:false,
            error:error
        }
    }
}

const logOut = () =>{
    localStorage.removeItem('token');
    window.location.replace(`${env.VITE_FRONTEND_URL}/signin`);
}

export const useAuth = () =>{
    const token = localStorage.getItem('token');
    return {
        token:token,
        verify:verify,
        logOut:logOut
    }
}