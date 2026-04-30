import { useState, useRef, ChangeEvent } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil, Trash2, X, FileText, Save, Plus,
  Download, School, Building2, AlertTriangle,
  Search, Calendar, Paperclip, Upload, ExternalLink,
  Languages, Loader2,
} from "lucide-react";
import { translateFields } from "@/lib/translate";

// ─── types & config ────────────────────────────────────────────────────────────
type NoticeCategory = "School Notice" | "Government Notice" | "Urgent Notice";

interface Notice {
  id: number; title: string; body: string;
  titleHi?: string; bodyHi?: string;
  category: NoticeCategory; date: string;
  attachment?: string; attachmentName?: string;
}

const CAT_CFG: Record<NoticeCategory, { bg: string; text: string; border: string; dot: string; icon: React.ElementType }> = {
  "School Notice":     { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   dot: "bg-blue-500",   icon: School },
  "Government Notice": { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500",  icon: Building2 },
  "Urgent Notice":     { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    dot: "bg-red-500",    icon: AlertTriangle },
};

const CATS: NoticeCategory[] = ["School Notice", "Government Notice", "Urgent Notice"];

const seed: Notice[] = [
  { id: 1, title: "Exam Schedule – Term 2",      body: "Term 2 examinations will commence from 10th February 2026. All students must carry their hall tickets.", category: "School Notice",     date: "2026-01-12" },
  { id: 2, title: "Government Circular – RTE",   body: "All schools must comply with RTE norms for the academic year 2025–26 as per the government directive.",  category: "Government Notice", date: "2026-01-09" },
  { id: 3, title: "Emergency Holiday – 15 Jan",  body: "School will remain closed on 15th January 2026 due to local civic body elections.",                       category: "Urgent Notice",     date: "2026-01-08" },
  { id: 4, title: "Annual Sports Day Notice",    body: "All students participating in Sports Day events must submit their consent forms by 5th February.",        category: "School Notice",     date: "2026-01-06" },
];

const emptyForm = { title: "", body: "", titleHi: "", bodyHi: "", category: "School Notice" as NoticeCategory, date: "", attachment: "", attachmentName: "" };

// ─── component ─────────────────────────────────────────────────────────────────
const AdminNotices = () => {
  const [items, setItems]       = useState<Notice[]>(seed);
  const [modal, setModal]       = useState<"add" | "edit" | null>(null);
  const [editing, setEditing]   = useState<Notice | null>(null);
  const [form, setForm]         = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch]     = useState("");
  const [filterCat, setFilterCat] = useState<"All" | NoticeCategory>("All");
  const [translating, setTranslating] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal("add"); };
  const openEdit = (n: Notice) => {
    setEditing(n);
    setForm({ title: n.title, body: n.body, titleHi: n.titleHi ?? "", bodyHi: n.bodyHi ?? "", category: n.category, date: n.date, attachment: n.attachment ?? "", attachmentName: n.attachmentName ?? "" });
    setModal("edit");
  };
  const closeModal = () => { setModal(null); setEditing(null); };

  const handleTranslate = async () => {
    setTranslating(true);
    const result = await translateFields({ title: form.title, body: form.body });
    setForm(f => ({ ...f, titleHi: result.title, bodyHi: result.body }));
    setTranslating(false);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm(f => ({ ...f, attachment: URL.createObjectURL(file), attachmentName: file.name }));
    e.target.value = "";
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    const entry = { title: form.title, body: form.body, titleHi: form.titleHi || undefined, bodyHi: form.bodyHi || undefined, category: form.category, date: form.date, attachment: form.attachment || undefined, attachmentName: form.attachmentName || undefined };
    if (editing) setItems(prev => prev.map(i => i.id === editing.id ? { ...editing, ...entry } : i));
    else         setItems(prev => [{ id: Date.now(), ...entry }, ...prev]);
    closeModal();
  };

  const visible = items.filter(n => {
    const matchCat    = filterCat === "All" || n.category === filterCat;
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <AdminPageShell title="Notices" subtitle={`${items.length} notices · Publish school, government and urgent notices`}>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notices…" className="pl-9 border-gold/25 focus:border-primary/50" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(["All", ...CATS] as const).map(c => (
            <button key={c} onClick={() => setFilterCat(c as "All" | NoticeCategory)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filterCat === c ? "bg-primary text-white border-primary" : "border-gold/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >{c}</button>
          ))}
        </div>
        <Button onClick={openAdd} variant="hero" size="sm" className="gap-1.5 shrink-0">
          <Plus className="h-4 w-4" /> Publish Notice
        </Button>
      </div>

      {/* ── Notice cards ── */}
      <div className="space-y-3">
        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <FileText className="h-10 w-10 opacity-25" />
            <p className="text-sm">No notices found.</p>
            <Button onClick={openAdd} variant="hero" size="sm" className="gap-1.5 mt-1"><Plus className="h-4 w-4" /> Publish First Notice</Button>
          </div>
        )}

        <AnimatePresence initial={false}>
          {visible.map((n, i) => {
            const cfg = CAT_CFG[n.category];
            const CatIcon = cfg.icon;
            return (
              <motion.div key={n.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                className="bg-card rounded-2xl border border-gold/20 hover:border-gold/40 hover:shadow-warm transition-all duration-200 overflow-hidden"
              >
                {/* category accent line */}
                <div className={`h-0.5 w-full ${cfg.dot}`} />

                <div className="flex items-start gap-4 p-4 sm:p-5">
                  {/* icon */}
                  <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-xl border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                    <CatIcon className="h-4 w-4" />
                  </div>

                  {/* content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        {n.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {n.date}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-secondary text-sm sm:text-base leading-snug">{n.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">{n.body}</p>
                    {n.attachment && (
                      <a href={n.attachment} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-primary hover:underline"
                        onClick={e => e.stopPropagation()}
                      >
                        <Paperclip className="h-3.5 w-3.5" />
                        {n.attachmentName || "View Attachment"}
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    )}
                  </div>

                  {/* actions — always visible */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => openEdit(n)} className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => setDeleteId(n.id)} className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Add / Edit modal ── */}
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
              {/* header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/8 to-transparent">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-saffron text-white shadow-gold">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="font-display font-semibold text-secondary text-sm">
                    {modal === "edit" ? "Edit Notice" : "Publish New Notice"}
                  </span>
                </div>
                <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="h-4 w-4" /></button>
              </div>

              {/* body */}
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                {/* title */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Title *</Label>
                  <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Notice title" className="border-gold/25 focus:border-primary/50" />
                </div>

                {/* category pills */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</Label>
                  <div className="flex flex-wrap gap-2">
                    {CATS.map(c => {
                      const cfg = CAT_CFG[c];
                      return (
                        <button key={c} type="button" onClick={() => setForm({ ...form, category: c })}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            form.category === c ? "bg-primary text-white border-primary" : `${cfg.bg} ${cfg.text} ${cfg.border} hover:opacity-80`
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* content */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Content</Label>
                  <Textarea rows={4} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} placeholder="Notice details…" className="resize-none border-gold/25 focus:border-primary/50" />
                </div>

                {/* Hindi translation — shown after translate */}
                {(form.titleHi || form.bodyHi) && (
                  <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-violet-700 uppercase tracking-wide">
                      <Languages className="h-3.5 w-3.5" /> Hindi Translation (editable)
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-violet-600">Title (हिंदी)</Label>
                      <input value={form.titleHi} onChange={e => setForm(f => ({ ...f, titleHi: e.target.value }))}
                        className="w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-sanskrit focus:outline-none focus:border-violet-400" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-violet-600">Content (हिंदी)</Label>
                      <textarea rows={3} value={form.bodyHi} onChange={e => setForm(f => ({ ...f, bodyHi: e.target.value }))}
                        className="w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-sanskrit resize-none focus:outline-none focus:border-violet-400" />
                    </div>
                  </div>
                )}                {/* date */}
                <div className="space-y-1.5 max-w-xs">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</Label>
                  <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="border-gold/25 focus:border-primary/50" />
                </div>

                {/* attachment */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Attachment (PDF link or file)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={form.attachment}
                      onChange={e => setForm({ ...form, attachment: e.target.value, attachmentName: form.attachmentName || e.target.value.split("/").pop() || "" })}
                      placeholder="https://… or upload below"
                      className="border-gold/25 focus:border-primary/50 flex-1"
                    />
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gold/25 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors shrink-0"
                    >
                      <Upload className="h-4 w-4" /> Upload
                    </button>
                    <input ref={fileRef} type="file" accept=".pdf,image/*" className="hidden" onChange={handleFile} />
                  </div>
                  {form.attachment && (
                    <div className="flex items-center gap-2 text-xs bg-primary/5 border border-primary/15 rounded-lg px-3 py-2">
                      <Paperclip className="h-3.5 w-3.5 text-primary shrink-0" />
                      <input
                        value={form.attachmentName}
                        onChange={e => setForm({ ...form, attachmentName: e.target.value })}
                        placeholder="Display name (e.g. Circular.pdf)"
                        className="flex-1 bg-transparent outline-none text-xs text-foreground placeholder:text-muted-foreground"
                      />
                      <button onClick={() => setForm({ ...form, attachment: "", attachmentName: "" })} className="text-muted-foreground hover:text-red-500">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-1">
                  <Button onClick={handleSave} variant="hero" size="sm" className="gap-1.5">
                    <Save className="h-3.5 w-3.5" /> {modal === "edit" ? "Update" : "Publish"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleTranslate}
                    disabled={translating || (!form.title && !form.body)}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-violet-300 text-violet-700 hover:bg-violet-50"
                  >
                    {translating
                      ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Translating…</>
                      : <><Languages className="h-3.5 w-3.5" /> Convert to Hindi</>
                    }
                  </Button>
                  <Button onClick={closeModal} variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Delete confirm ── */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="bg-card rounded-2xl border border-gold/20 p-6 w-full max-w-sm shadow-warm text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4"><Trash2 className="h-5 w-5 text-red-500" /></div>
              <h3 className="font-display font-semibold text-secondary mb-1">Delete Notice?</h3>
              <p className="text-sm text-muted-foreground mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button onClick={() => { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); }} size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                <Button onClick={() => setDeleteId(null)} variant="outline" size="sm" className="flex-1">Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminPageShell>
  );
};

export default AdminNotices;
