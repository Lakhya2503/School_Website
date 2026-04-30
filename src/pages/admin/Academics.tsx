import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import {
  Pencil, Trash2, X, Plus, BookOpen, FlaskConical,
  GraduationCap, Save, CheckCircle2, Layers, ChevronRight, Check,
} from "lucide-react";

interface Department { id: number; name: string; description: string; }

type SectionKey = "overview" | "curriculum" | "departments" | null;

const DEPT_COLORS = [
  "from-amber-500 to-orange-500",
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
  "from-rose-500 to-pink-500",
  "from-gold to-amber-400",
];

const AdminAcademics = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>(null);
  const [savedSection, setSavedSection] = useState<SectionKey>(null);

  // overview stats (editable)
  const [stats, setStats] = useState({
    classes: "I – XII",
    labs: "6+",
    curriculum: "CBSE",
  });

  // curriculum & methodology
  const [curriculumText, setCurriculumText] = useState(
    "CBSE affiliated curriculum from Class I to XII, integrating modern STEM education with Indian cultural values."
  );
  const [methodology, setMethodology] = useState(
    "Activity-based learning, project work, Socratic discussions, and value-based education."
  );

  // departments
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Science & Technology", description: "Physics, Chemistry, Biology, Computer Science with fully equipped labs." },
    { id: 2, name: "Humanities & Arts",    description: "History, Geography, Political Science, Fine Arts, and Sanskrit." },
    { id: 3, name: "Commerce",             description: "Accountancy, Business Studies, Economics, and Entrepreneurship." },
  ]);
  const [deptForm, setDeptForm] = useState({ name: "", description: "" });
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [showDeptForm, setShowDeptForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const saveSection = (key: SectionKey) => {
    setSavedSection(key);
    setActiveSection(null);
    setTimeout(() => setSavedSection(null), 2000);
  };

  const openAddDept = () => { setEditingDept(null); setDeptForm({ name: "", description: "" }); setShowDeptForm(true); };
  const openEditDept = (d: Department) => { setEditingDept(d); setDeptForm({ name: d.name, description: d.description }); setShowDeptForm(true); };
  const handleSaveDept = () => {
    if (!deptForm.name.trim()) return;
    if (editingDept) setDepartments(prev => prev.map(d => d.id === editingDept.id ? { ...editingDept, ...deptForm } : d));
    else setDepartments(prev => [...prev, { id: Date.now(), ...deptForm }]);
    setShowDeptForm(false);
  };

  // ── reusable section card ─────────────────────────────────────────────────
  const SectionCard = ({
    id, icon: Icon, iconColor, title, summary, children,
  }: {
    id: SectionKey; icon: React.ElementType; iconColor: string;
    title: string; summary: string; children: React.ReactNode;
  }) => {
    const isOpen = activeSection === id;
    const wasSaved = savedSection === id;
    return (
      <div className={`rounded-xl border transition-all duration-200 overflow-hidden bg-card ${isOpen ? "border-primary/40 shadow-warm" : "border-gold/20"}`}>
        <button
          type="button"
          onClick={() => setActiveSection(isOpen ? null : id)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isOpen ? "bg-primary text-white" : iconColor}`}>
              {wasSaved ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
            </div>
            <div>
              <p className="font-semibold text-secondary text-sm">{title}</p>
              {!isOpen && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{summary}</p>}
            </div>
          </div>
          <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
        </button>

        {isOpen && (
          <div className="px-5 pb-5 pt-1 border-t border-gold/15 space-y-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <AdminPageShell title="Academics" subtitle="Click any section to edit it">
      <div className="space-y-3">

        {/* ── Overview / Stats ── */}
        <SectionCard
          id="overview"
          icon={GraduationCap}
          iconColor="bg-primary/10 text-primary"
          title="Academic Overview"
          summary={`Classes ${stats.classes} · ${stats.labs} Labs · ${stats.curriculum}`}
        >
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { key: "classes",    label: "Classes Range",  icon: GraduationCap },
              { key: "labs",       label: "Number of Labs", icon: FlaskConical },
              { key: "curriculum", label: "Board / Curriculum", icon: Layers },
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" /> {label}
                </Label>
                <Input
                  value={stats[key as keyof typeof stats]}
                  onChange={e => setStats({ ...stats, [key]: e.target.value })}
                  className="border-gold/25 focus:border-primary/50"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-1">
            <Button onClick={() => saveSection("overview")} variant="hero" size="sm" className="gap-1.5">
              <Save className="h-3.5 w-3.5" /> Save
            </Button>
            <Button onClick={() => setActiveSection(null)} variant="outline" size="sm">
              <X className="h-3.5 w-3.5 mr-1" /> Cancel
            </Button>
          </div>
        </SectionCard>

        {/* ── Curriculum & Methodology ── */}
        <SectionCard
          id="curriculum"
          icon={BookOpen}
          iconColor="bg-blue-100 text-blue-600"
          title="Curriculum & Teaching Methodology"
          summary={curriculumText}
        >
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Curriculum Overview</Label>
            <Textarea
              rows={4}
              value={curriculumText}
              onChange={e => setCurriculumText(e.target.value)}
              className="resize-none border-gold/25 focus:border-primary/50"
              placeholder="Describe the curriculum..."
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Teaching Methodology</Label>
            <Textarea
              rows={4}
              value={methodology}
              onChange={e => setMethodology(e.target.value)}
              className="resize-none border-gold/25 focus:border-primary/50"
              placeholder="Describe the teaching approach..."
            />
          </div>
          <div className="flex gap-3 pt-1">
            <Button onClick={() => saveSection("curriculum")} variant="hero" size="sm" className="gap-1.5">
              <Save className="h-3.5 w-3.5" /> Save
            </Button>
            <Button onClick={() => setActiveSection(null)} variant="outline" size="sm">
              <X className="h-3.5 w-3.5 mr-1" /> Cancel
            </Button>
          </div>
        </SectionCard>

        {/* ── Departments ── */}
        <SectionCard
          id="departments"
          icon={Layers}
          iconColor="bg-violet-100 text-violet-600"
          title="Departments"
          summary={`${departments.length} department${departments.length !== 1 ? "s" : ""} — ${departments.map(d => d.name).join(", ")}`}
        >
          {/* Add / Edit inline form */}
          <AnimatePresence>
            {showDeptForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-4 space-y-3 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {editingDept ? "Edit Department" : "New Department"}
                    </span>
                    <button onClick={() => setShowDeptForm(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Department Name</Label>
                      <Input value={deptForm.name} onChange={e => setDeptForm({ ...deptForm, name: e.target.value })} placeholder="e.g. Science & Technology" className="border-gold/25" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Description</Label>
                      <Input value={deptForm.description} onChange={e => setDeptForm({ ...deptForm, description: e.target.value })} placeholder="Subjects covered..." className="border-gold/25" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveDept} variant="hero" size="sm" className="gap-1.5">
                      <Save className="h-3.5 w-3.5" /> {editingDept ? "Update" : "Add"}
                    </Button>
                    <Button onClick={() => setShowDeptForm(false)} variant="outline" size="sm">Cancel</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Department list */}
          <div className="divide-y divide-gold/10 rounded-lg border border-gold/20 overflow-hidden">
            {departments.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No departments yet.</p>
            )}
            {departments.map((d, i) => (
              <div key={d.id} className="group flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
                <div className={`shrink-0 h-8 w-8 rounded-lg bg-gradient-to-br ${DEPT_COLORS[i % DEPT_COLORS.length]} flex items-center justify-center text-white shadow-sm`}>
                  <BookOpen className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-secondary text-sm">{d.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{d.description}</div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button onClick={() => openEditDept(d)} className="p-1.5 rounded hover:bg-primary/10 text-muted-foreground hover:text-primary">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setDeleteId(d.id)} className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-500">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={openAddDept} variant="hero" size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Add Department
            </Button>
            <Button onClick={() => saveSection("departments")} variant="outline" size="sm" className="gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" /> Done
            </Button>
          </div>
        </SectionCard>

      </div>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="bg-card rounded-2xl border border-gold/20 p-6 w-full max-w-sm shadow-warm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-display text-center text-secondary font-semibold mb-1">Delete Department?</h3>
              <p className="text-sm text-muted-foreground text-center mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button onClick={() => { setDepartments(prev => prev.filter(d => d.id !== deleteId)); setDeleteId(null); }} size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                <Button onClick={() => setDeleteId(null)} variant="outline" size="sm" className="flex-1">Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminPageShell>
  );
};

export default AdminAcademics;
