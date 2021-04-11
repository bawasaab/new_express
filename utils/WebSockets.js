var Sockets = require('../models').Sockets;
const Op = require('sequelize').Op;
let users = [];
let $this;

module.exports = class WebSockets {
  
  constructor() {

    $this = this;
    console.log('$this', $this);
  }

  connection(client) {

    // event fired when the chat room is disconnected
    client.on("disconnect", () => {
      users = users.filter((user) => user.socket_id !== client.id);
    });

    client.on("message", (msg) => {
      console.log('users',users);
     console.log('msg',msg);
    });


    // client.emit("getonlineusers",users);

    // add identity of user mapped to the socket id
    client.on("identity", (user_id) => {
    console.log('user_id', user_id);
    console.log('client.id', client.id);
    
    let in_data = {
      socket_id: client.id,
      user_id: user_id,
    };
    users.push(in_data);

    Sockets.findOne(
      { 
        where: { 
          user_id: user_id
        } 
      }
    ).then((result) => {

      if (result === null) {
        // not found
        $this.insertSocket( in_data );
          
      } else {
        // yes found
        $this.updateSocket( in_data );
      }
    })
    .catch((error) => {

      console.log('find socket user error', error.toString());
    });

    console.log('users', users);
    client.broadcast.emit('new-user-joined', 'a new user joined the chat');
  });

    // subscribe person to chat & other user as well
    client.on("subscribe", (room, otheruser_id = "") => {
      this.subscribeOtherUser(room, otheruser_id);
      client.join(room);
    });
    
    // mute a chat room
    client.on("unsubscribe", (room) => {
      client.leave(room);
    });
  }

  insertSocket( in_data ) {

    Sockets.build(in_data).save()
    .then((result) => {

      if (result === null) {
        console.log('Record not inserted');
      } else {
        console.log('Record inserted successfully');
      }
    })
    .catch((error) => {
      console.log('insert socket error', error.toString());
    });
  }

  updateSocket( in_data ) {

    Sockets.update(in_data, { where: { user_id: in_data.user_id } })
    .then((result) => {

      if (result === null) {
        console.log('Record not updated');
      } else {
        console.log('Record updated successfully');
      }
    })
    .catch((error) => {

      console.log('update socket error', error.toString());
    });
  }

  subscribeOtherUser(room, otheruser_id) {
    const userSockets = users.filter(
      (user) => user.user_id === otheruser_id
    );
    userSockets.map((userInfo) => {
      const socketConn = global.io.sockets.connected(userInfo.socket_id);
      if (socketConn) {
        socketConn.join(room);
      }
    });
  }

}
  
//   export default new WebSockets();