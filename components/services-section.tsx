import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonitorSmartphone, Code2, Palette, LineChart, Shield, Rocket } from "lucide-react"

const services = [
  {
    icon: MonitorSmartphone,
    title: "Product Design",
    desc: "UX research, wireframes, and pixel-perfect UI for web and mobile.",
  },
  {
    icon: Code2,
    title: "Full‑Stack Development",
    desc: "Next.js apps, APIs, and integrations built for performance.",
  },
  {
    icon: Palette,
    title: "Design Systems",
    desc: "Scalable component libraries with accessibility baked in.",
  },
  {
    icon: LineChart,
    title: "Growth Websites",
    desc: "Marketing sites that are fast, SEO-friendly, and easy to update.",
  },
  {
    icon: Shield,
    title: "Best Practices",
    desc: "Security, testing, observability, and CI/CD from day one.",
  },
  {
    icon: Rocket,
    title: "Launch & Beyond",
    desc: "Analytics, A/B testing, and ongoing iteration after launch.",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Services</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Everything you need to go from idea to production-grade product.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title} className="border">
              <CardHeader className="flex flex-row items-center gap-3">
                <s.icon className="h-6 w-6" />
                <CardTitle className="text-base sm:text-lg">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">{s.desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
