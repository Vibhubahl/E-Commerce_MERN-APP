import React from 'react';
import AdminNav from '../../components/nav/adminNav.js'
 
const AdminDash = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div>
                    <h1> Admin Page </h1>
                </div>
            </div>
        </div>
    )
}

export default AdminDash;