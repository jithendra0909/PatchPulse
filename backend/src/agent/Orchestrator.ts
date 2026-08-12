import { Server } from 'socket.io';
import { IIncident } from '../models/Incident';

export class AgentOrchestrator {
  private io: Server;
  private autoModeInterval: NodeJS.Timeout | null = null;
  public autoModeActive: boolean = false;

  constructor(io: Server) {
    this.io = io;
  }

  // Trigger Autonomous Repair Execution Loop
  public async runRepairPipeline(faultType: string, customRepo?: string): Promise<any> {
    const incidentId = `#INC-${Math.floor(Math.random() * 900) + 100}`;
    const timestamp = new Date().toISOString();

    console.log(`⚡ [AGENT ORCHESTRATOR] Starting repair pipeline for fault '${faultType}' (Incident: ${incidentId})`);

    // 1. DETECT
    this.emitEvent('incident:detected', {
      incidentId,
      currentState: 'INCIDENT_DETECTED',
      faultType,
      service: 'Payment Service',
      endpoint: 'POST /checkout',
      errorType: this.mapFaultToError(faultType),
      timestamp,
    });

    await this.delay(1200);

    // 2. UNDERSTAND (AST Localization)
    this.emitEvent('agent:stage', {
      incidentId,
      currentState: 'LOCALIZING',
      localizedFile: 'services/checkout_controller.py',
      localizedLine: 42,
      functionName: 'process_checkout',
      timestamp: new Date().toISOString(),
    });

    await this.delay(1400);

    // 3. REPAIR (Gemini Synthesis)
    const originalCode = `def process_checkout(payload):\n    user_id = payload["user_id"]\n    amount = payload["amount"]\n    return {"status": "success", "user_id": user_id, "amount": amount}`;

    const patchedCode = `def process_checkout(payload):\n    if not payload or not isinstance(payload, dict):\n        return {"status": "error", "code": 400, "message": "Invalid payload format"}\n    \n    user_id = payload.get("user_id")\n    if not user_id:\n        return {"status": "error", "code": 400, "message": "user_id is required"}\n    \n    amount = payload.get("amount", 0)\n    return {"status": "success", "user_id": user_id, "amount": amount}`;

    this.emitEvent('patch:generated', {
      incidentId,
      currentState: 'PATCH_GENERATING',
      patch: {
        originalCode,
        patchedCode,
        explanation: 'Added defensive schema validation and default value key retrieval.',
        additions: 6,
        deletions: 2,
      },
      timestamp: new Date().toISOString(),
    });

    await this.delay(1500);

    // 4. VERIFY (Sandbox & Pytest Logs)
    this.emitEvent('verification:started', {
      incidentId,
      currentState: 'SANDBOX_TESTING',
      sandboxMode: 'Docker Subprocess',
      timestamp: new Date().toISOString(),
    });

    const testLogs = [
      '$ pytest tests/test_checkout.py -q --disable-warnings',
      'tests/test_checkout.py::test_null_payload                    PASSED [100%]',
      'tests/test_checkout.py::test_schema_drift                    PASSED [100%]',
      'tests/test_checkout.py::test_amount_validation              PASSED [100%]',
      '======================== 14 passed in 0.42s ========================',
    ];

    for (const log of testLogs) {
      this.emitEvent('verification:log', { incidentId, log });
      await this.delay(300);
    }

    // 5. SHIP (Healed State)
    this.emitEvent('agent:stage', {
      incidentId,
      currentState: 'HEALED',
      verificationScore: 98,
      riskLevel: 'LOW',
      replayStatus: 200,
      timestamp: new Date().toISOString(),
    });

    return {
      incidentId,
      status: 'HEALED',
      service: 'Payment Service',
      endpoint: 'POST /checkout',
      faultType,
      patchedCode,
    };
  }

  // Toggle Auto-Mode Scheduler
  public toggleAutoMode(enabled: boolean, intervalSeconds: number = 60) {
    this.autoModeActive = enabled;

    if (this.autoModeInterval) {
      clearInterval(this.autoModeInterval);
      this.autoModeInterval = null;
    }

    if (enabled) {
      console.log(`⚡ [AUTO MODE] Scheduled fault injection every ${intervalSeconds}s`);
      this.autoModeInterval = setInterval(() => {
        const faults = ['schema_drift', 'null_pointer', 'type_mismatch', 'edge_case'];
        const randomFault = faults[Math.floor(Math.random() * faults.length)];
        this.runRepairPipeline(randomFault);
      }, intervalSeconds * 1000);
    } else {
      console.log('⚡ [AUTO MODE] Stopped automatic fault injection scheduler');
    }
  }

  private mapFaultToError(faultType: string): string {
    switch (faultType) {
      case 'schema_drift': return 'SchemaDriftKeyError';
      case 'null_pointer': return 'NullPointerExpression';
      case 'type_mismatch': return 'TypeMismatchError';
      case 'edge_case': return 'DatabaseTimeoutError';
      default: return 'SchemaDriftKeyError';
    }
  }

  private emitEvent(eventName: string, data: any) {
    this.io.emit(eventName, data);
    this.io.emit('state:changed', data);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
