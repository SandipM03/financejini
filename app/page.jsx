import { featuresData, statsData,howItWorksData,items ,testimonialsData} from "@/data/landing";
import HeroSection from "../components/Hero";
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

      <div className="min-h-screen w-full bg-white relative overflow-hidden">
 {/* Grid + Glow on All Sides */}
 <div
   className="absolute inset-0 z-0 pointer-events-none"
   style={{
     backgroundImage: `
       linear-gradient(to right, #f0f0f0 1px, transparent 1px),
      linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
      radial-gradient(circle 600px at 0% 200px, #d5c5ff, transparent),
      radial-gradient(circle 600px at 100% 200px, #d5c5ff, transparent)
     `,
     backgroundSize: `
       96px 64px,
       96px 64px,
       100% 100%,
       100% 100%
     `,
   }}
 />
 {/* Your Content Here */}

       <HeroSection/>
       <section id="insights"className=" relative mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {statsData.map((statsData,index)=>(
              <div key={index} className="text-center md:text-left">
                <div className="text-2xl font-semibold tracking-tight md:text-3xl">{statsData.value}</div>
                <div className="text-sm text-muted-foreground">{statsData.label}</div>
              </div>
            ))}
            </div>
        </div>
       </section>


       <section id="features" className="mx-auto max-w-6xl px-4 py-16 md:py-24 relative">
        <div className="mb-8 flex  justify-center items-center gap-2">
        <div className="inline-block size-1.5 rounded-full bg-primary" />
        <p className="text-sm font-medium text-muted-foreground">Key features</p>
        </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature, index) => (
              <Card className="border-border/60 bg-card" key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <feature.icon className="size-5 text-primary" />
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </div>
              {feature.badge ? <Badge className="bg-primary text-primary-foreground">{feature.badge}</Badge> : null}
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {feature.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        
      </section>

      <section id="howitworks" className=" relative border-y border-border/60 bg-muted/5">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mb-8 flex justify-center items-center gap-2">
           <div className="inline-block size-1.5 rounded-full bg-primary" />
            <p className="text-sm font-medium text-muted-foreground">How it works</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {howItWorksData.map((step) => (
              <div key={step.k} className="rounded-xl border border-border/60 bg-card p-6">
                <div className="text-xs text-muted-foreground">
                  {step.k}
                </div>
                
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{step.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Wall of love ❤️
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* <section id="insights" className=" relative mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((m) => (
            <div key={m.d} className="text-center md:text-left">
              <div className="text-2xl font-semibold tracking-tight md:text-3xl">{m.k}</div>
              <div className="text-sm text-muted-foreground">{m.d}</div>
            </div>
          ))}
        </div>
      </div>
      </section> */}


      <section className="py-20 bg-blue-600 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances
            smarter with FinanceJini
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
    
  );
}
