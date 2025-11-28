// src/components/forms/quote-request-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const quoteRequestSchema = z.object({
  projectType: z.string().min(1, 'Please select what this quote is for'),
  budgetRange: z.string().min(1, 'Please choose a rough budget range'),
  billingPreference: z.string().min(1, 'Please select a billing preference'),
  paymentMode: z.string().min(1, 'Please choose how you prefer to pay'),
  companyName: z.string().min(1, 'Company / brand name is required'),
  contactName: z.string().min(1, 'Contact person name is required'),
  email: z.string().email('Enter a valid email address'),
  notes: z
    .string()
    .min(10, 'Please share at least a short outline of what this quote should cover'),
});

type QuoteRequestValues = z.infer<typeof quoteRequestSchema>;

export function QuoteRequestForm() {
  const form = useForm<QuoteRequestValues>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      projectType: '',
      budgetRange: '',
      billingPreference: 'one-time',
      paymentMode: 'bank-transfer',
      companyName: '',
      contactName: '',
      email: '',
      notes: '',
    },
  });

  async function onSubmit(values: QuoteRequestValues) {
    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      let data: any = null;

      try {
        data = await response.json();
      } catch (error) {
        console.error('Non-JSON response from /api/quote-request:', error);
      }

      if (!response.ok || !data?.ok) {
        const statusMessage =
          'Quote request failed with status ' +
          response.status +
          '. Please try again.';
        const message = (data && data.message) || statusMessage;
        throw new Error(message);
      }

      toast.success('Quote request submitted', {
        description:
          'BroByte will prepare a structured quote and share payment options with you shortly.',
      });

      form.reset({
        projectType: '',
        budgetRange: '',
        billingPreference: 'one-time',
        paymentMode: 'bank-transfer',
        companyName: '',
        contactName: '',
        email: '',
        notes: '',
      });
    } catch (error: any) {
      console.error('Quote request submit error:', error);
      toast.error('Could not submit quote request', {
        description:
          error?.message ||
          'Something went wrong while sending your quote request. Please try again or contact us directly.',
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        {/* PROJECT TYPE + BUDGET */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  This quote is for
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="">Select project type</option>
                    <option value="workflow">
                      Custom office-workflow / stock &amp; accounting system
                    </option>
                    <option value="website">
                      Website / landing page / web app
                    </option>
                    <option value="ai">AI chatbot / automation / assistant</option>
                    <option value="video">Video &amp; content package</option>
                    <option value="bundle">
                      Bundle (system + AI + website + content)
                    </option>
                  </select>
                </FormControl>
                <FormDescription className="text-[11px] text-slate-400">
                  This helps us assign the right BroByte team from the start.
                </FormDescription>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budgetRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  Rough budget range
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="">Select budget</option>
                    <option value="<1000">Below $1,000</option>
                    <option value="1000-3000">$1,000 – $3,000</option>
                    <option value="3000-8000">$3,000 – $8,000</option>
                    <option value=">8000">Above $8,000</option>
                  </select>
                </FormControl>
                <FormDescription className="text-[11px] text-slate-400">
                  Exact numbers can come later — a range keeps recommendations
                  realistic.
                </FormDescription>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        </div>

        {/* BILLING & PAYMENT */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="billingPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  Billing preference
                </FormLabel>
                <FormControl>
                  <div className="mt-1 grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => field.onChange('one-time')}
                      className={`rounded-md border px-3 py-2 text-left ${
                        field.value === 'one-time'
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-100'
                          : 'border-slate-700 bg-slate-950 text-slate-200'
                      }`}
                    >
                      <span className="block font-medium">One-time project</span>
                      <span className="text-[11px] text-slate-400">
                        Fixed scope, defined deliverables.
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange('retainer')}
                      className={`rounded-md border px-3 py-2 text-left ${
                        field.value === 'retainer'
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-100'
                          : 'border-slate-700 bg-slate-950 text-slate-200'
                      }`}
                    >
                      <span className="block font-medium">
                        Monthly partnership
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Ongoing work, roadmap, and support.
                      </span>
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  Preferred payment mode
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="bank-transfer">Bank transfer</option>
                    <option value="card">Debit / credit card</option>
                    <option value="mobile-money">
                      Mobile money / local gateways
                    </option>
                    <option value="mixed">Mix of methods</option>
                  </select>
                </FormControl>
                <FormDescription className="text-[11px] text-slate-400">
                  We&apos;ll tailor the invoice / checkout links to match this
                  preference.
                </FormDescription>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        </div>

        {/* COMPANY & CONTACT */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  Company / brand name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your company or project name"
                    className="mt-1 h-8 border-slate-700 bg-slate-950 text-xs text-slate-100"
                  />
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  Contact person
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Who will review the quote?"
                    className="mt-1 h-8 border-slate-700 bg-slate-950 text-xs text-slate-100"
                  />
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-slate-200">
                Email for quote &amp; invoice
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@company.com"
                  className="mt-1 h-8 border-slate-700 bg-slate-950 text-xs text-slate-100"
                />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        {/* NOTES */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-slate-200">
                Anything specific this quote should include?
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="For example: multi-language support, data migration, specific AI use-cases, content volume, or payment schedule."
                  className="mt-1 border-slate-700 bg-slate-950 text-xs text-slate-100"
                />
              </FormControl>
              <FormDescription className="text-[11px] text-slate-400">
                The more context you share, the more precise and realistic our
                quote will be.
              </FormDescription>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between pt-2">
          <Button
            type="submit"
            size="sm"
            className="rounded-full px-6"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Sending…' : 'Request structured quote'}
          </Button>
          <p className="text-[11px] text-slate-400">
            Typical turnaround:{' '}
            <span className="font-medium text-slate-200">
              1–2 business days
            </span>
            .
          </p>
        </div>
      </form>
    </Form>
  );
}