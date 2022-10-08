const User = require("../models/User")
const { verifyToken, veryAndauth, veryAndadmin } = require("./token")

const router =require("express").Router()

router.put("/:id",verifyToken,async(req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password, process.env.PAAS_SEC).toString()
    }
    try{
        const updatedUser =await User.findByIdAndUpdate(req.params.id,{
            $set:req.body

        },{new:true})
        res.status(200).json(updatedUser)
    }catch(err){res.status(500).json(err)}
})


//delete

router.delete("/:id",veryAndauth,async(req,res)=>{

    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted")

    }catch(err){
        res.status(500).json(err)
    }
})

//get user
router.get("/:id", veryAndadmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get all user
router.get("/", veryAndadmin, async (req, res) => {
    try {
      const users = await User.find();
      const { password, ...others } = users._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports=router