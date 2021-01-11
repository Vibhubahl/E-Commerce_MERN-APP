const admin = require('../firebase/index.js');
const User = require('../models/userSchema.js');

exports.authCheck = async (req, res, cb) =>{
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        req.user = firebaseUser;
        cb();
    } 
    catch (error) {
        res.status(401).json({
            error: "Invalid or expired token",
        })
    }
}

exports.adminCheck = async (req,res,cb) => {
    const Uemail = req.user.email;

    const adminUser = await User.findOne({email:Uemail}).exec()

    if(adminUser.role !== "admin"){
            res.status(403).json({
                err:'Access Denied'
            })
    }
    else{
        cb();
    }
}
    