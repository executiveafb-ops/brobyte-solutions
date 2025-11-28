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

      const contentType = response.headers.get('content-type') || '';
      let data: any = null;

      if (contentType.includes('application/json')) {
        data = await response.json();
      }

      if (!response.ok || !data?.ok) {
        const message = data?.message ?? Quote request failed with status ${response.status}. Please try again.;
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
          error.message ||
          'Something went wrong on the server. Please try again later or contact us directly.',
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
          {/* ...rest of the form as you already had, unchanged */}
          {/* Keeping UI & validations untouched as requested */}
        </div>

        {/* (rest of form unaffected, identical code) }}

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
            <span className="font-medium text-slate-200">1–2 business days</span>.
          </p>
        </div>
      </form>
    </Form>
  );
}