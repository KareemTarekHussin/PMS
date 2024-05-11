import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFound from './Modules/SharedModule/components/NotFound/NotFound'
import Login from './Modules/AuthenticationModule/components/Login/Login'
import AuthLayout from './Modules/SharedModule/components/AuthLayout/AuthLayout'
import ForgetPass from './Modules/AuthenticationModule/components/ForgetPass/ForgetPass'
import ResetPass from './Modules/AuthenticationModule/components/ResetPass/ResetPass'
import VerifyAccount from './Modules/AuthenticationModule/components/VerifyAccount/VerifyAccount'
import Register from './Modules/AuthenticationModule/components/Register/Register'
import MasterLayout from './Modules/SharedModule/components/MasterLayout/MasterLayout'
import ProjectsList from './Modules/ProjectsModule/components/ProjectsList/ProjectsList'
import ProtectedRoute from './Modules/SharedModule/components/ProtectedRoute/ProtectedRoute'
import TasksList from './Modules/TasksModule/components/TasksList/TasksList'
import UsersList from './Modules/UsersModule/components/UsersList/UsersList'
import Dashboard from './Modules/DashboardModule/components/Dashboard/Dashboard'

function App() {

  let routes = createBrowserRouter([
    {path:"/",
    element:<AuthLayout/>,
    errorElement: <NotFound/>,
    children:[
    {path:"",element:<Login />},
    {path:"login",element:<Login />},
    {path:"register",element:<Register/>},
    {path:"forgetpass",element:<ForgetPass/>},
    {path:"resetpass",element:<ResetPass/>},
    {path:"verify",element:<VerifyAccount/>}

    ]


  },
    {path:'DashBoard',
      element:
     
      <MasterLayout />
    ,
      errorElement: <NotFound/>,
      children:[{path:"",element:<Dashboard/>}, 
      {path:"projects",element:<ProjectsList/>},
      {path:"tasks",element:<TasksList/>},
      {path:"users",element:<UsersList/>},
     
  
      ]
  
    }
   
  ])

  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
