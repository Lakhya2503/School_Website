import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen, FlaskConical, Calculator, Globe, Music, Dumbbell, Code, Palette,
  CheckCircle2, GraduationCap, Star, Users, ArrowRight, Sparkles, Trophy, Lightbulb, Atom, Brain,
} from "lucide-react";
import heroAcademics from "@/assets/acdemics.png";

/* ─── Static colour/icon config (language-independent) ─── */

const statsMeta = [
  { key: "statsPassRate" as const, value: "98%", icon: Star, color: "from-amber-500 to-orange-500" },
  { key: "statsUniversity" as const, value: "150+", icon: GraduationCap, color: "from-primary to-orange-400" },
  { key: "statsExperts" as const, value: "40+", icon: Users, color: "from-secondary to-red-400" },
  { key: "statsOlympiad" as const, value: "25+", icon: Trophy, color: "from-gold to-amber-400" },
] as const;

const programsMeta = [
  { idx: 1, emoji: "🌱", color: "from-emerald-500/20 to-teal-500/10", border: "border-emerald-400/30", accent: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { idx: 2, emoji: "📚", color: "from-blue-500/20 to-indigo-500/10", border: "border-blue-400/30", accent: "text-blue-600", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  { idx: 3, emoji: "🎯", color: "from-primary/20 to-orange-500/10", border: "border-primary/30", accent: "text-primary", badge: "bg-orange-50 text-orange-700 border-orange-200" },
  { idx: 4, emoji: "🏛️", color: "from-secondary/20 to-red-500/10", border: "border-secondary/30", accent: "text-secondary", badge: "bg-red-50 text-red-700 border-red-200" },
] as const;

const pillarIcons = [Brain, Atom, Lightbulb, Sparkles] as const;

const pillarsMeta = [
  {
    num: "01", devanagari: "१",
    accent: "hsl(38 95% 58%)",
    accentClass: "text-amber-500",
    borderClass: "border-amber-400/30",
    glowClass: "from-amber-500/10",
    barClass: "from-amber-400 to-orange-500",
    tagClass: "bg-amber-100 text-amber-700 border-amber-200",
    tag: "Critical Thinking",
  },
  {
    num: "02", devanagari: "२",
    accent: "hsl(22 88% 58%)",
    accentClass: "text-orange-500",
    borderClass: "border-orange-400/30",
    glowClass: "from-orange-500/10",
    barClass: "from-primary to-orange-400",
    tagClass: "bg-orange-100 text-orange-700 border-orange-200",
    tag: "STEM",
  },
  {
    num: "03", devanagari: "३",
    accent: "hsl(340 70% 60%)",
    accentClass: "text-rose-500",
    borderClass: "border-rose-400/30",
    glowClass: "from-rose-500/10",
    barClass: "from-secondary to-rose-500",
    tagClass: "bg-rose-100 text-rose-700 border-rose-200",
    tag: "Creative",
  },
  {
    num: "04", devanagari: "४",
    accent: "hsl(43 88% 60%)",
    accentClass: "text-amber-600",
    borderClass: "border-gold/30",
    glowClass: "from-gold/10",
    barClass: "from-gold to-amber-400",
    tagClass: "bg-yellow-100 text-yellow-700 border-yellow-200",
    tag: "Culture",
  },
] as const;

const subjectsMeta = [
  { icon: BookOpen,    color: "from-amber-500 to-orange-500",   ritual: "🪔", sanskritName: "वाक् विद्या",    ritualLabel: "Saraswati Puja" },
  { icon: Calculator,  color: "from-blue-500 to-indigo-500",    ritual: "🔢", sanskritName: "गणित शास्त्र",   ritualLabel: "Vedic Ganit" },
  { icon: FlaskConical,color: "from-emerald-500 to-teal-500",   ritual: "🌿", sanskritName: "प्रकृति विज्ञान", ritualLabel: "Pancha Bhuta" },
  { icon: Globe,       color: "from-primary to-orange-400",     ritual: "🗺️", sanskritName: "भूगोल इतिहास",  ritualLabel: "Dharti Mata" },
  { icon: Code,        color: "from-violet-500 to-purple-500",  ritual: "⚙️", sanskritName: "संगणक विद्या",   ritualLabel: "Yantra Shastra" },
  { icon: Palette,     color: "from-pink-500 to-rose-500",      ritual: "🎨", sanskritName: "चित्र कला",      ritualLabel: "Shilpa Shastra" },
  { icon: Music,       color: "from-secondary to-red-400",      ritual: "🎵", sanskritName: "संगीत नृत्य",    ritualLabel: "Gandharva Veda" },
  { icon: Dumbbell,    color: "from-gold to-amber-500",         ritual: "🧘", sanskritName: "शारीरिक शिक्षा", ritualLabel: "Sharir Dharma" },
] as const;

/* ─── Animated number ───────────────────────────────────── */
const AnimatedNumber = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <span ref={ref} className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {value}
    </span>
  );
};

