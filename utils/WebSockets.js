var Sockets = require('../models').Sockets;
const Op = require('sequelize').Op;

// let users = [];
let users = {};
let $this;

module.exports = class WebSockets {
  
  constructor() {

    $this = this;
    console.log('$this', $this);
  }

  connection(client) {

    let $client = client;

    // event fired when the chat room is disconnected
    client.on("disconnect", () => {
      // users = users.filter((user) => user.socket_id !== client.id);
    });

    client.on("messageSent", ( in_data ) => {

      let sender = in_data.sender_id;
      let receiver = in_data.receiver_id;
      let message = in_data.message;

      let receiver_socket_id = users[receiver];
      client.to( receiver_socket_id ).emit('messageReceive', in_data );
    });

    client.on( 'assignSocketIdToUser', async ( in_data ) => {

      try {
        users[in_data.user_id] = in_data.socket_id;
        let userSocketDetails = await Sockets.findOne(
          { 
            where: { 
              user_id: in_data.user_id
            } 
          }
        );

        let result;
        if( userSocketDetails == null ) {
          // not found
          result = await $this.insertSocket( in_data );
        } else {
          // yes found
          result = await $this.updateSocket( in_data );
        }

        if( result ) {
          client.emit('assignSocketIdToUserSuccess', result);
        } else {
          client.emit('assignSocketIdToUserFail', result);
        }
      } catch( ex ) {
        console.log(ex);
        client.emit('assignSocketIdToUserFail', ex.toString());
        throw ex;
      }
    } );


    // client.emit("getonlineusers",users);

    // add identity of user mapped to the socket id
    client.on("identity", (user_id) => {
    
      let in_data = {
        socket_id: client.id,
        user_id: user_id,
      };
      // users.push(in_data);
      users[in_data.user_id] = in_data.socket_id;

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
    client.on("subscribe", (in_data) => {
      
      try {

        let room = in_data.group_id;

        if (client.adapter.rooms.has(room)) {
          // room created already
          client.join(room);
        } else {
          // room not created yet
          // create a new room
          client.room = room;
          // join to new room
          client.join(client.room);
        };
        // list the availbale rooms
        console.log('client.adapter.rooms', client.adapter.rooms);
        // Socket.join is not executed, hence the room not created.
        client.broadcast.to( room ).emit('updatechat', in_data.user_id + ' has connected to this room');
        client.emit( 'user_joined_to_group', in_data );
      } catch( ex ) {
        throw ex;
      }
    });

    client.on("sendGroupMessage", (in_data) => {
      
      let room = in_data.group_id;
      client.to(room).emit('group_message_received', in_data);
    });
    
    // mute a chat room
    client.on("unsubscribe", (room) => {
      client.leave(room);
    });
  }

  async insertSocket( in_data ) {

    let result = await Sockets.build(in_data).save();
    return result;
  }

  async updateSocket( in_data ) {

    let result = await Sockets.update(in_data, { where: { user_id: in_data.user_id } });
    return result;
  }

}
  
//   export default new WebSockets();