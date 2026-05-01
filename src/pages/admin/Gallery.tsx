import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Images, Upload, Trash2, Plus, X, Pencil,
  Search, Eye, ImageOff, Save, Link2,
} from "lucide-react";

// ─── assets (Vite static imports) ─────────────────────────────────────────────
import heroHome      from "@/assets/hero-home.jpg";
import heroAcademics from "@/assets/acdemics.png";
import heroAdmissions from "@/assets/admission.png";
import heroCalendar  from "@/assets/calenderpage.png";
import heroContact   from "@/assets/conatctus.png";
import heroAbout     from "@/assets/aboutus.png";
import schoolHome    from "@/assets/schoolhome.png";

// ─── types ─────────────────────────────────────────────────────────────────────
interface GalleryImage { id: number; src: string; label: string; category: string; }

const CATS = ["Campus", "Academics", "Admissions", "Events", "Community", "Sports"] as const;
type Cat = typeof CATS[number];

const CAT_COLOR: Record<Cat, string> = {
  Campus:     "bg-amber-100 text-amber-700 border-amber-200",
  Academics:  "bg-blue-100 text-blue-700 border-blue-200",
  Admissions: "bg-violet-100 text-violet-700 border-violet-200",
  Events:     "bg-purple-100 text-purple-700 border-purple-200",
  Community:  "bg-teal-100 text-teal-700 border-teal-200",
  Sports:     "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const seed: GalleryImage[] = [
  { id: 1, src: heroHome,       label: "Campus Life",        category: "Campus" },
  { id: 2, src: heroAcademics,  label: "Academics",          category: "Academics" },
  { id: 3, src: heroAdmissions, label: "Admissions",         category: "Admissions" },
  { id: 4, src: heroCalendar,   label: "Events & Festivals", category: "Events" },
  { id: 5, src: heroContact,    label: "Community",          category: "Community" },
  { id: 6, src: heroAbout,      label: "Sports & Fitness",   category: "Sports" },
  { id: 7, src: schoolHome,     label: "School Home",        category: "Campus" },
];

const emptyForm = { label: "", category: "Campus" as Cat, src: "", urlInput: "" };

