'use client';

import { motion } from 'framer-motion';
import { BlurredEllipses, Section, Card } from '@/components';
import Link from 'next/link';

const sections = [
  {
    id: 'action-normalization',
    number: '01',
    title: 'Action Normalization',
    content: `Every agent framework and tool has its own way of expressing actions. Manyr normalizes these into a consistent "action intent" format that captures:

→ **What** the agent wants to do (operation type)
→ **Where** it wants to do it (target resource)
→ **How** it wants to do it (parameters and context)
→ **Why** it's doing it (optional: reasoning trace from agent)

This normalization happens at the SDK/integration layer, meaning your existing agent code doesn't need to change. We provide adapters for popular frameworks (LangChain, AutoGPT, CrewAI, custom) and tool protocols (OpenAI function calling, Anthropic tool use, MCP).`,
    code: `// Example normalized action intent
{
  "action_type": "file.write",
  "resource": "/var/data/reports/q4.csv",
  "parameters": {
    "content": "...",
    "mode": "overwrite"
  },
  "context": {
    "agent_id": "analyst-bot-1",
    "session_id": "sess_abc123",
    "reasoning": "User requested quarterly export"
  }
}`,
  },
  {
    id: 'policy-evaluation',
    number: '02',
    title: 'Policy Evaluation',
    content: `Manyr uses a hybrid evaluation engine designed for both speed and accuracy:

**Layer 1: Deterministic Rules** (< 1ms)
Fast pattern matching against your configured policies. Most actions are resolved here.

**Layer 2: Risk Scoring** (< 10ms)
For ambiguous cases, we compute a risk score based on:
- Historical action patterns
- Resource sensitivity classification
- Agent trust level
- Contextual signals

**Layer 3: LLM Judge** (optional, ~200ms)
For truly ambiguous high-stakes decisions, an optional LLM judge can provide nuanced evaluation. This is configurable and off by default.

The engine returns one of four decisions: **Allow**, **Deny**, **Require Approval**, or **Constrain** (modify the action to reduce scope).`,
    code: `// Example policy rule
{
  "name": "block-production-writes",
  "condition": {
    "resource_pattern": "/var/prod/**",
    "action_types": ["file.write", "file.delete"]
  },
  "decision": "deny",
  "rationale": "Production writes require deployment pipeline"
}`,
  },
  {
    id: 'approval-flows',
    number: '03',
    title: 'Approval Flows',
    content: `When an action triggers "Require Approval," Manyr can route the request through configurable approval workflows:

→ **Immediate** — Blocks the agent until a human approves (Slack, Teams, email, dashboard)
→ **Async queue** — Batches non-urgent requests for periodic review
→ **Auto-escalate** — Routes to different approvers based on risk level or resource type
→ **Time-boxed** — Auto-denies if not approved within a deadline

Approvals are cryptographically signed and become part of the immutable audit trail. You can see exactly who approved what, when, and with what context.`,
    code: `// Example approval configuration
{
  "approval_channels": [
    { "type": "slack", "channel": "#agent-approvals" },
    { "type": "dashboard", "assignees": ["admin@co.com"] }
  ],
  "timeout_minutes": 30,
  "timeout_action": "deny",
  "require_reason": true
}`,
  },
  {
    id: 'audit-trails',
    number: '04',
    title: 'Audit Trails & Retention',
    content: `Every decision—allowed, denied, or modified—is logged to a tamper-evident audit trail:

→ **Immutable** — Append-only log with cryptographic integrity checks
→ **Complete** — Full action context, policy matched, decision rationale
→ **Searchable** — Query by agent, resource, time range, decision type
→ **Exportable** — JSON, CSV, or direct integration with your SIEM

Retention periods are configurable based on compliance requirements. We support data residency requirements with regional storage options.`,
    code: `// Example audit log entry
{
  "timestamp": "2026-01-29T14:32:00Z",
  "action_id": "act_xyz789",
  "agent": "analyst-bot-1",
  "action": {
    "type": "file.read",
    "resource": "/data/reports/q4.csv"
  },
  "decision": "allow",
  "matched_rule": "default-allow",
  "risk_score": 0.12,
  "latency_ms": 2
}`,
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 relative bg-[#0a1520]">
      <BlurredEllipses
        ellipses={[
          { color: 'var(--ellipse-cyan)', size: 500, x: '0%', y: '20%', parallaxStrength: 0.05 },
          { color: 'var(--ellipse-violet)', size: 400, x: '80%', y: '50%', parallaxStrength: 0.08 },
        ]}
        className="opacity-40"
      />

      <div className="relative z-10">
        {/* Header */}
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-number block mb-4 text-[var(--accent-primary)]">002/</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-[var(--foreground)]">
              How it works
            </h1>
            <p className="text-lg text-[var(--foreground-muted)] max-w-2xl">
              A technical overview of Manyr&apos;s agent firewall architecture. 
              From action interception to audit trail generation.
            </p>
          </motion.div>

          {/* Quick nav */}
          <motion.nav
            className="mt-12 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            aria-label="Documentation sections"
          >
            {sections.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="text-sm px-4 py-2 bg-[#0d1a28]/60 border border-[var(--accent-primary)]/20 rounded-lg hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/40 transition-colors text-[var(--foreground-muted)]"
              >
                {section.number}. {section.title}
              </Link>
            ))}
            <Link
              href="#privacy"
              className="text-sm px-4 py-2 bg-[#0d1a28]/60 border border-[var(--accent-primary)]/20 rounded-lg hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/40 transition-colors text-[var(--foreground-muted)]"
            >
              Privacy
            </Link>
            <Link
              href="#faq"
              className="text-sm px-4 py-2 bg-[#0d1a28]/60 border border-[var(--accent-primary)]/20 rounded-lg hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/40 transition-colors text-[var(--foreground-muted)]"
            >
              FAQ
            </Link>
          </motion.nav>
        </Section>

        {/* Documentation sections */}
        {sections.map((section, index) => (
          <Section key={section.id} id={section.id} background={index % 2 === 1 ? 'alt' : 'default'}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <span className="text-xs font-medium text-[var(--accent-primary)] uppercase tracking-wider mb-4 block">
                    Step {section.number}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 text-[var(--foreground)]">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg text-[var(--foreground-muted)] whitespace-pre-line">
                    {section.content.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.includes('**')) {
                        const parts = line.split('**');
                        return (
                          <p key={i} className="mb-3">
                            {parts.map((part, j) => 
                              j % 2 === 1 ? <strong key={j} className="text-[var(--foreground)]">{part}</strong> : part
                            )}
                          </p>
                        );
                      }
                      if (line.startsWith('→')) {
                        return <p key={i} className="mb-2 pl-4">{line}</p>;
                      }
                      if (line.trim() === '') return <br key={i} />;
                      return <p key={i} className="mb-3">{line}</p>;
                    })}
                  </div>
                </div>

                <div className="lg:sticky lg:top-32 h-fit">
                  <Card className="!p-0 overflow-hidden">
                    <div className="bg-[#0d1a28] text-[var(--accent-primary)] p-4 text-xs font-mono border border-[var(--accent-primary)]/20">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-500/70"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-500/70"></span>
                      </div>
                      <pre className="overflow-x-auto">
                        <code>{section.code}</code>
                      </pre>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </Section>
        ))}

        {/* Privacy Section */}
        <Section id="privacy" background="alt">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-number block mb-4 text-[var(--accent-primary)]">Privacy</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-8 text-[var(--foreground)]">
              Your data, your control
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              {[
                {
                  title: 'We see intents, not content',
                  description: 'Manyr evaluates action metadata (what, where, who) without accessing payload content. Your sensitive data never leaves your infrastructure.',
                },
                {
                  title: 'Customer-owned policies',
                  description: 'You define and control all policy rules. No hidden logic, no black-box decisions. Full transparency into why actions are allowed or denied.',
                },
                {
                  title: 'Export everything',
                  description: 'Your audit logs belong to you. Export anytime in standard formats (JSON, CSV) or stream directly to your SIEM/data warehouse.',
                },
                {
                  title: 'Data residency options',
                  description: 'For compliance requirements, we offer regional deployment options ensuring data stays within specified geographic boundaries.',
                },
                {
                  title: 'SOC 2 designed',
                  description: 'Our infrastructure and processes are designed with SOC 2 compliance in mind from day one. Audit reports available for enterprise customers.',
                },
                {
                  title: 'No training on your data',
                  description: 'We do not use customer data to train models. Your audit logs and action patterns are never used for ML training.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="border-l-2 border-[var(--accent-primary)]/30 pl-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <h3 className="font-medium text-[var(--foreground)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--foreground-muted)]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* FAQ Section */}
        <Section id="faq">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-number block mb-4 text-[var(--accent-primary)]">FAQ</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-8 text-[var(--foreground)]">
              Common questions
            </h2>

            <div className="space-y-6 max-w-3xl">
              {[
                {
                  q: 'Why not build this in-house?',
                  a: 'You could, but Manyr provides cross-agent, vendor-neutral governance that works with any agent framework. We offer a consistent control plane + audit trail that would take significant engineering effort to replicate. Plus, our hybrid evaluation engine is optimized for near-imperceptible latency.',
                },
                {
                  q: 'What\'s the latency impact?',
                  a: 'For most actions (90%+), evaluation completes in under 5ms using our deterministic rule engine. The LLM judge, when enabled for complex cases, adds ~200ms but is entirely optional and configurable.',
                },
                {
                  q: 'Is this a feature or a company?',
                  a: 'We believe agent governance is a platform-level problem that requires dedicated infrastructure. Our focus is cross-platform neutrality, local execution boundary enforcement, and compliance-grade audit trails—problems that need specialized, sustained attention.',
                },
                {
                  q: 'What agent frameworks do you support?',
                  a: 'We provide SDKs and adapters for LangChain, AutoGPT, CrewAI, and custom agents. We also support OpenAI function calling, Anthropic tool use, and the Model Context Protocol (MCP).',
                },
                {
                  q: 'How do I get started?',
                  a: 'We\'re currently working with design partners on pilot programs. Reach out through our contact form to discuss your use case and timeline.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-[#0d1a28]/60 border border-[var(--accent-primary)]/20 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <h3 className="font-medium text-[var(--foreground)] mb-2">{faq.q}</h3>
                  <p className="text-[var(--foreground-muted)]">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>
      </div>
    </div>
  );
}
