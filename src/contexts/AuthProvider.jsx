import {createContext, useEffect, useState } from "react";
import { app } from "../utils/firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const singIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };


  const logOut = () =>{
    setLoading(true);
    return signOut(auth)
  }

  const updateuserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
      if(currentUser){
        axios.post('https://sport-mastery-server-ajamran.vercel.app/create-jwt', {email: currentUser.email})
        .then(data =>{
          console.log(data.data.token)
          localStorage.setItem('access-token', data.data.token)
        })
      }
      else{
        localStorage.removeItem('access-token')
      }
      setLoading(false)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authDetails = {
    user,
    loading,
    createUser,
    singIn,
    googleSignIn,
    logOut,
    updateuserProfile,
  };
  return (
    <AuthContext.Provider value={authDetails}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
