"use client";

import { FaYoutube } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import CountUp from "./count-up";
import GrowthChart from "./growth-chart";

const metrics = [
  {
    label: "Total Leads",
    value: 1248,
    suffix: "",
    growth: "+165%",
    decimals: 0,
  },
  { label: "ROAS", value: 3.8, suffix: "x", growth: "+72%", decimals: 1 },
  { label: "CTR", value: 4.32, suffix: "%", growth: "+58%", decimals: 2 },
  {
    label: "Conversions",
    value: 312,
    suffix: "",
    growth: "+112%",
    decimals: 0,
  },
];

const CampaignDashboard = () => (
  <div className="dashboard-shell mx-auto w-full max-w-xl">
    <div className="relative rounded-[15px] bg-[#061224]/95 p-4 shadow-[0_0_90px_rgba(124,77,255,.055),0_20px_60px_rgba(124,77,255,.025)] backdrop-blur-xl sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <span className="text-accent">↗</span> Campaign Performance
        </div>
        {/* <span className="rounded-full border border-white/10 px-2 py-1 text-[9px] text-slate-400">
          Last 30 Days⌄
        </span> */}
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-accent/20 bg-white/[.025] p-2.5"
          >
            <p className="text-[10px] text-slate-300">{metric.label}</p>
            <p className="mt-1 text-md font-bold text-white">
              <CountUp
                value={metric.value}
                decimals={metric.decimals}
                suffix={metric.suffix}
              />
            </p>
            <p className="mt-1 text-[10px] font-semibold text-emerald-400">
              ↑ {metric.growth}
            </p>
          </div>
        ))}
      </div>
      <GrowthChart />
      <div className="mt-4">
        <p className="mb-2 text-[9px] text-slate-400">Top Platforms</p>
        <div className="grid grid-cols-4 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/[.025] p-2 text-center">
            <svg
              viewBox="0 0 32 32"
              className="mx-auto mb-1 h-6 w-6"
              aria-label="Google"
            >
              <path
                fill="#4285F4"
                d="M16 6.2c2.8 0 5 .9 6.8 2.6l3.1-3.1C23.3 3.3 20.1 2 16 2 10.5 2 5.8 5.2 3.5 9.9l4 3.1C8.9 9 12.1 6.2 16 6.2Z"
              />
              <path
                fill="#34A853"
                d="M3.5 9.9C2.5 11.8 2 13.8 2 16s.5 4.2 1.5 6.1l4-3.1c-.5-1-.8-2.1-.8-3s.3-2 .8-3l-4-3.1Z"
              />
              <path
                fill="#FBBC05"
                d="M3.5 22.1C5.8 26.8 10.5 30 16 30c3.9 0 7.2-1.3 9.6-3.6l-3.6-2.8c-1.2.8-3 1.5-6 1.5-3.9 0-7.1-2.8-8.3-6.5l-4.2 3.5Z"
              />
              <path
                fill="#EA4335"
                d="M30 16c0-1-.1-1.7-.3-2.5H16v5.1h7.8c-.4 2-1.5 3.4-3.3 4.5l3.6 2.8C27.5 23.7 30 20.3 30 16Z"
              />
            </svg>
            <span className="block text-[8px] text-slate-300">Google Ads</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[.025] p-2 text-center">
            <FaMeta
              className="mx-auto mb-1 h-6 w-6 text-[#0866FF]"
              aria-label="Meta"
            />
            <span className="block text-[8px] text-slate-300">Meta Ads</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[.025] p-2 text-center">
            <FaYoutube
              className="mx-auto mb-1 h-6 w-6 text-[#FF0000]"
              aria-label="YouTube"
            />
            <span className="block text-[8px] text-slate-300">YouTube Ads</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[.025] p-2 text-center">
            <svg
              viewBox="0 0 32 32"
              className="mx-auto mb-1 h-6 w-6"
              aria-label="SEO growth"
            >
              <path
                d="M4 24 11 17l5 4 11-13"
                fill="none"
                stroke="#22A7FF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 8h6v6"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="block text-[8px] text-slate-300">SEO</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CampaignDashboard;
