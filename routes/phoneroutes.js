const express = require("express");
const router = express.Router();
const phonecontroller = require("../controllers/phonecontroller")
const verifyToken = require("../middlewares/auth")
const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/phonephotos"));
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
function fileFilter (req, file, cb){
    const type = file.mimetype;
    const typeArray = type.split("/");
    if (typeArray[1] == "jpeg" || typeArray[1] == "png") {
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

router.post("/create", verifyToken, upload.single("phonephoto"), phonecontroller.createPhone)
router.get("/:id", verifyToken, phonecontroller.getUserPhones)
router.put("/update/:id",verifyToken, upload.single("phonephoto"), phonecontroller.updatePhoneInfo)
router.delete("/delete/:id", verifyToken, phonecontroller.deletePhone)

module.exports = router;