"use client";

import { motion, AnimatePresence } from "framer-motion";

interface HpToastProps {
  show: boolean;
  hpChange: number;
}

export default function HpToast({ show, hpChange }: HpToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="pointer-events-none fixed inset-x-0 top-1/3 z-50 flex justify-center"
        >
          <div className="rounded-2xl bg-[var(--accent)] px-6 py-3 text-lg font-bold text-white shadow-lg">
            +{hpChange} HP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
