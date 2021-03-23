const express = require('express');
var path = require('path');
const router = express.Router();
const ChatRoomController = require('../controllers').ChatRoomController;
const ChatRoomControllerObj = new ChatRoomController();
let usersPath = 'public/images/uploads/users';

const multer = require('multer');
var storage = multer.diskStorage({   
    destination: function(req, file, cb) {
       cb(null, usersPath);
    }, 
    filename: function (req, file, cb) { 
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // console.log('file.originalname', uniqueSuffix +'_'+ file.originalname);
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        
        let id = req.body.id;
        let originalname = file.originalname;
        let newFileName = id;
        let extention = path.extname(originalname);
        let fullFileName = newFileName + extention;
        let fullFileNameWithPath = usersPath +'/'+ fullFileName;
        
        req.params.userImageDetails = {
            fileOriginalname : originalname,
            newFileName : newFileName,
            fileExtention : extention,
            fullFileName : fullFileName,
            fullFileNameWithPath : fullFileNameWithPath
        };
        cb(null , fullFileName );
    }
});
const upload = multer({
    storage: storage,
    limits : {fileSize : 1000000} // (1000000 bytes = 1MB)
});

router.get('/:roomId', ChatRoomControllerObj.getConversationByRoomId);
router.post('/initiate', ChatRoomControllerObj.initiate);
router.post('/:roomId/message', ChatRoomControllerObj.postMessage);
router.put('/:roomId/mark-read', ChatRoomControllerObj.markConversationReadByRoomId);
router.get('/', ChatRoomControllerObj.getRecentConversation);


// router.delete('/:id', ChatRoomControllerObj.deleteUser);
// router.delete('/hard/:id', ChatRoomControllerObj.deleteHardUser);
// router.post('/profilepic', upload.single('profile_pic'), ChatRoomControllerObj.uploadProfilePic);
// router.patch('/', ChatRoomControllerObj.updateUser);
// router.get('/', ChatRoomControllerObj.getAllUsers);

module.exports = router;