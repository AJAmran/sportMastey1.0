import  { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'https://sport-mastery-server-ajamran.vercel.app', 
  });

const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() =>{
        axiosSecure.interceptors.request.use((config) =>{
            const token = localStorage.getItem('access-token');
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) =>{
                if(error.response && (error.response.status === 403 || error.response.status === 401)){
                    await logOut;
                }
                return Promise.reject(error);
            }
        );
    }, [logOut, navigate]);

   return [axiosSecure];
};

export default useAxiosSecure;