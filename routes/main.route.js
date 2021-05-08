const express = require('express');
const router = express.Router();
const usersControler = require('../controllers/user.contorller');

//! GET method requests a representation of the specified resource
// HEAD method asks identical to GET request, but without the response body.
//! POST method is used to submit an entity to the specified resource.
//! PUT method replaces all current representations of the target resource with the request payload.
//! DELETE method deletes the specified resource
// PATCH method is used to apply partial modifications to a resource. // איתי אומר שלא משתמשים בזה
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

//----------- show controler -----------

outer.get('/welcome', (req,res)=>{
   console.log(" welcome");
   const user = 'shlomi';
   res.json(user);
})

//----------- user controler -----------
router.post('/users/create', (req, res)=>{
   console.log("create user");
   usersControler.createUser(req, res);    
})


router.get('/users/getUser', (req,res)=>{
   console.log("get user");
   usersControler.getUser(req, res);
  
})



// router.get('/users/followUp', (req, res) => {
//    console.log("tracking");
//    usersControler.createUser(req, res);    
// })

// router.get('/users/followup', (req, res) => {
//    console.log("tracking");
//    usersControler.createUser(req, res);    
// })





//  transactions controler -----------------------------
// router.patch('/accounts/deposit/:accountNumber', (req, res) => {
//    console.log("deposit");
//    transactionsControler.deposit(req, res);   
// })


// router.put('/accounts/withdraw/:accountNumber',(req, res) => {
//    console.log("withdraw");
//    transactionsControler.withdraw(req, res);    
// })

// router.put('/accounts/transfer/:fromAccountNumber/:toAccountNumber',(req, res) => {
//    console.log("transfer");
//    transactionsControler.transfer(req, res);    
// })



// user controler----------------
// router.post('/users/addUser', (req, res) => {
//    console.log("add user");
//    usersControler.createUser(req, res);    
// })
// router.get('/users/allUsers',(req, res) => {
//    console.log("showAllUsers");
//    usersControler.getAllUsers(req, res);
// })
// router.get('/users/user/:userIdNumber',(req, res) => {
//    console.log("showOneUser");
//    usersControler.getUser(req, res)
// })


module.exports = router;