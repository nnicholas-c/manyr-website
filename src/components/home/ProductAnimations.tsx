'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ==========================================
// Animation 1: Spot the Risk - Scanning/Detection Animation
// ==========================================
export function SpotRiskAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setScanLine((prev) => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, [isInView]);

  // Generate random threat nodes
  const threatNodes = [
    { x: 25, y: 30, delay: 0, risk: 'high' },
    { x: 70, y: 45, delay: 0.3, risk: 'medium' },
    { x: 45, y: 70, delay: 0.6, risk: 'low' },
    { x: 80, y: 25, delay: 0.9, risk: 'high' },
    { x: 15, y: 60, delay: 1.2, risk: 'medium' },
  ];

  return (
    <div ref={ref} className="relative w-full h-full bg-[#0a1520] overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-risk" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-risk)" />
        </svg>
      </div>

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] pointer-events-none"
        style={{
          top: `${scanLine}%`,
          background: 'linear-gradient(90deg, transparent 0%, #22d3ee 20%, #22d3ee 80%, transparent 100%)',
          boxShadow: '0 0 20px 2px rgba(34, 211, 238, 0.5)',
        }}
        animate={isInView ? { opacity: [0.3, 1, 0.3] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      />

      {/* Radar sweep effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]"
        animate={isInView ? { rotate: 360 } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(34, 211, 238, 0.3) 30deg, transparent 60deg)',
          }}
        />
      </motion.div>

      {/* Concentric circles */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#22d3ee]/20"
          style={{
            width: `${ring * 80}px`,
            height: `${ring * 80}px`,
          }}
          animate={isInView ? { scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] } : {}}
          transition={{ duration: 2, delay: ring * 0.3, repeat: Infinity }}
        />
      ))}

      {/* Threat nodes */}
      {threatNodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: node.delay, duration: 0.5 }}
        >
          {/* Pulse ring */}
          <motion.div
            className={`absolute -inset-4 rounded-full ${
              node.risk === 'high' ? 'bg-red-500/20' : 
              node.risk === 'medium' ? 'bg-amber-500/20' : 'bg-emerald-500/20'
            }`}
            animate={isInView ? { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
          />
          {/* Core node */}
          <div
            className={`w-3 h-3 rounded-full ${
              node.risk === 'high' ? 'bg-red-500 shadow-red-500/50' : 
              node.risk === 'medium' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-emerald-500 shadow-emerald-500/50'
            } shadow-lg`}
          />
          {/* Risk label */}
          <motion.div
            className="absolute left-4 top-0 whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: node.delay + 0.5 }}
          >
            <span className={`text-[10px] font-mono uppercase tracking-wider ${
              node.risk === 'high' ? 'text-red-400' : 
              node.risk === 'medium' ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {node.risk === 'high' ? 'THREAT' : node.risk === 'medium' ? 'ANOMALY' : 'CLEAR'}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* HUD corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#22d3ee]/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#22d3ee]/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#22d3ee]/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#22d3ee]/50" />

      {/* Status text */}
      <motion.div
        className="absolute bottom-6 left-6 font-mono text-[10px] text-[#22d3ee]/70"
        animate={isInView ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        SCANNING ACTIVE
      </motion.div>
      <div className="absolute top-6 right-6 font-mono text-[10px] text-[#22d3ee]/70">
        THREATS: <span className="text-red-400">2</span> | ANOMALIES: <span className="text-amber-400">2</span>
      </div>
    </div>
  );
}

// ==========================================
// Animation 2: Build Guardrails - Shield/Policy Construction
// ==========================================
export function BuildGuardrailsAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const hexagons = Array.from({ length: 7 }, (_, i) => ({
    angle: (i * 360) / 7,
    delay: i * 0.15,
  }));

  const policyRules = [
    { label: 'ALLOW: read/*', color: 'emerald' },
    { label: 'DENY: /etc/secrets', color: 'red' },
    { label: 'APPROVE: db.write', color: 'amber' },
    { label: 'CONSTRAIN: network', color: 'cyan' },
  ];

  return (
    <div ref={ref} className="relative w-full h-full bg-[#0a1520] overflow-hidden">
      {/* Hex grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexgrid" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
              <path 
                d="M28 0 L56 14 L56 42 L28 56 L0 42 L0 14 Z M28 56 L56 70 L56 98 L28 112 L0 98 L0 70 Z M28 56 L56 42 M28 56 L0 42" 
                fill="none" 
                stroke="rgba(167, 139, 250, 0.3)" 
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexgrid)" />
        </svg>
      </div>

      {/* Central shield construct */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Rotating outer hexagons */}
        <motion.div
          className="relative w-48 h-48"
          animate={isInView ? { rotate: 360 } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {hexagons.map((hex, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${hex.angle}deg) translateY(-70px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: hex.delay, duration: 0.5 }}
            >
              <motion.div
                className="w-6 h-6 bg-violet-500/30 border border-violet-400/50"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                animate={isInView ? { 
                  boxShadow: ['0 0 10px rgba(167, 139, 250, 0.3)', '0 0 20px rgba(167, 139, 250, 0.6)', '0 0 10px rgba(167, 139, 250, 0.3)']
                } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: hex.delay }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Inner shield core */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 1, duration: 0.8, type: 'spring' }}
        >
          <div 
            className="w-full h-full bg-gradient-to-br from-violet-500/40 to-indigo-500/40 border-2 border-violet-400/60"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className="text-2xl text-violet-300"
              animate={isInView ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⬡
            </motion.span>
          </div>
        </motion.div>

        {/* Energy beams connecting hexagons */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48">
          {hexagons.map((_, i) => (
            <motion.line
              key={i}
              x1="96" y1="96"
              x2={96 + Math.cos((i * 2 * Math.PI) / 7 - Math.PI / 2) * 70}
              y2={96 + Math.sin((i * 2 * Math.PI) / 7 - Math.PI / 2) * 70}
              stroke="rgba(167, 139, 250, 0.4)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </svg>
      </div>

      {/* Policy rules flowing in */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 space-y-3">
        {policyRules.map((rule, i) => (
          <motion.div
            key={i}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border backdrop-blur-sm ${
              rule.color === 'emerald' ? 'border-emerald-500/40 bg-emerald-500/10' :
              rule.color === 'red' ? 'border-red-500/40 bg-red-500/10' :
              rule.color === 'amber' ? 'border-amber-500/40 bg-amber-500/10' :
              'border-cyan-500/40 bg-cyan-500/10'
            }`}
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
          >
            <div className={`w-2 h-2 rounded-full ${
              rule.color === 'emerald' ? 'bg-emerald-400' :
              rule.color === 'red' ? 'bg-red-400' :
              rule.color === 'amber' ? 'bg-amber-400' :
              'bg-cyan-400'
            }`} />
            <span className="text-[9px] font-mono text-white/80">{rule.label}</span>
          </motion.div>
        ))}
      </div>

      {/* HUD elements */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-violet-400/70">
        GUARDRAIL STATUS: <span className="text-emerald-400">ACTIVE</span>
      </div>
      <motion.div
        className="absolute bottom-4 right-4 font-mono text-[10px] text-violet-400/70"
        animate={isInView ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        POLICIES ENFORCED: 4
      </motion.div>

      {/* Corner brackets */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-violet-500/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-violet-500/50" />
    </div>
  );
}

// ==========================================
// Animation 3: Scale with Confidence - Network/Growth Animation
// ==========================================
export function ScaleConfidenceAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const nodes = [
    { x: 50, y: 50, size: 'lg', label: 'CORE' },
    { x: 25, y: 30, size: 'md', label: 'A1' },
    { x: 75, y: 25, size: 'md', label: 'A2' },
    { x: 20, y: 65, size: 'sm', label: 'B1' },
    { x: 80, y: 60, size: 'sm', label: 'B2' },
    { x: 35, y: 80, size: 'sm', label: 'B3' },
    { x: 65, y: 85, size: 'sm', label: 'B4' },
    { x: 10, y: 45, size: 'xs', label: '' },
    { x: 90, y: 40, size: 'xs', label: '' },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 3], [1, 7], [2, 4], [2, 8], [3, 5], [4, 6],
  ];

  const getNodeSize = (size: string) => {
    switch (size) {
      case 'lg': return 'w-8 h-8';
      case 'md': return 'w-5 h-5';
      case 'sm': return 'w-3 h-3';
      default: return 'w-2 h-2';
    }
  };

  return (
    <div ref={ref} className="relative w-full h-full bg-[#0a1520] overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={isInView ? {
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            } : {}}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={`${nodes[from].x}%`}
            y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`}
            y2={`${nodes[to].y}%`}
            stroke="rgba(16, 185, 129, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          />
        ))}
        
        {/* Animated data packets traveling along connections */}
        {isInView && connections.slice(0, 6).map(([from, to], i) => (
          <motion.circle
            key={`packet-${i}`}
            r="3"
            fill="#22d3ee"
            initial={{ 
              cx: `${nodes[from].x}%`, 
              cy: `${nodes[from].y}%`,
              opacity: 0 
            }}
            animate={{
              cx: [`${nodes[from].x}%`, `${nodes[to].x}%`],
              cy: [`${nodes[from].y}%`, `${nodes[to].y}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear',
            }}
          />
        ))}
      </svg>

      {/* Network nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
        >
          {/* Pulse effect for main node */}
          {node.size === 'lg' && (
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-500/30"
              style={{ transform: 'scale(2)' }}
              animate={isInView ? { scale: [2, 3, 2], opacity: [0.3, 0, 0.3] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          
          {/* Node core */}
          <div className={`${getNodeSize(node.size)} rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center`}>
            {node.size === 'lg' && (
              <motion.div
                className="w-3 h-3 rounded-full bg-white/80"
                animate={isInView ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
          
          {/* Node label */}
          {node.label && (
            <motion.span
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-emerald-400/80 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.5 }}
            >
              {node.label}
            </motion.span>
          )}
        </motion.div>
      ))}

      {/* Metrics display */}
      <motion.div
        className="absolute top-4 left-4 space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.5 }}
      >
        <div className="font-mono text-[10px] text-emerald-400/80">
          AGENTS ONLINE: <motion.span 
            className="text-emerald-300"
            animate={isInView ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >9</motion.span>
        </div>
        <div className="font-mono text-[10px] text-emerald-400/80">
          UPTIME: <span className="text-emerald-300">99.99%</span>
        </div>
      </motion.div>

      {/* Scale indicator */}
      <motion.div
        className="absolute bottom-4 right-4 flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2 }}
      >
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((bar) => (
            <motion.div
              key={bar}
              className="w-1 bg-emerald-400"
              initial={{ height: 0 }}
              animate={isInView ? { height: `${bar * 4}px` } : {}}
              transition={{ delay: 2 + bar * 0.1 }}
            />
          ))}
        </div>
        <span className="text-[10px] font-mono text-emerald-400/80">SCALING</span>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-500/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-500/50" />
    </div>
  );
}
