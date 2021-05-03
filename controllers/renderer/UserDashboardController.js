let UserService = require('../../services/UserService');
let UserServiceObj = new UserService();

let $this;
module.exports = class UserDashboardController {

    constructor() {
        console.log('inside controller constructor');
        $this = this;
    }

    async showDashboard( req, res, next ) {

        let user_id = req.params.user_id;
        let result = await UserServiceObj.getAllUserForChat( user_id );
        res.render('dashboard', { title: 'Dashboard',users : result });
    }
}