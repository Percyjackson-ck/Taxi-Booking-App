import { Server } from 'socket.io';
import userModel from './models/userModel.js';
import captainModel from './models/captainModel.js';
let io = null;

/**
 * Initializes the Socket.IO server.
 * @param {http.Server} server - The HTTP server instance.
 */
export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*', // In production, replace with your frontend URL
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on('join', async (data) => {
      // console.log(`user joined is ${data.userId}`);
      // const useremail = await captainModel.findById(data.userId)
      // console.log(useremail.email);

      const { userId, userType } = data;
      if (userType == 'user') {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id
        })
      } else if (userType == 'captain') {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id })
      }
     
  socket.on('update-location-captain',async(data)=>{
          const {userId,location}=data;
          console.log(data);
          
          // console.log(data.location);
          
           if(!location|| !location.ltd||!location.lng ){
            return socket.emit('error',{message:'Invalid location data'})
            
           }
            await captainModel.findByIdAndUpdate(userId,
             { location:{
                ltd:location.ltd,
                lng:location.lng
              }}
            )
           
  })

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    })

  });
}

/**
 * Sends a message to a specific socket ID.
 * @param {string} socketId - The socket ID.
 * @param {any} message - The message to send.
 */
export function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit('message', message);
  } else {
    console.log('Socket.io not initialized.');
  }
}
