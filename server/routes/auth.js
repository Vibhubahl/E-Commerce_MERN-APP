const express = require ('express');
const router = express.Router();
const {updateUserFunction,getUser} = require("../controller/auth.js");
const {authCheck, adminCheck} = require('../middlewares/auth.js')

router.post("/updateUser", authCheck, updateUserFunction)
router.post("/getUser", authCheck, getUser)
router.post("/getUserAdmin", authCheck, adminCheck, getUser)

module.exports = router;