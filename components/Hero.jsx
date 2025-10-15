"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { ArrowRight, ScanLine, Sparkles } from "lucide-react"
const HeroSection = () => {
  // const imageRef = useRef(null);
const router=useRouter();
  // useEffect(() => {
  //   const imageElement = imageRef.current;

  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const scrollThreshold = 100;

  //   if (scrollPosition > scrollThreshold) {
  //    imageElement.classList.add("hero-image-scrolled");
  //   } else {
  //    imageElement.classList.remove("hero-image-scrolled");
  //   }

  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  const handleClick = () => {
    router.push("/dashboard");
  };
  return (
    <section className="relative border-b border-border/60">
      {/* subtle spotlight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_10%,black,transparent)]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--color-primary) 24%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-12 md:grid-cols-2 md:gap-12 md:pb-24 md:pt-20">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/20 px-3 py-1 text-xs text-muted-foreground">
            <span className="inline-flex size-2 rounded-full bg-[#FF4D00]" /> AI-powered finance
          </div>

          <h1 className="text-pretty text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Master your money with AI receipt scanning and automated budgets
          </h1>

          <p className="max-w-prose text-balance text-muted-foreground">
            FinSight captures receipts instantly, categorizes transactions, and keeps budgets on track—so you can focus
            on what matters. Real-time dashboards turn your spending into insight.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="bg-[#FF4D00] text-primary-foreground hover:opacity-90 " onClick={handleClick}>
              Start free <ArrowRight className="ml-2 size-4" />
            </Button>
            {/* <Button variant="secondary" className="gap-2">
              <Sparkles className="size-4" />
              Watch demo
            </Button> */}
          </div>

          <ul className="mt-2 grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-[#FF4D00]" />
              No manual entry
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-[#FF4D00]" />
              Bank-grade security
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-[#FF4D00]" />
              Works worldwide
            </li>
          </ul>
        </div>

        {/* right preview card */}
        <div className="relative">
          <div className="rounded-xl border border-border/60 bg-card p-3 shadow-[0_0_0_1px_hsl(var(--border))] md:p-4">
            <div className="rounded-lg border border-border/60 bg-muted/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Receipt Inbox</div>
                <Button size="sm" className="h-8 gap-2 bg-[#FF4D00] text-primary-foreground">
                  <ScanLine className="size-4" />
                  Scan with AI
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-border/60 bg-card p-3">
                  <Image
                    src={"/placeholder.svg?height=160&width=240&query=receipt%20photo%20preview"}
                    alt="Receipt preview"
                    width={240}
                    height={160}
                    className="h-24 w-full rounded object-cover"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">Auto-captured: Coffee Shop</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-card p-3">
                  <Image
                    src={"/placeholder.svg?height=160&width=240&query=groceries%20receipt%20preview"}
                    alt="Receipt preview"
                    width={240}
                    height={160}
                    className="h-24 w-full rounded object-cover"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">Parsed totals + tax</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-card p-3">
                  <Image
                    src={"/placeholder.svg?height=160&width=240&query=dashboard%20spending%20graph%20green"}
                    alt="Spending graph preview"
                    width={240}
                    height={160}
                    className="h-24 w-full rounded object-cover"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">Tagged & categorized</p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border/60 bg-card p-3">
                <div className="text-muted-foreground">Monthly budget</div>
                <div className="mt-1 text-2xl font-semibold tracking-tight">-12% vs plan</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-card p-3">
                <div className="text-muted-foreground">Cash flow</div>
                <div className="mt-1 text-2xl font-semibold tracking-tight">+$428 this week</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;