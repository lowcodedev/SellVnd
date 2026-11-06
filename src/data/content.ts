import type { LucideIcon } from 'lucide-react';
import type { ChannelName } from '@/components/ui/ChannelIcon';
import {
  BarChart3,
  Boxes,
  Megaphone,
  MessagesSquare,
  Send,
  Sparkles,
  Store,
  Share2,
  Package,
} from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Early Access', href: '#early-access' },
];

export interface DetailContent {
  intro: string;
  points: string[];
  audience?: string;
}

export interface ProblemCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const PROBLEM_CARDS: ProblemCard[] = [
  {
    title: 'Scattered Conversations',
    description:
      'Customer enquiries arrive through WhatsApp, Instagram, Facebook and other channels, making it difficult to keep track.',
    icon: MessagesSquare,
  },
  {
    title: 'Disconnected Operations',
    description: 'Products, inventory, orders and customer information live in different places.',
    icon: Boxes,
  },
  {
    title: 'Manual Marketing',
    description: 'Creating and publishing content across multiple social channels takes too much time.',
    icon: Megaphone,
  },
  {
    title: 'Limited Visibility',
    description:
      'Without a connected view of the business, understanding sales performance and customer activity becomes difficult.',
    icon: BarChart3,
  },
];

export interface CapabilityCard {
  title: string;
  description: string;
  icon: LucideIcon;
  details: DetailContent;
}

