var User = require('../models').User;
const Op = require('sequelize').Op;
let Validator = require('validatorjs');

module.exports = class UsersController {

    constructor() {
        console.log('inside controller constructor');
    }

    getAllUsers( req, res, next ) {
        try {
            User.findAll(
            {
                attributes: ['*']
            }
            ).then((result) => {
        
                if (result === null) {
    
                    return res.send({
                        status: 200,
                        code: 404,
                        msg: 'Records not found',
                        data: result
                    });
                } else {
    
                    return res.send({
                        status: 200,
                        code: 200,
                        msg: 'Records found',
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
            console.log('catch');
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                data: ex.toString()
            });
        }
    }

    getUserById( req, res, next ) {
        try {
            let id = req.params.id;
            User.findOne(
                { 
                    where: { 
                        id: id,
                        status: { 
                            [Op.ne]: 'DELETED' 
                        } 
                    } 
                }
            )
            .then((result) => {

                if (result === null) {
    
                    return res.send({
                        status: 200,
                        code: 404,
                        msg: 'Records not found',
                        data: result
                    });
                } else {
    
                    return res.send({
                        status: 200,
                        code: 200,
                        msg: 'Records found',
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
            console.log('catch');
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                data: ex.toString()
            });
        }
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

            User.build(in_data).save()
            .then((result) => {

                if (result === null) {
    
                    return res.send({
                        status: 200,
                        code: 404,
                        msg: 'Record not inserted',
                        data: result
                    });
                } else {
    
                    return res.send({
                        status: 200,
                        code: 200,
                        msg: 'Record inserted successfully',
                        data: result
                    });
                }
            })
            .catch((error) => {
                console.log('catch 1');
                res.send({
                    status: 400,
                    code: 400,
                    msg: 'Exception occur',
                    data: error.toString()
                });
            });
        } catch(ex) {
            console.log('catch 2');
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                data: ex.toString()
            });
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
            console.log('catch');
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                data: ex.toString()
            });
        }
    }

    deleteUser( req, res, next ) {
        try {
            let id = req.params.id;
            let dated = new Date();
            let in_data = {
                status : 'DELETED',
                deletedAt: dated
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
            console.log('catch');
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                data: ex.toString()
            });
        }
    }

    deleteHardUser( req, res, next ) {
        try {
            let id = req.params.id;
            User.destroy({ where: { id: id } })
            .then((result) => {

                if (result === null) {
    
                    return res.send({
                        status: 200,
                        code: 404,
                        msg: 'Record not deleted',
                        data: result
                    });
                } else {
    
                    return res.send({
                        status: 200,
                        code: 200,
                        msg: 'Record deleted successfully',
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
            console.log('catch');
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                data: ex.toString()
            });
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
            console.log('catch');
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                data: ex.toString()
            });
        }
    }
}