import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil, Trash2, X, Plus, Save, Search,
  CalendarDays, MapPin, ArrowRight, Clock,
} from "lucide-react";

// ─── config ────────────────────────────────────────────────────────────────────
const CATEGORIES = ["Exam", "Result", "Holiday", "Meeting", "Event", "Leave"] as const;
type Category = typeof CATEGORIES[number];

const CAT_CFG: Record<Category, { gradient: string; light: string; text: string; border: string; dot: string }> = {
  Exam:    { gradient: "from-red-500 to-rose-500",       light: "bg-red-50",     text: "text-red-700",     border: "border-red-200",    dot: "bg-red-500" },
  Result:  { gradient: "from-blue-500 to-indigo-500",    light: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",   dot: "bg-blue-500" },
  Holiday: { gradient: "from-emerald-500 to-teal-500",   light: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200",dot: "bg-emerald-500" },
  Meeting: { gradient: "from-amber-400 to-yellow-500",   light: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",  dot: "bg-amber-500" },
  Event:   { gradient: "from-violet-500 to-purple-500",  light: "bg-violet-50",  text: "text-violet-700",  border: "border-violet-200", dot: "bg-violet-500" },
  Leave:   { gradient: "from-orange-500 to-amber-500",   light: "bg-orange-50",  text: "text-orange-700",  border: "border-orange-200", dot: "bg-orange-500" },
};

interface CalEvent {
  id: number; title: string; date: string; endDate?: string;
  category: Category; description: string; location?: string;
}

const seed: CalEvent[] = [
  { id: 1, title: "Term 2 Exams Begin",      date: "2026-02-10", endDate: "2026-02-20", category: "Exam",    description: "Term 2 examinations for all classes.",        location: "School Campus" },
  { id: 2, title: "Term 1 Results",          date: "2026-01-20", category: "Result",   description: "Term 1 results distributed to students.",          location: "Classrooms" },
  { id: 3, title: "Republic Day",            date: "2026-01-26", category: "Holiday",  description: "National holiday — flag hoisting & cultural show." },
  { id: 4, title: "Parent-Teacher Meeting",  date: "2026-02-05", category: "Meeting",  description: "PTM for Classes VI–X.",                             location: "School Hall" },
  { id: 5, title: "Annual Sports Day",       date: "2026-02-15", category: "Event",    description: "Yoga showcase, kabaddi finals and athletics.",      location: "School Ground" },
  { id: 6, title: "Summer Vacation",         date: "2026-04-25", endDate: "2026-06-10",category: "Leave",   description: "Summer vacation for all students." },
];

const emptyForm = { title: "", date: "", endDate: "", category: "Event" as Category, description: "", location: "" };

// ─── helpers ───────────────────────────────────────────────────────────────────
const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const MonthDay = ({ date }: { date: string }) => {
  const d = new Date(date);
  return (
    <div className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 border border-gold/25 text-center">
      <span className="font-display text-xl font-bold text-primary leading-none">{d.getDate()}</span>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
        {d.toLocaleString("en-IN", { month: "short" })}
      </span>
    </div>
  );
};

// ─── component ─────────────────────────────────────────────────────────────────
const AdminCalendarEvents = () => {
  const [items, setItems]         = useState<CalEvent[]>(seed);
  const [modal, setModal]         = useState<"add" | "edit" | null>(null);
  const [editing, setEditing]     = useState<CalEvent | null>(null);
  const [form, setForm]           = useState(emptyForm);
  const [filter, setFilter]       = useState<"All" | Category>("All");
  const [search, setSearch]       = useState("");
  const [deleteId, setDeleteId]   = useState<number | null>(null);

  const openAdd  = () => { setEditing(null); setForm(emptyForm); setModal("add"); };
  const openEdit = (e: CalEvent) => {
    setEditing(e);
    setForm({ title: e.title, date: e.date, endDate: e.endDate ?? "", category: e.category, description: e.description, location: e.location ?? "" });
    setModal("edit");
  };
  const closeModal = () => { setModal(null); setEditing(null); };

  const handleSave = () => {
    if (!form.title.trim() || !form.date) return;
    if (editing) setItems(prev => prev.map(i => i.id === editing.id ? { ...editing, ...form } : i));
    else         setItems(prev => [{ id: Date.now(), ...form }, ...prev]);
    closeModal();
  };

  const visible = items
    .filter(e => (filter === "All" || e.category === filter) &&
      (!search || e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <AdminPageShell
      title="Calendar Events"
      subtitle={`${items.length} events · Manage exams, holidays, meetings & more`}
    >
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events…"
            className="pl-9 border-gold/25 focus:border-primary/50"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(["All", ...CATEGORIES] as const).map(c => {
            const cfg = c !== "All" ? CAT_CFG[c] : null;
            return (
              <button
                key={c}
                onClick={() => setFilter(c as "All" | Category)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  filter === c
                    ? "bg-primary text-white border-primary"
                    : "border-gold/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cfg && <span className={`inline-block h-1.5 w-1.5 rounded-full ${cfg.dot} mr-1.5`} />}
                {c}
              </button>
            );
          })}
        </div>
        <Button onClick={openAdd} variant="hero" size="sm" className="gap-1.5 shrink-0">
          <Plus className="h-4 w-4" /> Add Event
        </Button>
      </div>

      {/* ── Modal (Add / Edit) ── */}
      <AnimatePresence>
        {modal !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              className="bg-card rounded-2xl border border-gold/20 shadow-temple w-full max-w-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/8 to-transparent">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-saffron text-white shadow-gold">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <span className="font-display font-semibold text-secondary text-sm">
                    {modal === "edit" ? "Edit Event" : "New Event"}
                  </span>
                </div>
                <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="h-4 w-4" /></button>
              </div>

              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Event Title *</Label>
                    <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Annual Sports Day" className="border-gold/25 focus:border-primary/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Start Date *</Label>
                    <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="border-gold/25 focus:border-primary/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">End Date (optional)</Label>
                    <Input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="border-gold/25 focus:border-primary/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</Label>
                    <select className="w-full h-10 border border-gold/25 rounded-lg px-3 text-sm bg-background focus:border-primary/50 focus:outline-none"
                      value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Category })}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Location (optional)</Label>
                    <Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. School Hall" className="border-gold/25 focus:border-primary/50" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</Label>
                    <Textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="resize-none border-gold/25 focus:border-primary/50" />
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button onClick={handleSave} variant="hero" size="sm" className="gap-1.5">
                    <Save className="h-3.5 w-3.5" /> {modal === "edit" ? "Update" : "Save Event"}
                  </Button>
                  <Button onClick={closeModal} variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Event cards ── */}
      <div className="space-y-3">
        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <CalendarDays className="h-10 w-10 opacity-25" />
            <p className="text-sm">No events found.</p>
            <Button onClick={openAdd} variant="hero" size="sm" className="gap-1.5 mt-1">
              <Plus className="h-4 w-4" /> Add First Event
            </Button>
          </div>
        )}

        <AnimatePresence initial={false}>
          {visible.map((ev, i) => {
            const cfg = CAT_CFG[ev.category];
            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                className="group bg-card rounded-2xl border border-gold/20 hover:border-gold/40 hover:shadow-warm transition-all duration-200 overflow-hidden"
              >
                {/* gradient top bar */}
                <div className={`h-0.5 w-full bg-gradient-to-r ${cfg.gradient}`} />

                <div className="flex items-start gap-4 p-4 sm:p-5">
                  {/* date block */}
                  <MonthDay date={ev.date} />

                  {/* content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${cfg.light} ${cfg.text} ${cfg.border}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        {ev.category}
                      </span>
                      {ev.endDate && (
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <ArrowRight className="h-3 w-3" />
                          {fmtDate(ev.endDate)}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-semibold text-secondary text-sm sm:text-base leading-snug">{ev.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">{ev.description}</p>

                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" /> {fmtDate(ev.date)}
                      </span>
                      {ev.location && (
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {ev.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* actions — always visible */}
                  <div className="flex flex-col sm:flex-row items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEdit(ev)}
                      className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(ev.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Delete confirm ── */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="bg-card rounded-2xl border border-gold/20 p-6 w-full max-w-sm shadow-warm text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-display font-semibold text-secondary mb-1">Delete Event?</h3>
              <p className="text-sm text-muted-foreground mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button
                  onClick={() => { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); }}
                  size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >Delete</Button>
                <Button onClick={() => setDeleteId(null)} variant="outline" size="sm" className="flex-1">Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminPageShell>
  );
};

export default AdminCalendarEvents;
