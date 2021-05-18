let UserService = require('../../services/UserService');
let UserServiceObj = new UserService();

const { v4: uuidV4 } = require('uuid');

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

    async videoCall( req, res, next ) {
        
        if( req.params.room_id ) {

            let room_id = req.params.room_id;
            res.render('videoCall', { title: 'Video Call', room_id: room_id });
        } else {

            let room_id = uuidV4();
            res.redirect(`/video-call/${room_id}`);
        }
    }
}