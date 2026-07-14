"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Stage = { icon: string; label: string; caption: string };

function FlowPipeline({ stages }: { stages: readonly Stage[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [stages]);

  useEffect(() => {
    const timer = setTimeout(
      () => setActive((v) => (v + 1) % stages.length),
      active === stages.length - 1 ? 1900 : 1300
    );
    return () => clearTimeout(timer);
  }, [active, stages.length]);

  const progressPct = (active / (stages.length - 1)) * 100;

  return (
    <div>
      <div className="relative px-1 pb-1 pt-2">
        <div className="absolute left-5 right-5 top-[24px] h-[2px] bg-line" />
        <motion.div
          className="absolute left-5 top-[24px] h-[2px] bg-gradient-to-r from-nexus-green to-nexus-cyan"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ maxWidth: "calc(100% - 2.5rem)" }}
        />
        <div className="relative flex items-center justify-between">
          {stages.map((stage, i) => {
            const reached = i <= active;
            const isActive = i === active;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    scale: isActive ? 1.18 : 1,
                    borderColor: reached ? "#00ff9d" : "#1d222b",
                    backgroundColor: reached ? "rgba(0,255,157,0.08)" : "#07080a",
                  }}
                  transition={{ duration: 0.35 }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-[15px] ${
                    isActive ? "shadow-glow-sm" : ""
                  }`}
                >
                  {stage.icon}
                </motion.div>
                <span
                  className={`font-mono text-[9px] transition-colors ${
                    reached ? "text-nexus-green" : "text-ink-dim"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex h-9 items-center justify-center rounded-lg border border-line bg-void px-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-center font-mono text-[11px] text-ink-muted"
          >
            {stages[active].caption}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PulseLine() {
  return (
    <svg width="56" height="18" viewBox="0 0 56 18" fill="none" className="overflow-visible">
      <motion.path
        d="M0 9 H12 L16 2 L21 16 L26 5 L30 12 L34 9 H56"
        stroke="#00ff9d"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0.25 }}
        animate={{ pathLength: [0, 1], opacity: [0.25, 1, 0.25] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

type ChatMsg = { from: "bot" | "user"; text: string };
type Reply = { match: RegExp; reply: string };

function LiveChat({
  intro,
  placeholder,
  defaultReply,
  replies,
}: {
  intro: string;
  placeholder: string;
  defaultReply: string;
  replies: readonly Reply[];
}) {
  const [messages, setMessages] = useState<ChatMsg[]>([{ from: "bot", text: intro }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ from: "bot", text: intro }]);
  }, [intro]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const found = replies.find((r) => r.match.test(text));
    const reply = found ? found.reply : defaultReply;
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 850 + Math.random() * 500);
  };

  return (
    <div className="flex h-[210px] flex-col">
      <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 font-body text-[12.5px] leading-snug ${
                  m.from === "user"
                    ? "bg-nexus-green text-void"
                    : "border border-line bg-void text-ink-muted"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="flex items-center gap-1 rounded-xl border border-line bg-void px-3 py-2.5">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-nexus-green"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="mt-3 flex items-center gap-2 border-t border-line pt-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          maxLength={80}
          className="flex-1 rounded-full border border-line bg-void px-3.5 py-2 font-body text-[12.5px] text-ink placeholder:text-ink-dim focus:border-nexus-green"
        />
        <button
          type="submit"
          data-cursor-hover
          disabled={!input.trim() || typing}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-nexus-green to-nexus-cyan text-void transition-transform hover:scale-110 disabled:opacity-40"
          aria-label="Send"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  );
}

export default function InteractiveDemo() {
  const { t } = useLanguage();
  const d = t.demo;

  return (
    <div className="glass-panel w-full max-w-md rounded-2xl p-5 shadow-glow">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nexus-green opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-nexus-green shadow-glow-sm" />
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">
            {d.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <PulseLine />
          <span className="font-mono text-[10px] text-nexus-green">{d.pulse}</span>
        </div>
      </div>

      <FlowPipeline stages={d.stages} />

      <div className="my-4 h-px bg-line" />

      <div className="mb-2 font-mono text-[10px] uppercase tracking-wide text-ink-dim">
        {d.chatLabel}
      </div>
      <LiveChat
        intro={d.chatIntro}
        placeholder={d.chatPlaceholder}
        defaultReply={d.chatDefault}
        replies={d.chatReplies}
      />
    </div>
  );
}
