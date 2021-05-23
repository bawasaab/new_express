var message = require('../models').message;
const Op = require('sequelize').Op;

module.exports = class MessageService {

    constructor() {
        console.log('inside MessageService');
    }

    async insertMessage( in_data ) {

        try {

            let result = await message.build(in_data).save();
            if (result === null) {
                throw 'Record not found';
            } else {
                return result;
            }
        } catch( ex ) {
            throw ex;
        }
    }

   
    
    
}