"use client"

import { SiteHeader } from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Star, TrendingUp, Shield, DollarSign, Layout, Brush, Search, Edit2, ShoppingCart, BarChart2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"

const planColors = {
  community: "text-yellow-400",
  wordpress: "text-green-500",
  enterprise: "text-blue-600"
}

type Row = {
  feature: string
  community?: boolean
  wp?: boolean
  enterprise?: boolean
}

const rows: Row[] = [
  { feature: "Basic website template", community: true, wp: false, enterprise: false },
  { feature: "Professional WordPress site", community: false, wp: true, enterprise: true },
  { feature: "Custom design & branding", community: false, wp: true, enterprise: true },
  { feature: "Responsive & mobile-friendly", community: false, wp: true, enterprise: true },
  { feature: "SEO optimization", community: false, wp: true, enterprise: true },
  { feature: "Content management system", community: false, wp: true, enterprise: true },
  { feature: "Full-scale digital ecosystem", community: false, wp: false, enterprise: true },
  { feature: "Custom web applications", community: false, wp: false, enterprise: true },
  { feature: "Advanced integrations", community: false, wp: false, enterprise: true },
  { feature: "Dedicated support & services", community: false, wp: true, enterprise: true },
]

function CellIcon({ v }: { v?: boolean }) {
  if (v) return <Check className="h-5 w-5 text-blue-600" aria-label="Included" />
  return <X className="h-5 w-5 text-muted-foreground" aria-label="Not included" />
}

