"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      setVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle config
  const size = 48;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          title="Back to top"
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 100,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            background: "rgba(8,9,16,0.85)",
            border: "0.5px solid var(--border2)",
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            boxShadow: "0 4px 24px rgba(99,102,241,0.2)",
          }}
          whileHover={{ scale: 1.08, boxShadow: "0 4px 32px rgba(99,102,241,0.35)" }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Progress ring */}
          <svg
            width={size}
            height={size}
            style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
          >
            {/* Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(99,102,241,0.15)"
              strokeWidth={strokeWidth}
            />
            {/* Progress */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.15s ease" }}
            />
          </svg>

          {/* Inner content */}
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1px",
          }}>
            {/* Arrow */}
            <span style={{
              fontSize: "12px",
              color: "var(--a2)",
              lineHeight: 1,
            }}>↑</span>
            {/* Percentage */}
            <span style={{
              fontSize: "8px",
              color: "var(--dim)",
              fontFamily: "var(--font-space-mono)",
              lineHeight: 1,
            }}>
              {progress}%
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}