// ─── component ─────────────────────────────────────────────────────────────────
const AdminGallery = () => {
  const [images, setImages]   = useState<GalleryImage[]>(seed);
  const [filter, setFilter]   = useState<"All" | Cat>("All");
  const [search, setSearch]   = useState("");
  const [preview, setPreview] = useState<GalleryImage | null>(null);
  const [modal, setModal]     = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<GalleryImage | null>(null);
  const [form, setForm]       = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── filtered list ──────────────────────────────────────────────────────────
  const visible = images.filter(img => {
    const matchCat    = filter === "All" || img.category === filter;
    const matchSearch = !search || img.label.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // ── handlers ──────────────────────────────────────────────────────────────
  const openAdd = () => { setEditTarget(null); setForm(emptyForm); setModal("add"); };
  const openEdit = (img: GalleryImage) => {
    setEditTarget(img);
    setForm({ label: img.label, category: img.category as Cat, src: img.src, urlInput: "" });
    setModal("edit");
  };
  const closeModal = () => { setModal(null); setEditTarget(null); };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm(f => ({ ...f, src: URL.createObjectURL(file), urlInput: "" }));
    e.target.value = "";
  };

  const handleUrlBlur = () => {
    if (form.urlInput.trim()) setForm(f => ({ ...f, src: f.urlInput.trim() }));
  };

  const handleSave = () => {
    const src = form.src || form.urlInput.trim();
    if (!src || !form.label.trim()) return;
    if (modal === "edit" && editTarget) {
      setImages(prev => prev.map(i => i.id === editTarget.id ? { ...i, src, label: form.label, category: form.category } : i));
    } else {
      setImages(prev => [...prev, { id: Date.now(), src, label: form.label, category: form.category }]);
    }
    closeModal();
  };

  const catColor = (cat: string) => CAT_COLOR[cat as Cat] ?? "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-5 max-w-7xl mx-auto">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">Gallery</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {images.length} images · {visible.length} shown
          </p>
        </div>
        <Button onClick={openAdd} variant="hero" size="sm" className="gap-1.5 w-fit">
          <Plus className="h-4 w-4" /> Add Image
        </Button>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search images…" className="pl-9 border-gold/25 focus:border-primary/50" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(["All", ...CATS] as const).map(c => (
            <button key={c} onClick={() => setFilter(c as "All" | Cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filter === c ? "bg-primary text-white border-primary" : "border-gold/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
          <ImageOff className="h-12 w-12 opacity-25" />
          <p className="text-sm">No images found.</p>
          <Button onClick={openAdd} variant="hero" size="sm" className="gap-1.5 mt-1"><Plus className="h-4 w-4" /> Add First Image</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <AnimatePresence initial={false}>
            {visible.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className="group relative rounded-2xl overflow-hidden border border-gold/20 shadow-soft aspect-[4/3] bg-muted"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={e => { (e.target as HTMLImageElement).src = ""; }}
                />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* label + category — slide up on hover */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-semibold font-display truncate leading-tight">{img.label}</p>
                  <span className="text-[10px] text-white/70">{img.category}</span>
                </div>

                {/* category badge — always visible top-left */}
                <div className="absolute top-2 left-2">
                  <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full border ${catColor(img.category)}`}>
                    {img.category}
                  </span>
                </div>

                {/* action buttons — top-right, visible on hover */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={e => { e.stopPropagation(); setPreview(img); }}
                    className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                    title="Preview"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); openEdit(img); }}
                    className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-primary/80 backdrop-blur-sm"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setDeleteId(img.id); }}
                    className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-red-500/80 backdrop-blur-sm"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* click whole card to preview */}
                <button className="absolute inset-0" onClick={() => setPreview(img)} aria-label={`Preview ${img.label}`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Add / Edit modal ── */}
      <AnimatePresence>
        {modal !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              className="bg-card rounded-2xl border border-gold/20 shadow-temple w-full max-w-md overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/8 to-transparent">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-saffron text-white shadow-gold">
                    <Images className="h-4 w-4" />
                  </div>
                  <span className="font-display font-semibold text-secondary text-sm">
                    {modal === "edit" ? "Edit Image" : "Add New Image"}
                  </span>
                </div>
                <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="h-4 w-4" /></button>
              </div>

              {/* body */}
              <div className="p-5 space-y-4">
                {/* upload / preview area */}
                <div
                  onClick={() => fileRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-colors ${
                    form.src ? "border-primary/30" : "border-gold/30 hover:border-primary/50"
                  }`}
                >
                  {form.src ? (
                    <div className="relative">
                      <img src={form.src} alt="preview" className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded-full">Change image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
                      <Upload className="h-8 w-8 opacity-40" />
                      <p className="text-sm font-medium">Click to upload</p>
                      <p className="text-xs opacity-60">PNG, JPG, WEBP supported</p>
                    </div>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </div>

                {/* URL input */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                    <Link2 className="h-3.5 w-3.5" /> Or paste image URL
                  </Label>
                  <Input
                    value={form.urlInput}
                    onChange={e => setForm(f => ({ ...f, urlInput: e.target.value }))}
                    onBlur={handleUrlBlur}
                    placeholder="https://example.com/photo.jpg"
                    className="border-gold/25 focus:border-primary/50 text-sm"
                  />
                </div>

                {/* label */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Label *</Label>
                  <Input
                    value={form.label}
                    onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                    placeholder="e.g. Annual Sports Day"
                    className="border-gold/25 focus:border-primary/50"
                  />
                </div>

                {/* category */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</Label>
                  <div className="flex flex-wrap gap-2">
                    {CATS.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, category: c }))}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          form.category === c ? "bg-primary text-white border-primary" : `${catColor(c)} hover:opacity-80`
                        }`}
                      >{c}</button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    onClick={handleSave}
                    disabled={(!form.src && !form.urlInput.trim()) || !form.label.trim()}
                    variant="hero" size="sm" className="gap-1.5"
                  >
                    <Save className="h-3.5 w-3.5" /> {modal === "edit" ? "Update" : "Add Image"}
                  </Button>
                  <Button onClick={closeModal} variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox preview ── */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl"
              onClick={e => e.stopPropagation()}
            >
              <img src={preview.src} alt={preview.label} className="w-full rounded-2xl shadow-temple max-h-[80vh] object-contain" />

              {/* info bar */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl flex items-end justify-between gap-3">
                <div>
                  <p className="text-white font-display font-semibold text-base">{preview.label}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border mt-1 inline-block ${catColor(preview.category)}`}>
                    {preview.category}
                  </span>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => { openEdit(preview); setPreview(null); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 text-white text-xs font-medium hover:bg-white/25 backdrop-blur-sm border border-white/20"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => { setDeleteId(preview.id); setPreview(null); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/70 text-white text-xs font-medium hover:bg-red-500/90 backdrop-blur-sm"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>

              <button onClick={() => setPreview(null)} className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70">
                <X className="h-5 w-5" />
              </button>
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
              <h3 className="font-display font-semibold text-secondary mb-1">Delete Image?</h3>
              <p className="text-sm text-muted-foreground mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button onClick={() => { setImages(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); }} size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                <Button onClick={() => setDeleteId(null)} variant="outline" size="sm" className="flex-1">Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGallery;
