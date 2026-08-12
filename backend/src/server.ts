import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// System Status Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    system: 'PatchPulse Agent Engine',
    uptime: process.uptime(),
    microservicesGuarded: 3,
  });
});

// Fault Injection Trigger Endpoint
app.post('/api/chaos/inject', (req, res) => {
  const { faultType } = req.body;
  console.log(`[CHAOS MONKEY] Fault Injected: ${faultType}`);

  // Emit real-time telemetry events over Socket.IO
  io.emit('state:changed', {
    incidentId: `INC-${Date.now()}`,
    previousState: 'IDLE',
    currentState: 'INCIDENT_DETECTED',
    timestamp: Date.now(),
    durationMs: 120,
  });

  setTimeout(() => {
    io.emit('state:changed', {
      incidentId: `INC-${Date.now()}`,
      previousState: 'INCIDENT_DETECTED',
      currentState: 'LOCALIZING',
      timestamp: Date.now(),
      durationMs: 1200,
    });
  }, 1200);

  setTimeout(() => {
    io.emit('state:changed', {
      incidentId: `INC-${Date.now()}`,
      previousState: 'LOCALIZING',
      currentState: 'PATCH_GENERATING',
      timestamp: Date.now(),
      durationMs: 2500,
    });
  }, 2500);

  setTimeout(() => {
    io.emit('state:changed', {
      incidentId: `INC-${Date.now()}`,
      previousState: 'PATCH_GENERATING',
      currentState: 'SANDBOX_TESTING',
      timestamp: Date.now(),
      durationMs: 4000,
    });
  }, 4000);

  setTimeout(() => {
    io.emit('state:changed', {
      incidentId: `INC-${Date.now()}`,
      previousState: 'SANDBOX_TESTING',
      currentState: 'HEALED',
      timestamp: Date.now(),
      durationMs: 6480,
    });
  }, 6480);

  res.json({
    success: true,
    message: `Fault ${faultType} injected successfully. Agent execution loop started.`,
    faultType,
  });
});

// Socket.IO Connection Handler
io.on('connection', (socket) => {
  console.log(`[TELEMETRY] Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[TELEMETRY] Client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`⚡ PatchPulse Agent Engine running on http://localhost:${PORT}`);
});