/* ─── Component ─────────────────────────────────────────── */
const Academics = () => {
  const { t } = useLanguage();
  const [activeProgram, setActiveProgram] = useState(0);

  const programs = programsMeta.map((m) => ({
    ...m,
    level: t(`academics.prog${m.idx}Level`),
    grades: t(`academics.prog${m.idx}Grades`),
    desc: t(`academics.prog${m.idx}Desc`),
    highlights: [
      t(`academics.prog${m.idx}h1`),
      t(`academics.prog${m.idx}h2`),
      t(`academics.prog${m.idx}h3`),
      t(`academics.prog${m.idx}h4`),
    ],
  }));

  const pillars = pillarIcons.map((Icon, i) => ({
    Icon,
    title: t([
      "academics.pillar1Title",
      "academics.pillar2Title",
      "academics.pillar3Title",
      "academics.pillar4Title",
    ][i] as Parameters<typeof t>[0]),
    desc: t([
      "academics.pillar1Desc",
      "academics.pillar2Desc",
      "academics.pillar3Desc",
      "academics.pillar4Desc",
    ][i] as Parameters<typeof t>[0]),
  }));

  const subjects = subjectsMeta.map(({ icon: Icon, color, ritual, sanskritName, ritualLabel }, i) => ({
    Icon,
    color,
    ritual,
    sanskritName,
    ritualLabel,
    name: t([
      "academics.subj1Name", "academics.subj2Name", "academics.subj3Name", "academics.subj4Name",
      "academics.subj5Name", "academics.subj6Name", "academics.subj7Name", "academics.subj8Name",
    ][i] as Parameters<typeof t>[0]),
    desc: t([
      "academics.subj1Desc", "academics.subj2Desc", "academics.subj3Desc", "academics.subj4Desc",
      "academics.subj5Desc", "academics.subj6Desc", "academics.subj7Desc", "academics.subj8Desc",
    ][i] as Parameters<typeof t>[0]),
  }));

  return (
    <>
      <PageHero
        title={t("academics.heroTitle")}
        sanskrit="॥ सा विद्या या विमुक्तये ॥"
        subtitle={t("academics.heroSubtitle")}
        image={heroAcademics}
        size="default"
      />

      {/* ── Stats Bar ── */}
      <section className="container-narrow mt-10 md:mt-14 relative z-10">
        <div className="rounded-3xl border border-gold/30 bg-card shadow-temple overflow-hidden">
          {/* Top festive bar */}
          <div className="h-1 w-full bg-gradient-festive" />
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gold/15">
            {statsMeta.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative group flex flex-col items-center justify-center gap-2 p-6 md:p-8 text-center overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-saffron leading-none">
                  <AnimatedNumber value={s.value} />
                </div>
                <div className="text-xs text-muted-foreground leading-snug max-w-[8rem]">{t(`academics.${s.key}`)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Four Pillars ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Light warm background */}
        <div className="absolute inset-0 bg-[hsl(38_55%_95%)]" />
        {/* Saffron radial bloom */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[hsl(22_88%_52%/0.08)] blur-[100px] pointer-events-none" />
        {/* Faint dot texture */}
        <div className="absolute inset-0 opacity-[0.045]"
          style={{ backgroundImage: "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
        {/* Gold rules */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="container-narrow relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-sanskrit text-xs tracking-[0.22em] text-primary mb-5">
              {t("academics.pillarsEyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary leading-tight">
              {t("academics.pillarsTitle")}
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-primary text-base">✦</span>
              <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t("academics.pillarsSubtitle")}
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => {
              const m = pillarsMeta[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.13, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border ${m.borderClass} bg-white shadow-[0_4px_24px_hsl(43_78%_52%/0.10)] hover:shadow-[0_12px_40px_hsl(43_78%_52%/0.22)] hover:-translate-y-2 transition-all duration-300`}
                >
                  {/* Accent top bar */}
                  <div className={`h-1 w-full shrink-0 bg-gradient-to-r ${m.barClass}`} />

                  {/* Hover glow overlay — always on mobile, hover-only on desktop */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${m.glowClass} to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div className="relative z-10 flex flex-col flex-1 p-7">

                    {/* Top row: tag + devanagari numeral */}
                    <div className="flex items-center justify-between mb-5">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] uppercase ${m.tagClass}`}>
                        {m.tag}
                      </span>
                      <span className={`font-sanskrit text-5xl font-bold leading-none select-none opacity-15 group-hover:opacity-25 transition-opacity duration-300 ${m.accentClass}`}>
                        {m.devanagari}
                      </span>
                    </div>

                    {/* Icon with glow ring */}
                    <div className="relative mb-6 w-fit">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${m.barClass} opacity-20 blur-md scale-110`} />
                      <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${m.barClass} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <p.Icon className="h-8 w-8" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl text-secondary mb-3 leading-snug">
                      {p.title}
                    </h3>

                    {/* Animated accent line */}
                    <div className="relative h-0.5 w-full mb-4 overflow-hidden rounded-full bg-gold/10">
                      <motion.div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${m.barClass}`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: "55%" }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.13 + 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {p.desc}
                    </p>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase">
                        Pillar {m.num}
                      </span>
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${m.borderClass} group-hover:bg-gradient-to-br group-hover:${m.barClass} transition-all duration-300`}>
                        <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${m.barClass}`} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Programs — Interactive Tabs ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Warm temple background */}
        <div className="absolute inset-0 bg-gradient-temple" />
        <MandalaBg className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] opacity-10 hidden lg:block z-0" />
        <MandalaBg className="absolute -right-40 top-0 h-[24rem] w-[24rem] opacity-8 hidden lg:block z-0" spin={false} />
        <div className="container-narrow relative z-10">
          <SectionHeader
            eyebrow={t("academics.programsEyebrow")}
            title={t("academics.programsTitle")}
            subtitle={t("academics.programsSubtitle")}
          />

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {programs.map((p, i) => (
              <button
                key={i}
                onClick={() => setActiveProgram(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  activeProgram === i
                    ? "bg-gradient-saffron text-white border-transparent shadow-gold scale-105"
                    : "border-gold/30 text-muted-foreground hover:border-primary/40 hover:text-foreground bg-white/70"
                }`}
              >
                <span className="mr-1.5">{p.emoji}</span>
                {p.level}
              </button>
            ))}
          </div>

          {/* Active program card */}
          <motion.div
            key={activeProgram}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden shadow-temple border border-gold/20"
          >
            {/* Festive top bar */}
            <div className="h-1.5 w-full bg-gradient-festive" />
            <div className="grid md:grid-cols-2 gap-0 bg-white">
              {/* Left */}
              <div className={`p-8 md:p-10 border-b md:border-b-0 md:border-r border-gold/15 bg-gradient-to-br ${programs[activeProgram].color}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 border border-gold/20 shadow-soft text-4xl">
                    {programs[activeProgram].emoji}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-secondary">{programs[activeProgram].level}</h3>
                    <span className={`text-sm font-semibold ${programs[activeProgram].accent}`}>
                      {programs[activeProgram].grades}
                    </span>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed text-base md:text-lg mb-6">
                  {programs[activeProgram].desc}
                </p>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${programs[activeProgram].badge}`}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {t("academics.cbseAffiliated")}
                </span>
              </div>
              {/* Right */}
              <div className="p-8 md:p-10 bg-white">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-5 flex items-center gap-2">
                  <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  {t("academics.keyHighlights")}
                  <span className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
                </p>
                <ul className="space-y-3">
                  {programs[activeProgram].highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.08 }}
                      className="flex items-center gap-3 rounded-xl bg-[hsl(38_55%_97%)] border border-gold/20 px-4 py-3 hover:border-gold/40 hover:shadow-soft transition-all duration-200"
                    >
                      <div className="h-2 w-2 rounded-full bg-gradient-saffron shadow-gold shrink-0" />
                      <span className="text-sm font-medium text-foreground/85">{h}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Dot nav */}
          <div className="flex justify-center gap-2 mt-6">
            {programs.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveProgram(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeProgram === i ? "w-8 bg-primary" : "w-2 bg-gold/40 hover:bg-gold/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects Grid ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Warm parchment background */}
        <div className="absolute inset-0 bg-[hsl(38_55%_95%)]" />
        {/* Faint lotus dot pattern */}
        <div className="absolute inset-0 opacity-[0.045]"
          style={{ backgroundImage: "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
        {/* Gold rules */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="container-narrow relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-sanskrit text-xs tracking-[0.22em] text-primary mb-5">
              {t("academics.subjectsEyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary leading-tight">
              {t("academics.subjectsTitle")}
            </h2>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-primary text-base">✦</span>
              <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t("academics.subjectsSubtitle")}
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl bg-white border border-gold/25 shadow-[0_4px_20px_hsl(43_78%_52%/0.08)] hover:shadow-[0_10px_36px_hsl(43_78%_52%/0.18)] hover:-translate-y-2 transition-all duration-300 cursor-default"
              >
                {/* Coloured top bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${s.color}`} />

                {/* Hover tint — always on mobile, hover-only on desktop */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-[0.06] md:opacity-0 md:group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10 p-6">
                  {/* Icon + ritual emoji row */}
                  <div className="flex items-start justify-between mb-5">
                    {/* Icon with glow */}
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${s.color} opacity-25 blur-md scale-110`} />
                      <div className={`relative flex h-13 w-13 h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <s.Icon className="h-6 w-6" />
                      </div>
                    </div>
                    {/* Ritual emoji */}
                    <span className="text-3xl leading-none mt-0.5 group-hover:scale-110 transition-transform duration-300">{s.ritual}</span>
                  </div>

                  {/* Sanskrit name */}
                  <p className="font-sanskrit text-[11px] text-primary/60 mb-1 tracking-wide">{s.sanskritName}</p>

                  {/* English name */}
                  <h4 className="font-display text-base md:text-lg text-secondary mb-2 leading-snug">{s.name}</h4>

                  {/* Divider */}
                  <div className={`h-0.5 w-10 bg-gradient-to-r ${s.color} mb-3 rounded-full opacity-70`} />

                  {/* Description */}
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>

                  {/* Ritual label badge */}
                  <span className="inline-flex items-center gap-1 font-sanskrit text-[10px] tracking-[0.12em] text-primary/70 bg-primary/8 border border-primary/15 rounded-full px-2.5 py-1">
                    {s.ritualLabel}
                  </span>
                </div>

                {/* Bottom accent bar — always on mobile, slides in on desktop hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.color} scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Sanskrit Quote Banner ── */}
      <section className="relative bg-gradient-festive text-primary-foreground overflow-hidden">
        <MandalaBg className="absolute -left-32 -top-32 w-[500px] h-[500px] opacity-15" />
        <MandalaBg className="absolute -right-40 -bottom-40 w-[500px] h-[500px] opacity-15" spin={false} />
        <div className="container-narrow relative py-16 text-center">
          <Sparkles className="h-9 w-9 text-gold mx-auto mb-4" />
          <p className="font-sanskrit text-2xl md:text-3xl mb-3 text-gold">
            विद्या ददाति विनयं, विनयाद् याति पात्रताम्
          </p>
          <p className="text-base md:text-lg max-w-2xl mx-auto opacity-85">
            {t("academics.quoteTrans")}
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container-narrow py-20">
        <div className="relative overflow-hidden rounded-3xl shadow-temple">
          {/* Background */}
          <div className="absolute inset-0 bg-[hsl(20_40%_10%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[hsl(22_88%_52%/0.18)] blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(hsl(43 78% 52%) 1px,transparent 1px),linear-gradient(90deg,hsl(43 78% 52%) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
          <MandalaBg className="absolute -right-16 -top-16 w-72 h-72 opacity-10" spin={false} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-gold mb-5">
                <GraduationCap className="h-3.5 w-3.5" />
                {t("academics.ctaBadge")}
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                {t("academics.ctaTitle")}
              </h3>
              <p className="text-white/55 max-w-lg leading-relaxed">
                {t("academics.ctaSubtitle")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button asChild variant="hero" size="lg">
                <Link to="/admissions">
                  {t("academics.ctaApply")} <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" className="border border-white/20 bg-white/10 hover:bg-white/20 text-white">
                <Link to="/contact">{t("academics.ctaContact")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Academics;
