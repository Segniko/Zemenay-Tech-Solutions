import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most marketing sites ship in 2–6 weeks. SaaS apps vary based on scope, but we work in clear, weekly iterations.",
  },
  {
    q: "Do you work with existing teams?",
    a: "Yes. We can integrate with your designers and engineers or operate as a turnkey squad.",
  },
  {
    q: "Which stack do you use?",
    a: "We specialize in React, Next.js, TypeScript, Tailwind CSS, and modern tooling on Vercel.",
  },
  {
    q: "What is your engagement model?",
    a: "Fixed-scope projects for websites, and monthly retainers for ongoing product work.",
  },
]

export default function FaqSection() {
  return (
    <section id="faq" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">FAQ</h2>
        <div className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem value={`item-${i}`} key={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
