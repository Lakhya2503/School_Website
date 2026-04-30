import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Megaphone, CalendarDays, MessageSquare, FileText,
  ClipboardList, Wallet, Users, TrendingUp, Images,
  ArrowUpRight, Activity, BookOpen, GraduationCap,
  Bell, CheckCircle2, Clock, Zap,
} from "lucide-react";

// ─── data ──────────────────────────────────────────────────────────────────────
const stats = [
  { label: "Announcements",  value: 12, trend: "+2",  icon: Megaphone,     to: "/admin/announcements", gradient: "from-amber-400 to-orange-500",   light: "bg-amber-50 text-amber-600" },
  { label: "Calendar Events",value: 28, trend: "+5",  icon: CalendarDays,  to: "/admin/calendar",      gradient: "from-blue-500 to-indigo-500",    light: "bg-blue-50 text-blue-600" },
  { label: "Inquiries",      value: 7,  trend: "New", icon: MessageSquare, to: "/admin/inquiries",     gradient: "from-violet-500 to-purple-500",  light: "bg-violet-50 text-violet-600" },
  { label: "Notices",        value: 5,  trend: "+1",  icon: FileText,      to: "/admin/notices",       gradient: "from-emerald-500 to-teal-500",   light: "bg-emerald-50 text-emerald-600" },
  { label: "Applications",   value: 34, trend: "+8",  icon: ClipboardList, to: "/admin/admissions",    gradient: "from-orange-500 to-red-400",     light: "bg-orange-50 text-orange-600" },
  { label: "Fee Records",    value: 9,  trend: "—",   icon: Wallet,        to: "/admin/fees",          gradient: "from-yellow-400 to-amber-500",   light: "bg-yellow-50 text-yellow-600" },
];

const activity = [
  { text: "New inquiry from Priya Sharma",   time: "2 min ago",  icon: MessageSquare, dot: "bg-violet-500", initials: "PS" },
  { text: "Admission application submitted", time: "15 min ago", icon: ClipboardList, dot: "bg-orange-500", initials: "AR" },
  { text: "Notice published: Exam Schedule", time: "1 hr ago",   icon: FileText,      dot: "bg-emerald-500",initials: "AD" },
  { text: "Calendar event added: PTM",       time: "3 hrs ago",  icon: CalendarDays,  dot: "bg-blue-500",   initials: "SK" },
  { text: "Announcement updated",            time: "Yesterday",  icon: Megaphone,     dot: "bg-amber-500",  initials: "RK" },
];

const quickActions = [
  { label: "New Announcement",  to: "/admin/announcements", icon: Megaphone,     gradient: "from-amber-400 to-orange-500" },
  { label: "Add Event",         to: "/admin/calendar",      icon: CalendarDays,  gradient: "from-blue-500 to-indigo-500" },
  { label: "Publish Notice",    to: "/admin/notices",       icon: FileText,      gradient: "from-emerald-500 to-teal-500" },
  { label: "View Inquiries",    to: "/admin/inquiries",     icon: MessageSquare, gradient: "from-violet-500 to-purple-500" },
  { label: "Update Fees",       to: "/admin/fees",          icon: Wallet,        gradient: "from-yellow-400 to-amber-500" },
  { label: "Applications",      to: "/admin/admissions",    icon: Users,         gradient: "from-orange-500 to-red-400" },
  { label: "Gallery",           to: "/admin/gallery",       icon: Images,        gradient: "from-pink-500 to-rose-500" },
  { label: "Academics",         to: "/admin/academics",     icon: BookOpen,      gradient: "from-teal-500 to-cyan-500" },
];

const highlights = [
  { icon: GraduationCap, label: "Students",     value: "2,400+", color: "text-primary" },
  { icon: Users,         label: "Faculty",      value: "180+",   color: "text-blue-600" },
  { icon: CheckCircle2,  label: "Pass Rate",    value: "98%",    color: "text-emerald-600" },
  { icon: Zap,           label: "Year",         value: "2025–26",color: "text-amber-600" },
];

// ─── helpers ───────────────────────────────────────────────────────────────────
const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

// ─── component ─────────────────────────────────────────────────────────────────
const AdminDashboard = () => (
  <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto">

    {/* ── Greeting banner ── */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#f97316] p-5 sm:p-6 text-white shadow-temple"
    >
      {/* faint mandala watermark */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/10 opacity-20" />
      <div className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full border border-white/10 opacity-20" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-white/70 text-sm font-medium">{today}</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold mt-0.5">
            {greeting()}, Admin 🙏
          </h1>
          <p className="text-white/80 text-sm mt-1">Here's what's happening at Vidyalaya today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-xl px-4 py-2.5 text-sm font-medium backdrop-blur-sm w-fit">
          <TrendingUp className="h-4 w-4" />
          Academic Year 2025–26
        </div>
      </div>

      {/* highlight strip */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {highlights.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5 border border-white/15">
            <Icon className="h-4 w-4 text-white/80 shrink-0" />
            <div>
              <div className="text-white font-display font-bold text-base leading-none">{value}</div>
              <div className="text-white/60 text-[10px] mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* ── Stats grid ── */}
    <div>
      <h2 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {stats.map(({ label, value, trend, icon: Icon, to, gradient, light }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <Link
              to={to}
              className="group relative flex flex-col bg-card rounded-2xl border border-gold/20 p-4 hover:shadow-warm hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${gradient}`} />
              <div className="flex items-start justify-between mb-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${light}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100">
                  {trend}
                </span>
              </div>
              <div className="font-display text-2xl font-bold text-secondary leading-none">{value}</div>
              <div className="text-[11px] text-muted-foreground mt-1 leading-tight">{label}</div>
              <ArrowUpRight className="absolute bottom-3 right-3 h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>

    {/* ── Bottom two columns ── */}
    <div className="grid lg:grid-cols-5 gap-5">

      {/* Recent Activity — 2 cols */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="lg:col-span-2 bg-card rounded-2xl border border-gold/20 overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gold/15">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-saffron text-white">
              <Activity className="h-3.5 w-3.5" />
            </div>
            <span className="font-display font-semibold text-secondary text-sm">Recent Activity</span>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-primary font-medium">
            <Bell className="h-3 w-3" /> Live
          </span>
        </div>
        <ul className="divide-y divide-gold/8 flex-1">
          {activity.map(({ text, time, dot, initials }, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors"
            >
              {/* avatar */}
              <div className={`shrink-0 h-7 w-7 rounded-full ${dot} flex items-center justify-center text-white text-[10px] font-bold mt-0.5`}>
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/80 leading-snug">{text}</p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                  <Clock className="h-3 w-3" /> {time}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Quick Actions — 3 cols */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="lg:col-span-3 bg-card rounded-2xl border border-gold/20 overflow-hidden"
      >
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gold/15">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
            <Zap className="h-3.5 w-3.5" />
          </div>
          <span className="font-display font-semibold text-secondary text-sm">Quick Actions</span>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5">
          {quickActions.map(({ label, to, icon: Icon, gradient }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.04 }}
            >
              <Link
                to={to}
                className="group flex flex-col items-center gap-2 p-3.5 rounded-xl border border-gold/15 bg-background/60 hover:bg-primary/5 hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-medium text-foreground/75 group-hover:text-primary transition-colors leading-tight">{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  </div>
);

export default AdminDashboard;
