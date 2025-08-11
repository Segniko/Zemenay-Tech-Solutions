"use client"

import { SiteHeader } from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import SmoothScroll from "@/components/smooth-scroll"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Handshake, Rocket, ShieldCheck, Sparkles, Layers, Cpu, Palette, Bolt } from "lucide-react"
import { motion, Variants, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from "framer-motion"
import { useRef, type MouseEvent, type ReactNode } from "react"
import WireframeGlobe from "@/components/hero/wireframe-globe"

// Framer Motion variants
const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
}

const springUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
}

// Per-character reveal
const charVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 22 },
  },
}

// Hero timing (no handshake overlay)
const TEXT_DELAY_S = 0.1

function MagneticCta({ href, children }: { href: string; children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const max = 12
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 260, damping: 18 })
  const sy = useSpring(my, { stiffness: 260, damping: 18 })
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion) return
    const rect = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mx.set((px - 0.5) * max)
    my.set((py - 0.5) * max)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }
  return (
    <motion.a href={href} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy, display: "inline-block" }}>
      <Button size="lg" className="rounded-full px-6">
        {children}
      </Button>
    </motion.a>
  )
}

export default function Page() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)

  // 3D mouse tilt
  const rXmv = useMotionValue(0)
  const rYmv = useMotionValue(0)
  const rX = useSpring(rXmv, { stiffness: 220, damping: 20, mass: 0.5 })
  const rY = useSpring(rYmv, { stiffness: 220, damping: 20, mass: 0.5 })
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const max = 12
    rXmv.set((0.5 - py) * max * 2)
    rYmv.set((px - 0.5) * max * 2)
  }
  const handleMouseLeave = () => {
    rXmv.set(0)
    rYmv.set(0)
  }

  // Scroll parallax for right hero visual
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] })
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <SmoothScroll />
      <SiteHeader />

      {/* Hero with 3D tilt and parallax visual */}
      <section id="home" className="relative" ref={heroRef}>
        <motion.div
          ref={tiltRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX: rX, rotateY: rY, transformPerspective: "900px" }}
          className="will-change-transform"
        >
        {/* Aurora mesh background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.18), transparent)" }}
            animate={prefersReducedMotion ? {} : { x: [0, 16, -12, 0], y: [0, -10, 8, 0] }}
            transition={{ duration: 28, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-24 -right-24 h-[560px] w-[560px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.14), transparent)" }}
            animate={prefersReducedMotion ? {} : { x: [0, -14, 10, 0], y: [0, 12, -8, 0] }}
            transition={{ duration: 32, repeat: Infinity }}
          />
        </div>
        {/* Cursor spotlight removed here; now global via app/layout.tsx */}
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.div
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-24 md:pt-28 pb-20"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={springUp}
              className="max-w-2xl order-2 md:order-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: TEXT_DELAY_S }}
            >
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl md:text-6xl"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.02, delayChildren: TEXT_DELAY_S } } }}
                  initial="hidden"
                  animate="show"
                  whileHover={{ scale: 1.02 }}
                >
                  {["Revolutionize Your ", "DigitalExperience"].map((line, lineIdx) => (
                    <motion.div key={lineIdx} className="whitespace-nowrap">
                      {line.split("").map((ch, i) => (
                        <motion.span key={i} variants={charVariants} className="inline-block text-foreground">
                          {ch}
                        </motion.span>
                      ))}
                    </motion.div>
                  ))}
                </motion.h1>
              </div>
              <motion.p
                className="mt-6 text-base sm:text-lg text-muted-foreground max-w-prose"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: TEXT_DELAY_S }}
              >
                At Zemenay, we build clean, scalable, and elegant digital experiences for forward-thinking businesses.
              </motion.p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: TEXT_DELAY_S }}
              >
                {(() => {
                  const max = 12
                  const mx = useMotionValue(0)
                  const my = useMotionValue(0)
                  const sx = useSpring(mx, { stiffness: 260, damping: 18 })
                  const sy = useSpring(my, { stiffness: 260, damping: 18 })
                  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
                    if (prefersReducedMotion) return
                    const rect = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect()
                    const px = (e.clientX - rect.left) / rect.width
                    const py = (e.clientY - rect.top) / rect.height
                    mx.set((px - 0.5) * max)
                    my.set((py - 0.5) * max)
                  }
                  const onLeave = () => {
                    mx.set(0); my.set(0)
                  }
                  return (
                    <motion.a href="#why" onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy, display: "inline-block" }}>
                      <Button size="lg" className="rounded-full px-6">
                        {"Let's Build Together"}
                      </Button>
                    </motion.a>
                  )
                })()}
              </motion.div>
            </motion.div>
            <motion.div variants={zoomIn} className="order-1 md:order-2 flex justify-center md:justify-end">
              <motion.div style={{ y: yParallax }} className="relative h-[320px] md:h-[400px] w-full max-w-[520px]">
                <div className="absolute inset-0 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-background to-background shadow-xl" />
                <div className="absolute -inset-6 rounded-3xl pointer-events-none bg-[radial-gradient(400px_160px_at_70%_30%,theme(colors.primary/0.25),transparent)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <WireframeGlobe responsive className="w-[260px] sm:w-[320px] md:w-[360px] aspect-square" />
                </div>
                {/* Orbital icons */}
                <div aria-hidden className="absolute inset-0">
                  <motion.div
                    className="absolute left-1/2 top-1/2"
                    style={{ transformOrigin: "center" }}
                    animate={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="-translate-x-1/2 -translate-y-1/2 translate-x-[160px]">
                      <div className="h-9 w-9 rounded-full border bg-background/80 backdrop-blur flex items-center justify-center shadow">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute left-1/2 top-1/2"
                    style={{ transformOrigin: "center" }}
                    animate={prefersReducedMotion ? {} : { rotate: -360 }}
                    transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="-translate-x-1/2 -translate-y-1/2 -translate-x-[120px]">
                      <div className="h-8 w-8 rounded-full border bg-background/80 backdrop-blur flex items-center justify-center shadow">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute left-1/2 top-1/2"
                    style={{ transformOrigin: "center" }}
                    animate={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="-translate-x-1/2 -translate-y-1/2 translate-y-[110px]">
                      <div className="h-8 w-8 rounded-full border bg-background/80 backdrop-blur flex items-center justify-center shadow">
                        <Bolt className="h-4 w-4 text-sky-400" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <motion.div
            className="h-12 w-12 rounded-full border bg-background/70 backdrop-blur flex items-center justify-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Handshake className="h-5 w-5 text-foreground/80" />
            <span className="sr-only">Scroll</span>
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <motion.section
        id="work"
        className="relative py-20 sm:py-28 bg-gradient-to-b from-muted/10 to-background"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <motion.div className="text-center max-w-3xl mx-auto mb-14" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Featured Work
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Selected projects showcasing clarity, speed, and delightful UX.
            </p>
          </motion.div>

          <motion.div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
            {["Commerce Redesign", "SaaS Dashboard", "Brand Microsite"].map((title, i) => (
              <motion.div key={title} variants={fadeInUp}>
                <Card className="group relative overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="relative h-52">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
                    <div className="absolute inset-0 [background:radial-gradient(600px_200px_at_0%_0%,theme(colors.primary/0.15),transparent)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-xl border bg-background/70 px-4 py-2 text-sm text-foreground/80 shadow-sm">
                        {title}
                      </div>
                    </div>
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-center gap-2">
                      {i === 0 && <Palette className="h-5 w-5 text-primary" />}
                      {i === 1 && <Cpu className="h-5 w-5 text-primary" />}
                      {i === 2 && <Layers className="h-5 w-5 text-primary" />}
                      <span>{title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 px-6 pb-6 text-muted-foreground">
                    High-performance build with nuanced motion and robust accessibility.
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Zemenay (paragraph + 3 cards) */}
      <motion.section
        id="why"
        className="relative py-16 sm:py-24 bg-gradient-to-b from-background to-muted/20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        {/* soft background blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
            animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
            transition={{ duration: 14, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
            animate={{ x: [0, -12, 0], y: [0, 10, 0] }}
            transition={{ duration: 16, repeat: Infinity }}
          />
        </div>
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.div className="text-center max-w-3xl mx-auto" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Why Zemenay
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We combine thoughtful design, robust engineering, and an obsession with detail to craft experiences
              customers love and teams can scale.
            </p>
          </motion.div>

          <motion.div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-border/50 hover:border-primary/40 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative z-10 p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                    Design that Performs
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 px-8 pb-8 pt-0">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Elegant interfaces with accessibility and performance baked in from day one.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-border/50 hover:border-primary/40 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative z-10 p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                    Built to Last
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 px-8 pb-8 pt-0">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Modern architecture, testing, and best practices for long‑term maintainability.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-border/50 hover:border-primary/40 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative z-10 p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                    Speed to Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 px-8 pb-8 pt-0">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Rapid iterations that ship value quickly without compromising quality.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Process Timeline */}
      <motion.section
        id="process"
        className="relative py-20 sm:py-28"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.div className="text-center max-w-3xl mx-auto mb-14" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">How We Work</h2>
            <p className="mt-4 text-muted-foreground text-lg">Transparent, collaborative, outcome-driven.</p>
          </motion.div>

          <div className="relative mx-auto max-w-5xl">
            {/* left timeline */}
            <div className="pointer-events-none absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/70 to-transparent" />
            {[
              { title: "Discovery", desc: "We align on goals, constraints, and opportunities.", icon: Sparkles },
              { title: "Design", desc: "We craft accessible interfaces and systemize components.", icon: Palette },
              { title: "Build", desc: "We ship robust, tested, and performant experiences.", icon: Bolt },
              { title: "Launch + Iterate", desc: "We monitor, learn, and continuously improve.", icon: Rocket },
            ].map((s, idx) => {
              const offsets = ["md:ml-20", "md:ml-28", "md:ml-32", "md:ml-36"]
              const offsetClass = offsets[idx] ?? "md:ml-0"
              return (
                <motion.div
                  key={s.title}
                  className="relative py-10"
                  variants={fadeInUp}
                >
                  {/* pulse dot + halo on left */}
                  <motion.span
                    className="pointer-events-none absolute left-2 top-10 z-20 h-3 w-3 rounded-full bg-primary shadow"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.span
                    className="pointer-events-none absolute left-[6px] top-8 z-0 hidden h-8 w-8 rounded-full border border-primary/30 md:block"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                  />
                  <div className={`relative ml-20 ${offsetClass} w-full md:w-[520px]`}>
                    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-primary/30 via-primary/10 to-transparent">
                      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl">
                        {/* animated blob background */}
                        <motion.div
                          className="pointer-events-none absolute -inset-12 opacity-50"
                          style={{ background: "radial-gradient(500px 200px at 20% 0%, hsl(var(--primary)/0.15), transparent)" }}
                          animate={{ rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
                          transition={{ duration: 6, repeat: Infinity }}
                        />
                        {/* hover shimmer */}
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{ background: "linear-gradient(110deg, transparent 0%, hsla(0,0%,100%,0.05) 40%, transparent 60%)" }}
                        />
                        <div className="relative flex items-start gap-3">
                          <div className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10">
                            <s.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground/90">{s.title}</h3>
                            <p className="mt-2 text-muted-foreground">{s.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Our Clients Section */}
      <motion.section
        id="clients"
        className="relative py-14 sm:py-16 overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-center" variants={fadeInUp}>Our Clients</motion.h3>
          <motion.p className="mt-3 text-center text-muted-foreground" variants={fadeInUp}>
            Trusted by innovative teams and forward‑thinking organizations.
          </motion.p>

          <div className="mt-8">
            <div className="relative w-full overflow-hidden">
              <div className="flex w-max">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-6 pr-6">
                    {["Acme Co", "Globex", "Umbrella", "Wayne Tech", "Stark Industries", "Hooli", "Initech", "Wonka"].map((client, idx) => (
                      <div 
                        key={`${client}-${i}-${idx}`}
                        className="whitespace-nowrap rounded-full border bg-background/70 px-5 py-2 text-sm text-foreground/80 shadow-sm flex-shrink-0"
                      >
                        {client}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scrollLeftToRight {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .flex.w-max {
            animation: scrollLeftToRight 25s linear infinite;
          }
          .flex.w-max:hover {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .flex.w-max {
              animation: none;
              overflow-x: auto;
              padding-bottom: 1rem;
            }
            .flex.w-max::-webkit-scrollbar {
              height: 4px;
            }
            .flex.w-max::-webkit-scrollbar-track {
              background: var(--muted);
              border-radius: 2px;
            }
            .flex.w-max::-webkit-scrollbar-thumb {
              background: var(--primary);
              border-radius: 2px;
            }
          }
        `}</style>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        id="testimonials"
        className="relative py-20 sm:py-28 bg-gradient-to-b from-background to-muted/10 overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeIn}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/80">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Don't just take our word for it. Here's what industry professionals have to say about our services and solutions.
            </p>
          </motion.div>

          <motion.div className="relative" variants={fadeInUp}>
            <div className="relative overflow-hidden">
              <div className="flex w-max">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex space-x-8 pr-8">
                    {[
                      {
                        name: "Amina K.",
                        role: "Product Lead, Globex",
                        quote:
                          "Zemenay delivered a blazing‑fast site and a design system our team loves. Velocity and quality in one.",
                      },
                      {
                        name: "Samuel T.",
                        role: "Founder, Initech",
                        quote: "From kickoff to launch, they were collaborative, thoughtful, and laser‑focused on outcomes.",
                      },
                      {
                        name: "Lina O.",
                        role: "Marketing Director, Hooli",
                        quote: "Our traffic and conversions jumped immediately. The attention to performance really shows.",
                      },
                    ].map((t, idx) => (
                      <div key={`${t.name}-${i}-${idx}`} className="w-[350px] flex-shrink-0 group relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 transition-all duration-300 group-hover:shadow-lg">
                          <div className="mb-6 text-5xl font-serif text-muted-foreground/20">"</div>
                          <p className="text-lg text-foreground/90 mb-8 leading-relaxed">
                            {t.quote}
                          </p>
                          <div className="flex items-center gap-4 mt-auto">
                            <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex-shrink-0 flex items-center justify-center">
                              <span className="text-lg font-medium text-foreground/80">
                                {t.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-foreground/90">{t.name}</div>
                              <div className="text-sm text-muted-foreground">{t.role}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <style jsx>{`
              @keyframes scrollRightToLeft {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .flex.w-max {
                animation: scrollRightToLeft 35s linear infinite;
                will-change: transform;
              }
              .flex.w-max:hover {
                animation-play-state: paused;
              }
              @media (prefers-reduced-motion: reduce) {
                .flex.w-max {
                  animation: none;
                  overflow-x: auto;
                  padding-bottom: 1rem;
                }
                .flex.w-max::-webkit-scrollbar {
                  height: 4px;
                }
                .flex.w-max::-webkit-scrollbar-track {
                  background: var(--muted);
                  border-radius: 2px;
                }
                .flex.w-max::-webkit-scrollbar-thumb {
                  background: var(--primary);
                  border-radius: 2px;
                }
              }
            `}</style>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        id="cta"
        className="relative py-20 sm:py-28"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-background to-background">
            <div className="absolute -inset-24 bg-[radial-gradient(600px_200px_at_50%_0%,theme(colors.primary/0.2),transparent)]" />
            <div className="relative px-8 sm:px-12 py-14 sm:py-20 text-center">
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground/90">
                Ready to build something remarkable?
              </h3>
              <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                Let’s craft a fast, elegant, and scalable experience tailored to your audience.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Button size="lg" className="rounded-full">Start a Project</Button>
                <Button size="lg" variant="secondary" className="rounded-full">See Our Work</Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <SiteFooter />
    </main>
  )
}
