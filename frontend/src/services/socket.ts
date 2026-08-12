import { io, Socket } from 'socket.io-client';

const BACKEND_URL = 'http://localhost:4000';

export const socket: Socket = io(BACKEND_URL, {
  autoConnect: true,
  transports: ['websocket', 'polling'],
});

socket.on('connect', () => {
  console.log('⚡ [TELEMETRY] Connected to PatchPulse Backend Agent Engine on http://localhost:4000');
});

socket.on('disconnect', () => {
  console.warn('⚠️ [TELEMETRY] Disconnected from PatchPulse Backend Agent Engine');
});
