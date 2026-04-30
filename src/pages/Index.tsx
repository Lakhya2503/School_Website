import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen, FlaskConical, Palette, Trophy, Award, Sparkles, ArrowRight, Quote,
  Megaphone, FileText, Wallet, CalendarDays,
} from "lucide-react";
import heroHome from "@/assets/newherosection.png";
import heroHomeMobile from "@/assets/mobilevertficateimage.png";
import heroAbout from "@/assets/hero-about.jpg";
import heroAcademics from "@/assets/hero-academics.jpg";
import heroAdmissions from "@/assets/hero-admissions.jpg";
import heroCalendar from "@/assets/hero-calendar.jpg";
import heroContact from "@/assets/hero-contact.jpg";
import heroHero from "@/assets/hero-home.jpg";
import schoolHome from "@/assets/schoolhome.png";
import { announcements, calendarEvents } from "@/data/schoolData";

// ─── static data (icons/colors are language-independent) ──────────────────────
const featureIcons = [BookOpen, FlaskConical, Palette, Trophy];
const featureKeys = [
  { title: "home.feat1.title", desc: "home.feat1.desc" },
  { title: "home.feat2.title", desc: "home.feat2.desc" },
  { title: "home.feat3.title", desc: "home.feat3.desc" },
  { title: "home.feat4.title", desc: "home.feat4.desc" },
] as const;

const stats = [
  { value: 20,   suffix: "+",  label: "home.stat1.label" },
  { value: 2400, suffix: "",   label: "home.stat2.label", group: true },
  { value: 180,  suffix: "+",  label: "home.stat3.label" },
  { value: 98,   suffix: "%",  label: "home.stat4.label" },
] as const;

const quickLinkDefs = [
  { to: "/notices",    icon: FileText,     labelKey: "home.ql1.label", subKey: "home.ql1.sub", color: "from-orange-500 to-red-500" },
  { to: "/fees",       icon: Wallet,       labelKey: "home.ql2.label", subKey: "home.ql2.sub", color: "from-yellow-500 to-orange-500" },
  { to: "/calendar",   icon: CalendarDays, labelKey: "home.ql3.label", subKey: "home.ql3.sub", color: "from-teal-500 to-blue-600" },
  { to: "/admissions", icon: BookOpen,     labelKey: "home.ql4.label", subKey: "home.ql4.sub", color: "from-purple-500 to-pink-500" },
] as const;

const testimonialKeys = [
  { name: "home.test1.name", role: "home.test1.role", text: "home.test1.text" },
  { name: "home.test2.name", role: "home.test2.role", text: "home.test2.text" },
  { name: "home.test3.name", role: "home.test3.role", text: "home.test3.text" },
] as const;

const galleryItems = [
  { src: heroHero,       labelKey: "home.gallery.l1" },
  { src: heroAcademics,  labelKey: "home.gallery.l2" },
  { src: heroAdmissions, labelKey: "home.gallery.l3" },
  { src: heroCalendar,   labelKey: "home.gallery.l4" },
  { src: heroContact,    labelKey: "home.gallery.l5" },
  { src: heroAbout,      labelKey: "home.gallery.l6" },
  { src: schoolHome,     labelKey: "home.gallery.l7" },
] as const;

// ─── animated counter ──────────────────────────────────────────────────────────
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  group?: boolean;
}

const AnimatedCounter = ({ end, duration = 1.6, suffix = "", group = false }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frameId = 0;
    let startTime = 0;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(end * eased));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [duration, end, isInView]);

  const display = group ? count.toLocaleString("en-IN") : String(count);
  return <span ref={ref}>{display}{suffix}</span>;
};

