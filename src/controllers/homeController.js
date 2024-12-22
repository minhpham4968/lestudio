import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('---------------')
        console.log(data)
        console.log('---------------')
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }

}
let getAboutpage = (req, res) => {
    return res.render('test/about.ejs')
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('post crud from server');
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    console.log('--------------------')
    console.log(data)
    console.log('--------------------')
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(userId)
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        console.log('---------------')
        console.log(userData)
        console.log('---------------')
        // let userData
        return res.render('editCRUD.ejs', {
            user: userData
        });
    }
    else {
        return res.send('Users not found')
    } // dua thong tin ra view
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
} // cap nhat thong tin 
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete user succeed!')
    }
    else {
        return res.send('user not found!')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutpage: getAboutpage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}