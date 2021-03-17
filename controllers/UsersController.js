var User = require('../models').User;
const Op = require('sequelize').Op;

module.exports = class UsersController {

    constructor() {
        console.log('inside controller constructor');
    }

    getAllUsers( req, res, next ) {
        try {
            User.findAll(
            {
                attributes: ['first_name', 'last_name', 'email', 'dob', 'status'],
                where: {
                    status: {
                        [Op.ne]: 'DELETED' 
                    } 
                }
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

    updateUser( req, res, next ) {
        try {
            let id = req.params.id;
            let in_data = req.body;

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
}