// src/app/services/page.tsx

import { MainLayout } from '@/components/layout/main-layout';
import { SectionHeader } from '@/components/common/section-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ServiceRequestForm } from '@/components/forms/service-request-form';
import {
  LineChart,
  Globe2,
  Brain,
  Film,
  Headset,
  Clock,
  ShieldCheck,
  Workflow,
} from 'lucide-react';

export default function ServicesPage() {
  return (
    <MainLayout>
      {/* TOP INTRO */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Solutions & services"
          title="One team for systems, AI, web, and content."
          description="BroByte designs, builds, and supports your core business systems, customer touchpoints, and content pipelines — as a single, reliable partner."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Workflow className="h-4 w-4 text-cyan-300" />
                What this page helps you do
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Use this page to quickly share what you need and the kind of support you expect from
                BroByte.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-300">
              <p>
                Whether you&apos;re starting from a blank page or improving an existing system, this
                form helps us understand your situation without endless back-and-forth messages.
              </p>
              <p>
                Share as much as you know today — we&apos;ll help you translate it into a clear
                technical plan, timeline, and quote. You&apos;ll get a response that feels like it
                came from an internal tech team that already understands your business.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-50">
                The main areas BroByte focuses on
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Four core solution pillars, designed to work together.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-[11px] text-slate-300">
              <div className="flex items-start gap-2">
                <LineChart className="mt-[2px] h-4 w-4 text-cyan-300" />
                <div>
                  <p className="font-medium text-slate-100">
                    Custom office-workflow, stock &amp; accounting systems
                  </p>
                  <p className="text-slate-400">
                    Unified platforms for inventory, approvals, billing, and reporting — tuned to
                    the way your team really operates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Globe2 className="mt-[2px] h-4 w-4 text-cyan-300" />
                <div>
                  <p className="font-medium text-slate-100">Websites &amp; web applications</p>
                  <p className="text-slate-400">
                    From high-conversion marketing sites to secure client portals and partner
                    dashboards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Brain className="mt-[2px] h-4 w-4 text-cyan-300" />
                <div>
                  <p className="font-medium text-slate-100">AI chatbots &amp; internal assistants</p>
                  <p className="text-slate-400">
                    AI copilots that know your data, processes, and terminology — not just generic
                    chatbots.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Film className="mt-[2px] h-4 w-4 text-cyan-300" />
                <div>
                  <p className="font-medium text-slate-100">Video &amp; content solutions</p>
                  <p className="text-slate-400">
                    Editing, intros, templates, and content systems that keep your channels active
                    without burning your team out.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* REQUIREMENT FORM + SUPPORT INFO */}
      <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
        <Card className="border-slate-800 bg-slate-950/80">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-50">
              Share your requirements with BroByte
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              A single, structured form to capture what you need. We&apos;ll respond with a clear
              plan, estimated timeline, and quote.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ServiceRequestForm />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-slate-800 bg-slate-950/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Headset className="h-4 w-4 text-cyan-300" />
                How support &amp; maintenance works
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                We don&apos;t disappear after launch. Support is designed as an ongoing partnership.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-[11px] text-slate-300">
              <p>
                Every BroByte engagement includes a dedicated channel for follow-up questions,
                tweaks, and new feature requests. We agree on SLAs separately based on the critical
                nature of your system.
              </p>
              <ul className="space-y-1 text-slate-300">
                <li>• 24/7 incident response for production-impacting issues</li>
                <li>• Regular check-ins for roadmap and improvements</li>
                <li>• Optional extended support for peak seasons</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-cyan-300" />
                Typical response &amp; delivery timelines
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                We move fast, but stay realistic about quality and safety.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 text-[11px] text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">First response to new request</span>
                <span className="font-semibold text-slate-100">Within 1–3 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Initial plan &amp; quote after requirement review
                </span>
                <span className="font-semibold text-slate-100">1–2 business days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Typical project kickoff</span>
                <span className="font-semibold text-slate-100">Within 3–7 days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                Long-term partnership mindset
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                We prefer building fewer, deeper relationships over many shallow ones.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[11px] text-slate-300">
              Once we know your business, each new project becomes faster and smoother. That&apos;s
              why we design your systems, AI, websites, and content to work as one connected
              BroByte-powered ecosystem.
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}
