const express = require("express");
const User= require("../models/users")
const {validateUserSignin, validateUserSignup} = require("../validation/userValidation")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const sign_up = async(req, res,) => {
  const {error} = validateUserSignup(req.body)
  if (error) return res.status(400).send(error.details[0].message)
 try{
   // Get user input
    const {firstName, lastName, email, password, confirmPassword} =  req.body
    const avatar = req.file
    if (password !== confirmPassword) return res.status(400).send("passwords did no match")

    // makes sure all input information are provided
    
    



     //checks if user already exist 
const oldUser = await User.findOne({email})
if(oldUser){
  return res.status(409).send("User Already Exist. Please Login");
}
//encrypts password
const encryptedpassword = await bcrypt.hash(password, 12);

const newUser = {
  firstName,
   lastName, 
   email, 
   password:encryptedpassword,
   avatar: `http://localhost:3500/avatar/${avatar}`
  }

   //creates new user in database
const user = await User.create(newUser)

const id = user._id;
// create user token
const token = await jwt.sign({id, email}, process.env.TOKEN_SECRET, 
  process.env.EXPIRES_IN
);

//save user token
user.token = token

//return user
res.status(201).json({
  status: "success",
  data: {
    id: user._id,
    firstName,
   lastName, 
   email:email.toLowerCase(),  
   avatar: `http://localhost:3500/avatar/${avatar}`,
   token
  },
});
} catch (err) {
res.status(400).json({
  status: "Fail",
  
});
console.log(err);
}

}
const sign_in = async(req, res) => {
  try{
    const {error} = validateUserSignin(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const {email, password} =  req.body

if (!(email && password)) {
  res.status(400).send("All input is required");
}
const user = await User.findOne({ email });
if (user && (await bcrypt.compare(password, user.password))) {
  // Create token
  const token = jwt.sign(
    {id: user._id, email },
    process.env.TOKEN_SECRET,
  process.env.EXPIRES_IN
  );
  user.token = token;
  res.status(200).json(user);
}
res.status(400);
}catch(error){
  console.log(error);
}
}

const resetPassword = async (req , res) => {

  
  
      const userid = req.user._id
      const inputId = req.params.id
      if (userid !== inputId ){
       return res.status(400).send("Can't reset password for this user")
      }
   
      try {
        const newPassword = req.body.newPassword
      const encryptedPassword = await bcrypt.hash(newPassword , 12);
      const user = await User.findOneAndUpdate({_id: inputId},
          {password: encrytedPassword},  {new: true})
          await user.save();
      res.status(200).json({
          status: "Success" , 
          Message: "Password changed Succesfully" 
      })
      } catch (err) {
          res.status(400).send(err)
      }
      
  }
  
const updateUser = async (req , res ) => {

      const userid= req.user._id
      const inputId=req.params.id
      if (userid !== inputId){
         return res.status(400).send("Can't update user information")}
  
      try {
     const  { firstName,lastName,  email,phoneNumber} = req.body
     const avatar = req.file
          console.log(avatar)
          const user = await User.findOneAndUpdate({_id:iputId },
              {firstName,lastName,  email,phoneNumber,avatar},  {new: true} )
          const currentUser = await user.save();
          res.status(200).json({
              Status: "Success", 
              msg: "Update successful" , 
              data: {
              id: currentUser._id,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              email: currentUser.email,
              phoneNumber: currentUser.phoneNumber,
              avatar:`http://localhost:3500/avatar/${avatar}`
          }
          })
      } catch (err) {
          res.status(400).send(err)
      }
   }
  const deleteUser = async (req , res) => {
        const userid = req.user._id
        const inputId = req.params.id
        if (userid !==  inputId) {return res.status(400).send("Can't delete user")}
    
        try {
        const user =  await User.findOneAndDelete({_id: req.params.id})
        res.status(200).json({
            status: "Success" , 
            msg: `User with id:${inputId} deleted successfully` , 
        })
        } catch (error) {
            res.status(400)
            console.log(error)
        }
    }
  module.exports = { sign_up, sign_in, resetPassword, updateUser, deleteUser}