// ─── page ──────────────────────────────────────────────────────────────────────
const Index = () => {
  const { language, t } = useLanguage();

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        title={t("home.heroTitle")}
        sanskrit="॥ विद्यया अमृतमश्नुते ॥"
        subtitle={t("home.heroSubtitle")}
        image={heroHome}
        mobileImage={heroHomeMobile}
        imageFit="cover"
        imagePosition="center center"
        size="full"
      >
        <Button asChild variant="hero" size="xl">
          <Link to="/admissions">
            {t("home.beginJourney")}
            <ArrowRight className={`h-5 w-5 ${language === "hi" ? "hidden" : ""}`} />
          </Link>
        </Button>
        <Button asChild variant="hero" size="xl" className="opacity-90 hover:opacity-100">
          <Link to="/about">{t("home.discoverUs")}</Link>
        </Button>
      </PageHero>

      {/* ── Stats ── */}
      <section className="container-narrow mt-10 md:mt-14 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-gold/25 bg-card p-6 text-center shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-festive" />
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient-saffron">
                <AnimatedCounter end={s.value} suffix={s.suffix} group={"group" in s ? s.group : false} />
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{t(s.label)}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Announcements + Upcoming Events ── */}
      <section className="container-narrow mt-10 grid gap-6 md:grid-cols-2">
        {/* Announcements */}
        <div className="overflow-hidden rounded-3xl border border-gold/20 bg-card shadow-soft">
          <div className="bg-gradient-festive px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                <Megaphone className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white leading-tight">{t("home.announcements.title")}</h3>
                <p className="text-[11px] text-white/75">{t("home.announcements.sub")}</p>
              </div>
            </div>
            <Link to="/notices" className="text-xs text-white/90 hover:text-white underline underline-offset-2">
              {t("home.announcements.viewAll")} →
            </Link>
          </div>
          <ul className="divide-y divide-gold/10">
            {announcements.slice(0, 4).map((a, i) => (
              <li key={a.id} className="flex items-start gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
                <div className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-display font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground/90 leading-snug">{language === "hi" && a.titleHi ? a.titleHi : a.title}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      a.category === "Urgent" ? "bg-red-100 text-red-600" :
                      a.category === "Exam"   ? "bg-blue-100 text-blue-600" :
                      a.category === "Event"  ? "bg-purple-100 text-purple-600" :
                      "bg-primary/10 text-primary"
                    }`}>{a.category}</span>
                    <span className="text-[11px] text-muted-foreground">{a.date}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="overflow-hidden rounded-3xl border border-gold/20 bg-card shadow-soft">
          <div className="bg-gradient-peacock px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                <CalendarDays className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white leading-tight">{t("home.events.title")}</h3>
                <p className="text-[11px] text-white/75">{t("home.events.sub")}</p>
              </div>
            </div>
            <Link to="/calendar" className="text-xs text-white/90 hover:text-white underline underline-offset-2">
              {t("home.events.viewAll")} →
            </Link>
          </div>
          <ul className="divide-y divide-gold/10">
            {calendarEvents.slice(0, 4).map(e => {
              const d = new Date(e.date);
              const COLORS: Record<string, string> = {
                Exam: "bg-red-500", Result: "bg-blue-500", Holiday: "bg-green-500",
                Meeting: "bg-yellow-500", Event: "bg-purple-500", Leave: "bg-orange-500",
              };
              return (
                <li key={e.id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
                  <div className="shrink-0 w-14 text-center rounded-xl border border-gold/20 bg-gradient-to-b from-primary/10 to-gold/10 py-2">
                    <div className="font-display text-2xl font-bold text-primary leading-none">{d.getDate()}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                      {d.toLocaleString("en-IN", { month: "short" })}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground/90 leading-snug truncate">{e.title}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className={`inline-block h-2 w-2 rounded-full ${COLORS[e.category] || "bg-gray-400"}`} />
                      <span className="text-[11px] font-medium text-muted-foreground">{e.category}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Quick Links ── */}
      <section className="container-narrow mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinkDefs.map(({ to, icon: Icon, labelKey, subKey, color }) => (
          <Link
            key={to}
            to={to}
            className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-card p-5 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color}`} />
            <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="font-display font-semibold text-secondary text-sm">{t(labelKey)}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{t(subKey)}</div>
          </Link>
        ))}
      </section>

      {/* ── Features ── */}
      <section className="container-narrow py-24 relative overflow-hidden">
        <MandalaBg className="absolute -right-64 -top-20 h-[30rem] w-[30rem] opacity-35 hidden lg:block z-0" />
        <div className="relative z-10">
          <SectionHeader
            eyebrow={t("home.features.eyebrow")}
            title={t("home.features.title")}
            subtitle={t("home.features.sub")}
          />
        </div>
        <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureKeys.map((k, i) => {
            const Icon = featureIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-gold/20 bg-card/90 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-gold/40 hover:shadow-warm"
              >
                <div className="h-2 w-full bg-gradient-festive" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_90%_10%,hsl(43_88%_55%/0.14),transparent_48%)]" />
                <div className="relative z-10 flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-saffron text-primary-foreground shadow-gold transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7 drop-shadow-[0_1px_0_hsl(0_0%_100%/0.25)]" />
                    </div>
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl md:text-[1.65rem] text-secondary leading-tight">
                    {t(k.title)}
                  </h3>
                  <p className="mt-3 text-sm md:text-[0.98rem] leading-relaxed text-muted-foreground">
                    {t(k.desc)}
                  </p>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <span>{t("home.features.schoolLife")}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Gallery Marquee ── */}
      <section className="py-16 bg-background overflow-hidden">
        <div className="container-narrow mb-8">
          <SectionHeader
            title={t("home.gallery.title")}
            subtitle={t("home.gallery.sub")}
          />
        </div>

        {/* Marquee track — duplicated for seamless loop */}
        <div
          className="relative flex overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
        >
          {/* pause on hover via CSS group */}
          <div className="flex gap-4 animate-[gallery-scroll_35s_linear_infinite] hover:[animation-play-state:paused]"
            style={{ width: "max-content" }}
          >
            {[...galleryItems, ...galleryItems].map((item, i) => (
              <div
                key={i}
                className="relative w-72 h-48 shrink-0 rounded-2xl overflow-hidden border border-gold/20 shadow-soft group"
              >
                <img
                  src={item.src}
                  alt={t(item.labelKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* label */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center gap-2">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/60" />
                  <span className="font-display text-xs font-semibold tracking-widest uppercase text-amber-200 drop-shadow-md whitespace-nowrap">
                    {t(item.labelKey)}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cultural callout ── */}
      <section className="relative bg-gradient-festive text-primary-foreground overflow-hidden">
        <MandalaBg className="absolute -left-32 -top-32 w-[500px] h-[500px] opacity-20" />
        <MandalaBg className="absolute -right-40 -bottom-40 w-[500px] h-[500px] opacity-20" spin={false} />
        <div className="container-narrow relative py-20 text-center">
          <Sparkles className="h-10 w-10 text-gold mx-auto mb-5" />
          <p className="font-sanskrit text-2xl md:text-3xl mb-4 text-gold">
            असतो मा सद्गमय । तमसो मा ज्योतिर्गमय ।
          </p>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            {t("home.cultural.quote")}
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="container-narrow py-24">
        <SectionHeader eyebrow="॥ अनुभवाः ॥" title={t("home.testimonials.title")} />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialKeys.map((tk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl section-surface ornate-frame border border-gold/30 shadow-soft hover:-translate-y-1.5 hover:shadow-warm transition-all duration-300"
            >
              <div className="h-2 w-full bg-gradient-festive" />
              <div className="p-7">
                <Quote className="h-8 w-8 text-primary/40 mb-4" />
                <p className="text-foreground/85 leading-relaxed mb-6">{t(tk.text)}</p>
                <div className="flex items-center gap-3 rounded-2xl border border-gold/20 bg-background/60 px-4 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-saffron text-primary-foreground font-display text-sm font-bold shadow-gold">
                    {t(tk.name).charAt(0)}
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-display text-sm text-secondary whitespace-nowrap">{t(tk.name)}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground truncate">{t(tk.role)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container-narrow pb-10 md:pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,hsl(22_88%_48%)_0%,hsl(38_95%_61%)_42%,hsl(43_95%_84%)_100%)] p-10 md:p-16 text-secondary shadow-temple ornate-frame">
          <MandalaBg
            className="absolute -right-20 -top-20 w-80 h-80 opacity-60"
            style={{
              filter: "sepia(1) saturate(4) hue-rotate(340deg) brightness(0.65) contrast(1.2)",
              mixBlendMode: "multiply",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_10%,hsl(43_95%_78%/0.18)_45%,transparent_80%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,hsl(43_95%_88%/0.20),transparent_34%),radial-gradient(circle_at_85%_0%,hsl(22_88%_52%/0.12),transparent_30%)]" />
          <div className="relative flex flex-col items-center text-center">
            <Award className="h-10 w-10 text-secondary mb-4" />
            <h3 className="font-display text-3xl md:text-5xl font-bold mb-4">{t("home.cta.title")}</h3>
            <p className="text-lg opacity-90 mb-8 max-w-xl">{t("home.cta.sub")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/admissions">{t("home.cta.apply")}</Link>
              </Button>
              <Button asChild variant="hero" size="xl" className="opacity-90 hover:opacity-100">
                <Link to="/contact">{t("home.cta.contact")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
