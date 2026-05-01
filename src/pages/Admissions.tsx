import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Heart, Users, BookOpen, Trophy,
  ArrowRight, CheckCircle2, Sparkles, Phone, Mail, ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import heroAdmissions from "@/assets/admission.png";

/* ─── Static config (icons / colours only) ─────────────── */

const stepsMeta = [
  {
    num: "01", devanagari: "१",
    accent: "hsl(38 95% 58%)",
    accentMuted: "hsl(38 95% 58% / 0.12)",
    accentBorder: "hsl(38 95% 58% / 0.35)",
    iconBg: "from-amber-400 to-orange-500",
  },
  {
    num: "02", devanagari: "२",
    accent: "hsl(22 88% 52%)",
    accentMuted: "hsl(22 88% 52% / 0.10)",
    accentBorder: "hsl(22 88% 52% / 0.30)",
    iconBg: "from-primary to-orange-400",
  },
  {
    num: "03", devanagari: "३",
    accent: "hsl(358 65% 32%)",
    accentMuted: "hsl(358 65% 32% / 0.08)",
    accentBorder: "hsl(358 65% 32% / 0.25)",
    iconBg: "from-secondary to-rose-500",
  },
  {
    num: "04", devanagari: "४",
    accent: "hsl(43 78% 52%)",
    accentMuted: "hsl(43 78% 52% / 0.12)",
    accentBorder: "hsl(43 78% 52% / 0.35)",
    iconBg: "from-gold to-amber-400",
  },
] as const;

const whyMeta = [
  { icon: Heart,    stat: "100%", color: "from-rose-500 to-pink-500" },
  { icon: Users,    stat: "40+",  color: "from-blue-500 to-indigo-500" },
  { icon: BookOpen, stat: "CBSE", color: "from-primary to-orange-400" },
  { icon: Trophy,   stat: "98%",  color: "from-gold to-amber-500" },
] as const;

const docKeys = ["doc1","doc2","doc3","doc4","doc5","doc6"] as const;
const faqCount = [1,2,3,4,5,6,7] as const;

/* ─── FAQ Item ──────────────────────────────────────────── */
const faqIcons = ["🎓", "📝", "📋", "💰", "👥", "📅", "🚌"] as const;

const FaqItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-400 ${
          open
            ? "border-primary/40 bg-white shadow-[0_8px_32px_hsl(22_88%_52%/0.12)]"
            : "border-gold/20 bg-white/80 hover:border-gold/40 hover:bg-white shadow-[0_2px_12px_hsl(43_78%_52%/0.07)] hover:shadow-[0_4px_20px_hsl(43_78%_52%/0.13)]"
        }`}
      >
        {/* Left accent bar — only visible when open */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-gold to-amber-400 transition-all duration-400 rounded-l-2xl ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Question row */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-4 px-5 py-5 md:px-6 text-left"
        >
          {/* Number + emoji badge */}
          <div className={`shrink-0 flex flex-col items-center justify-center h-11 w-11 rounded-xl border transition-all duration-300 ${
            open
              ? "bg-gradient-to-br from-primary to-orange-400 border-transparent text-white shadow-[0_4px_12px_hsl(22_88%_52%/0.35)]"
              : "bg-gold/8 border-gold/25 text-primary group-hover:border-gold/50"
          }`}>
            <span className="text-base leading-none">{faqIcons[index]}</span>
            <span className={`text-[9px] font-bold tracking-wider mt-0.5 ${open ? "text-white/80" : "text-primary/60"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Question text */}
          <span className={`flex-1 font-display text-sm md:text-base lg:text-lg leading-snug transition-colors duration-200 ${
            open ? "text-primary" : "text-secondary group-hover:text-primary/80"
          }`}>
            {question}
          </span>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
              open
                ? "bg-primary/10 border-primary/30 text-primary"
                : "border-gold/25 text-muted-foreground group-hover:border-gold/50"
            }`}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pl-[4.25rem] pr-5 md:pr-6 pb-5 pt-0">
                {/* Thin gold rule */}
                <div className="h-px w-full bg-gradient-to-r from-primary/20 via-gold/30 to-transparent mb-4" />
                <p className="text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ─── Component ─────────────────────────────────────────── */
const Admissions = () => {
  const { t } = useLanguage();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ parent: "", child: "", email: "", phone: "", grade: "", message: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    if (name === "email") {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setValidFields((p) => ({ ...p, [name]: ok && value.length > 0 }));
      setErrors((p) => ({ ...p, [name]: !ok && value.length > 0 }));
    } else if (name === "phone") {
      const ok = /^[\d\s+\-()]{10,}$/.test(value);
      setValidFields((p) => ({ ...p, [name]: ok }));
      setErrors((p) => ({ ...p, [name]: !ok && value.length > 0 }));
    } else {
      setValidFields((p) => ({ ...p, [name]: value.trim().length > 0 }));
      setErrors((p) => ({ ...p, [name]: false }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((p) => ({ ...p, [id]: value }));
    validateField(id, value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Application received! We'll be in touch soon. 🪔");
  };

  const isFormValid =
    Object.keys(formData).filter((k) => k !== "message")
      .every((k) => formData[k as keyof typeof formData].trim().length > 0) &&
    !Object.values(errors).some(Boolean);

  return (
    <>
      <PageHero
        title={t("admissions.heroTitle")}
        sanskrit="॥ स्वागतम् ॥"
        subtitle={t("admissions.heroSubtitle")}
        image={heroAdmissions}
        size="default"
      />

      {/* ── Process Steps ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Light warm background */}
        <div className="absolute inset-0 bg-[hsl(38_55%_95%)]" />
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
              {t("admissions.stepsEyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary leading-tight">
              {t("admissions.stepsTitle")}
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-primary text-base">✦</span>
              <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed text-base">
              {t("admissions.stepsSubtitle")}
            </p>
          </motion.div>

          {/* Step Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stepsMeta.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.13, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-[0_2px_16px_hsl(43_78%_52%/0.08)] hover:shadow-[0_8px_32px_hsl(43_78%_52%/0.16)] hover:-translate-y-1.5 transition-all duration-300"
                style={{ boxShadow: `0 0 0 1px ${s.accentBorder}, 0 4px 16px hsl(43 78% 52% / 0.08)` }}
              >
                {/* Accent top bar */}
                <div
                  className="h-[3px] w-full shrink-0"
                  style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
                />

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${s.accentMuted}, transparent 70%)` }}
                />

                <div className="relative z-10 flex flex-col flex-1 p-6">
                  {/* Top row: step number + devanagari */}
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-[0.2em] uppercase border"
                      style={{ background: s.accentMuted, borderColor: s.accentBorder, color: s.accent }}
                    >
                      STEP {s.num}
                    </span>
                    <span className="font-sanskrit text-3xl font-bold leading-none" style={{ color: s.accent, opacity: 0.25 }}>
                      {s.devanagari}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.iconBg} text-white shadow-lg mb-5 group-hover:scale-105 transition-transform duration-300`}>
                    {i === 0 && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {i === 3 && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl text-secondary mb-2 leading-snug">
                    {t(`admissions.step${i + 1}Title`)}
                  </h3>

                  {/* Divider */}
                  <div className="w-8 h-px mb-3" style={{ background: s.accent, opacity: 0.4 }} />

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {t(`admissions.step${i + 1}Desc`)}
                  </p>

                  {/* Connector arrow (not last, desktop) */}
                  {i < stepsMeta.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 h-6 w-6 items-center justify-center rounded-full border border-gold/30 bg-white shadow-soft">
                      <svg className="h-3 w-3 text-primary/60" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white px-5 py-2 text-xs font-medium text-primary shadow-[0_2px_8px_hsl(43_78%_52%/0.12)]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-pulse" />
              Entire process takes 2–3 weeks
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-pulse" />
            </span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>

        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-temple" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
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
              {t("admissions.whyEyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary leading-tight">
              {t("admissions.whyTitle")}
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-primary text-base">✦</span>
              <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t("admissions.whySubtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyMeta.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group relative overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-soft hover:shadow-warm hover:-translate-y-2 transition-all duration-300`}
                style={{ boxShadow: "0 2px 16px hsl(43 78% 52% / 0.08)" }}
              >
                <div className={`h-[3px] w-full bg-gradient-to-r ${item.color}`} />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none`} />
                <div className="relative z-10 p-6 md:p-7">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg text-secondary mb-2">{t(`admissions.why${i + 1}Title`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{t(`admissions.why${i + 1}Desc`)}</p>
                  <div className="flex items-end gap-2 border-t border-gold/15 pt-4">
                    <span className="font-display text-2xl font-bold text-gradient-saffron">{item.stat}</span>
                    <span className="text-xs text-muted-foreground pb-0.5">{t(`admissions.why${i + 1}StatLabel`)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Documents + Form ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[hsl(38_55%_95%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="container-narrow relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* Documents checklist */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-2 space-y-5"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-1">{t("admissions.docsLabel")}</p>
                <h3 className="font-display text-2xl md:text-3xl text-secondary">{t("admissions.docsTitle")}</h3>
                <div className="mt-3 h-px w-20 bg-gradient-to-r from-primary to-gold" />
              </div>
              <ul className="space-y-2.5">
                {docKeys.map((key, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 rounded-xl bg-white border border-gold/20 px-4 py-3 shadow-[0_2px_8px_hsl(43_78%_52%/0.07)] hover:border-gold/40 hover:shadow-[0_4px_16px_hsl(43_78%_52%/0.12)] transition-all duration-200"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-saffron text-white mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-foreground/80">{t(`admissions.${key}`)}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Contact quick links */}
              <div className="rounded-2xl bg-gradient-festive text-primary-foreground p-6 shadow-warm overflow-hidden relative">
                <MandalaBg className="absolute -right-8 -bottom-8 w-32 h-32 opacity-15" spin={false} />
                <p className="font-display text-lg mb-4 relative z-10">{t("admissions.contactTitle")}</p>
                <div className="space-y-3 relative z-10">
                  <a href="tel:+919876543210" className="flex items-center gap-3 text-sm opacity-90 hover:opacity-100 transition-opacity">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20"><Phone className="h-4 w-4" /></div>
                    +91 98765 43210
                  </a>
                  <a href="mailto:admissions@vidyalaya.in" className="flex items-center gap-3 text-sm opacity-90 hover:opacity-100 transition-opacity">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20"><Mail className="h-4 w-4" /></div>
                    admissions@vidyalaya.in
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-3"
            >
              <div className="rounded-3xl border border-gold/25 bg-white shadow-temple overflow-hidden">
                <div className="h-1.5 w-full bg-gradient-festive" />
                <div className="p-8 md:p-10">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-saffron text-white shadow-gold mb-6">
                          <CheckCircle2 className="h-10 w-10" />
                        </div>
                        <h3 className="font-display text-2xl text-secondary mb-3">{t("admissions.successTitle")}</h3>
                        <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">{t("admissions.successDesc")}</p>
                        <Button variant="outline" onClick={() => setSubmitted(false)} className="border-gold/40">
                          {t("admissions.successBtn")}
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={onSubmit}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="font-display text-2xl text-secondary mb-1">{t("admissions.formTitle")}</h3>
                          <p className="text-sm text-muted-foreground">{t("admissions.formSubtitle")}</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="parent" className="text-sm font-medium">
                              {t("admissions.formParent")} <span className="text-primary">*</span>
                            </Label>
                            <Input id="parent" value={formData.parent} onChange={handleChange}
                              placeholder={t("admissions.formParentPlaceholder")}
                              className={`transition-all ${errors.parent ? "border-destructive" : validFields.parent ? "border-emerald-400" : ""}`}
                              required />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="child" className="text-sm font-medium">
                              {t("admissions.formChild")} <span className="text-primary">*</span>
                            </Label>
                            <Input id="child" value={formData.child} onChange={handleChange}
                              placeholder={t("admissions.formChildPlaceholder")}
                              className={`transition-all ${errors.child ? "border-destructive" : validFields.child ? "border-emerald-400" : ""}`}
                              required />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-sm font-medium">
                              {t("admissions.formEmail")} <span className="text-primary">*</span>
                            </Label>
                            <Input id="email" type="email" value={formData.email} onChange={handleChange}
                              placeholder={t("admissions.formEmailPlaceholder")}
                              className={`transition-all ${errors.email ? "border-destructive" : validFields.email ? "border-emerald-400" : ""}`}
                              required />
                            {errors.email && <p className="text-xs text-destructive">{t("admissions.formEmailError")}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="phone" className="text-sm font-medium">
                              {t("admissions.formPhone")} <span className="text-primary">*</span>
                            </Label>
                            <Input id="phone" type="tel" value={formData.phone} onChange={handleChange}
                              placeholder={t("admissions.formPhonePlaceholder")}
                              className={`transition-all ${errors.phone ? "border-destructive" : validFields.phone ? "border-emerald-400" : ""}`}
                              required />
                            {errors.phone && <p className="text-xs text-destructive">{t("admissions.formPhoneError")}</p>}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="grade" className="text-sm font-medium">
                            {t("admissions.formGrade")} <span className="text-primary">*</span>
                          </Label>
                          <Input id="grade" value={formData.grade} onChange={handleChange}
                            placeholder={t("admissions.formGradePlaceholder")}
                            className={`transition-all ${errors.grade ? "border-destructive" : validFields.grade ? "border-emerald-400" : ""}`}
                            required />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="message" className="text-sm font-medium">
                            {t("admissions.formMessage")}{" "}
                            <span className="text-muted-foreground text-xs">{t("admissions.formMessageOptional")}</span>
                          </Label>
                          <Textarea id="message" value={formData.message} onChange={handleChange}
                            rows={3} placeholder={t("admissions.formMessagePlaceholder")}
                            className="resize-none" />
                        </div>

                        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={!isFormValid || isSubmitting}>
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="inline-block h-4 w-4 border-2 border-white/40 border-t-white rounded-full"
                              />
                              {t("admissions.formSubmitting")}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              {t("admissions.formSubmit")} <ArrowRight className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Warm parchment background */}
        <div className="absolute inset-0 bg-[hsl(38_55%_95%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="container-narrow relative z-10">

          {/* ── Centred header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-sanskrit text-xs tracking-[0.22em] text-primary mb-5">
              {t("admissions.faqEyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary leading-tight mb-4">
              {t("admissions.faqTitle")}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-primary text-sm">✦</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {t("admissions.faqSubtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1.8fr] gap-12 items-start">

            {/* ── Left panel ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28"
            >

              {/* Decorative card */}
              <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-[0_4px_20px_hsl(43_78%_52%/0.10)] mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-orange-400 text-white shadow-[0_4px_12px_hsl(22_88%_52%/0.3)] mb-4">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-display text-secondary text-base mb-1">Still have questions?</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Our admissions team is happy to help you personally.
                </p>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +91 98765 43210
                </a>
              </div>

              {/* Office hours card */}
              <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-[0_4px_20px_hsl(43_78%_52%/0.08)] mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-amber-400 text-white shadow-md">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-display text-secondary text-sm">Office Hours</p>
                </div>
                <ul className="space-y-2">
                  {[
                    { day: "Mon – Fri", time: "9:00 AM – 5:00 PM" },
                    { day: "Saturday", time: "9:00 AM – 1:00 PM" },
                    { day: "Sunday", time: "Closed" },
                  ].map((row) => (
                    <li key={row.day} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{row.day}</span>
                      <span className={`font-medium ${row.time === "Closed" ? "text-rose-500" : "text-secondary"}`}>{row.time}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-gold/15">
                  <a href="mailto:admissions@vidyalaya.in"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                    admissions@vidyalaya.in
                  </a>
                </div>
              </div>

              {/* Quick facts */}
              <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-[0_4px_20px_hsl(43_78%_52%/0.08)]">
                <p className="font-display text-secondary text-sm mb-4">Quick Facts</p>
                <ul className="space-y-3">
                  {[
                    { icon: "🎓", label: "Affiliated Board", value: "CBSE" },
                    { icon: "📅", label: "Process Duration", value: "2–3 Weeks" },
                    { icon: "👨‍👩‍👧", label: "Student–Teacher", value: "20 : 1" },
                    { icon: "🏫", label: "Classes Offered", value: "I – XII" },
                  ].map((f) => (
                    <li key={f.label} className="flex items-center gap-3">
                      <span className="text-lg leading-none w-6 text-center">{f.icon}</span>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{f.label}</span>
                        <span className="text-xs font-bold text-secondary bg-gold/10 border border-gold/20 rounded-full px-2.5 py-0.5">{f.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* ── Right: FAQ list ── */}
            <div className="space-y-3">
              {faqCount.map((n, i) => (
                <FaqItem
                  key={n}
                  index={i}
                  question={t(`admissions.faq${n}Q`)}
                  answer={t(`admissions.faq${n}A`)}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="container-narrow py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-festive text-primary-foreground p-10 md:p-14 shadow-temple text-center">
          <MandalaBg className="absolute -left-20 -top-20 w-72 h-72 opacity-15" />
          <MandalaBg className="absolute -right-20 -bottom-20 w-72 h-72 opacity-15" spin={false} />
          <div className="relative z-10">
            <Sparkles className="h-9 w-9 text-gold mx-auto mb-4" />
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">{t("admissions.ctaTitle")}</h3>
            <p className="opacity-90 max-w-xl mx-auto mb-8 text-lg">{t("admissions.ctaSubtitle")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/contact">{t("admissions.ctaVisit")}</Link>
              </Button>
              <Button asChild size="xl" className="bg-white/20 hover:bg-white/30 border border-white/30 text-white">
                <a href="tel:+919876543210">{t("admissions.ctaCall")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admissions;
