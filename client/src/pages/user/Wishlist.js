import React from 'react';
import UserNav from '../../components/nav/userNav.js'

const Wishlist = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav></UserNav>
                </div>
                    <div className="col">
                        <h1> Wishlist </h1>
                    </div>
                </div>
        </div>
    )
}

export default Wishlist;