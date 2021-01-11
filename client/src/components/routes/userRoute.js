import React from 'react'
import {Route} from 'react-router-dom'
import {useSelector} from 'react-redux';
import LoadCountDown from './LoadCountDown';

const UserRoute = ({history, children, ...rest}) => {
    const {user} = useSelector((state) => ({...state}));
    return user && user.token ? <Route {...rest}/> : <LoadCountDown />;
}

export default UserRoute;