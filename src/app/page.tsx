// src/app/page.tsx
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { SectionHeader } from '@/components/common/section-header';
import {
  Bolt,
  Headset,
  Brain,
  Globe2,
  LineChart,
  MessageSquare,
  Film,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

const heroVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <MainLayout>
      {/* HERO */}
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: 'easeOut' }}
          variants={heroVariants}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 text-xs text-cyan-200">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20">
              <Bolt className="h-3 w-3" />
            </span>
            <span className="font-medium">
              Faster than competitors · 24/7 human support
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 md:text-5xl">
              Your on-call team for
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                {' '}
                custom software, AI, websites &amp; content.
              </span>
            </h1>
            <p className="max-w-xl text-sm text-slate-300 md:text-base">
              BroByte Solutions designs, builds, and supports the systems that run your business –
              from stock &amp; accounting platforms to AI chatbots, high-converting websites, and
              production-grade video content.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-xs text-slate-300 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Reliable, scalable architecture from day one.</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-300" />
              <span>Instant-response mindset. We move when you move.</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" className="rounded-full px-6">
              Get a project quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-slate-700 bg-slate-900/60 px-6 text-slate-100 hover:bg-slate-800"
            >
              Book a discovery call
            </Button>
            <p className="text-xs text-slate-400">
              Or WhatsApp us directly for urgent projects.
            </p>
          </div>
        </motion.div>

        {/* Hero side card */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
        >
          <Card className="border-slate-800 bg-slate-900/60 backdrop-blur">
            <CardHeader className="border-b border-slate-800 pb-4">
              <CardTitle className="flex items-center justify-between text-sm">
                Live delivery snapshot
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  99.9% uptime
                </span>
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                How we&apos;re supporting teams across industries in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[11px] text-slate-400">Avg. response time</p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">3 min</p>
                  <p className="mt-1 text-[11px] text-emerald-400">24/7 engineering team</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[11px] text-slate-400">Active client systems</p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">18+</p>
                  <p className="mt-1 text-[11px] text-cyan-300">From SMEs to large groups</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[11px] text-slate-400">AI automations shipped</p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">120+</p>
                  <p className="mt-1 text-[11px] text-violet-300">
                    Workflows, chatbots, copilots
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[11px] text-slate-400">On-time delivery</p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">98%</p>
                  <p className="mt-1 text-[11px] text-emerald-300">We ship when we promise</p>
                </div>
              </div>

              <div className="mt-2 rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-violet-500/10 px-3 py-2 text-[11px] text-cyan-50">
                “BroByte feels like an internal tech team that never sleeps. They notice issues
                before our staff does.” – Client, logistics sector
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* LOGO STRIP */}
      <section className="mt-10 border-y border-slate-800/80 bg-slate-950/60 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-1 text-[11px] text-slate-400">
          <span className="font-medium text-slate-300">Trusted by teams across</span>
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full border border-slate-800 px-3 py-1">
              Maritime &amp; logistics
            </span>
            <span className="rounded-full border border-slate-800 px-3 py-1">
              Trading &amp; distribution
            </span>
            <span className="rounded-full border border-slate-800 px-3 py-1">
              Retail &amp; services
            </span>
            <span className="rounded-full border border-slate-800 px-3 py-1">
              Professional firms
            </span>
          </div>
        </div>
      </section>

      {/* KEY SERVICES */}
      <section className="mt-10 space-y-6">
        <SectionHeader
          eyebrow="What we build"
          title="From core business systems to front-facing experiences."
          description="BroByte connects your operations, finance, customers, and content in one coherent digital ecosystem."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <LineChart className="h-4 w-4 text-cyan-300" />
                Stock &amp; accounting systems
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Custom workflow platforms built for real-world operations, not textbook accounting.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-400">
              <ul className="space-y-1">
                <li>• Inventory, billing, and approvals</li>
                <li>• Role-based dashboards</li>
                <li>• Audit-ready data and exports</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Globe2 className="h-4 w-4 text-cyan-300" />
                Websites &amp; web apps
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Fast, modern websites and portals that feel as premium as your brand.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-400">
              <ul className="space-y-1">
                <li>• Marketing sites &amp; landing pages</li>
                <li>• Client and partner portals</li>
                <li>• SEO &amp; performance-first builds</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Brain className="h-4 w-4 text-cyan-300" />
                AI chatbots &amp; automation
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                AI copilots that actually understand your business, not generic demos.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-400">
              <ul className="space-y-1">
                <li>• Support &amp; sales chatbots</li>
                <li>• Workflow automation</li>
                <li>• Data-aware internal assistants</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Film className="h-4 w-4 text-cyan-300" />
                Video &amp; content solutions
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                End-to-end editing, branding, and content pipelines tailored for your channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-400">
              <ul className="space-y-1">
                <li>• Brand intros &amp; explainers</li>
                <li>• Social content workflows</li>
                <li>• Reusable content systems</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WHY BROBYTE */}
      <section className="mt-12 space-y-6">
        <SectionHeader
          eyebrow="Why BroByte"
          title="Customer-ahead thinking in every project."
          description="We don’t just react to your task list. We anticipate the next problem, design for it, and keep your systems ready for scale."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4 text-cyan-300" />
                One team, all channels
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                24/7 support across call, email, WhatsApp, and dedicated channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-400">
              We design support to match how you actually communicate – not force you into a
              ticketing maze.
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Headset className="h-4 w-4 text-cyan-300" />
                Built for operations reality
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                We&apos;ve lived in messy, high-pressure operations – and we build for that reality.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-400">
              From partial deliveries to custom approvals, our systems handle edge cases operators
              actually face.
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Bolt className="h-4 w-4 text-cyan-300" />
                Speed without shortcuts
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                We ship fast, but on a clean, extensible architecture you can grow with.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-400">
              Feature today, roadmap tomorrow: we always leave room for the version you&apos;ll
              need next year.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="mt-12 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-violet-500/10 px-6 py-6 md:px-8 md:py-7">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Next step
            </p>
            <p className="text-sm font-medium text-slate-50 md:text-base">
              Share your requirements once. We&apos;ll respond with a clear plan, quote, and
              timeline – not a sales script.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" className="rounded-full px-5">
              Start requirement form
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-cyan-400/50 bg-slate-950/60 text-cyan-100 hover:bg-slate-900"
            >
              WhatsApp our team
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
