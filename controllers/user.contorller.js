const usersModel = require('../models/users.model');

const createUser = (req, res) => {
    
    // const {userName, userNumber,userLevel } = req.body;
    // const user = new userModel({
    //     userName: userName,
    //     userNumber: userNumber,
    //     userLevel: userLevel,
    //     credit: 0,
    //     isActive: true,
    //     openDate: openDate,
    // });
    // user.save((err) => {
    //     if (err) return res.json({"user error": err})
    //     return res.status(200).json({userName})
    // });


}

// const getAccount = (req, res) => {
//     accountsModel.find({}).then((x) => {
//         return res.send(x)
//     });
// }

module.exports = {
   createUser: createUser,
    
}
