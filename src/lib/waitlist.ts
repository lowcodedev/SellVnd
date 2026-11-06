import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export const BUSINESS_CATEGORIES = [
  'Fashion & Clothing',
  'Beauty & Personal Care',
  'Electronics',
  'General Merchandise',
  'Food & Beverages',
  'Home & Lifestyle',
  'Wholesale & Distribution',
  'Other',
] as const;

export const SALES_CHANNELS = [
  'WhatsApp',
  'Instagram',
  'Facebook',
  'TikTok',
  'Website',
  'Physical store',
  'Other',
] as const;

export interface WaitlistFormValues {
  fullName: string;
  businessName: string;
  email: string;
  whatsappPhone: string;
  businessCategory: string;
  salesChannels: string[];
}

export type WaitlistField = keyof Omit<WaitlistFormValues, 'salesChannels'>;

export type WaitlistErrors = Partial<Record<WaitlistField, string>>;

export type WaitlistSubmitResult =
  | { ok: true }
  | { ok: false; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?\d{7,15}$/;

export function validateWaitlistForm(values: WaitlistFormValues): WaitlistErrors {
  const errors: WaitlistErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!values.businessName.trim()) {
    errors.businessName = 'Please enter your business name.';
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address, such as name@business.com.';
  }

  const phone = normalizePhone(values.whatsappPhone);
  if (!phone) {
    errors.whatsappPhone = 'Please enter your WhatsApp phone number.';
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.whatsappPhone = 'Enter a valid phone number with digits only, optionally starting with +.';
  }

  if (!values.businessCategory) {
    errors.businessCategory = 'Please choose the category that best fits your business.';
  }

  return errors;
}

export function normalizePhone(value: string): string {
  return value.trim().replace(/[\s\-()]/g, '');
}

export async function submitWaitlistEntry(values: WaitlistFormValues): Promise<WaitlistSubmitResult> {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message:
        'The waitlist is not connected to its database yet, so your details could not be saved. Please try again later.',
    };
  }

  try {
    const { error } = await supabase.from('waitlist').insert({
      full_name: values.fullName.trim(),
      business_name: values.businessName.trim(),
      email: values.email.trim().toLowerCase(),
      whatsapp_phone: normalizePhone(values.whatsappPhone),
      business_category: values.businessCategory,
      sales_channels: values.salesChannels,
    });

    if (!error) {
      return { ok: true };
    }

    if (error.code === '23505') {
      return {
        ok: false,
        message: 'This email address is already on the early-access list.',
      };
    }

    if (error.code === '23514' || error.code === '22001') {
      return {
        ok: false,
        message: 'Some details are too long or incomplete. Please review the form and try again.',
      };
    }

    return {
      ok: false,
      message: 'We could not save your details right now. Please check your connection and try again.',
    };
  } catch {
    return {
      ok: false,
      message: 'We could not reach the server. Please check your connection and try again.',
    };
  }
}
