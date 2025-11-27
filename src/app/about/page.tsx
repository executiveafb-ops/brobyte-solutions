// src/app/about/page.tsx

import { MainLayout } from '@/components/layout/main-layout';
import { SectionHeader } from '@/components/common/section-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Compass,
  Cog,
  Sparkles,
  PhoneCall,
  MessageCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <MainLayout>
      {/* TOP INTRO / HERO */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="BroByte Solutions"
          title="The tech team that thinks three steps ahead for you."
          description="BroByte was created for teams who need reliable, fast-moving technology partners — not just vendors who disappear after launch."
          align="left"
        />

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-50">
                Built from operations, not just slide decks.
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                BroByte brings product thinking, deep operations understanding, and hands-on
                engineering together under one roof.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              <p>
                We&apos;ve seen what happens when software looks good in a demo but fails under real
                pressure — delayed orders, confused teams, and lost trust. BroByte was founded to
                solve that gap: technology that respects the realities of day-to-day operations.
              </p>
              <p>
                Whether it&apos;s a stock &amp; accounting platform, an AI assistant for your staff,
                or a website that needs to feel as premium as your brand, we approach every project
                with one question: <span className="font-medium">“What will this feel like in
                production six months from now?”</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-50">Snapshot of how we work</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                A quick glimpse into how BroByte operates as your extended tech team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-[11px] text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Average response time</span>
                <span className="font-semibold text-slate-50">Under 4 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Support coverage</span>
                <span className="font-semibold text-slate-50">24/7 · 365 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Engagement style</span>
                <span className="font-semibold text-slate-50">Partner, not vendor</span>
              </div>
              <div className="mt-2 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2">
                <p className="text-[11px] text-slate-300">
                  “We measure ourselves not just on features shipped, but on how calm your
                  operations team feels when systems go live.”
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* HOW WE THINK */}
      <section className="mt-12 space-y-6">
        <SectionHeader
          eyebrow="How we think"
          title="Customer-ahead, not just customer-first."
          description="Most teams wait for problems to show up in a ticket. We look one step ahead, identify the sharp edges in your workflow, and smooth them out before they slow you down."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Compass className="h-4 w-4 text-cyan-300" />
                Anticipate before it breaks
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                We map your workflows and ask “what could go wrong?” at every step.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-300">
              Before writing a line of code, we simulate edge cases: partial deliveries, last-minute
              pricing changes, approvals stuck on one person, and more. Our goal is to design the
              system so that when reality hits, it bends — it doesn&apos;t break.
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Cog className="h-4 w-4 text-cyan-300" />
                Operations first, then aesthetics
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Beautiful UI is pointless if your team avoids using it.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-300">
              We design for the people who will live inside the system every day — accountants,
              operations staff, managers — and then layer on the premium polish that your leadership
              and customers expect.
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                Calm, confident launches
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                No dramatic go-lives — just predictable rollouts and fast iteration.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-300">
              We prefer multiple small, safe launches over one risky “big bang”. That means faster
              feedback loops, fewer surprises, and a system that grows with your business instead of
              fighting it.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="mt-12 space-y-6">
        <SectionHeader
          eyebrow="Process"
          title="How a typical BroByte project runs."
          description="Clear steps, clear owners, and clear outcomes. Whether it’s a website, AI assistant, or internal system, the approach stays consistent."
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-50">01 · Discovery</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Understand your business, not just your feature list.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-300">
              We speak with decision-makers and hands-on users to capture goals, constraints, and
              edge cases in one clear requirements brief.
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-50">02 · Blueprint</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Translate ideas into architecture, flows, and milestones.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-300">
              We design system architecture, data flows, and UX journeys, then align on timelines
              and success metrics before building.
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-50">03 · Build & iterate</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Ship in tight loops with real feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-300">
              We share early working versions, gather input from your team, and refine continuously
              instead of waiting for a “final” reveal.
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-50">04 · Launch & support</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Stay close to your team after go-live.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-300">
              We handle the rollout, monitor performance, and stay available for tweaks, new
              features, and long-term support.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* LEADERSHIP / BRAINS BEHIND */}
      <section className="mt-12 space-y-6">
        <SectionHeader
          eyebrow="Brains behind BroByte"
          title="People who care about both code and context."
          description="We combine engineering, design, and business context so your systems match how your company really works."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-cyan-300" />
                Product & architecture
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Senior product & system designers overseeing every build.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-300">
              Responsible for making sure every solution is not only technically correct but also
              aligned with your business model and operational reality.
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Cog className="h-4 w-4 text-cyan-300" />
                Engineering
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Full-stack engineers focused on clean, scalable code.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-300">
              From API design to frontend polish, our engineers build systems that can be extended,
              audited, and trusted as your needs grow.
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                Content & experience
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                UX, content, and video working together for your brand.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-300">
              Ensuring your websites, AI touchpoints, and video content tell one coherent story that
              feels premium and on-brand across every channel.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SUPPORT & CONTACT STRIP */}
      <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-950/80 px-6 py-6 md:px-8 md:py-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              24/7 partnership
            </p>
            <p className="text-sm font-medium text-slate-50 md:text-base">
              We&apos;re reachable when your operations are active — not just during office hours.
            </p>
            <p className="text-xs text-slate-400">
              Urgent issues, last-minute changes, or new ideas — BroByte stays available across
              multiple channels so you never feel stuck.
            </p>
          </div>

          <div className="grid gap-3 text-xs text-slate-200 md:min-w-[260px]">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-cyan-300" />
                <span>Direct call support</span>
              </div>
              <span className="text-slate-300">+880-XXX-XXX-XXX</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-cyan-300" />
                <span>WhatsApp &amp; chat</span>
              </div>
              <span className="text-slate-300">Instant response window</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-300" />
                <span>Coverage</span>
              </div>
              <span className="text-slate-300">24/7 · 365 days</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span>Engagement</span>
              </div>
              <span className="text-slate-300">Long-term partnership mindset</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Button size="sm" className="rounded-full px-4">
                Talk to BroByte
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-slate-600 bg-slate-950/80 text-slate-100 hover:bg-slate-900"
              >
                View services &amp; solutions
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
