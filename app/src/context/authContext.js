import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth,db } from "../firebase/firebase";
import {doc, setDoc} from 'firebase/firestore'
import { getErrorMessage } from "../util/errorMessages";

const AuthContext = createContext();


export const AuthContextProvider = ({children}) =>{

    const [user,setUser] = useState({});

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentuser) =>{

            setUser(currentuser);
        })
        return () =>{
            unsubscribe();
        }
    },[])

    const signup = async (username, email, password, phone) =>{
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: username });
            await setDoc(doc(db, 'users', email), {
              id: result.user.uid,
              username,
              phone,
            });
          } catch (error) {
            throw new Error(getErrorMessage(error.code))
          }
    }

    const login = async (email, password) =>{
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            throw new Error(getErrorMessage(error.code))
        }
    }

    const logout = async () =>{
        try {
            await signOut(auth);
        } catch (error) {
            
        }
    }


    return <AuthContext.Provider value={{user, signup, login, logout}}>
        {children}
    </AuthContext.Provider>
}


export const UserAuth = () =>{
    return useContext(AuthContext)
}