"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Starter",
    priceMonthly: 49,
    features: ["Landing page", "Basic SEO", "Email support"],
    cta: "Start now",
  },
  {
    name: "Growth",
    priceMonthly: 99,
    features: ["Multi-page site", "Blog & CMS", "Analytics setup", "Priority support"],
    cta: "Choose Growth",
    highlighted: true,
  },
  {
    name: "Custom",
    priceMonthly: null,
    features: ["Scoping workshop", "Tailored roadmap", "Dedicated team"],
    cta: "Contact sales",
  },
]

export default function PricingSection() {
  const [yearly, setYearly] = useState(true)

  const price = (m: number | null) => {
    if (m == null) return "Custom"
    // 20% discount for yearly
    const value = yearly ? Math.round(m * 12 * 0.8) : m
    return yearly ? `$${value}/yr` : `$${m}/mo`
  }

  const subtitle = useMemo(() => (yearly ? "Save 20% with yearly billing" : "Monthly billing"), [yearly])

  return (
    <section id="pricing" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Pricing</h2>
            <p className="mt-3 text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Toggle yearly billing" />
            <span className={`text-sm ${yearly ? "text-foreground" : "text-muted-foreground"}`}>Yearly</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((t) => (
            <Card key={t.name} className={t.highlighted ? "border-foreground/40 shadow-sm" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t.name}</span>
                  <span className="text-2xl font-extrabold tabular-nums">{price(t.priceMonthly)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full rounded-full" variant={t.highlighted ? "default" : "secondary"}>
                  {t.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
