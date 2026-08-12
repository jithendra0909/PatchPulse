import { io, Socket } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const socket: Socket = io(API_URL, {
  autoConnect: true,
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

socket.on('connect', () => {
  console.log(`⚡ [SOCKET.IO] Connected to PatchPulse Backend Agent Engine at ${API_URL}`);
});

socket.on('system:connected', (data: any) => {
  console.log('⚡ [SOCKET.IO] Received system:connected event:', data);
});

socket.on('disconnect', () => {
  console.warn('⚠️ [SOCKET.IO] Disconnected from PatchPulse Backend Agent Engine');
});

socket.on('connect_error', (error) => {
  console.warn('⚠️ [SOCKET.IO] Connection error:', error.message);
});
