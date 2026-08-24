"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_URL } from "@/lib/constants";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-nexus-green to-nexus-cyan text-void shadow-glow"
      aria-label="Escribir por WhatsApp"
    >
      <FaWhatsapp size={26} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-nexus-green/40" />
    </motion.a>
  );
}
