var User = require('../models').User;
const Op = require('sequelize').Op;
let Validator = require('validatorjs');

let UserService = require('../services/UserService');
let UserServiceObj = new UserService();

module.exports = class ChatController {

    constructor() {
        console.log('inside ChatController constructor');
    }
    getAllUsers(){
        UserServiceObj.getAllUserCnt()
        .then( async ( cnt ) => {
            return cnt;
        } )
        .then( async ( cnt ) => {

            let result = await UserServiceObj.getAllUser();
            console.log(result);
            exports.getAllUsers = function(req, res) {
                res.send('dashboard',{ users : result,count: cnt});
            };
        } )
            
        
    }
}