import React from 'react';
import UserNav from '../../components/nav/userNav.js';
import {auth} from '../../Firebase.js';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {Button} from 'antd'

const UpdatePass = () => {
    const [pass,setPass] = React.useState("");
    const [confirmpass,setConfirmpass] = React.useState("");
    const [Oldpass,setOldpass] = React.useState("");
    const {user} = useSelector((state)=>state);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(pass===confirmpass)
            {
                const res = await auth.signInWithEmailAndPassword(user.email,Oldpass);
                await res.user.updatePassword(pass);
                toast.success("Password Changed");
                setOldpass("");
                setPass("");
                setConfirmpass("");
            } else{
                toast.error("New Password & Confirm New Password Does Not Match");
            }
        } catch (error) {
            toast.error("Incorrect Current Password");
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <UserNav></UserNav>
                </div>
                <div className="col-md-6 p-5">
                    <h1> Update Password </h1>
                    <form className="form">
                        <div className="form-group">
                            <label for="currenztPassword" >Current Password</label>
                            <input type="password" className="form-control" value={Oldpass} onChange={(e)=>setOldpass(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label for="newPassword" >New Password</label>
                            <input type="password" className="form-control" value={pass} onChange={(e)=>setPass(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label for="confirmPassword">Confirm New Password</label>
                            <input type="password" className="form-control" value={confirmpass} onChange={(e)=>setConfirmpass(e.target.value)}></input>
                        </div>
                    </form>
                    <Button onClick={handleSubmit} shape="" block type="primary" size="large" disabled={!Oldpass || !pass || pass.length<6}>Change Password</Button>
                </div>
            </div>
        </div>
    )
}

export default UpdatePass;