const express = require ('express');
const router = express.Router();

router.get("/user", (req,res)=>{
    res.json({
        name:"Vaibhav Behl"
    })
})

module.exports = router;