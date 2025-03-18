import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { HttpStatusCode } from'axios';
import httpStatus from 'http-status'

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "localhost:8080/api/v1/users"
})

export const AuthProvider = ({children})=>{

    const authContext = useContext(AuthContext);
    
    const [userData, setUserData] = useState(authContext);

    const navigate=useNavigate();


    const handleRegister=async (name,username,password)=>{

        try{
            if(!name||!username||!password){
                throw new Error("Please provide all the details")
            }
            let request = await axios.post("http://localhost:8080/api/v1/users/register",{
                name:name,
                username:username,
                password:password,
            })

            if(request.status===httpStatus.CREATED){
                navigate('/home')
            }
        }catch(error){
            if(error.response){
                throw new Error(error.response.data.message)
            }
            else{
                throw new Error(error.message)
            }
        }
    }

    const handleLogin = async (username,password)=>{

        try{

            let request = await axios.post("http://localhost:8080/api/v1/users/login",{
                username:username,
                password:password
            })
            
            if(request.status===httpStatus.OK){
                localStorage.setItem("token",request.data.token);
                console.log(request);
                navigate('/home')
            }
            
        }catch(e){
            throw e;
        }
    }

    const getUserHistory = async ()=>{
        try{
            let request = await client.get("/get_all_activity",{
                params:{
                    token:localStorage.getItem("token")
                }
            });
            return request.data;
        }catch(e){
            throw err
        }
    }

    const addToUserHistory = async (meetingCode)=>{
        try{
            let request = await client.post("/add_to_activity",{
                token:localStorage.getItem("token"),
                meeting_code:meetingCode
            });
            return request
        }catch(e){
            throw e;
        }
    }

    const data = {
        userData, setUserData, handleRegister, handleLogin, addToUserHistory,getUserHistory
    }



    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}