export default function PricingPage() {
  const [activePlan, setActivePlan] = useState("wordpress")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Grid */}
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

      {/* Hero with Animated Background */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-background to-muted/50">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Simple, Transparent Pricing
            </h1>
          </motion.div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Choose the perfect plan for your needs. From free community options to enterprise solutions, we{'"'}ve got
              you covered.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <a href="#compare">
              <Button className="rounded-full">Compare Plans</Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Tiers with Animated Cards */}
      <section className="relative py-8 sm:py-12 bg-background">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3">
            {[
              {
                name: "Community",
                subtitle: "Perfect for personal projects and learning",
                price: "Free",
                features: ["Basic website template", "Community support", "Documentation access", "Limited features"],
                ctaLabel: "Get Started",
                badge: null,
                highlighted: false,
                variant: "secondary" as const,
              },
              {
                name: "WordPress Solution",
                subtitle: "Tailored WordPress sites for businesses",
                price: "Custom Pricing",
                features: [
                  "Professional WordPress site",
                  "Custom design & branding",
                  "Responsive & mobile-friendly",
                  "SEO optimization",
                  "Content management system",
                ],
                ctaLabel: "Request Quote",
                badge: "Most Popular",
                highlighted: true,
                variant: "default" as const,
              },
              {
                name: "Enterprise",
                subtitle: "Complete digital solutions for organizations",
                price: "Let's Talk",
                features: [
                  "Full-scale digital ecosystem",
                  "Custom web applications",
                  "Advanced integrations",
                  "Dedicated support team",
                  "Scalable infrastructure",
                ],
                ctaLabel: "Contact Sales",
                badge: null,
                highlighted: false,
                variant: "secondary" as const,
              },
            ].map((t, index) => (
              <motion.div 
                key={t.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <Card 
                  className={`${t.highlighted ? "border-foreground/40 shadow-sm" : ""} relative ${activePlan === t.name.toLowerCase() ? 'scale-[1.02] shadow-lg' : ''}`}
                  onClick={() => setActivePlan(t.name.toLowerCase())}
                >
                  {t.badge ? (
                    <div className="absolute right-4 top-4 rounded-md bg-foreground text-background px-2.5 py-1 text-xs font-semibold">
                      {t.badge}
                    </div>
                  ) : null}
                  <CardHeader>
                    <p className="text-sm text-muted-foreground">{t.name}</p>
                    <CardTitle className="text-3xl sm:text-4xl">{t.price}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="mt-2 space-y-3">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <Check 
                            className={`mt-0.5 h-4 w-4 ${planColors[t.name.toLowerCase() as keyof typeof planColors]}`} 
                          />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Button className="w-full rounded-full" variant={t.variant}>
                        {t.ctaLabel}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison with Animated Table */}
      <section id="compare" className="relative py-12 sm:py-16 bg-background/90">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">Compare Plans</h2>
          </motion.div>

          <motion.div 
            className="mt-8 overflow-x-auto rounded-lg border bg-background"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <table className="min-w-full text-left">
              <thead className="bg-muted/40">
                <tr className="text-sm text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Feature</th>
                  <th className="px-4 py-3 font-medium">Community</th>
                  <th className="px-4 py-3 font-medium">WordPress Solution</th>
                  <th className="px-4 py-3 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((r, index) => (
                  <motion.tr 
                    key={r.feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                    className="hover:bg-muted/5 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm">{r.feature}</td>
                    <td className="px-4 py-4">
                      <CellIcon v={r.community} />
                    </td>
                    <td className="px-4 py-4">
                      <CellIcon v={r.wp} />
                    </td>
                    <td className="px-4 py-4">
                      <CellIcon v={r.enterprise} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="relative py-16 sm:py-24 bg-background/90">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight mb-8">
              Interactive Demo
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Explore the key features of our digital solutions with these interactive demos
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                title: "Website Builder",
                icon: <Layout className="h-6 w-6" aria-label="Website Builder" />,
                description: "Drag and drop interface",
                demo: (
                  <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden">
                    <motion.div 
                      className="absolute top-4 left-4 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-12 left-12 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-20 left-20 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </div>
                )
              },
              {
                title: "Custom Design",
                icon: <Brush className="h-6 w-6" aria-label="Custom Design" />,
                description: "Visual theme editor",
                demo: (
                  <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden">
                    <motion.div 
                      className="absolute top-4 left-4 w-24 h-24 bg-primary/10 rounded-lg border border-border"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-12 left-12 w-24 h-24 bg-secondary/10 rounded-lg border border-border"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-20 left-20 w-24 h-24 bg-accent/10 rounded-lg border border-border"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </div>
                )
              },
              {
                title: "SEO Optimization",
                icon: <Search className="h-6 w-6" aria-label="SEO Optimization" />,
                description: "Real-time analytics",
                demo: (
                  <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden">
                    <motion.div 
                      className="absolute top-4 left-4 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ x: [0, 10, 0], y: [0, -10, 0] }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-12 left-12 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ x: [-10, 0, 10], y: [10, 0, -10] }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-20 left-20 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ x: [0, -10, 0], y: [0, 10, 0] }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </div>
                )
              },
              {
                title: "Content Management",
                icon: <Edit2 className="h-6 w-6" aria-label="Content Management" />,
                description: "Easy content updates",
                demo: (
                  <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden">
                    <motion.div 
                      className="absolute top-4 left-4 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-12 left-12 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-20 left-20 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </div>
                )
              },
              {
                title: "E-commerce Integration",
                icon: <ShoppingCart className="h-6 w-6" aria-label="E-commerce Integration" />,
                description: "Seamless store setup",
                demo: (
                  <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden">
                    <motion.div 
                      className="absolute top-4 left-4 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-12 left-12 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-20 left-20 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </div>
                )
              },
              {
                title: "Analytics Dashboard",
                icon: <BarChart2 className="h-6 w-6" aria-label="Analytics Dashboard" />,
                description: "Real-time insights",
                demo: (
                  <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden">
                    <motion.div 
                      className="absolute top-4 left-4 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-12 left-12 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="absolute top-20 left-20 w-24 h-24 bg-background rounded-lg border border-border"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </div>
                )
              }
            ].map((demo, index) => (
              <motion.div 
                key={demo.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                className="bg-background/50 p-6 rounded-lg hover:bg-background/60 transition-colors"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-foreground/10">
                        {demo.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{demo.title}</h3>
                      <p className="text-muted-foreground text-sm">{demo.description}</p>
                    </div>
                  </div>
                  <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden">
                    {demo.demo}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to know about our pricing and services.</p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[
              {
                question: "What's included in the WordPress Solution?",
                answer: "Our WordPress Solution includes a professionally designed website, custom branding, responsive design, SEO optimization, content management system, and ongoing support."
              },
              {
                question: "How does the Enterprise pricing work?",
                answer: "Enterprise pricing is customized based on your specific needs. We'll work with you to create a solution that fits your requirements and budget. Contact our sales team for a personalized quote."
              },
              {
                question: "Can I upgrade or downgrade my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. We'll help you transition smoothly between plans with no downtime."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, bank transfers, and PayPal. Enterprise clients may also be eligible for annual billing with additional benefits."
              },
              {
                question: "Is there a money-back guarantee?",
                answer: "Yes, we offer a 14-day money-back guarantee on all our plans. If you're not satisfied with our service, we'll provide a full refund."
              },
              {
                question: "What kind of support do you offer?",
                answer: "We provide email and chat support for all plans, with response times under 24 hours. Enterprise clients receive priority support with faster response times and a dedicated account manager."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.4 }
                  }
                }}
                className="group"
              >
                <details className="group-open:bg-muted/20 transition-colors duration-200 rounded-xl border border-border/50 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-6 text-left text-base font-medium text-foreground hover:bg-muted/10 transition-colors duration-200">
                    <span>{item.question}</span>
                    <svg className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="px-6 pb-6 pt-0 text-muted-foreground"
                  >
                    {item.answer}
                  </motion.div>
                </details>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-6">Still have questions? We're here to help.</p>
            <Button className="rounded-full">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
