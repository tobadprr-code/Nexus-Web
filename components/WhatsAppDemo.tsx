"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type DemoMsg = { from: string; text: string };

const TYPING_MS = 950;
const READ_DELAY_MS = 550;
const PAUSE_BETWEEN_LOOPS_MS = 2200;

export default function WhatsAppDemo({ messages }: { messages: readonly DemoMsg[] }) {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingFrom, setTypingFrom] = useState<string | null>(null);

  // Reiniciar y reproducir la secuencia cada vez que cambian los mensajes
  // (ej: el usuario abre el modal de otro producto).
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function playFrom(index: number) {
      if (cancelled) return;
      if (index >= messages.length) {
        const t = setTimeout(() => {
          if (cancelled) return;
          setVisibleCount(0);
          setTypingFrom(null);
          playFrom(0);
        }, PAUSE_BETWEEN_LOOPS_MS);
        timers.push(t);
        return;
      }
      setTypingFrom(messages[index].from);
      const t = setTimeout(() => {
        if (cancelled) return;
        setTypingFrom(null);
        setVisibleCount(index + 1);
        const t2 = setTimeout(() => playFrom(index + 1), READ_DELAY_MS);
        timers.push(t2);
      }, TYPING_MS);
      timers.push(t);
    }

    setVisibleCount(0);
    setTypingFrom(null);
    playFrom(0);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [messages]);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-void">
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nexus-green opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-nexus-green" />
        </span>
        <span className="font-mono text-[11px] text-ink-muted">
          {t.projectModal.whatsappDemoLabel} · {t.projectModal.whatsappDemoOnline}
        </span>
      </div>

      <div className="flex min-h-[168px] flex-col justify-end gap-2 p-4">
        <AnimatePresence initial={false}>
          {messages.slice(0, visibleCount).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${m.from === "client" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[82%] items-end gap-1.5 rounded-xl px-3 py-2 font-body text-[12.5px] leading-snug ${
                  m.from === "client"
                    ? "bg-nexus-green text-void"
                    : "border border-line bg-surface text-ink-muted"
                }`}
              >
                <span>{m.text}</span>
                {m.from === "client" && <CheckCheck size={13} className="mb-[1px] shrink-0 opacity-70" />}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typingFrom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex ${typingFrom === "client" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-center gap-1 rounded-xl px-3 py-2.5 ${
                typingFrom === "client" ? "bg-nexus-green/70" : "border border-line bg-surface"
              }`}
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className={`h-1.5 w-1.5 animate-bounce rounded-full ${
                    typingFrom === "client" ? "bg-void" : "bg-nexus-green"
                  }`}
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
