import React, { useState } from 'react'
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, PlusCircleOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

const { SubMenu } = Menu;

function NavBar(){
    const [current, setCurrent] = useState("Home")
    let dispatch = useDispatch();
    const {user} = useSelector((state)=>({...state}));
    function handleClick(e){
        setCurrent(e.key);
    }
    let history = useHistory();

    function logout(){
        firebase.auth().signOut();
        dispatch({
            type: 'LOGOUT',
            payload: null
        });
        history.push("/login");
    }

    return(
        <>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="Home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            
            {!user && (
                <Menu.Item key="register" icon={<PlusCircleOutlined />} className="float-right">
                    <Link to="/register">Register</Link>
                </Menu.Item>
            )}

            {!user && (
                <Menu.Item key="login" icon={<LoginOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Menu.Item>
            )}

            {user &&(
                <SubMenu key="menu" icon={<UserOutlined />} title={user.email} className="float-right">
                    {user.role==="user" && (<Menu.Item key="Opt:1"><Link to="/user/dashboard">Dashboard</Link></Menu.Item>)}
                    {user.role==="admin" && (<Menu.Item key="Opt:2"><Link to="/admin/dashboard">Dashboard</Link></Menu.Item>)}
                    <Menu.Item icon={<LogoutOutlined />} onClick={logout}>Logout</Menu.Item>
                </SubMenu>
            )}
        </Menu>
        </>
    );
}

export default NavBar;