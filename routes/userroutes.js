const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller")
const verifyToken = require("../middlewares/auth")
const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/useravatar"));
     },
    filename: (req, file, cb) => {
        cb(null , file.originalname);
       
    }
});
function fileFilter (req, file, cb){
    const typeArray = file.mimetype.split("/");
    if (typeArray[1] == "jpeg"  || typeArray[1] == "png" || typeArray[1] == "jpg" || typeArray[1] == "gif") {
      cb(null, true);
    }else {
      cb(null, false);
    }
  }
  const upload = multer({ storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    } ,
    fileFilter: fileFilter})

router.post("/signup", upload.single("avatar"), usercontroller.sign_up)
router.post("/signin", verifyToken, usercontroller.sign_in )
router.put("/resetpassword/:id" , verifyToken , usercontroller.resetPassword)
router.put("/updateuser/:id" ,verifyToken ,upload.single("avatar"), usercontroller.updateUser)
router.delete("/deleteuser/:id", verifyToken, usercontroller.deleteUser)

module.exports= router;
