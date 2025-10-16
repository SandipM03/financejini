import {
  BarChart3,
  Receipt,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";
import { Brain, ReceiptText, PieChart, ShieldCheck, Wallet } from "lucide-react"
// Stats Data
export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "$2B+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: ReceiptText,
    title: "AI-powered receipt scanning",
    desc: "Snap a photo or forward an email. We extract totals, taxes, line items, and vendors automatically.",
    badge: "New",
  },
  {
    icon: PieChart,
    title: "Automated budget tracking",
    desc: "Budgets update in real-time with categorized transactions and smart alerts to prevent overspending.",
  },
  {
    icon: Brain,
    title: "Comprehensive insights",
    desc: "Understand trends, cashflow, and savings opportunities with clean dashboards and weekly summaries.",
  },
  {
    icon: Wallet,
    title: "Bank sync",
    desc: "Securely connect multiple accounts to unify spending across cards and banks with auto-categorization.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy first",
    desc: "Data encrypted in transit and at rest. You control imports, exports, and device access.",
  },
];

// How It Works Data
export const howItWorksData = [
{
    k: "01",
    t: "Capture receipts",
    d: "Upload photos, email receipts, or connect your inbox. We ingest everything automatically.",
  },
  {
    k: "02",
    t: "Analyze with AI",
    d: "We parse totals, merchants, categories, and taxes—then reconcile with your bank data.",
  },
  {
    k: "03",
    t: "Track & optimize",
    d: "Budgets update in real time and insights highlight trends, waste, and savings opportunities.",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "FinanceJini has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed.",
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.",
  },
  {
    name: "Emily Rodriguez",
    role: "Financial Advisor",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "I recommend FinanceJini to all my clients. The multi-currency support and detailed analytics make it perfect for international investors.",
  },
];

export const items = [
    { k: "98.6%", d: "Receipt parsing accuracy" },
    { k: "12 hrs", d: "Average time saved / month" },
    { k: "$3.2k", d: "Avg. yearly savings found" },
    { k: "256k+", d: "Receipts processed" },
  ]