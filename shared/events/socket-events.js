"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCKET_EVENTS = void 0;
exports.SOCKET_EVENTS = {
    SYSTEM_CONNECTED: 'system:connected',
    INCIDENT_DETECTED: 'incident:detected',
    REPRODUCTION_STARTED: 'reproduction:started',
    DIAGNOSIS_STARTED: 'diagnosis:started',
    LOCALIZATION_COMPLETED: 'localization:completed',
    PATCH_GENERATED: 'patch:generated',
    SANDBOX_STARTED: 'sandbox:started',
    SANDBOX_LOG: 'verification:log',
    TEST_COMPLETED: 'test:completed',
    API_REPLAY_COMPLETED: 'replay:completed',
    SAFETY_ANALYSIS_COMPLETED: 'safety:completed',
    AWAITING_APPROVAL: 'approval:required',
    PR_CREATED: 'pr:created',
    INCIDENT_HEALED: 'incident:healed',
    INCIDENT_FAILED: 'incident:failed',
};
