import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">About Zemenay</h2>
            <p className="mt-4 text-muted-foreground">
              We craft delightful, performant, and scalable experiences using modern web technologies. Our team partners
              closely with founders, startups, and enterprises to deliver elegant products that move the needle.
            </p>
            <p className="mt-4 text-muted-foreground">
              From design systems and marketing sites to robust SaaS platforms, we care about the details:
              accessibility, animations, and architecture that stands the test of time.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border">
            <Image
              src="/placeholder.svg?height=800&width=1066"
              alt="Our studio workspace"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
