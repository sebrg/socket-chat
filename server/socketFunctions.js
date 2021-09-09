//import { Socket } from "socket.io"




export function createRoom(roomArr, roomName, pw ) {   
        roomArr.push({
            name: roomName,
            password: pw? pw : undefined,
            users: []
        })  
}

export function joinRoom(roomArr, roomName, user, socket, io) {
    const foundRoom = roomArr.find((room) => room.name == roomName)
    if(foundRoom) {
        foundRoom.users.push(user)
        socket.join(roomName)
        const msg = {msg: " has joined the room(" + roomName + ")" , name: user.name}
        socket.to(roomName).emit("message", msg)
    }
}

export function leaveRoom(roomArr, socket) {
    roomArr.forEach(room => {
        const filterdUsers = room.users.filter((user) => user.id !== socket.id)
        if(filterdUsers) {
            socket.leave(room.name)
            room.users = filterdUsers
        }
    }); 
}

export function roomCheck(roomArr) {
    roomArr.forEach(room => {
            if(!room.users.length && room.name !== "General") {
                const findRoom = roomArr.findIndex((r) => room.name == r.name)
                roomArr.splice(findRoom, 1)
            }    
    })
}

export function findUser(rooms, socket) {
    let foundUser
    const findUser = rooms.forEach(index => {
      index.users.find((user) => {
        if(user.id === socket.id) {
          foundUser = user
        }
      })
    })
    return foundUser
}