var User = require('../models').User;
const Op = require('sequelize').Op;
let Validator = require('validatorjs');

let UserService = require('../services/UserService');
let UserServiceObj = new UserService();

let ResponseService = require('../services/ResponseService');
let ResponseServiceObj = new ResponseService();

let $this;

module.exports = class UsersController {

    constructor() {
        console.log('inside controller constructor');
        $this = this;
    }

    insertUser( req, res, next ) {
        try {
            let in_data = req.body;
            let rules = {
                first_name: 'required',
                email: 'required|email',
                password: 'required|min:6',
                dob: 'required|date',
                role: 'required|in:ADMIN,USER',
                status: 'required|in:OPEN,CLOSE,DELETED',
            };

            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                let obj = validation.errors.all();
                let arr = [];
                for (const property in obj) {
                    arr.push(obj[property][0]);
                }
                let out_data = {
                    msg: arr[0]
                };
                return ResponseServiceObj.sendException( res, out_data, arr );
            }

            UserServiceObj.insertUser( in_data )
            .then( async ( result ) => {
                let out_data = {
                    msg: 'Record inserted successfully.',
                    data: result
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );
        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    updateUser( req, res, next ) {
        try {
            let id = req.body.id;
            let in_data = req.body;

            let rules = {
                id: 'required|numeric|min:1'
            };
            in_data['first_name'] ? rules['first_name'] = 'required' : '' ;
            in_data['email'] ? rules['email'] = 'required|email' : '' ;
            in_data['password'] ? rules['password'] = 'required|min:6' : '' ;
            in_data['dob'] ? rules['dob'] = 'required|date' : '' ;
            in_data['role'] ? rules['role'] = 'required|in:ADMIN,USER' : '' ;
            in_data['status'] ? rules['status'] = 'required|in:OPEN,CLOSE,DELETED' : '' ;

            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                let obj = validation.errors.all();
                let arr = [];
                let msg = '';
                for (const property in obj) {
                    arr.push(obj[property][0]);
                }
                let out_data = {
                    msg: arr[0]
                };
                return ResponseServiceObj.sendException( res, out_data, arr );
            }

            UserServiceObj.updateUser( id, in_data )
            .then( async ( result ) => {
                let out_data = {
                    msg: 'Record updated successfully.',
                    data: in_data
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );
        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    deleteUser( req, res, next ) {
        try {
            let id = req.params.id;
            let in_data = {
                id: id
            };
            let rules = {
                id: 'required|numeric|min:1'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                let obj = validation.errors.all();
                let arr = [];
                let msg = '';
                for (const property in obj) {
                    arr.push(obj[property][0]);
                }
                let out_data = {
                    msg: arr[0]
                };
                return ResponseServiceObj.sendException( res, out_data, arr );
            }
            UserServiceObj.deleteUserSoftlyById( id )
            .then( async( result ) => {
                let out_data = {
                    msg: 'Record deleted successfully.'
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );
        } catch(ex) {    
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    deleteHardUser( req, res, next ) {
        try {
            let id = req.params.id;
            let in_data = {
                id: id
            };
            let rules = {
                id: 'required|numeric|min:1'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                let obj = validation.errors.all();
                let arr = [];
                let msg = '';
                for (const property in obj) {
                    arr.push(obj[property][0]);
                }
                let out_data = {
                    msg: arr[0]
                };
                return ResponseServiceObj.sendException( res, out_data, arr );
            }
            UserServiceObj.deleteUserHardlyById( id )
            .then( async( result ) => {
                let out_data = {
                    msg: 'Record deleted successfully.'
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );
        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    getAllUsers( req, res, next ) {
        try {
            
            UserServiceObj.getAllUserCnt()
            .then( async ( cnt ) => {
                return cnt;
            } )
            .then( async ( cnt ) => {

                let result = await UserServiceObj.getAllUser();
                let out_data = {
                    msg: 'Record found',
                    data: result,
                    cnt: cnt
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );

        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    getUserById( req, res, next ) {
        try {
            let id = req.params.id;
            let in_data = {
                id: id
            };
            let rules = {
                id: 'required|numeric|min:1'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                let obj = validation.errors.all();
                let arr = [];
                let msg = '';
                for (const property in obj) {
                    arr.push(obj[property][0]);
                }
                let out_data = {
                    msg: arr[0]
                };
                return ResponseServiceObj.sendException( res, out_data, arr );
            }
            UserServiceObj.getUserById( id )
            .then( async ( result ) => {
                let out_data = {
                    msg: 'Record found',
                    data: result
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );
        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    uploadProfilePic( req, res, next ) {
        try {
            let id = req.body.id;
            let userImageDetails = req.params.userImageDetails;
            let rules = {
                id: 'required|numeric|min:1'
            };

            let validation = new Validator(req.body, rules);
            if( validation.fails() ) {
                let obj = validation.errors.all();
                let arr = [];
                for (const property in obj) {
                    console.log(`${property}: ${obj[property]}`);
                    arr.push(obj[property][0]);
                }
                return res.send({
                    status: 200,
                    code: 422,
                    msg: 'Validation error',
                    errObj: obj,
                    errArr: arr
                });
            }
            let in_data = {
                profile_pic : userImageDetails.fullFileName,
                updatedAt : new Date()
            };

            User.update(in_data, { where: { id: id } })
            .then((result) => {

                if (result === null) {
    
                    return res.send({
                        status: 200,
                        code: 404,
                        msg: 'Record not updated',
                        data: result
                    });
                } else {
    
                    return res.send({
                        status: 200,
                        code: 200,
                        msg: 'Record updated successfully',
                        data: result
                    });
                }
            })
            .catch((error) => {

                res.send({
                    status: 400,
                    code: 400,
                    msg: 'Exception occur',
                    data: error.toString()
                });
            });

        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }
}