export const CAPABILITIES: CapabilityCard[] = [
  {
    title: 'Centralised Commerce Management',
    description: 'Manage products, inventory, orders and customers from one workspace.',
    icon: Store,
    details: {
      intro:
        'One workspace where your catalogue, stock levels, orders and customer records are kept together, so every person on your team works from the same information.',
      points: [
        'Product catalogue with descriptions, images and pricing',
        'Inventory tracking across locations and sales channels',
        'Order records from first enquiry through to delivery',
        'Customer profiles with a clear history of past purchases',
      ],
      audience:
        'Businesses that currently track products and orders across spreadsheets, notebooks and chat threads.',
    },
  },
  {
    title: 'Omnichannel Selling',
    description:
      'Bring your different sales channels and business operations into one connected system.',
    icon: Share2,
    details: {
      intro:
        'Sell through social platforms, your website and physical stores while keeping one stock count and one order book.',
      points: [
        'One inventory count shared by every sales channel',
        'Orders from each channel land in the same queue',
        'Consistent prices and product information everywhere you sell',
        'Clear reporting on where each sale came from',
      ],
      audience:
        'Sellers who promote on social media and want every sale to update the same stock and records.',
    },
  },
  {
    title: 'Social Media Publishing',
    description:
      'Create content once and manage publishing across supported social media channels from one place.',
    icon: Send,
    details: {
      intro:
        'Prepare a post once, adapt it for each platform and schedule it from a single calendar instead of opening every app separately.',
      points: [
        'Central library for images, videos and captions',
        'Scheduling calendar across supported platforms',
        'Platform-specific previews before anything is published',
        'Link posts to the products they promote',
      ],
      audience:
        'Small teams that publish regularly and want to stop repeating the same work on every app. Publishing depends on each platform providing supported APIs and permissions.',
    },
  },
  {
    title: 'Unified Conversations',
    description:
      'Bring customer conversations together so enquiries, follow-ups and sales opportunities are easier to manage.',
    icon: MessagesSquare,
    details: {
      intro:
        'Enquiries from every connected channel arrive in one inbox, so questions and sales opportunities do not get lost between apps.',
      points: [
        'One inbox for WhatsApp, Instagram, Facebook and website messages',
        'Assign conversations to the right team member',
        'Link a conversation to a product, customer or order',
        'Follow-up reminders for enquiries that are still open',
      ],
      audience: 'Sales teams handling a high volume of product questions every day.',
    },
  },
  {
    title: 'AI-Powered Operations',
    description:
      'Use AI to assist with product enquiries, product recommendations, stock checks, customer follow-ups and repetitive business workflows.',
    icon: Sparkles,
    details: {
      intro:
        'AI assistance for the repetitive parts of selling, with the business staying in control of what is sent to customers.',
      points: [
        'Suggested replies to common product enquiries',
        'Product recommendations based on your catalogue',
        'Stock availability checks before a sale is confirmed',
        'Suggested follow-ups for customers who stopped responding',
      ],
      audience:
        'Businesses answering the same questions many times a day. AI features will be introduced as they are built and tested.',
    },
  },
  {
    title: 'Retail & Wholesale Management',
    description:
      'Manage product variations, quantity-based pricing, bulk orders and different customer pricing structures.',
    icon: Package,
    details: {
      intro:
        'Run retail and bulk trade from the same catalogue, with pricing that adapts to the size of the order and the type of buyer.',
      points: [
        'Product variations such as size, colour and material',
        'Quantity-based price tiers',
        'Bulk order handling',
        'Different price lists for different customer groups',
      ],
      audience:
        'Wholesalers, distributors and retailers who sell both single items and bulk orders.',
    },
  },
];

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  details: DetailContent;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: '01',
    title: 'Bring Your Business In',
    description: 'Organise your products, inventory, customers and business information.',
    details: {
      intro: 'Start by getting your business information into SellVnd in an organised way.',
      points: [
        'Add products with variations, pricing and stock levels',
        'Record your customers and business details',
        'Set up categories that match how you actually sell',
      ],
    },
  },
  {
    number: '02',
    title: 'Connect Your Channels',
    description: 'Bring supported sales and social channels into your SellVnd workspace.',
    details: {
      intro: 'Link the sales and social channels you already use to your SellVnd workspace.',
      points: [
        'Choose the channels you sell on',
        'Connections depend on each platform providing supported APIs and granting permissions',
        'The status of every channel is shown clearly in one place',
      ],
    },
  },
  {
    number: '03',
    title: 'Manage Everything',
    description: 'Manage orders, conversations, products, publishing and customer relationships.',
    details: {
      intro: 'Run your daily operations from one place instead of switching between tools.',
      points: [
        'Process orders as they arrive from every channel',
        'Reply to conversations and assign them to your team',
        'Publish content and keep track of what is scheduled',
      ],
    },
  },
  {
    number: '04',
    title: 'Grow Intelligently',
    description: 'Use connected business insights and AI-powered workflows to improve operations.',
    details: {
      intro: 'Use what the connected workspace reveals to make better decisions about stock and sales.',
      points: [
        'Sales and order overview across every channel',
        'Stock insight to reorder before items run out',
        'AI-assisted workflows that reduce repetitive work',
      ],
    },
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'What is SellVnd?',
    answer:
      'SellVnd is an AI-powered social-commerce operating system. It is designed to bring products, inventory, customers, orders, conversations, payments, storefronts and social publishing into one workspace. SellVnd is currently in development.',
  },
  {
    question: 'Who is SellVnd designed for?',
    answer:
      'SellVnd is being designed for small and medium-sized businesses, online retailers and social sellers, fashion and beauty brands, electronics and general merchandise retailers, wholesalers and distributors, and any business selling across several channels.',
  },
  {
    question: 'Is SellVnd available yet?',
    answer:
      'Not yet. SellVnd is still being built. Joining the early-access waitlist is the best way to be told when access opens and to take part in the journey from the beginning.',
  },
  {
    question: 'Will SellVnd support multiple social media platforms?',
    answer:
      'That is the plan. Platform integrations depend on each platform providing supported APIs and granting the required permissions, so the channels available at launch may differ and will be communicated as they are confirmed.',
  },
  {
    question: 'Will SellVnd support wholesalers?',
    answer:
      'Yes, wholesale and distribution is part of the planned platform. It is intended to cover product variations, quantity-based pricing, bulk orders and different customer pricing structures.',
  },
  {
    question: 'Is SellVnd powered by AI?',
    answer:
      'AI is a planned core part of SellVnd, intended to assist with product enquiries, recommendations, stock checks, customer follow-ups and repetitive workflows. Features will be introduced as they are built and tested.',
  },
  {
    question: 'How can I get early access?',
    answer:
      'Complete the early-access form on this page with your business details. We will use your information only to contact you about early access and relevant product updates.',
  },
];

export const SOCIAL_CHANNELS: ChannelName[] = [
  'WhatsApp',
  'Instagram',
  'Facebook',
  'TikTok',
  'Website',
  'Physical store',
];
