"use client"

import { motion, Variants } from 'framer-motion'
import { Laptop, Braces, Search, ShieldCheck, Target, Code, Zap, CheckCircle, ArrowRight, Users, LayoutGrid, BarChart2, Shield, Star, TrendingUp, Calendar, Clock, DollarSign, Globe, Rocket, Sparkles, CircleDashed, Code2, ShoppingBag, Smartphone, Stethoscope, Home, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

// Reusable section header component
const SectionHeader = ({ title, subtitle, className = '' }: { title: string; subtitle: string; className?: string }) => (
  <motion.div 
    className={`text-center mb-12 ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUp}
  >
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
      <span className="h-2 w-2 rounded-full bg-primary" />
      {subtitle}
    </span>
    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
      {title}
    </h2>
  </motion.div>
)

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 20,
      duration: 0.6
    }
  }
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

// Card hover animation
const cardHover: Variants = {
  hover: {
    y: -5,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
}

// Image scale animation
const imageScale: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
}

export default function ServicesPage() {
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

      {/* Hero */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground/90">
            Our Expertise, Your Solutions.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground">
            Innovative software, web development, AI, and more to help your business thrive.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <a href="#services">
              <Button className="rounded-full">Explore Our Services</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">Our Services</h2>

          <motion.div 
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: Laptop,
                title: "Full stack Website Development",
                desc: "Custom-built websites from front to back—optimized for performance, scalability, and user experience.",
              },
              {
                icon: Braces,
                title: "WordPress Development with Elementor Pro",
                desc: "Beautiful, responsive websites powered by WordPress and designed with the flexibility of Elementor Pro.",
              },
              {
                icon: Search,
                title: "SEO Management",
                desc: "Improve your visibility with tailored SEO strategies that drive traffic and boost rankings.",
              },
              {
                icon: ShieldCheck,
                title: "Website Maintenance",
                desc: "Keep your site secure, updated, and running smoothly with our ongoing support and maintenance plans.",
              },
            ].map((s, index) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1
                }}
                className="flex flex-col"
              >
                <Card className="flex flex-col transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="space-y-3">
                    <div className="h-10 w-10 rounded-full border bg-muted/30 flex items-center justify-center">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl leading-snug">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">{s.desc}</CardContent>
                  <CardFooter className="mt-auto">
                    <Button variant="secondary" className="w-full rounded-full">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeader 
            title="Our Projects"
            subtitle="Showcase of Our Work"
          />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "E-Commerce Platform",
                description: "A modern, scalable e-commerce solution with real-time inventory management and advanced analytics.",
                tech: "React, Node.js, MongoDB",
                icon: ShoppingBag,
                color: "blue"
              },
              {
                title: "Enterprise CRM",
                description: "Custom CRM system with AI-powered customer insights and automated workflow management.",
                tech: "Next.js, TypeScript, PostgreSQL",
                icon: Users,
                color: "emerald"
              },
              {
                title: "Mobile Banking App",
                description: "Secure, user-friendly banking application with biometric authentication and real-time transactions.",
                tech: "React Native, Node.js, AWS",
                icon: Smartphone,
                color: "amber"
              },
              {
                title: "Developer Training",
                description: "Comprehensive training programs for developers in modern web and mobile technologies.",
                tech: "MERN Stack",
                icon: Code2,
                color: "purple"
              },
              {
                title: "Healthcare System",
                description: "Comprehensive healthcare management solution with HIPAA compliance and telemedicine.",
                tech: "Vue.js, Java, MongoDB",
                icon: Stethoscope,
                color: "rose"
              },
              {
                title: "Real Estate Platform",
                description: "Modern real estate platform with virtual tours and AI property valuation.",
                tech: "Angular, .NET, SQL Server",
                icon: Home,
                color: "indigo"
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-${project.color}-500/10`}>
                    <project.icon className={`h-6 w-6 text-${project.color}-500`} />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground mb-3">
                    {project.title}
                  </h3>
                  <p className="mb-5 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Code2 className="h-4 w-4" />
                      {project.tech}
                    </span>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-sm">
                      View Project
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br from-${project.color}-500/5 to-transparent`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
