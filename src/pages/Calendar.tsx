import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { calendarEvents } from "@/data/schoolData";
import { CalendarDays, MapPin } from "lucide-react";
import heroCalendar from "@/assets/calenderpage.png";
import { useLanguage } from "@/contexts/LanguageContext";

type Filter = "All" | "Exam" | "Result" | "Holiday" | "Meeting" | "Event" | "Leave";

const CATEGORY_COLORS: Record<string, string> = {
  Exam:    "bg-red-100 text-red-700 border-red-200",
  Result:  "bg-blue-100 text-blue-700 border-blue-200",
  Holiday: "bg-green-100 text-green-700 border-green-200",
  Meeting: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Event:   "bg-purple-100 text-purple-700 border-purple-200",
  Leave:   "bg-orange-100 text-orange-700 border-orange-200",
};

const filters: { value: Filter; key: "cal.filterAll" | "cal.filterExam" | "cal.filterResult" | "cal.filterHoliday" | "cal.filterMeeting" | "cal.filterEvent" | "cal.filterLeave" }[] = [
  { value: "All",     key: "cal.filterAll" },
  { value: "Exam",    key: "cal.filterExam" },
  { value: "Result",  key: "cal.filterResult" },
  { value: "Holiday", key: "cal.filterHoliday" },
  { value: "Meeting", key: "cal.filterMeeting" },
  { value: "Event",   key: "cal.filterEvent" },
  { value: "Leave",   key: "cal.filterLeave" },
];

const Calendar = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = filter === "All"
    ? calendarEvents
    : calendarEvents.filter(e => e.category === filter);

  const sorted = [...filtered].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero
        title={t("cal.heroTitle")}
        sanskrit="॥ काल एव परं बलम् ॥"
        subtitle={t("cal.heroSubtitle")}
        image={heroCalendar}
      />

      <section className="container-narrow py-16">
        <SectionHeader
          eyebrow="॥ उत्सवाः ॥"
          title={t("cal.sectionTitle")}
          subtitle={t("cal.sectionSub")}
        />

        {/* Filter pills */}
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

        {/* Events grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((event, i) => {
            const dateObj = new Date(event.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString("en-IN", { month: "short" });
            return (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: (i % 6) * 0.07 }}
                className="bg-card rounded-2xl border border-gold/20 overflow-hidden shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all duration-300 flex"
              >
                {/* Date block */}
                <div className="bg-yellow-400 text-red-700 text-center w-24 shrink-0 flex flex-col items-center justify-center py-4 px-2">
                  <div className="font-display text-4xl font-bold leading-none">{day}</div>
                  <div className="text-sm uppercase tracking-widest mt-1 font-semibold">{month}</div>
                </div>
                {/* Content */}
                <div className="p-4 flex-1 min-w-0">
                  <span className={`inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border font-medium ${CATEGORY_COLORS[event.category]}`}>
                    {event.category}
                  </span>
                  <h3 className="font-display text-base text-secondary mt-1.5 leading-snug">{event.title}</h3>
                  {event.endDate && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t("cal.until")} {new Date(event.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{event.description}</p>
                  {event.location && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {event.location}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">{t("cal.noEvents")}</div>
        )}
      </section>

      {/* CTA */}
      <section className="container-narrow pb-20">
        <div className="rounded-3xl bg-gradient-festive text-primary-foreground p-10 text-center shadow-temple">
          <CalendarDays className="h-10 w-10 mx-auto text-gold mb-4" />
          <h3 className="font-display text-3xl mb-2">{t("cal.cta.title")}</h3>
          <p className="opacity-90 max-w-xl mx-auto">{t("cal.cta.sub")}</p>
        </div>
      </section>
    </>
  );
};

export default Calendar;
