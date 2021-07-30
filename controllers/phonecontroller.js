const Phone = require ('../models/phones');
const validatePhone = require('../validation/phoneValidation')
const multer = require('multer');

const createPhone = async (req , res) => {

// validating user input using joi
    const {error} = validatePhone(req.body)
    if (error) return res.status(400).send(error.details[0].message)


    try{
const  {name, desc, numinstock, price, } = req.body
       const phonePhoto= req.file 
    const newphone = { name,
         desc, 
         numinstock,
          price,
          phonePhoto:`http://localhost:3500/phonephoto/${phonePhoto}`
       }
  
       const phone = await Phone.create(newPhone)
    
          
           res.status(200).json({
               status: "Success",
               msg: "Phone created successfully",
               data: phone
              })
    } catch (err) {
          res.status(400).send(err)
          
    }
}


const getUserPhones = async (req , res) => {
    const userid = req.user._id
    try {
     const userPhones = await Phone.findOne({user: userid});
     res.status(200).json({
        status: "success",
        data: userPhones
       })
    } catch (error) {
        res.status(400)
        console.log(error)
    }
}


const getOnePhone = async (req ,res) => {
        const userid = req.user._id
        const inputId = req.params.id
    try {
         const phone = await Phone.findOne({user: userid , _id : inputId});
        if (singleProduct) { 
         res.status(200).json({
            status: "success",
            data: phone
           })
        } else {
            res.status(400).send("Can't find phone that matches your search criteria")
        }
    } catch (error) {
     console.log(error)
    }
}


const updatePhoneInfo = async (req , res) => {
    const userid = req.user._id
    const inputId = req.params.id

    try {
        const  {name, desc, numinstock, price} = req.body
        const phone = await Phone.findOneAndUpdate({user: userid , _id: inputId},
            {name, desc, numinstock, price,  
                phonePhoto:`http://localhost:3500/phonephoto/${phonePhoto}`}
            )
            if (!phone) return res.status(400).send("product not found")
            const currentPhone = await phone.save()
            res.status(200).json({
                status: "success" , 
                msg:"phone info updated successfully",
                data: currentPhone
            })
    } catch (error) {
            res.status(400)
            console.log(error)
        }

}



const deletePhone = async (req , res) => {
    const userid = req.user._id
    const inputId = req.params.Id
    try {
    const phone =  await Phone.findOneAndDelete({user: userid , _id: req.params.id})
    if (!phone) return res.status(400).send("phone not found")
    res.status(200).json({
        success: "success", 
        msg: `Phone with id ${inputId} deleted successfully`, 
    })
    } catch (error) {
        res.status(400)
        console.log(error)
    }
}



module.exports = {
    createPhone,
    getUserPhones,
    getOnePhone,
    updatePhoneInfo,
    deletePhone
}