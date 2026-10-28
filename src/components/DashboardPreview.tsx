import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Bell, Check, ChevronRight, GraduationCap, LayoutDashboard, School, Users, FileCheck2, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWS = {
  State: { title: "Education at a glance", label: "State overview", stats: [["Institutions", "248", "Across 12 districts"], ["Student records", "84,620", "Connected to one registry"], ["Attendance", "94.2%", "Today’s reported attendance"]], rows: [["North District", "32", "11,240", "Updated"], ["Central District", "48", "16,850", "Updated"], ["East District", "27", "9,420", "In review"], ["South District", "41", "14,610", "Updated"]] },
  Institution: { title: "Your institution, connected", label: "Institution overview", stats: [["Students", "1,248", "Active academic records"], ["Employees", "86", "One shared staff registry"], ["Attendance", "96.4%", "Today’s reported attendance"]], rows: [["Grade 6", "4", "160", "Updated"], ["Grade 7", "4", "156", "Updated"], ["Grade 8", "5", "198", "In review"], ["Grade 9", "4", "164", "Updated"]] },
  Parent: { title: "A closer look at their progress", label: "Parent overview", stats: [["Attendance", "96%", "This academic term"], ["Assessments", "8", "Results available"], ["School notices", "3", "New updates this week"]], rows: [["Mathematics", "A", "86 / 100", "Updated"], ["Science", "A", "89 / 100", "Updated"], ["English", "B+", "78 / 100", "Updated"], ["Social Studies", "A", "84 / 100", "Updated"]] },
  Student: { title: "Your next chapter starts here", label: "Student overview", stats: [["Subjects", "6", "Your current timetable"], ["Attendance", "96%", "This academic term"], ["Scholarships", "2", "Applications to explore"]], rows: [["Mathematics", "09:00", "Room 12", "Updated"], ["Science", "10:00", "Lab 2", "Updated"], ["English", "11:30", "Room 12", "Updated"], ["Computer Science", "13:00", "Lab 1", "Updated"]] },
};
type View = keyof typeof VIEWS;
const ICONS = { State: BarChart3, Institution: School, Parent: Users, Student: GraduationCap };

export function DashboardPreview({ initialView = "State" }: { initialView?: View }) {
  const [view, setView] = useState<View>(initialView);
  const data = VIEWS[view];
  return <div className="mx-auto w-full max-w-6xl">
    <div className="relative z-10 mx-auto -mb-px flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-t-2xl border border-b-0 bg-card/90 px-2 pt-2 backdrop-blur-md sm:gap-2" role="tablist" aria-label="Platform preview">
      {(Object.keys(VIEWS) as View[]).map(key => {
        const Icon = ICONS[key];
        const active = view === key;
        return <Button key={key} role="tab" aria-selected={active} variant="ghost" onClick={() => setView(key)} className={`relative h-11 rounded-b-none rounded-t-xl px-5 hover:bg-transparent ${active ? "text-foreground" : "text-muted-foreground"}`}>
          {active && <motion.span layoutId="preview-tab-pill" transition={{ duration: 0.5, ease: EASE }} className="absolute inset-0 rounded-t-xl border border-b-0 bg-background shadow-sm" aria-hidden="true" />}
          <span className="relative z-10 flex items-center gap-2"><Icon className="h-4 w-4" />{key}</span>
        </Button>;
      })}
    </div>
    <div className="dashboard-shell grid overflow-hidden rounded-2xl border bg-card/80 text-left md:grid-cols-[170px_1fr]">
      <aside className="hidden flex-col border-r bg-background/70 px-4 py-6 md:flex">
        <Logo className="mb-8 w-28" />
        {[LayoutDashboard, School, Users, GraduationCap, FileCheck2, BarChart3].map((Icon, i) => <div key={i} className={`mb-1 flex items-center gap-2 rounded-md px-2 py-3 text-xs ${i === 0 ? "bg-accent font-semibold text-primary" : "text-muted-foreground"}`}><Icon className="h-4 w-4" />{["Overview", "Institutions", "Employees", "Students", "Compliance", "Reports"][i]}</div>)}
        <div className="mt-auto flex items-center gap-2 pt-8 text-xs text-muted-foreground"><CircleHelp className="h-4 w-4" />Help & support</div>
      </aside>
      <div className="min-w-0 p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={view} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: EASE }}>
            <div className="mb-6 flex items-center justify-between gap-3"><div><p className="text-xs text-muted-foreground">{data.label}</p><h3 className="mt-1 text-lg font-bold sm:text-xl">{data.title}</h3></div><Bell className="h-5 w-5 shrink-0 text-muted-foreground" /></div>
            <div className="grid grid-cols-3 gap-2.5 border-y py-5 sm:gap-3">
              {data.stats.map(([label, value, note], i) => <motion.div key={label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.08, duration: 0.45, ease: EASE }} className="stat-card min-w-0 rounded-lg border px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4"><p className="text-[11px] text-muted-foreground sm:text-xs">{label}</p><p className="my-2 text-xl font-semibold sm:text-3xl lg:text-4xl">{value}</p><p className="hidden text-[11px] text-muted-foreground sm:block">{note}</p></motion.div>)}
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_180px]">
              <div className="min-w-0"><div className="mb-4 flex justify-between"><h4 className="text-sm font-bold">{view === "State" ? "District activity" : view === "Institution" ? "Class records" : view === "Parent" ? "Academic progress" : "Today’s timetable"}</h4><span className="flex items-center text-xs text-primary">Overview<ChevronRight className="h-3 w-3" /></span></div>
                <table className="w-full text-xs"><thead className="text-left text-[10px] uppercase text-muted-foreground"><tr><th className="pb-3 font-medium">{view === "State" ? "District" : view === "Institution" ? "Class" : "Subject"}</th><th className="pb-3 font-medium">{view === "Parent" ? "Grade" : view === "Student" ? "Time" : "Units"}</th><th className="pb-3 font-medium">{view === "Student" ? "Location" : "Records"}</th><th className="hidden pb-3 font-medium sm:table-cell">Status</th></tr></thead><tbody>{data.rows.map((row, i) => <motion.tr key={row[0]} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05, duration: 0.35, ease: EASE }} className="border-t transition-colors hover:bg-accent/40"><td className="py-3 font-medium">{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td className="hidden sm:table-cell"><span className={`inline-flex items-center gap-1 ${row[3] === "Updated" ? "text-success" : "text-muted-foreground"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{row[3]}</span></td></motion.tr>)}</tbody></table>
              </div>
              <div className="hidden border-l pl-5 lg:block"><h4 className="mb-5 text-sm font-bold">Record readiness</h4>{[["Verified", "87%"], ["In review", "10%"], ["Pending", "3%"]].map(([label, value], i) => <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.07, duration: 0.4, ease: EASE }} className="mb-5"><div className="mb-2 flex justify-between text-xs text-muted-foreground"><span>{label}</span><span>{value}</span></div><div className="h-1.5 rounded-full bg-muted"><div className={`h-full rounded-full ${label === "Verified" ? "w-[87%] bg-blue" : label === "In review" ? "w-[30%] bg-success" : "w-[12%] bg-muted-foreground"}`} /></div></motion.div>)}<p className="mt-6 flex items-center gap-1 text-[10px] text-success"><Check className="h-3 w-3" />Connected records</p></div>
            </div>
            <p className="mt-4 border-t pt-3 text-[10px] text-muted-foreground">Illustrative platform preview · Sample data</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </div>;
}
