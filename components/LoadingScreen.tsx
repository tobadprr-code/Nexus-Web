"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minDelay = reduced ? 200 : 900;

    let ready = document.readyState === "complete";
    const onLoad = () => {
      ready = true;
    };
    window.addEventListener("load", onLoad);

    const timer = setTimeout(() => {
      setVisible(false);
    }, minDelay);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5"
          >
            <Image
              src="/logo-full-dark.png"
              alt=""
              width={934}
              height={191}
              className="h-8 w-auto"
              priority
            />
            <div className="h-[2px] w-32 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full w-1/3 bg-gradient-to-r from-nexus-green to-nexus-cyan"
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
