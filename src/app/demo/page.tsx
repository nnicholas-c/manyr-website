'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlurredEllipses, Button, DecisionChip, ToggleSwitch } from '@/components';
import type { DecisionType } from '@/components';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  agent: string;
  tool: string;
  action: string;
  decision: DecisionType;
  rule: string;
  riskScore: number;
  approver?: string;
}

interface PolicyState {
  requireApprovalHighRisk: boolean;
  blockExfiltration: boolean;
  restrictFilesystem: boolean;
  stagingOnlyDbWrites: boolean;
  leastPrivilege: boolean;
  riskTolerance: number;
}

const exampleActions = [
  { label: 'Read a local config file', action: 'Read file: ~/.config/app.json', risk: 'low' },
  { label: 'Create a git branch and open a PR', action: 'Execute: git checkout -b feature/new && gh pr create', risk: 'medium' },
  { label: 'Export a report to company drive', action: 'Write file: /mnt/company-drive/reports/q4-2025.pdf', risk: 'medium' },
  { label: 'Run a database migration in staging', action: 'Execute SQL: ALTER TABLE users ADD COLUMN verified BOOLEAN', risk: 'high' },
  { label: 'Send email with attached report', action: 'Send email to: team@company.com, ceo@company.com with attachment: report.xlsx', risk: 'high' },
  { label: 'Access a restricted directory', action: 'Read directory: /etc/secrets/', risk: 'critical' },
];

const agents = ['Claude (Anthropic)', 'GPT-4 (OpenAI)', 'Local LLM'];
const tools = ['Filesystem', 'Terminal', 'Browser', 'Internal API', 'Email', 'Database'];

function evaluateAction(
  action: string,
  tool: string,
  policy: PolicyState
): { decision: DecisionType; rule: string; riskScore: number; rationale: string } {
  const actionLower = action.toLowerCase();
  let riskScore = 0.3;
  
  // Calculate risk score
  if (actionLower.includes('delete') || actionLower.includes('drop') || actionLower.includes('rm -rf')) {
    riskScore = 0.95;
  } else if (actionLower.includes('/etc/') || actionLower.includes('secrets') || actionLower.includes('passwd')) {
    riskScore = 0.9;
  } else if (actionLower.includes('email') || actionLower.includes('send')) {
    riskScore = 0.7;
  } else if (actionLower.includes('write') || actionLower.includes('alter') || actionLower.includes('migrate')) {
    riskScore = 0.65;
  } else if (actionLower.includes('git') || actionLower.includes('pr create')) {
    riskScore = 0.5;
  } else if (actionLower.includes('read') || actionLower.includes('list')) {
    riskScore = 0.25;
  }

  // Tool-based risk adjustment
  if (tool === 'Database') riskScore += 0.15;
  if (tool === 'Terminal') riskScore += 0.1;
  if (tool === 'Email') riskScore += 0.1;
  
  riskScore = Math.min(riskScore, 1);

  // Policy evaluation
  if (policy.blockExfiltration && (actionLower.includes('email') || actionLower.includes('external'))) {
    return {
      decision: 'deny',
      rule: 'Block external data exfiltration',
      riskScore,
      rationale: 'Action involves potential data transfer outside organization boundaries.',
    };
  }

  if (policy.restrictFilesystem && (actionLower.includes('/etc/') || actionLower.includes('secrets') || actionLower.includes('passwd'))) {
    return {
      decision: 'deny',
      rule: 'Restrict filesystem access to allowlisted folders',
      riskScore,
      rationale: 'Target path is outside allowed directories.',
    };
  }

  if (policy.stagingOnlyDbWrites && tool === 'Database' && (actionLower.includes('alter') || actionLower.includes('drop') || actionLower.includes('delete'))) {
    if (!actionLower.includes('staging')) {
      return {
        decision: 'deny',
        rule: 'Require staging-only for database writes',
        riskScore,
        rationale: 'Database modification must target staging environment.',
      };
    }
  }

  if (policy.leastPrivilege && riskScore > 0.7) {
    return {
      decision: 'constrain',
      rule: 'Enforce least-privilege tool scopes',
      riskScore,
      rationale: 'Action scope reduced to minimum required permissions.',
    };
  }

  if (policy.requireApprovalHighRisk && riskScore > (1 - policy.riskTolerance / 100)) {
    return {
      decision: 'approve',
      rule: 'Require approval for high-risk actions',
      riskScore,
      rationale: `Risk score (${(riskScore * 100).toFixed(0)}%) exceeds tolerance threshold.`,
    };
  }

  return {
    decision: 'allow',
    rule: 'Default allow policy',
    riskScore,
    rationale: 'Action meets all policy requirements.',
  };
}

