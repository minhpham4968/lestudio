import userService from "../services/userService"
let handleLogin = async (req, res) => {
    let email = req.body.email;// check email tu client gui len 
    let password = req.body.password;// check pass tu client gui len 
    // if (email === '' || email === null || email === 'undefined' || password === '' || password === null || password === 'undefined') 
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'// if email, pass don't have, it will print this
        })
    }
    let userData = await userService.handleUserLogin(email, password);// check success
    console.log(userData)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // id or ALL user
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters ',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    console.log(users)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);

}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }

    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);


}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type)
        return res.status(200).json(data);
    } catch (e) {
        console.log('Gell all code error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode

}