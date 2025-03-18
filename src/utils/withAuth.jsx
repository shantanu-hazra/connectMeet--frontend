import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const withAuth =(WrappedComponent) =>{
    const AuthComponent = (props) =>{
        const router = useNavigate();

        const isAuthenticated = () =>{
            if(localStorage.getItem("token")){
                return item;
            }
            return false
        }

        useEffect(()=>{
            if(!isAuthenticated()){
                router('/auth')
            }
        },[])
    }

    return AuthComponent
}

export default withAuth;