export default function DemoPage() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [actionInput, setActionInput] = useState('');
  const [showJsonTab, setShowJsonTab] = useState(false);
  const [policy, setPolicy] = useState<PolicyState>({
    requireApprovalHighRisk: true,
    blockExfiltration: true,
    restrictFilesystem: true,
    stagingOnlyDbWrites: true,
    leastPrivilege: false,
    riskTolerance: 30,
  });
  const [currentDecision, setCurrentDecision] = useState<{
    decision: DecisionType;
    rule: string;
    riskScore: number;
    rationale: string;
  } | null>(null);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [pendingEntry, setPendingEntry] = useState<AuditLogEntry | null>(null);

  const handleEvaluate = useCallback(() => {
    if (!actionInput.trim()) return;

    const result = evaluateAction(actionInput, selectedTool, policy);
    setCurrentDecision(result);

    const newEntry: AuditLogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      agent: selectedAgent,
      tool: selectedTool,
      action: actionInput,
      decision: result.decision,
      rule: result.rule,
      riskScore: result.riskScore,
    };

    if (result.decision === 'approve') {
      setPendingEntry(newEntry);
      setShowApprovalModal(true);
    } else {
      setAuditLog((prev) => [newEntry, ...prev]);
    }
  }, [actionInput, selectedAgent, selectedTool, policy]);

  const handleApproval = useCallback((approved: boolean) => {
    if (pendingEntry) {
      const finalEntry: AuditLogEntry = {
        ...pendingEntry,
        decision: approved ? 'allow' : 'deny',
        approver: 'Admin User',
      };
      setAuditLog((prev) => [finalEntry, ...prev]);
      setCurrentDecision((prev) => prev ? { ...prev, decision: approved ? 'allow' : 'deny' } : null);
    }
    setShowApprovalModal(false);
    setPendingEntry(null);
  }, [pendingEntry]);

  const handleExport = useCallback(() => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      policy,
      auditLog,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manyr-audit-log-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [policy, auditLog]);

  const selectExample = useCallback((example: typeof exampleActions[0]) => {
    setActionInput(example.action);
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16 relative bg-[#0a1520]">
      <BlurredEllipses
        ellipses={[
          { color: 'var(--ellipse-cyan)', size: 500, x: '5%', y: '10%', parallaxStrength: 0.05 },
          { color: 'var(--ellipse-violet)', size: 400, x: '85%', y: '20%', parallaxStrength: 0.08 },
          { color: 'var(--ellipse-teal)', size: 350, x: '70%', y: '70%', parallaxStrength: 0.06 },
        ]}
        className="opacity-50"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number block mb-4 text-[var(--accent-primary)]">004/</span>
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-4 text-[var(--foreground)]">
            Policy Playground
          </h1>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl">
            Simulate how Manyr evaluates agent actions. Configure policies, 
            submit actions, and observe real-time decisions with full audit logging.
          </p>
        </motion.div>

        {/* Main playground grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Column 1: Agent Action */}
          <motion.div
            className="bg-[#0d1a28]/60 backdrop-blur-md border border-[var(--accent-primary)]/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xs font-medium text-[var(--accent-primary)] uppercase tracking-wider mb-6">
              Agent Action
            </h2>

            <div className="space-y-5">
              <div>
                <label htmlFor="agent" className="block text-sm font-medium mb-2 text-[var(--foreground)]">
                  Agent Type
                </label>
                <select
                  id="agent"
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full bg-[#0a1520] border border-[var(--accent-primary)]/20 text-[var(--foreground)] rounded-lg px-3 py-2"
                >
                  {agents.map((agent) => (
                    <option key={agent} value={agent}>{agent}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tool" className="block text-sm font-medium mb-2 text-[var(--foreground)]">
                  Tool
                </label>
                <select
                  id="tool"
                  value={selectedTool}
                  onChange={(e) => setSelectedTool(e.target.value)}
                  className="w-full bg-[#0a1520] border border-[var(--accent-primary)]/20 text-[var(--foreground)] rounded-lg px-3 py-2"
                >
                  {tools.map((tool) => (
                    <option key={tool} value={tool}>{tool}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="action" className="text-sm font-medium text-[var(--foreground)]">
                    Proposed Action
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowJsonTab(false)}
                      className={`text-xs px-2 py-1 rounded ${!showJsonTab ? 'bg-[var(--accent-primary)] text-[#0a1520]' : 'text-[var(--foreground-muted)]'}`}
                    >
                      Plain
                    </button>
                    <button
                      onClick={() => setShowJsonTab(true)}
                      className={`text-xs px-2 py-1 rounded ${showJsonTab ? 'bg-[var(--accent-primary)] text-[#0a1520]' : 'text-[var(--foreground-muted)]'}`}
                    >
                      JSON
                    </button>
                  </div>
                </div>
                {showJsonTab ? (
                  <textarea
                    id="action"
                    value={`{\n  "action": "${actionInput}",\n  "tool": "${selectedTool}",\n  "agent": "${selectedAgent}"\n}`}
                    readOnly
                    rows={5}
                    className="w-full font-mono text-xs resize-none bg-[#0a1520] border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] rounded-lg px-3 py-2"
                  />
                ) : (
                  <textarea
                    id="action"
                    value={actionInput}
                    onChange={(e) => setActionInput(e.target.value)}
                    placeholder="Describe the action..."
                    rows={3}
                    className="w-full resize-none bg-[#0a1520] border border-[var(--accent-primary)]/20 text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/50 rounded-lg px-3 py-2"
                  />
                )}
              </div>

              {/* Example actions */}
              <div>
                <p className="text-xs text-[var(--foreground-muted)] mb-2">Try an example:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleActions.map((example, i) => (
                    <button
                      key={i}
                      onClick={() => selectExample(example)}
                      className="text-xs px-2 py-1.5 bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/20 rounded-lg hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/40 transition-colors text-left text-[var(--foreground-muted)]"
                    >
                      {example.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={handleEvaluate} variant="primary" className="w-full">
                Evaluate (Select)
                <span aria-hidden="true">→</span>
              </Button>
            </div>
          </motion.div>

          {/* Column 2: Policy */}
          <motion.div
            className="bg-[#0d1a28]/60 backdrop-blur-md border border-[var(--accent-primary)]/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xs font-medium text-[var(--accent-primary)] uppercase tracking-wider mb-6">
              Policy
            </h2>

            <div className="space-y-5">
              <ToggleSwitch
                id="requireApproval"
                label="Require approval for high-risk actions"
                description="Actions above risk threshold need human review"
                checked={policy.requireApprovalHighRisk}
                onChange={(checked) => setPolicy({ ...policy, requireApprovalHighRisk: checked })}
              />

              <ToggleSwitch
                id="blockExfiltration"
                label="Block external data exfiltration"
                description="Prevent data transfer outside organization"
                checked={policy.blockExfiltration}
                onChange={(checked) => setPolicy({ ...policy, blockExfiltration: checked })}
              />

              <ToggleSwitch
                id="restrictFilesystem"
                label="Restrict filesystem access"
                description="Only allow access to approved directories"
                checked={policy.restrictFilesystem}
                onChange={(checked) => setPolicy({ ...policy, restrictFilesystem: checked })}
              />

              <ToggleSwitch
                id="stagingOnly"
                label="Require staging-only for DB writes"
                description="Database modifications only in staging"
                checked={policy.stagingOnlyDbWrites}
                onChange={(checked) => setPolicy({ ...policy, stagingOnlyDbWrites: checked })}
              />

              <ToggleSwitch
                id="leastPrivilege"
                label="Enforce least-privilege tool scopes"
                description="Constrain actions to minimum permissions"
                checked={policy.leastPrivilege}
                onChange={(checked) => setPolicy({ ...policy, leastPrivilege: checked })}
              />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="riskTolerance" className="text-sm font-medium text-[var(--foreground)]">
                    Risk Tolerance
                  </label>
                  <span className="text-sm text-[var(--accent-primary)]">{policy.riskTolerance}%</span>
                </div>
                <input
                  type="range"
                  id="riskTolerance"
                  min="0"
                  max="100"
                  value={policy.riskTolerance}
                  onChange={(e) => setPolicy({ ...policy, riskTolerance: parseInt(e.target.value) })}
                  className="w-full accent-[var(--accent-primary)]"
                />
                <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-1">
                  <span>Strict</span>
                  <span>Permissive</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 3: Decision + Audit Log */}
          <motion.div
            className="bg-[#0d1a28]/60 backdrop-blur-md border border-[var(--accent-primary)]/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xs font-medium text-[var(--accent-primary)] uppercase tracking-wider mb-6">
              Decision + Audit Log
            </h2>

            {/* Current Decision */}
            <AnimatePresence mode="wait">
              {currentDecision && (
                <motion.div
                  key={currentDecision.decision + currentDecision.riskScore}
                  className="mb-6 p-4 bg-[#0a1520]/80 border border-[var(--accent-primary)]/10 rounded-xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <DecisionChip decision={currentDecision.decision} />
                    <span className="text-sm text-[var(--foreground-muted)]">
                      Risk: {(currentDecision.riskScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-sm">
                    <p className="text-[var(--foreground)] font-medium">{currentDecision.rule}</p>
                    <p className="text-[var(--foreground-muted)] mt-1">{currentDecision.rationale}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Audit Log */}
            <div className="border-t border-[var(--accent-primary)]/10 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                  Audit Log ({auditLog.length})
                </h3>
                {auditLog.length > 0 && (
                  <Button onClick={handleExport} variant="secondary" className="!py-1.5 !px-3 !text-xs">
                    Export
                  </Button>
                )}
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                <AnimatePresence>
                  {auditLog.map((entry) => (
                    <motion.div
                      key={entry.id}
                      className="p-3 bg-[#0a1520]/80 border border-[var(--accent-primary)]/10 rounded-lg text-xs"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <DecisionChip decision={entry.decision} className="!text-[10px] !px-2 !py-1" />
                        <span className="text-[var(--foreground-muted)]">
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-[var(--foreground)] font-medium truncate">{entry.action}</p>
                      <div className="flex items-center gap-3 mt-1 text-[var(--foreground-muted)]">
                        <span>{entry.agent}</span>
                        <span>•</span>
                        <span>{entry.tool}</span>
                        {entry.approver && (
                          <>
                            <span>•</span>
                            <span className="text-amber-400">Approved by {entry.approver}</span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {auditLog.length === 0 && (
                  <p className="text-sm text-[var(--foreground-muted)] text-center py-8">
                    No audit entries yet. Evaluate an action to see results.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Approval Modal */}
      <AnimatePresence>
        {showApprovalModal && pendingEntry && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#0d1a28] border border-[var(--accent-primary)]/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-full mb-4">
                  <span className="text-amber-400 text-xl">!</span>
                </div>
                <h3 className="font-serif text-2xl mb-2 text-[var(--foreground)]">Approval Required</h3>
                <p className="text-[var(--foreground-muted)]">
                  This action requires administrator authorization.
                </p>
              </div>

              <div className="bg-[#0a1520] border border-[var(--accent-primary)]/10 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-[var(--foreground)] mb-2">{pendingEntry.action}</p>
                <div className="flex items-center gap-3 text-xs text-[var(--foreground-muted)]">
                  <span>{pendingEntry.agent}</span>
                  <span>•</span>
                  <span>{pendingEntry.tool}</span>
                  <span>•</span>
                  <span>Risk: {(pendingEntry.riskScore * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleApproval(false)}
                  variant="secondary"
                  className="flex-1"
                >
                  Deny
                </Button>
                <Button
                  onClick={() => handleApproval(true)}
                  variant="primary"
                  className="flex-1"
                >
                  Approve
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
