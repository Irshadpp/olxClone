import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth,db, storage, } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {doc, setDoc, addDoc, collection} from 'firebase/firestore'
import { getErrorMessage } from "../util/errorMessages";

const AuthContext = createContext();


const uploadImage = async (file) => {
    if (!file) throw new Error('No file provided for upload');
    
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
  
    return downloadURL;
  };

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
            console.log(error)
            throw new Error(getErrorMessage(error.code));
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

     const submitProduct = async (name, category, price, imageFile) => {
        try {
          const imageURL = await uploadImage(imageFile);
      
          const productData = {
            name,
            category,
            price,
            imageUrl: imageURL,
            userId: user.uid,
            createdAt: new Date(),
          };
      
          const productRef = await addDoc(collection(db, 'products'), productData);
          await setDoc(productRef, productData);
      
          return 'Product submitted successfully';
        } catch (error) {
            console.log(error)
          throw new Error(`Failed to submit product: ${getErrorMessage(error.code)}`);
        }
      };

    return <AuthContext.Provider value={{user, signup, login, logout, submitProduct}}>
        {children}
    </AuthContext.Provider>
}


export const UserAuth = () =>{
    return useContext(AuthContext)
}