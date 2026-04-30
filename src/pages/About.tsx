import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import { Heart, Eye, Star, Users, Award, Zap, Book, Globe, CheckCircle2 } from "lucide-react";
import heroAbout from "@/assets/hero-about.jpg";
import heroAcademics from "@/assets/hero-academics.jpg";
import heroAdmissions from "@/assets/hero-admissions.jpg";
import heroCalendar from "@/assets/hero-calendar.jpg";
import heroContact from "@/assets/hero-contact.jpg";
import heroHome from "@/assets/hero-home.jpg";
import schoolHome from "@/assets/schoolhome.png";
import { defaultFacilities, loadAboutFacilities, loadAboutContent, defaultAboutContent, type AboutContent } from "@/lib/aboutContent";
import { useLanguage } from "@/contexts/LanguageContext";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const About = () => {
  const { t, language } = useLanguage();
  const [facilities, setFacilities] = useState(defaultFacilities);
  const [content, setContent] = useState<AboutContent>(defaultAboutContent);

  // helpers to pick the right language variant
  const c = (enKey: keyof AboutContent, hiKey: keyof AboutContent) =>
    language === "hi" ? (content[hiKey] as string) || (content[enKey] as string) : (content[enKey] as string);

  const timeline = [
    { year: "2005", title: t("about.timeline.2005.title"), desc: t("about.timeline.2005.desc") },
    { year: "2012", title: t("about.timeline.2012.title"), desc: t("about.timeline.2012.desc") },
    { year: "2018", title: t("about.timeline.2018.title"), desc: t("about.timeline.2018.desc") },
    { year: "2023", title: t("about.timeline.2023.title"), desc: t("about.timeline.2023.desc") },
  ];

  const achievements = [
    { icon: Award, title: t("about.achievement1.title"), desc: t("about.achievement1.desc") },
    { icon: Star, title: t("about.achievement2.title"), desc: t("about.achievement2.desc") },
    { icon: Globe, title: t("about.achievement3.title"), desc: t("about.achievement3.desc") },
    { icon: Zap, title: t("about.achievement4.title"), desc: t("about.achievement4.desc") },
  ];

  const translatedFacilities = [
    { title: t("about.facility1.title"), desc: t("about.facility1.desc"), image: heroAcademics },
    { title: t("about.facility2.title"), desc: t("about.facility2.desc"), image: heroAdmissions },
    { title: t("about.facility3.title"), desc: t("about.facility3.desc"), image: heroHome },
    { title: t("about.facility4.title"), desc: t("about.facility4.desc"), image: heroCalendar },
    { title: t("about.facility5.title"), desc: t("about.facility5.desc"), image: heroContact },
    { title: t("about.facility6.title"), desc: t("about.facility6.desc"), image: schoolHome },
  ];

  const team = [
    { name: t("about.team1.name"), role: t("about.team1.role"), expertise: t("about.team1.expertise") },
    { name: t("about.team2.name"), role: t("about.team2.role"), expertise: t("about.team2.expertise") },
    { name: t("about.team3.name"), role: t("about.team3.role"), expertise: t("about.team3.expertise") },
    { name: t("about.team4.name"), role: t("about.team4.role"), expertise: t("about.team4.expertise") },
    { name: t("about.team5.name"), role: t("about.team5.role"), expertise: t("about.team5.expertise") },
    { name: t("about.team6.name"), role: t("about.team6.role"), expertise: t("about.team6.expertise") },
  ];

  useEffect(() => {
    setFacilities(loadAboutFacilities());
    setContent(loadAboutContent());
  }, []);

  return (
    <>
    <PageHero
      title={t("about.heroTitle")}
      sanskrit={t("about.heroSanskrit")}
      subtitle={t("about.heroSubtitle")}
      image={heroAbout}
      size="full"
    />

    {/* Mission Vision Values */}
    <section className="container-narrow py-20 relative">
      <MandalaBg className="absolute left-0 top-10 w-80 h-80 opacity-10" />
      <div className="relative z-10">
      <SectionHeader
        eyebrow={t("about.mvv.eyebrow")}
        title={t("about.mvv.title")}
        subtitle={t("about.mvv.subtitle")}
      />
      </div>
      <div className="grid gap-6 md:grid-cols-3 relative z-10">
        {[
          {
            icon: Heart,
            label: "01",
            title: t("about.mission.title"),
            desc: c("mission", "missionHi"),
            footer: t("about.mission.footer"),
          },
          {
            icon: Eye,
            label: "02",
            title: t("about.vision.title"),
            desc: c("vision", "visionHi"),
            footer: t("about.vision.footer"),
          },
          {
            icon: Star,
            label: "03",
            title: t("about.values.title"),
            desc: c("values", "valuesHi"),
            footer: t("about.values.footer"),
          },
        ].map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            className="group relative overflow-hidden rounded-3xl section-surface ornate-frame border border-gold/30 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm"
          >
            <div className="h-2 w-full bg-gradient-festive" />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_12%_12%,hsl(43_88%_55%/0.16),transparent_42%)]" />
            <div className="relative z-10 p-7 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-festive text-primary-foreground shadow-warm transition-transform duration-300 group-hover:scale-105">
                  <m.icon className="h-6 w-6" />
                </div>
                <div className="rounded-full border border-gold/30 bg-background/70 px-3 py-1 text-xs font-semibold tracking-[0.22em] text-primary">
                  {m.label}
                </div>
              </div>
              <h3 className="mt-5 font-display text-2xl md:text-[1.75rem] text-secondary">{m.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed text-[0.98rem] md:text-base">
                {m.desc}
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gold/20 bg-background/60 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-saffron shadow-gold" />
                <p className="text-sm md:text-[0.95rem] font-medium text-foreground/80">
                  {m.footer}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section className="bg-gradient-temple py-20">
      <div className="container-narrow">
        <SectionHeader eyebrow={t("about.timeline.eyebrow")} title={t("about.timeline.title")} subtitle={t("about.timeline.subtitle")} />
        <div className="relative mx-auto max-w-4xl pl-8 sm:pl-10">
          <div className="absolute left-3 top-3 bottom-3 w-px bg-gradient-to-b from-primary via-gold to-secondary" />
          {timeline.map((item, i) => (
            <motion.article
              key={item.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="relative mb-6 last:mb-0"
            >
              <div className="absolute -left-[1.95rem] top-7 h-4 w-4 rounded-full bg-gradient-saffron shadow-gold ring-4 ring-background" />
              <div className="rounded-2xl section-surface p-5 md:p-6 border border-gold/30 shadow-soft">
                <div className="inline-flex rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-primary">
                  YEAR {item.year}
                </div>
                <h4 className="font-display text-2xl md:text-3xl text-secondary mt-3 mb-2">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{item.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* Achievements */}
    <section className="container-narrow py-20 relative">
      <SectionHeader eyebrow={t("about.achievements.eyebrow")} title={t("about.achievements.title")} subtitle={t("about.achievements.subtitle")} />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 relative z-10">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group h-full overflow-hidden rounded-3xl border border-gold/20 bg-card/85 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm"
          >
            <div className="h-2 w-full bg-gradient-festive" />
            <div className="flex h-full flex-col p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-festive text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-105">
                  <achievement.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h4 className="mt-5 font-display text-xl md:text-[1.65rem] text-secondary leading-tight">
                {achievement.title}
              </h4>
              <p className="mt-3 text-sm md:text-[0.98rem] text-muted-foreground leading-relaxed">
                {achievement.desc}
              </p>
              <div className="mt-auto flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <span>Recognition</span>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <MandalaBg className="absolute right-0 bottom-0 w-96 h-96 opacity-5" />
    </section>

    {/* Facilities */}
    <section className="bg-gradient-temple py-20">
      <div className="container-narrow">
        <SectionHeader eyebrow={t("about.facilities.eyebrow")} title={t("about.facilities.title")} subtitle={t("about.facilities.subtitle")} />
        <div className="mb-7 overflow-hidden rounded-2xl border border-gold/30 bg-card/70 p-3 md:p-4 shadow-soft">
          <div className="facility-image-marquee-track">
            {[...translatedFacilities, ...translatedFacilities].map((facility, i) => (
              <div key={`${facility.title}-${i}`} className="facility-image-marquee-item">
                <img
                  src={facility.image}
                  alt={facility.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="facility-image-marquee-overlay" />
                <div className="facility-image-marquee-label">
                  <Book className="h-4 w-4 text-gold" />
                  <span>{facility.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translatedFacilities.map((facility, i) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="rounded-xl bg-card p-6 border border-gold/30 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm group"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-saffron text-white flex-shrink-0 group-hover:shadow-gold transition-shadow">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-lg md:text-xl text-secondary mb-1">{facility.title}</h4>
                  <p className="text-sm text-muted-foreground">{facility.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Principal */}
    <section className="py-20">
      <div className="container-narrow">
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-card shadow-temple">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-festive" />
          <div className="flex flex-col md:flex-row">
            {/* Left - portrait */}
            <div className="flex items-center justify-center p-8 md:p-10 md:w-64 shrink-0">
              <div className="relative w-48">
                <div className="rounded-2xl overflow-hidden border border-gold/30 shadow-lg bg-muted">
                  <img
                    src={content.principalPhoto || "/assets/principal-placeholder.jpg"}
                    alt={content.principalName}
                    className="w-full h-60 object-cover object-top"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-festive text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap shadow">
                    Principal
                  </span>
                </div>
              </div>
            </div>

            {/* Right - quote */}
            <div className="flex-1 flex items-center p-8 md:p-12 md:pl-2">
              <div className="w-full">
                <div className="text-primary/60 text-5xl font-serif leading-none mb-1">"</div>
                <p className="text-foreground/85 italic text-lg md:text-xl leading-relaxed">
                  {c("principalMessage", "principalMessageHi")}
                </p>
                <div className="mt-8 border-t border-gold/20 pt-5">
                  <div className="text-primary font-semibold text-base md:text-lg">{c("principalName", "principalNameHi")}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t("about.principal.role")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Leadership Team */}
    <section className="container-narrow py-20 relative">
      <SectionHeader eyebrow={t("about.team.eyebrow")} title={t("about.team.title")} subtitle={t("about.team.subtitle")} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            className="group rounded-2xl section-surface border border-gold/20 shadow-soft overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm"
          >
            <div className="h-32 bg-gradient-to-r from-primary/20 via-gold/20 to-secondary/20 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card/80 border border-gold/40 font-display text-2xl text-secondary shadow-soft transition-transform duration-300 group-hover:scale-110">
                {getInitials(member.name)}
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-display text-lg text-secondary mb-1">{member.name}</h4>
              <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.expertise}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <MandalaBg className="absolute left-0 bottom-10 w-80 h-80 opacity-5" />
    </section>
    </>
  );
};

export default About;

