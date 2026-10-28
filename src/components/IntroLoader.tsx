import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;
const TOTAL = 3400; // ms

function markDone() {
  (window as unknown as { __sxIntroDone?: number }).__sxIntroDone = performance.now();
}

/** Plays on every page load: scattered dots → wireframe globe → logo → site. */
export function IntroLoader() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const [logo, setLogo] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      markDone();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // Fibonacci sphere points + nearest-neighbour edges
    const N = 90;
    const pts: { x: number; y: number; z: number; sx: number; sy: number; d: number }[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * Math.PI * (3 - Math.sqrt(5));
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r, sx: Math.random() * 2 - 1, sy: Math.random() * 2 - 1, d: Math.random() * 0.4 });
    }
    const edges: [number, number][] = [];
    pts.forEach((a, i) => {
      const near = pts
        .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
        .filter((o) => o.j > i)
        .sort((p, q) => p.d - q.d)
        .slice(0, 3);
      near.forEach((o) => edges.push([i, o.j]));
    });

    const start = performance.now();
    const sm = (a: number, b: number, t: number) => {
      const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
      return x * x * (3 - 2 * x);
    };
    let raf = 0;
    let logoShown = false;
    const frame = (now: number) => {
      const t = (now - start) / 1000;
      const W = c.width, H = c.height, cx = W / 2, cy = H / 2;
      const R = Math.min(W, H) * 0.28;
      ctx.clearRect(0, 0, W, H);

      const dotsIn = sm(0, 0.6, t);
      const form = sm(0.6, 1.5, t);
      const lines = sm(1.3, 2.1, t);
      const collapse = sm(2.4, 3.0, t);
      const rot = t * 0.6;
      const scale = R * (1 - collapse * 0.85);

      const proj = pts.map((p) => {
        const x = p.x * Math.cos(rot) + p.z * Math.sin(rot);
        const z = -p.x * Math.sin(rot) + p.z * Math.cos(rot);
        const y = p.y * Math.cos(0.35) - z * Math.sin(0.35);
        const zz = p.y * Math.sin(0.35) + z * Math.cos(0.35);
        const gx = cx + x * scale, gy = cy + y * scale;
        const scx = cx + p.sx * W * 0.45, scy = cy + p.sy * H * 0.42;
        const f = sm(p.d, 1, form);
        return { x: scx + (gx - scx) * f, y: scy + (gy - scy) * f, z: zz };
      });

      const fade = 1 - collapse;
      ctx.lineWidth = 1 * dpr;
      for (const [a, b] of edges) {
        const pa = proj[a]!, pb = proj[b]!;
        const depth = ((pa.z + pb.z) / 2 + 1) / 2;
        ctx.strokeStyle = `rgba(13,67,167,${(0.08 + depth * 0.32) * lines * fade})`;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pa.x + (pb.x - pa.x) * lines, pa.y + (pb.y - pa.y) * lines);
        ctx.stroke();
      }
      proj.forEach((p, i) => {
        const depth = (p.z + 1) / 2;
        const big = i % 9 === 0;
        ctx.fillStyle = big ? `rgba(255,170,1,${dotsIn * fade})` : `rgba(26,115,233,${(0.35 + depth * 0.6) * dotsIn * fade})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (big ? 3.2 : 1.6 + depth * 1.4) * dpr, 0, Math.PI * 2);
        ctx.fill();
      });

      setPct(Math.min(100, Math.round(sm(0, 2.9, t) * 100)));
      if (t > 2.6 && !logoShown) {
        logoShown = true;
        setLogo(true);
      }
      if (now - start < TOTAL) raf = requestAnimationFrame(frame);
      else {
        markDone();
        setShow(false);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => (document.documentElement.style.overflow = "")}>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] bg-background"
          exit={{ opacity: 0, y: "-4%" }}
          transition={{ duration: 0.7, ease }}
          aria-hidden
        >
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-56 sm:w-72"
              initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
              animate={logo ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, ease }}
            >
              <Logo />
            </motion.div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Connecting every stakeholder</span>
            <span className="text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
              {String(pct).padStart(3, "0")}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 h-[3px] bg-primary" style={{ width: `${pct}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
