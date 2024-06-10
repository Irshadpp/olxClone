import './App.css';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Create from './Pages/Create'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext';

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
      element: <Create/>
    }
  ])


  return (
    <div className="App">
      <AuthContextProvider>
        <RouterProvider router={appRouter} />
      </AuthContextProvider>
    </div>
  );
}

export default App;
