import { exec } from 'child_process';

export interface SandboxExecutionOptions {
  testCommand?: string;
  timeoutSeconds?: number;
  cpuLimit?: string;
  memoryLimit?: string;
}

export interface SandboxExecutionResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationSeconds: number;
  testsPassed: number;
  totalTests: number;
  logs: string[];
}

export class SandboxRunner {
  public static async runTestsInSandbox(
    _patchedCode: string,
    options: SandboxExecutionOptions = {},
    onLog?: (logLine: string) => void
  ): Promise<SandboxExecutionResult> {
    const command = options.testCommand || 'pytest tests/ -q --disable-warnings';
    const timeoutMs = (options.timeoutSeconds || 15) * 1000;

    console.log(`⚡ [SANDBOX] Executing '${command}' (Timeout: ${options.timeoutSeconds || 15}s)`);

    const startTime = Date.now();
    const logs: string[] = [];

    const addLog = (line: string) => {
      logs.push(line);
      if (onLog) onLog(line);
    };

    addLog(`$ ${command}`);

    try {
      const result = await new Promise<{ stdout: string; stderr: string; exitCode: number }>((resolve) => {
        exec(command, { timeout: timeoutMs, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
          const exitCode = error ? (error as any).code || 1 : 0;
          resolve({ stdout: stdout || '', stderr: stderr || '', exitCode });
        });
      });

      const durationSeconds = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));

      // Log real output
      if (result.stdout) {
        for (const line of result.stdout.split('\n').slice(0, 50)) {
          addLog(line);
        }
      }
      if (result.stderr) {
        for (const line of result.stderr.split('\n').slice(0, 20)) {
          addLog(line);
        }
      }

      // Parse real test results from output
      const { passed, failed, total } = this.parseTestOutput(result.stdout + result.stderr);

      return {
        exitCode: result.exitCode,
        stdout: result.stdout,
        stderr: result.stderr,
        durationSeconds,
        testsPassed: passed,
        totalTests: total,
        logs,
      };
    } catch (err: any) {
      const durationSeconds = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
      addLog(`[ERROR] ${err.message}`);

      return {
        exitCode: 1,
        stdout: '',
        stderr: err.message,
        durationSeconds,
        testsPassed: 0,
        totalTests: 0,
        logs,
      };
    }
  }

  private static parseTestOutput(output: string): { passed: number; failed: number; total: number } {
    let passed = 0;
    let failed = 0;

    // pytest format: "14 passed in 0.42s"
    const pytestMatch = output.match(/(\d+)\s+passed/);
    if (pytestMatch) passed = parseInt(pytestMatch[1], 10);

    const pytestFailMatch = output.match(/(\d+)\s+failed/);
    if (pytestFailMatch) failed = parseInt(pytestFailMatch[1], 10);

    // npm test / jest format: "Tests: X passed, Y failed"
    const jestMatch = output.match(/Tests:\s*(\d+)\s+passed/);
    if (jestMatch) passed = parseInt(jestMatch[1], 10);

    const jestFailMatch = output.match(/Tests:\s*\d+\s+passed,\s*(\d+)\s+failed/);
    if (jestFailMatch) failed = parseInt(jestFailMatch[1], 10);

    return { passed, failed, total: passed + failed };
  }
}
