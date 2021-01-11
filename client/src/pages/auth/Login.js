import React from 'react'
import {Button} from 'antd'
import {MailOutlined,GoogleOutlined} from '@ant-design/icons';
import {auth,googleAuthProvider} from '../../Firebase.js';
import {toast} from 'react-toastify';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {userUpdate} from '../../functions/auth.js'

function Login({history}){

    const {user} = useSelector((state) => ({...state}));

    React.useEffect(()=>{
        if(user && user.token)
        {
            history.push('/');
        }
    });

    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");
    let dispatch = useDispatch();

    const redirectUser = (res) => {
        if(res.data.role==="admin"){
            history.push("/admin/dashboard");
        }
        else{
            history.push('/user/dashboard');
        }
    };

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const res = await auth.signInWithEmailAndPassword(email,pass);
            const {user} = res;
            const IdToken = await user.getIdTokenResult();
            
            userUpdate(IdToken.token)
            .then((res)=>
            {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: res.data.email,
                        token: IdToken.token,
                        name: res.data.name,
                        role: res.data.role,
                        _id: res.data._id
                    },
                  });
                  redirectUser(res);
            })
            .catch(err => console.log(err));

            //history.push("/");
        } catch (error) {
            if(error.code==="auth/user-not-found")
            {
                toast.error("Email Not Found")
            }
            else if(error.code==="auth/wrong-password")
            {
                toast.error("Incorrect Password")
            }
        }
    }

    async function googleLogin(){
        auth.signInWithPopup(googleAuthProvider)
        .then(async(result)=>{
            const {user} = result;
            const IdToken = await user.getIdTokenResult();
            
            userUpdate(IdToken.token)
            .then((res)=>
            {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: res.data.email,
                        token: IdToken.token,
                        name: res.data.name,
                        role: res.data.role,
                        _id: res.data._id
                    },
                  });
                  redirectUser(res);
            })
            .catch(err => console.log(err));

            //history.push("/");s
        }).catch(error => {
            toast.error(error.message);
        })
    }

    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Login</h1>
                    <form className="form">
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input name="email" type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label for="pass">Password</label>
                            <input name="pass" type="password" className="form-control" value={pass} onChange={(e)=>setPass(e.target.value)}></input>
                        </div>                
                    </form>
                    <Link to="/forgot" className="text-danger">Forgot Password</Link>
                    <Button onClick={handleSubmit} shape="round" block type="primary" icon={<MailOutlined />} size="large" className="mb-3 mt-3" disabled={!email || pass.length<6}>Login</Button>
                    <Button onClick={googleLogin} shape="round" block type="danger" size="large" className="mb-3"><GoogleOutlined />Login With Google</Button>
                </div>
            </div>
        </div>
    );
}

export default Login;