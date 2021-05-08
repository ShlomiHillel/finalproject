const usersModel = require('../models/users.model');

const createUser = async (req, res) => {
    try {  
    const {userName, userNumber } = req.body;
    const user = new usersModel({
        userName: userName,
        userNumber: userNumber,
        type: 1,
        credit: 0,
        isActive: true,
        openDate: Date.now(),
    });
    await user.save()
    res.status(201).json({user})
    // res.status(201).send(user.toPublicJSON());
    } catch(e) {
      res.status(400).send(e)
    }
}



const getUser  = async (req, res) => {
    try {  
    const {userName, userNumber } = req.body;
    // const {userName, userNumber } = req.query;

    let user;
    if (userNumber) user = await usersModel.findOne({userNumber});
    else if (userName) user = await usersModel.findOne({userName});
    else throw ('wrong details');
    res.status(201).json({user})
    // res.status(200).send(user.toPublicJSON());
    } catch(err) {
      res.status(400).send(err);
    }
  }

// const getUser = (req, res) => {
//     accountsModel.find({}).then((x) => {
//         return res.send(x)
//     });
// }

module.exports = {
   createUser: createUser,
   getUser: getUser, 

   signUp,
	login,
	logout,
	logoutAll,
	getProfile,
	forgotPassword,
	resetPassword,
	uploadProfileImage,
	deleteProfileImage,
	getUserPicture,
}




	
