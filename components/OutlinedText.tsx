"use client";

import React from "react";
import { motion } from "framer-motion";

interface StrokeFillProps {
    text?: string;
    duration?: number;
}

export const StrokeFill = ({
    text = "Make Your Own",
    duration = 3,
}: StrokeFillProps) => {
    return (
        // <div className="w-full h-screen flex items-center justify-center bg-zinc-950 overflow-hidden">
            <svg viewBox="0 0 800 90" className="w-full max-w-3xl">
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="1.5"
                    className="font-[900] text-6xl uppercase tracking-widest stroke-black fill-transparent"
                    initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: 0, fill: "#000000" }}
                    transition={{
                        duration,
                        ease: "easeInOut",
                        fill: { delay: duration * 0.67, duration: duration * 0.33, ease: "easeIn" },
                    }}
                >
                    {text}
                </motion.text>
              </svg>
        // </div>
    );
};
