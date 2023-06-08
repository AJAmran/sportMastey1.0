import  { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', 
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
            return config
        });

        axiosSecure.interceptors.response.use(
            (res) => res,
            async (err) =>{
                if(err.response && (err.res.status === 401 || err.res.status === 4003)){
                    await logOut;
                    navigate('/login');
                }
                return Promise.reject(err);
            }
        );
    }, [logOut, navigate]);

   return [axiosSecure];
};

export default useAxiosSecure;