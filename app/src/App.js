import './App.css';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Create from './Pages/Create'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext';
import { PostContextProvider } from './context/PostContext';
import View from './Components/View/View';
import ProtectedRoute from './Components/Protect/ProtectedRoute';

function App() {

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element: <Home/>
    },
    {
      path:"login",
      element: <Login/>
    },
    {
      path:"/signup",
      element: <Signup/>
    },
    {
      path:"/create",
      element:<Create/>
    },
    {
      path:"/view",
      element: <View/>
    }
  ])


  return (
    <div className="App">
      <PostContextProvider>
      <AuthContextProvider>
        <RouterProvider router={appRouter} />
      </AuthContextProvider>
      </PostContextProvider>
    </div>
  );
}

export default App;
