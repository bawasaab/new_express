var CustomerModel = require('../models').customer;
const Op = require('sequelize').Op;
let Validator = require('validatorjs');

module.exports = class CustomerController {

    constructor() {
        console.log('inside controller constructor');
    }

    getAllCustomers( req, res, next ) {
        try {
            CustomerModel.findAll(
            {
                attributes: ['*'],
                where: {
                    email: {
                        [Op.like]: '%gmail.com%' 
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
}