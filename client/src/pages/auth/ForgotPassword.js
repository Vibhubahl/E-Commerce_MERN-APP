import React from 'react';
import {auth} from '../../Firebase.js';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'
import {Button} from 'antd'

function ForgotPassword({history}){
    const {user} = useSelector((state)=>state);

    React.useEffect(()=>{
        if(user && user.token)
        {
            history.push('/');
        }
    });

    const [email,setEmail] = React.useState("");

    async function handleSubmit(e){
        e.preventDefault();

        const config ={
            url: 'http://localhost:3000/login',
            handleCodeInApp: true,
        }

        await auth.sendPasswordResetEmail(email,config).then(()=>{
            toast.success("Password Reset Link Sent to "+ email)
            setEmail('');
        }).catch((error)=>{
            toast.error(error.message);
        })
    }
    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Forgot Password</h1>
                    <form className="form">
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input name="email" type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} autoFocus></input>
                        </div>                
                    </form>
                    <Button onClick={handleSubmit} shape="round" block type="primary" size="large" className="mb-3" disabled={!email}>Submit</Button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;