"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const points = "12,132 62,119 112,125 162,103 212,111 262,82 312,93 362,67 412,77 462,49 512,58 562,31";

const GrowthChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.35 });

  return (
    <div
      ref={chartRef}
      className="relative h-[205px] overflow-hidden rounded-2xl border border-accent/30 bg-[#061326]/80 p-4 shadow-[0_0_60px_rgba(0,132,255,.08)] sm:h-[245px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(72,91,255,.2),transparent_40%)]" />
      <div className="relative flex items-center justify-between text-[10px] text-slate-400">
        <span>Website Growth</span>
        <span className="rounded-full border border-white/10 px-2 py-1">Last 6 Months</span>
      </div>
      <svg viewBox="0 0 580 165" preserveAspectRatio="none" className="relative mt-4 h-[135px] w-full sm:h-[165px]">
        {[25, 65, 105, 145].map((y) => (
          <line key={y} x1="0" x2="580" y1={y} y2={y} stroke="rgba(148,163,184,.10)" strokeDasharray="3 5" />
        ))}
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#168bff" stopOpacity=".34" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`M ${points} L 562 165 L 12 165 Z`}
          fill="url(#chartFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 1.35, duration: 0.7 }}
        />
        <motion.polyline
          points={points}
          fill="none"
          stroke="#22a7ff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="562"
          cy="31"
          r="6"
          fill="#8b5cf6"
          initial={{ scale: 0 }}
          animate={{ scale: isInView ? 1 : 0 }}
          transition={{ delay: 2.1, type: "spring" }}
        />
      </svg>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 8 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute right-5 top-[82px] rounded-full bg-gradient-to-r from-accent to-[#795cff] px-2 py-1 text-[9px] font-bold text-white"
      >
        +256%
      </motion.div>
    </div>
  );
};

export default GrowthChart;
