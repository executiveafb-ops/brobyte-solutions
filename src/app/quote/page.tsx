// src/app/quote/page.tsx

import { MainLayout } from '@/components/layout/main-layout';
import { SectionHeader } from '@/components/common/section-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { QuoteRequestForm } from '@/components/forms/quote-request-form';
import { PrintQuoteButton } from '@/components/quote/print-quote-button';
import { BadgeCheck, CreditCard, FileText, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuotePage() {
  return (
    <MainLayout>
      {/* INTRO */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Quote & payment"
          title="Get a clear, structured quote and payment plan."
          description="Use this page to understand our typical pricing tiers and request a detailed quote that matches your budget, timeline, and payment preferences."
        />
      </section>

      {/* PRICING STRIP */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Card className="border-slate-800 bg-slate-950/70">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-cyan-300" />
              Template-based builds
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Best for fast-moving teams that need something live quickly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[11px] text-slate-300">
            <p>Starting from: <span className="font-semibold text-slate-100">$600+</span></p>
            <ul className="space-y-1">
              <li>• Website / landing pages</li>
              <li>• Smaller AI assistants</li>
              <li>• Light workflow layers on top of existing tools</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-950/70">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 text-cyan-300" />
              Custom systems & AI
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              For deeper integrations, custom workflows, and long-term roadmaps.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[11px] text-slate-300">
            <p>Starting from: <span className="font-semibold text-slate-100">$2,000+</span></p>
            <ul className="space-y-1">
              <li>• Stock &amp; accounting systems</li>
              <li>• Multi-step AI automations</li>
              <li>• Role-based dashboards &amp; portals</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-950/70">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <BadgeCheck className="h-4 w-4 text-emerald-300" />
              Long-term partnerships
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              When you want BroByte as your ongoing tech team.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[11px] text-slate-300">
            <p>Typical retainers: <span className="font-semibold text-slate-100">$800–$3,000/mo</span></p>
            <ul className="space-y-1">
              <li>• Continuous improvements &amp; features</li>
              <li>• Dedicated capacity every month</li>
              <li>• Priority response &amp; incident handling</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* MAIN GRID: QUOTE FORM + SUMMARY / PAYMENT INFO */}
      <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
        {/* QUOTE FORM */}
        <Card className="border-slate-800 bg-slate-950/80">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-50">
              Request your BroByte quote
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Fill this in once — we&apos;ll respond with a structured PDF-style quote and a clear
              payment path.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <QuoteRequestForm />
          </CardContent>
        </Card>

        {/* QUOTE PREVIEW & PAYMENT STUBS */}
        <div className="space-y-4">
          <Card
            className="border-slate-800 bg-slate-950/80 print:border-none print:bg-white"
            id="quote-preview"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-50 print:text-slate-900">
                Quote preview (example layout)
              </CardTitle>
              <CardDescription className="text-xs text-slate-400 print:text-slate-700">
                When we reply, your quote will follow a similar, print-ready structure for sign-off
                and finance teams.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-[11px] text-slate-300 print:text-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-100 print:text-slate-900">
                    BroByte Solutions
                  </p>
                  <p className="text-[11px] text-slate-400 print:text-slate-700">
                    Premium tech &amp; AI systems partner
                  </p>
                </div>
                <div className="text-right text-[11px] text-slate-400 print:text-slate-700">
                  <p>Quote ID: <span className="font-mono">BB-Q-XXXX</span></p>
                  <p>Date: <span className="font-mono">DD/MM/YYYY</span></p>
                </div>
              </div>

              <div className="rounded-md border border-slate-800/80 bg-slate-950/70 p-3 print:border-slate-300 print:bg-white">
                <p className="text-xs font-semibold text-slate-100 print:text-slate-900">
                  Project summary
                </p>
                <p className="mt-1 text-[11px] text-slate-300 print:text-slate-800">
                  A clear one-paragraph summary of what BroByte will deliver, including key systems,
                  AI components, website scope, and content deliverables.
                </p>
              </div>

              <table className="w-full text-[11px] text-slate-300 print:text-slate-900">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-[11px] font-medium text-slate-200 print:border-slate-400 print:text-slate-800">
                    <th className="py-1">Item</th>
                    <th className="py-1">Scope</th>
                    <th className="py-1 text-right">Est. investment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800/60 print:border-slate-200">
                    <td className="py-1 align-top">Core build</td>
                    <td className="py-1 align-top">
                      System / website / AI assistant scope, integrations, and custom flows.
                    </td>
                    <td className="py-1 text-right align-top">$X,XXX</td>
                  </tr>
                  <tr className="border-b border-slate-800/60 print:border-slate-200">
                    <td className="py-1 align-top">Support &amp; handover</td>
                    <td className="py-1 align-top">
                      Launch support, training, documentation, and early-stage refinements.
                    </td>
                    <td className="py-1 text-right align-top">$X,XX</td>
                  </tr>
                  <tr>
                    <td className="py-1 align-top">Optional add-ons</td>
                    <td className="py-1 align-top">
                      Additional AI scenarios, content packs, or extended support.
                    </td>
                    <td className="py-1 text-right align-top">TBD</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-[11px] print:border-slate-300">
                <p className="text-slate-300 print:text-slate-800">
                  Total (before local taxes / fees)
                </p>
                <p className="text-xs font-semibold text-slate-100 print:text-slate-900">
                  $X,XXX – $Y,YYY
                </p>
              </div>

              <div className="mt-3 grid gap-2 text-[11px] text-slate-400 print:text-slate-700">
                <p>
                  Payment terms: 40–60% project start · Remaining on milestones or launch, depending
                  on project size.
                </p>
                <p>
                  This structure keeps both sides aligned on progress while giving you predictable,
                  staged investment.
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 print:text-slate-700">
                  <p>Authorised by BroByte Solutions</p>
                  <p className="mt-3 h-6 border-b border-slate-700 print:border-slate-400" />
                  <p className="mt-1 text-[10px]">Signature &amp; stamp</p>
                </div>
                <div className="text-[11px] text-slate-400 print:text-slate-700">
                  <p>Accepted by client</p>
                  <p className="mt-3 h-6 border-b border-slate-700 print:border-slate-400" />
                  <p className="mt-1 text-[10px]">Signature &amp; stamp</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-950/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm">
                Payment &amp; invoice flow
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Today this is a structured stub. Later we&apos;ll plug in real payment links and
                invoice generation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-[11px] text-slate-300">
              <ol className="list-decimal space-y-1 pl-4">
                <li>You submit the quote / payment preferences using the form.</li>
                <li>BroByte responds with a PDF-style quote and invoice draft.</li>
                <li>You confirm scope and payment method with our team.</li>
                <li>
                  We issue a final invoice and (later) payment link via your preferred gateway.
                </li>
              </ol>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  className="rounded-full px-4"
                  type="button"
                >
                  Request invoice only
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full border-slate-600 bg-slate-950/80 text-slate-100 hover:bg-slate-900"
                  type="button"
                >
                  Future: Pay now (gateway)
                </Button>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-[11px] text-slate-400">
                  Need a signed PDF or stamped document for finance?
                </p>
                <PrintQuoteButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}
