import React from 'react'
import {toast} from 'react-toastify';
import {auth} from '../../Firebase.js'
import {Button} from 'antd'
import {MailOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {userUpdate} from '../../functions/auth.js'

function RegisterComplete({ history }){
    const [email,setEmail] = React.useState("");
    const [pass,setPass] = React.useState("");
    const [uname,setuname] = React.useState("");
    
    const dispatch = useDispatch();

    React.useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"))
    }, [])

    async function handleSubmit(e){
        e.preventDefault();

        if (!email || !pass) {
            toast.error("Email and password is required");
            return;
          }
      
          if (pass.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
          }
        
          const redirectUser = (res) => {
            if(res.data.role==="admin"){
                history.push("/admin/dashboard");
            }
            else{
                history.push('/user/dashboard');
            }
        };

        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            );   
            if(result.user.emailVerified){
                window.localStorage.removeItem("emailForRegistration");
                const user = auth.currentUser;
                await user.updatePassword(pass);
                user.updateProfile({
                    displayName: uname,
                })
                const idToken = await user.getIdTokenResult();
                userUpdate(idToken.token)
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
                     redirectUser(res);
                })
            .catch(err => console.log(err));
                //history.push('/');
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Register</h1>
                    <form className="form" autoComplete="off">
                        <div className="form-group">
                            <label for="email">Email:</label>
                            <input name="email" type="email" className="form-control" value={email} disabled></input>
                        </div>
                        <div className="form-group">
                            <label for="pass">Password:</label>
                            <input name="pass" type="password" className="form-control" value={pass} onChange={(e)=>setPass(e.target.value)}  autoFocus></input>
                        </div>
                        <div className="form-group">
                            <label for="uname">Name:</label>
                            <input name="uname" type="text" className="form-control" value={uname} onChange={(e)=>setuname(e.target.value)}></input>
                        </div>
                        <Button onClick={handleSubmit} shape="round" block type="primary" icon={<MailOutlined />} size="large" className="mb-3">Register</Button>                                    
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterComplete;