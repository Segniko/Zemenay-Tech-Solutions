"use client"

import { motion, Variants } from "framer-motion"
import { useCallback, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

// Typed animation variants
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
}

// Lightweight 3D tilt wrapper (no external deps)
function Tilt({ children, max = 12, className = "" }: { children: React.ReactNode; max?: number; className?: string }) {
  const [transform, setTransform] = useState<string>("translateZ(0) rotateX(0deg) rotateY(0deg)")

  const onMove = useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width // 0..1
    const py = (e.clientY - rect.top) / rect.height // 0..1
    const rx = (py - 0.5) * -2 * max
    const ry = (px - 0.5) * 2 * max
    setTransform(`translateZ(0.001px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`)
  }, [max])

  const onLeave = useCallback(() => {
    setTransform("translateZ(0) rotateX(0deg) rotateY(0deg)")
  }, [])

  return (
    <div
      className={`[perspective:1000px] ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        className="will-change-transform [transform-style:preserve-3d] transition-transform duration-200"
        style={{ transform }}
      >
        {children}
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(async (e) => {
    e.preventDefault()
    setStatus("sending")
    try {
      // Simulate async send; integrate with API/email provider later
      await new Promise((r) => setTimeout(r, 900))
      setStatus("sent")
      ;(e.currentTarget as HTMLFormElement).reset()
    } catch {
      setStatus("error")
    }
  }, [])

  const sending = status === "sending"

  const socials = useMemo(() => ([
    { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/", color: "text-sky-500" },
    { label: "GitHub", icon: Github, href: "https://github.com/", color: "text-foreground" },
    { label: "Twitter", icon: Twitter, href: "https://twitter.com/", color: "text-sky-400" },
  ]), [])

  return (
    <main className="relative">
      {/* Subtle background grid + glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,theme(colors.border/40),transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      </div>

      <div className="relative z-10">
        <SiteHeader />
      </div>
      <section className="mx-auto max-w-7xl px-6 sm:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20">
        {/* Hero */}
        <motion.div initial="hidden" animate="show" variants={container} className="text-center max-w-3xl mx-auto">
          <motion.h1 variants={item} className="text-3xl sm:text-5xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/70">Let’s build something great</span>
          </motion.h1>
          <motion.p variants={item} className="mt-4 text-muted-foreground text-lg">
            Tell us about your project. We’ll get back within 1–2 business days.
          </motion.p>
        </motion.div>

        {/* Content */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <motion.div variants={fadeIn} initial="hidden" animate="show">
            <Tilt>
              <Card className="bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-border/60">
                <CardHeader>
                  <CardTitle className="text-xl">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Your name" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="you@company.com" required className="mt-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" name="company" placeholder="(Optional)" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget</Label>
                        <Input id="budget" name="budget" placeholder="$500 - $1k" className="mt-2" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Project details</Label>
                      <Textarea id="message" name="message" placeholder="What are you building? Goals, timeline, scope…" required className="mt-2 min-h-[140px]" />
                    </div>

                    <div className="flex items-center gap-3">
                      <Button type="submit" disabled={sending} className="gap-2">
                        <Send className="h-4 w-4" /> {sending ? "Sending…" : "Send message"}
                      </Button>
                      {status === "sent" && (
                        <span className="text-sm text-green-600 dark:text-green-400">Thanks! We’ll be in touch.</span>
                      )}
                      {status === "error" && (
                        <span className="text-sm text-red-600 dark:text-red-400">Something went wrong. Try again.</span>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </Tilt>
          </motion.div>

          {/* Contact info & socials */}
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item}>
              <Tilt>
                <Card className="bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-border/60">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-sm text-muted-foreground">Email</div>
                            <div className="font-medium">hello@zemenay.com</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-sm text-muted-foreground">Office</div>
                            <div className="font-medium">Addis Ababa, Ethiopia</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 mt-6">
                      <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-sm text-muted-foreground">Phone</div>
                        <div className="font-medium">+251 911 111 111</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>

            <motion.div variants={item}>
              <Tilt>
                <Card className="bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-border/60">
                  <CardHeader>
                    <CardTitle className="text-base">Connect with us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {socials.map(({ label, icon: Icon, href, color }) => (
                        <motion.a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 bg-background/70 text-sm"
                        >
                          <Icon className={`h-4 w-4 ${color}`} /> {label}
                        </motion.a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
