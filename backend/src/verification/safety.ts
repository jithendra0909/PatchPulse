export interface SafetyScoreInput {
  testsPassed: number;
  totalTests: number;
  regressions: number;
  replayBeforeStatus: number;
  replayAfterStatus: number;
  additions: number;
  deletions: number;
  reflectionAttempts: number;
}

export interface SafetyScoreResult {
  score: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKED';
  canAutoApprove: boolean;
  breakdown: {
    unitTests: number;
    regressionSafety: number;
    apiReplay: number;
    patchComplexity: number;
  };
}

export class SafetyEngine {
  public static calculateEvidenceScore(input: SafetyScoreInput): SafetyScoreResult {
    const testScore = input.totalTests > 0 ? (input.testsPassed / input.totalTests) * 40 : 40;
    const regressionPenalty = input.regressions * 20;
    const replayScore = input.replayBeforeStatus >= 500 && input.replayAfterStatus === 200 ? 40 : 0;
    const complexityScore = Math.max(0, 20 - (input.additions + input.deletions) * 0.5);

    const totalScore = Math.min(100, Math.max(0, Math.round(testScore + replayScore + complexityScore - regressionPenalty)));

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKED' = 'LOW';
    if (totalScore < 50 || input.regressions > 2) {
      riskLevel = 'BLOCKED';
    } else if (totalScore < 75 || input.regressions > 0) {
      riskLevel = 'HIGH';
    } else if (totalScore < 90) {
      riskLevel = 'MEDIUM';
    }

    return {
      score: totalScore,
      riskLevel,
      canAutoApprove: riskLevel === 'LOW',
      breakdown: {
        unitTests: Math.round(testScore),
        regressionSafety: Math.max(0, 20 - regressionPenalty),
        apiReplay: replayScore,
        patchComplexity: Math.round(complexityScore),
      },
    };
  }
}
