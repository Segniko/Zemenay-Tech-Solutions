"use client"

import { SiteHeader } from "@/components/site-header"
import { motion, Variants } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Sparkles, Users, Target, ShieldCheck, HeartHandshake, Globe, Award, Rocket, Star } from "lucide-react"
import Image from "next/image"
import SiteFooter from "@/components/site-footer"

// Animation variants with proper typing
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Item variant with proper typing
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
    },
  }),
}

// Fade in up animation with proper typing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

// Stagger container with proper typing
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <SiteHeader />

      {/* Hero */}
      <motion.section 
        initial="hidden"
        animate="show"
        variants={container}
        className="relative py-20 sm:py-28"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>
        <motion.div 
          variants={item}
          className="mx-auto max-w-3xl px-6 sm:px-8 text-center"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground/90"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            About Our Journey
          </motion.h1>
          <motion.p 
            className="mt-5 text-base sm:text-lg text-muted-foreground"
            variants={item}
          >
            Discover the story behind our passion for innovation and commitment to excellence. We{"'"}re on a mission to
            transform the digital landscape, one project at a time.
          </motion.p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#people-first">
              <Button className="rounded-full">Our Mission</Button>
            </a>
            <a href="#meet-our-team">
              <Button variant="secondary" className="rounded-full">Meet the Team</Button>
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* By the Numbers */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="relative py-10 sm:py-14"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { label: "Projects Delivered", value: "12+", Icon: Award },
              { label: "Avg. Rating", value: "9.5+", Icon: Star },
              { label: "Client Satisfaction", value: "98%", Icon: ShieldCheck },
              { label: "Years of Experience", value: "3+", Icon: Rocket },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                variants={item}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="mb-3 flex items-center gap-2 text-foreground/80">
                  <s.Icon className="h-4 w-4 text-primary" />
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold">{s.value}</div>
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/10 via-primary/0 to-transparent" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* People First */}
      <motion.section 
        id="people-first"
        initial="hidden"
        animate="show"
        variants={container}
        className="relative py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.div 
            variants={fadeInUp}
            className="grid gap-10 md:grid-cols-2 md:items-center"
          >
            <div>
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                We Put <span className="underline underline-offset-8 decoration-4">People First</span>
              </motion.h2>
              <motion.p 
                className="mt-4 text-muted-foreground"
                variants={item}
              >
                At Zemenay, we believe technology should empower people and make their lives easier. Our mission is
                simple: to create solutions that prioritize people at every step, delivering innovative digital
                experiences that transform businesses.
              </motion.p>
              <motion.div 
                variants={item}
                className="mt-6"
              >
                <Button className="rounded-full">
                  Read More
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
            <div className="relative overflow-hidden rounded-xl border bg-muted/20 aspect-[4/3] shadow-lg">
              <Image
                src={"/Team-image.png"}
                alt="Zemenay team collaborating and working together"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Values */}
      <motion.section 
        initial="hidden"
        animate="show"
        variants={container}
        className="relative py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.h3 
            className="text-center text-3xl sm:text-4xl font-bold tracking-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Our Values
          </motion.h3>

          <motion.div 
            variants={staggerContainer}
            className="mt-10 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3"
          >
            {[
              {
                title: "Human‑centered",
                text: "We design for people first—accessible, clear and delightful experiences that build trust.",
              },
              {
                title: "Reliability",
                text: "Quality engineering and maintainable systems that scale with your product and team.",
              },
              {
                title: "Focus & Impact",
                text: "We prioritize what moves the needle—shipping meaningful value with polish.",
              },
            ].map((it, idx) => (
              <motion.div
                key={it.title}
                variants={item}
                className="flex flex-col"
              >
                <Card className="h-full flex flex-col group border border-border/50 hover:border-primary/40 transition-colors duration-300">
                  <CardHeader>
                    <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {idx === 0 && <HeartHandshake className="h-6 w-6 text-primary" />}
                      {idx === 1 && <ShieldCheck className="h-6 w-6 text-primary" />}
                      {idx === 2 && <Target className="h-6 w-6 text-primary" />}
                    </div>
                    <CardTitle className="text-lg">{it.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">{it.text}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="p-0 h-auto">Learn more</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story - Timeline */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="relative py-16 sm:py-20 bg-gradient-to-b from-muted/10 to-background"
      >
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Story</h3>
            <p className="mt-4 text-muted-foreground">Milestones that shaped our craft and culture.</p>
          </motion.div>

          {/* Desktop: horizontal journey */}
          <div className="relative mt-14 hidden md:block">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-primary/20 via-border to-primary/20 hidden" aria-hidden="true" />
            <motion.ul variants={staggerContainer} className="grid grid-cols-4 gap-8">
              {[
                { year: "2019", title: "Founded Zemenay", text: "Started with a clear mission: build modern, reliable products." },
                { year: "2021", title: "Global Clients", text: "Scaled our processes and quality bar across larger engagements." },
                { year: "2023", title: "Motion & Systems", text: "Codified motion patterns and a robust design system for velocity." },
                { year: "2025", title: "Beyond", text: "Partnering deeper with clients to drive measurable outcomes." },
              ].map((s, idx) => (
                <motion.li key={s.year} variants={item} className="relative">
                  {/* node */}
                  {/* node removed */}
                  {/* card */}
                  <div className={idx % 2 === 0 ? "mb-12 -mt-8" : "mt-12 -mb-8"}>
                    <Card className="overflow-hidden border border-border/60 bg-card/60">
                      <CardContent className="p-5 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-background/70 text-muted-foreground">
                          <Sparkles className="h-3.5 w-3.5 text-primary" /> {s.year}
                        </div>
                        <div className="mt-3 font-semibold text-foreground/90">{s.title}</div>
                        <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Mobile: stacked timeline */}
          <div className="relative mt-8 md:hidden">
            <motion.ol variants={staggerContainer} className="space-y-6">
              {[
                { year: "2019", title: "Founded Zemenay", text: "Started with a clear mission: build modern, reliable products." },
                { year: "2021", title: "Global Clients", text: "Scaled our processes and quality bar across larger engagements." },
                { year: "2023", title: "Motion & Systems", text: "Codified motion patterns and a robust design system for velocity." },
                { year: "2025", title: "Beyond", text: "Partnering deeper with clients to drive measurable outcomes." },
              ].map((s) => (
                <motion.li key={s.year} variants={item} className="relative pl-6">
                  <Card className="overflow-hidden border border-border/60 bg-card/60">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 bg-background/70"><Sparkles className="h-3.5 w-3.5 text-primary" />{s.year}</span>
                        <span className="text-foreground/70">{s.title}</span>
                      </div>
                      <p className="mt-2 text-sm text-foreground/80">{s.text}</p>
                    </CardContent>
                  </Card>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </motion.section>

      {/* Meet Our Team */}
      <motion.section 
        id="meet-our-team"
        initial="hidden"
        animate="show"
        variants={container}
        className="relative py-20 sm:py-28 bg-gradient-to-b from-background to-muted/10"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <motion.div 
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/80"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Meet Our Team
            </motion.h2>
            <motion.p 
              className="mt-4 text-muted-foreground text-lg"
              variants={item}
            >
              The brilliant minds behind our success. Passionate, dedicated, and committed to excellence.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6"
          >
            {[
              {
                name: "John Doe",
                role: "CEO & Founder",
                bio: "Visionary leader with 10+ years of experience in tech innovation and business strategy.",
                social: {
                  twitter: "#",
                  linkedin: "#",
                  github: "#"
                }
              },
              {
                name: "Jane Smith",
                role: "Lead Designer",
                bio: "Creative mind with an eye for detail and passion for user-centered design solutions.",
                social: {
                  twitter: "#",
                  linkedin: "#",
                  dribbble: "#"
                }
              },
              {
                name: "Mike Johnson",
                role: "Senior Developer",
                bio: "Full-stack developer specializing in building scalable and performant applications.",
                social: {
                  twitter: "#",
                  linkedin: "#",
                  github: "#"
                }
              }
            ].map((member, index) => (
              <motion.div 
                key={member.name} 
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card to-background p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 h-full flex flex-col"
                variants={item}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="relative mx-auto w-32 h-32 mb-6 -mt-14">
                  <motion.div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/40 backdrop-blur-sm flex items-center justify-center text-4xl font-bold text-primary/90"
                    whileHover={{ 
                      scale: 0.95,
                      rotate: 2,
                      background: [
                        'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.4) 100%)',
                        'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(124, 58, 237, 0.3) 100%)',
                        'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.4) 100%)'
                      ]
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <span className="text-4xl font-bold text-foreground/90">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </motion.div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-foreground/90 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-1 mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <SiteFooter />
    </main>
  )
}
