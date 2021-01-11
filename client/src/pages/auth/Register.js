import React from 'react'
import {toast} from 'react-toastify';
import {auth} from '../../Firebase.js'
import {Button} from 'antd'
import {MailOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';

function Register({history}){

    const {user} = useSelector((state)=>({...state}));

    React.useEffect(()=>{
        if(user && user.token)
        {
            history.push('/');
        }
    });

    const [email,setEmail] = React.useState("");
    function handleChange(e){
        setEmail(e.target.value);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const config ={
            url: 'http://localhost:3000/register/complete',
            handleCodeInApp: true,
        }
        await auth.sendSignInLinkToEmail(email, config);
        toast.success('Verification Link sent to: ' + email);
        window.localStorage.setItem('emailForRegistration', email);
        setEmail("");
    };

    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Register</h1>
                    <form className="form">
                        <div className="form-group">
                            <label for="email">Email:</label>
                            <input type="email" className="form-control" value={email} onChange={handleChange} autoFocus></input>
                        </div>
                        <Button onClick={handleSubmit} shape="round" block type="primary" icon={<MailOutlined />} size="large" className="mb-3">Register</Button>                
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;