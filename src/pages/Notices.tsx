import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { notices } from "@/data/schoolData";
import { FileText, Download, AlertTriangle, Building2, School } from "lucide-react";
import heroCalendar from "@/assets/hero-calendar.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

type Category = "All" | "School Notice" | "Government Notice" | "Urgent Notice";

const CATEGORY_CONFIG = {
  "School Notice":     { color: "bg-blue-100 text-blue-700 border-blue-200",   icon: School,        badge: "bg-blue-50 text-blue-700" },
  "Government Notice": { color: "bg-green-100 text-green-700 border-green-200", icon: Building2,     badge: "bg-green-50 text-green-700" },
  "Urgent Notice":     { color: "bg-red-100 text-red-700 border-red-200",       icon: AlertTriangle, badge: "bg-red-50 text-red-700" },
};

const filters: { value: Category; key: "notices.filterAll" | "notices.filterSchool" | "notices.filterGovt" | "notices.filterUrgent" }[] = [
  { value: "All",               key: "notices.filterAll" },
  { value: "School Notice",     key: "notices.filterSchool" },
  { value: "Government Notice", key: "notices.filterGovt" },
  { value: "Urgent Notice",     key: "notices.filterUrgent" },
];

const Notices = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<Category>("All");

  const filtered = filter === "All" ? notices : notices.filter(n => n.category === filter);

  return (
    <>
      <PageHero
        title={t("notices.heroTitle")}
        sanskrit="॥ सूचना ॥"
        subtitle={t("notices.heroSubtitle")}
        image={heroCalendar}
      />

      <section className="container-narrow py-16">
        <SectionHeader
          title={t("notices.sectionTitle")}
          subtitle={t("notices.sectionSub")}
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(({ value, key }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                filter === value
                  ? "bg-primary text-white border-primary"
                  : "border-gold/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((notice, i) => {
            const config = CATEGORY_CONFIG[notice.category];
            const Icon = config.icon;
            return (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.06 }}
                className="bg-card rounded-2xl border border-gold/20 p-5 md:p-6 flex items-start gap-4 hover:shadow-warm transition-all"
              >
                <div className={`p-3 rounded-xl border shrink-0 ${config.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badge}`}>
                      {notice.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{notice.date}</span>
                  </div>
                  <h3 className="font-display text-lg text-secondary">{language === "hi" && notice.titleHi ? notice.titleHi : notice.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{language === "hi" && notice.bodyHi ? notice.bodyHi : notice.body}</p>
                  {notice.attachment && (
                    <a
                      href={notice.attachment}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary hover:underline"
                    >
                      <Download className="h-3.5 w-3.5" /> {t("notices.download")}
                    </a>
                  )}
                </div>
                <FileText className="h-4 w-4 text-muted-foreground/40 shrink-0 hidden md:block mt-1" />
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">{t("notices.noNotices")}</div>
        )}
      </section>
    </>
  );
};

export default Notices;
