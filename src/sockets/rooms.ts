import { Server } from 'socket.io';

export function getUserRoom(userId: number) {
  return `user:${userId}`;
}

export function sendToUser(
  server: Server,
  userId: number,
  event: string,
  payload: any,
) {
  server.sockets.to(getUserRoom(userId)).emit(event, payload); // Actually send the message to the user device via WebSocket channel.
}


export function getRoom(roomId: string) {
  return `room:${roomId}`;
}

export function sendToRoom(
  server: Server,
  roomId: string,
  event: string,
  payload: any,
) {
  server.sockets.to(getRoom(roomId)).emit(event, payload);
}

export function sentToAll(
  server: Server,
  roomId: string,
  event: string,
  payload: any,
) {
  console.log(roomId, event, payload);
  server.sockets.emit(event, payload); // Actually send the message to the user device via WebSocket channel.
  // server.sockets.to(roomId).emit(event, payload); // Actually send the message to the user device via WebSocket channel.
  // server.sockets.emit(event, payload); // Actually send the message to the user device via WebSocket channel.
}