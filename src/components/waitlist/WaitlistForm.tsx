import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { buttonStyles } from '@/components/ui/buttonStyles';
import {
  BUSINESS_CATEGORIES,
  SALES_CHANNELS,
  submitWaitlistEntry,
  validateWaitlistForm,
  type WaitlistErrors,
  type WaitlistField,
  type WaitlistFormValues,
} from '@/lib/waitlist';

const EMPTY_VALUES: WaitlistFormValues = {
  fullName: '',
  businessName: '',
  email: '',
  whatsappPhone: '',
  businessCategory: '',
  salesChannels: [],
};

const INPUT_CLASS =
  'mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-ink-400 transition-colors duration-200 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15';

function inputClass(hasError: boolean) {
  return `${INPUT_CLASS} ${hasError ? 'border-error-500 focus:border-error-500 focus:ring-error-500/15' : 'border-ink-200'}`;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function WaitlistForm() {
  const [values, setValues] = useState<WaitlistFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<WaitlistErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const isSubmitting = status === 'submitting';

  const updateField = <K extends keyof WaitlistFormValues>(field: K, value: WaitlistFormValues[K]) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (field in errors) {
      setErrors((previous) => ({ ...previous, [field as WaitlistField]: undefined }));
    }
  };

  const toggleChannel = (channel: string) => {
    const next = values.salesChannels.includes(channel)
      ? values.salesChannels.filter((item) => item !== channel)
      : [...values.salesChannels, channel];
    updateField('salesChannels', next);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateWaitlistForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle');
      return;
    }

    setStatus('submitting');
    setServerMessage('');
    const result = await submitWaitlistEntry(values);

    if (result.ok) {
      setStatus('success');
      return;
    }

    setServerMessage(result.message);
    setStatus('error');
  };

  const handleReset = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setServerMessage('');
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center py-10 text-center sm:py-14">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-500/10 text-success-600 ring-1 ring-success-500/30">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold text-navy-800">You're on the early-access list.</h3>
        <p className="mt-3 max-w-md text-sm leading-[1.5] text-ink-500">
          Thank you, {values.fullName.trim()}. We have saved your details and will contact you at{' '}
          <span className="font-medium text-navy-800">{values.email.trim().toLowerCase()}</span> with SellVnd
          early-access news and relevant product updates.
        </p>
        <button type="button" onClick={handleReset} className={buttonStyles('secondary', 'mt-8')}>
          Register another business
        </button>
      </div>
    );
  }

  const fieldError = (field: WaitlistField) => (
    <p id={`${field}-error`} className="mt-2 text-xs font-medium text-error-600">
      {errors[field]}
    </p>
  );

  const describedBy = (field: WaitlistField) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Early-access registration">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-ink-800">
            Full name <span className="text-error-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy('fullName')}
            className={inputClass(Boolean(errors.fullName))}
            placeholder="Ada Okafor"
            disabled={isSubmitting}
          />
          {errors.fullName && fieldError('fullName')}
        </div>

        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-ink-800">
            Business name <span className="text-error-500">*</span>
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            value={values.businessName}
            onChange={(event) => updateField('businessName', event.target.value)}
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={describedBy('businessName')}
            className={inputClass(Boolean(errors.businessName))}
            placeholder="Your brand name"
            disabled={isSubmitting}
          />
          {errors.businessName && fieldError('businessName')}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink-800">
            Email address <span className="text-error-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={inputClass(Boolean(errors.email))}
            placeholder="you@business.com"
            disabled={isSubmitting}
          />
          {errors.email && fieldError('email')}
        </div>

        <div>
          <label htmlFor="whatsappPhone" className="block text-sm font-medium text-ink-800">
            WhatsApp phone number <span className="text-error-500">*</span>
          </label>
          <input
            id="whatsappPhone"
            name="whatsappPhone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.whatsappPhone}
            onChange={(event) => updateField('whatsappPhone', event.target.value)}
            aria-invalid={Boolean(errors.whatsappPhone)}
            aria-describedby={describedBy('whatsappPhone')}
            className={inputClass(Boolean(errors.whatsappPhone))}
            placeholder="+234 800 000 0000"
            disabled={isSubmitting}
          />
          {errors.whatsappPhone && fieldError('whatsappPhone')}
        </div>
      </div>

      <div>
        <label htmlFor="businessCategory" className="block text-sm font-medium text-ink-800">
          Business category <span className="text-error-500">*</span>
        </label>
        <div className="relative">
          <select
            id="businessCategory"
            name="businessCategory"
            value={values.businessCategory}
            onChange={(event) => updateField('businessCategory', event.target.value)}
            aria-invalid={Boolean(errors.businessCategory)}
            aria-describedby={describedBy('businessCategory')}
            className={`${inputClass(Boolean(errors.businessCategory))} appearance-none pr-11`}
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            {BUSINESS_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
            aria-hidden="true"
          />
        </div>
        {errors.businessCategory && fieldError('businessCategory')}
      </div>

      <fieldset disabled={isSubmitting}>
        <legend className="text-sm font-medium text-ink-800">
          Which channels do you currently sell on? <span className="font-normal text-ink-500">(optional)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {SALES_CHANNELS.map((channel) => {
            const isChecked = values.salesChannels.includes(channel);
            return (
              <label
                key={channel}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                  isChecked
                    ? 'border-brand-500 bg-brand-50 font-medium text-brand-700'
                    : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300'
                } has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-500/20`}
              >
                <input
                  type="checkbox"
                  name="salesChannels"
                  value={channel}
                  checked={isChecked}
                  onChange={() => toggleChannel(channel)}
                  className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                />
                {channel}
              </label>
            );
          })}
        </div>
      </fieldset>

      {status === 'error' && serverMessage && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-error-500/30 bg-error-500/5 p-4 text-sm text-error-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{serverMessage}</p>
        </div>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-[1.5] text-ink-500">
          Your information will only be used to communicate with you about SellVnd early access and relevant
          product updates.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={buttonStyles('primary', 'w-full shrink-0 sm:w-auto')}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Joining the waitlist...
            </>
          ) : (
            'Join the Waitlist'
          )}
        </button>
      </div>
    </form>
  );
}
