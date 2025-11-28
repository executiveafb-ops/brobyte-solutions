// src/components/forms/service-request-form.tsx
'use client';

import { useState } from 'react';
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

const serviceRequestSchema = z.object({
  serviceType: z.string().min(1, 'Please select a service type'),
  templateType: z.enum(['template', 'custom']),
  projectComplexity: z.string().optional(),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  companyName: z.string().min(1, 'Company or brand name is required'),
  contactName: z.string().min(1, 'Contact person name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  integrations: z.string().optional(),
  requirements: z
    .string()
    .min(20, 'Please describe your requirements in at least a few sentences'),
});

type ServiceRequestValues = z.infer<typeof serviceRequestSchema>;

export function ServiceRequestForm() {
  const [files, setFiles] = useState<FileList | null>(null);

  const form = useForm<ServiceRequestValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      serviceType: '',
      templateType: 'custom',
      projectComplexity: '',
      budgetRange: '',
      timeline: '',
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      integrations: '',
      requirements: '',
    },
  });

  async function onSubmit(values: ServiceRequestValues) {
    try {
      const fileSummaries =
        files && files.length > 0
          ? Array.from(files).map((file) => ({
              name: file.name,
              size: file.size,
            }))
          : [];

      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          files: fileSummaries,
        }),
      });

      let data: any = null;

      try {
        data = await response.json();
      } catch (error) {
        console.error('Non-JSON response from /api/service-request:', error);
      }

      if (!response.ok || !data?.ok) {
        const statusMessage =
          'Request failed with status ' + response.status + '. Please try again.';
        const message = (data && data.message) || statusMessage;
        throw new Error(message);
      }

      toast.success('Request submitted', {
        description:
          'Thank you — BroByte will review your requirements and respond with a plan & quote.',
      });

      form.reset();
      setFiles(null);
    } catch (error: any) {
      console.error('Service request submit error:', error);
      toast.error('Could not submit request', {
        description:
          error?.message ||
          'Something went wrong while sending your request. Please try again or contact us directly.',
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        {/* SERVICE TYPE + TEMPLATE VS CUSTOM */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  What do you need help with?
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none ring-0 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="">Select service type</option>
                    <option value="workflow">
                      Custom office-workflow / stock &amp; accounting system
                    </option>
                    <option value="website">Website / web app</option>
                    <option value="ai">
                      AI chatbot / automation / internal assistant
                    </option>
                    <option value="video">
                      Video editing / content system
                    </option>
                    <option value="multiple">Combination of several</option>
                  </select>
                </FormControl>
                <FormDescription className="text-[11px] text-slate-400">
                  You can choose &quot;Combination&quot; if your project spans multiple
                  areas.
                </FormDescription>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="templateType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  Template vs fully custom
                </FormLabel>
                <FormControl>
                  <div className="mt-1 grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => field.onChange('template')}
                      className={`rounded-md border px-3 py-2 text-left ${
                        field.value === 'template'
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-100'
                          : 'border-slate-700 bg-slate-950 text-slate-200'
                      }`}
                    >
                      <span className="block font-medium">
                        Starter template
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Faster, opinionated setup with tweaks.
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange('custom')}
                      className={`rounded-md border px-3 py-2 text-left ${
                        field.value === 'custom'
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-100'
                          : 'border-slate-700 bg-slate-950 text-slate-200'
                      }`}
                    >
                      <span className="block font-medium">Fully custom</span>
                      <span className="text-[11px] text-slate-400">
                        Tailored flows, deep integration, long-term roadmap.
                      </span>
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        </div>

        {/* COMPLEXITY / BUDGET / TIMELINE */}
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="projectComplexity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  Project complexity (optional)
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="">Select complexity</option>
                    <option value="light">Light (MVP / small scope)</option>
                    <option value="standard">Standard business system</option>
                    <option value="advanced">Advanced / multi-team</option>
                    <option value="enterprise">
                      Enterprise / multi-country
                    </option>
                  </select>
                </FormControl>
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
                  Budget range (optional)
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
                  A rough range is enough — we&apos;ll refine after scoping.
                </FormDescription>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  Ideal go-live timeline (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. 4–8 weeks, Q1 2026, ASAP"
                    className="mt-1 h-8 border-slate-700 bg-slate-950 text-xs text-slate-100"
                  />
                </FormControl>
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
                    placeholder="Who should we speak with?"
                    className="mt-1 h-8 border-slate-700 bg-slate-950 text-xs text-slate-100"
                  />
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  Work email
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

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-slate-200">
                  Phone / WhatsApp (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="+880..."
                    className="mt-1 h-8 border-slate-700 bg-slate-950 text-xs text-slate-100"
                  />
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        </div>

        {/* INTEGRATIONS */}
        <FormField
          control={form.control}
          name="integrations"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-slate-200">
                Integrations (optional)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. existing ERP, payment gateway, messaging tools"
                  className="mt-1 h-8 border-slate-700 bg-slate-950 text-xs text-slate-100"
                />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        {/* REQUIREMENTS */}
        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-slate-200">
                Describe what you need BroByte to build
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  placeholder="Share your current workflow, pain points, and what a successful solution would look like for your team."
                  className="mt-1 border-slate-700 bg-slate-950 text-xs text-slate-100"
                />
              </FormControl>
              <FormDescription className="text-[11px] text-slate-400">
                Don&apos;t worry about perfect wording — write in your own
                language and we&apos;ll structure it.
              </FormDescription>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        {/* FILE UPLOAD (STUB) */}
        <div className="space-y-1 text-xs">
          <label className="text-xs font-medium text-slate-200">
            Attach any documents (optional)
          </label>
          <input
            type="file"
            multiple
            onChange={(event) => setFiles(event.target.files)}
            className="mt-1 block w-full cursor-pointer rounded-md border border-dashed border-slate-700 bg-slate-950 px-3 py-2 text-[11px] text-slate-300 file:mr-2 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-1 file:text-xs file:text-slate-100 hover:border-cyan-500"
          />
          <p className="text-[11px] text-slate-400">
            You can attach requirement docs, sketches, or existing reports.
            We&apos;ll include their filenames in our internal summary for now.
          </p>
          {files && files.length > 0 && (
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-slate-300">
              {Array.from(files).map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* SUBMIT */}
        <div className="flex items-center justify-between pt-2">
          <Button
            type="submit"
            size="sm"
            className="rounded-full px-6"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Submitting…' : 'Submit request'}
          </Button>
          <p className="text-[11px] text-slate-400">
            We usually respond within{' '}
            <span className="font-medium text-slate-200">
              1–3 business hours.
            </span>
          </p>
        </div>
      </form>
    </Form>
  );
}