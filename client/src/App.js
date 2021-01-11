import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css'

import Login from './pages/auth/Login.js';
import Register from './pages/auth/Register.js';
import Home from './pages/Home.js';
import NavBar from './components/nav/navBar.js';
import RegisterComplete from './pages/auth/RegisterComplete.js';
import ForgotPassword from './pages/auth/ForgotPassword.js';
import UserDash from './pages/user/UserDashboard.js';
import UserRoute from './components/routes/userRoute.js'
import UpdatePass from './pages/user/UpdatePassword.js'
import Wishlist from './pages/user/Wishlist.js';
import AdminDash from './pages/admin/AdminDashboard.js';
import AdminRoute from './components/routes/AdminRoute.js'
import CategoryCreate from './pages/admin/products/CategoryCreate.js'

import {auth} from './Firebase.js'
import {useDispatch} from 'react-redux'
import {currentUser} from './functions/auth.js'

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const uns = auth.onAuthStateChanged(async (user) => {
      if(user)
      {
        const idToken =await user.getIdTokenResult()

        currentUser(idToken.token)
            .then((res)=>
            {
              dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: res.data.email,
                    token: idToken.token,
                    name: res.data.name,
                    role: res.data.role,
                    _id: res.data._id
                },
              });
            })
            .catch(err => console.log(err));
      }
    });
    return () => uns();
  },[dispatch]);
  
  return (
    <>
      <NavBar/>
      <ToastContainer/>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/register/complete' component={RegisterComplete}></Route>
        <Route exact path='/forgot' component={ForgotPassword}></Route>
        <AdminRoute exact path='/admin/dashboard' component={AdminDash}></AdminRoute>
        <AdminRoute exact path='/admin/category' component={CategoryCreate}></AdminRoute>
        <UserRoute exact path='/user/dashboard' component={UserDash}></UserRoute>
        <UserRoute exact path='/user/password' component={UpdatePass}></UserRoute>
        <UserRoute exact path='/user/wishlist' component={Wishlist}></UserRoute>
      </Switch>
    </>
  );
}

export default App;
