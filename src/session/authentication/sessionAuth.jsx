import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logInAccount } from '../../store/loginToken/loginTokenPost';
import { useNavigate } from 'react-router';

const SessionAuthContext = createContext();

export const useAuth = () => {
    return useContext(SessionAuthContext);
};

export const SessionAuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [isSessionAuthenticated, setIsSessionAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

    useEffect(() => {
      // Check session status when the component mounts
      const checkAuthStatus = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/status`, 
            { withCredentials: true }
          );
          if (response.status === 200) {
            setIsSessionAuthenticated(true);
          } else {
            setIsSessionAuthenticated(false);
          }
        } catch (error) {
          setIsSessionAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };

      checkAuthStatus();
    }, [setIsSessionAuthenticated]); 
  
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/status`, { withCredentials: true })
          .then(response => {
            if (response.status === 200) {
              setIsSessionAuthenticated(true);
            } else {
              setIsSessionAuthenticated(false);
            }
          })
          .catch(() => {
            setIsSessionAuthenticated(false);
          }).finally (() => {
              setLoading(false);
            })
          
        // Add axios interceptor
        const interceptor = axios.interceptors.response.use(
          response => response,
          error => {
            if (error.response && error.response.status === 401) {
              setIsSessionAuthenticated(false);
              navigate('/api/auth/login');
            }
            return Promise.reject(error);
          }
        );
        return () => {
          axios.interceptors.response.eject(interceptor);
        };
      }, [dispatch, navigate]);

    const sessionLogin = async (userData) => {
        dispatch(logInAccount(userData))
    };

    const sessionLogout = async () => {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/logout`, {}, { withCredentials: true });
        setIsSessionAuthenticated(false);
        return response
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      );
    }
    return (
        <SessionAuthContext.Provider value={{ isSessionAuthenticated, sessionLogin, sessionLogout, setIsSessionAuthenticated }}>
            {children}
        </SessionAuthContext.Provider>
    );
};
