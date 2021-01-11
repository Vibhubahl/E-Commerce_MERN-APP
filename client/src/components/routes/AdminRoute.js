import React from 'react'
import {Route} from 'react-router-dom'
import {useSelector} from 'react-redux';
import LoadCountDown from './LoadCountDown';
import {currentAdmin} from '../../functions/auth.js'

const AdminRoute = ({children, ...rest}) => {
    const {user} = useSelector((state) => ({...state}));
    const [ok,setOk] = React.useState(false);

    React.useEffect(()=>{
        if(user && user.token){
            currentAdmin(user.token).then(res=>{
                    setOk(true);

                }).catch(err=>{
                    console.log(err);
                    setOk(false);
                })
            }
        },[user]);
        
    return ok ? <Route {...rest} /> :<LoadCountDown />;
}

export default AdminRoute;