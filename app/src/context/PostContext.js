import { createContext ,useState} from "react";


const PostContext = createContext();

export const PostContextProvider = ({children}) =>{
    const [postDetails,setPostDetails] = useState()
    return <PostContext.Provider value={{postDetails}}>
        {children}
    </PostContext.Provider>
}