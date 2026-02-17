<div align="center">

# FinanceJini

### AI-Powered Personal Finance Platform

Track income and expenses across multiple accounts, scan receipts with AI, automate recurring transactions, manage budgets with smart alerts, and receive personalized monthly financial reports — all in one place.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running Background Jobs](#running-background-jobs)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Contact](#contact)

---

## Overview

**FinanceJini** is a full-stack AI finance platform built with Next.js 15 and React 19. It helps users take control of their financial health by combining intelligent transaction tracking, AI-powered receipt scanning, automated budget monitoring, and data-driven insights — delivered through interactive dashboards and automated email reports.

---

## Features

### Account Management
- Create and manage multiple accounts (Current & Savings)
- Set a default account for quick access
- View per-account balance, transaction count, and detailed history

### Transaction Tracking
- Log income and expenses with smart category tagging
- Edit and delete individual transactions
- Bulk-select and delete multiple transactions at once
- Search, filter (by type, recurring status), and sort transactions
- 30+ built-in expense and income categories with color-coded badges

### AI Receipt Scanning
- Upload a receipt image (up to 5 MB) and let **Google Gemini AI** extract:
  - Amount, date, description, merchant name, and suggested category
- Auto-fills the transaction form — no manual entry needed

### Recurring Transactions
- Set up transactions to repeat on a **daily, weekly, monthly, or yearly** basis
- Background jobs automatically create new entries and update account balances on schedule

### Budget Management & Alerts
- Set a monthly spending budget
- Visual progress bar with color-coded thresholds:
  - Green (< 50%) · Lime (50–75%) · Amber (75–90%) · Red (90%+)
- **Automated email alerts** when spending reaches 80% of the budget
- Alerts triggered both on a 6-hour cron schedule and immediately when a new transaction is created

### Interactive Dashboard
- Account summary cards with balance and type indicators
- Monthly expense breakdown — **Pie Chart** by category
- Income vs. Expense trends — **Bar Chart** with selectable time ranges (7D, 1M, 3M, 6M, All)
- Recent transactions feed (last 5 per account)
- Inline budget progress tracking

### AI-Powered Monthly Reports
- Automatically generated on the **1st of every month** via background cron
- Gathers monthly income, expenses, net balance, and top spending categories
- **Google Gemini AI** analyzes the data and generates personalized financial insights
- Full report delivered to the user's email with category breakdowns and AI recommendations

### Authentication & Security
- **Clerk** authentication — sign-in, sign-up, session management, and user sync
- Protected routes via middleware for dashboard, account, and transaction pages
- **Arcjet** token-bucket rate limiting on account and transaction creation (2 requests/hour per user)

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Full-stack React framework with Server Actions |
| **UI** | React 19, Tailwind CSS 4 | Component library and utility-first styling |
| **Components** | Radix UI, Vaul, Lucide Icons | Headless primitives, drawer, and icon system |
| **Charts** | Recharts | Interactive bar and pie charts |
| **Forms** | React Hook Form + Zod | Form state management and schema validation |
| **Database** | PostgreSQL (Supabase) | Primary data store with connection pooling |
| **ORM** | Prisma 6 | Type-safe database access and migrations |
| **Auth** | Clerk | User authentication and session management |
| **AI** | Google Gemini API | Receipt OCR and financial insight generation |
| **Background Jobs** | Inngest | Cron scheduling and event-driven job processing |
| **Email** | Resend + React Email | Transactional email delivery with React templates |
| **Security** | Arcjet | API rate limiting via token bucket algorithm |
| **Animations** | Motion (Framer Motion) | UI animations and transitions |

---

## Architecture

```
Client (React 19)
    │
    ├── Server Actions ──► Prisma ──► PostgreSQL (Supabase)
    │
    ├── Clerk Middleware ──► Auth & Session
    │
    ├── Arcjet ──► Rate Limiting
    │
    └── Inngest (Background)
            ├── Budget alerts (cron: every 6 hours)
            ├── Budget check on new transaction (event-driven)
            ├── Recurring transaction trigger (cron: daily at midnight)
            ├── Recurring transaction processor (event-driven, throttled)
            └── Monthly AI report generation (cron: 1st of month)
                    ├── Google Gemini AI ──► Financial insights
                    └── Resend ──► Email delivery
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- **PostgreSQL** database (Supabase recommended)
- API keys for Clerk, Google Gemini, Arcjet, and Resend

### 1. Clone the Repository

```bash
git clone https://github.com/SandipM03/financejini.git
cd financejini
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root (see [Environment Variables](#environment-variables) below).

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### 6. Start the Inngest Dev Server

In a separate terminal, start the Inngest dev server for background job processing:

```bash
npx inngest-cli@latest dev
```

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase PostgreSQL Database
DATABASE_URL=your_supabase_connection_pooling_url
DIRECT_URL=your_supabase_direct_connection_url

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Arcjet Rate Limiting
ARCJET_KEY=your_arcjet_key

# Resend Email Service
RESEND_API_KEY=your_resend_api_key
```

---

## Database Setup

FinanceJini uses **Prisma** with **PostgreSQL** (Supabase). The schema defines four core models:

| Model | Description |
|---|---|
| **User** | Synced from Clerk — owns accounts, transactions, and budgets |
| **Account** | Current or Savings account with balance tracking |
| **Transaction** | Income or expense entry with optional recurrence and receipt URL |
| **Budget** | Monthly spending limit per user with alert tracking |

Run migrations or push the schema:

```bash
npx prisma db push
```

Optionally seed the database with 90 days of sample data:

```bash
# Visit /api/seed in your browser or call it via curl
curl http://localhost:3000/api/seed
```

---

## Running Background Jobs

FinanceJini uses **Inngest** for 5 background functions:

| Function | Trigger | Description |
|---|---|---|
| `checkBudgetAlert` | Cron (every 6 hours) | Scans all budgets and sends email alerts when spending exceeds 80% |
| `checkBudgetOnTransaction` | Event: `transaction.created` | Immediately checks budget threshold when a new transaction is added |
| `triggerRecurringTransactions` | Cron (daily at midnight) | Finds due recurring transactions and dispatches processing events |
| `processRecurringTransaction` | Event: `transaction.recurring.process` | Creates the transaction copy, updates balance, advances next date |
| `generateMonthlyReports` | Cron (1st of each month) | Generates AI-powered financial reports and emails them to users |

Start the Inngest dev server alongside your Next.js app:

```bash
npx inngest-cli@latest dev
```

---

## Project Structure

```
financejini/
├── action/                    # Server actions
│   ├── accounts.js            # Account CRUD operations
│   ├── budget.js              # Budget management
│   ├── dashboard.js           # Dashboard data aggregation
│   ├── transaction.js         # Transaction CRUD + AI receipt scanning
│   ├── sendEmail.js           # Email dispatch via Resend
│   └── seed.js                # Database seeding logic
├── app/
│   ├── layout.js              # Root layout with Clerk provider
│   ├── page.jsx               # Landing page
│   ├── (auth)/                # Auth routes (sign-in, sign-up)
│   ├── (main)/                # Protected app routes
│   │   ├── dashboard/         # Dashboard with charts and account cards
│   │   ├── account/[id]/      # Account detail with transaction table
│   │   └── transaction/       # Transaction form and receipt scanner
│   ├── api/
│   │   ├── inngest/           # Inngest webhook endpoint
│   │   ├── seed/              # Database seed API route
│   │   └── webhooks/clerk/    # Clerk webhook handler
│   └── lib/schema.js          # Zod validation schemas
├── components/                # Shared UI components
│   ├── header.jsx             # Navigation header
│   ├── Hero.jsx               # Landing page hero section
│   ├── createAccountDrawer.jsx
│   └── ui/                    # Radix-based UI primitives
├── data/                      # Static data (categories, landing page content)
├── emails/template.jsx        # React Email templates (reports + alerts)
├── hooks/use-fetch.js         # Custom data fetching hook
├── lib/
│   ├── prisma.js              # Prisma client singleton
│   ├── checkUser.js           # Clerk-to-DB user sync
│   ├── arcjet.js              # Rate limiter configuration
│   └── inngest/               # Inngest client + function definitions
├── prisma/schema.prisma       # Database schema
└── middleware.js               # Clerk auth middleware
```

---

## Documentation

| Resource | Link |
|---|---|
| Next.js | [nextjs.org/docs](https://nextjs.org/docs) |
| Clerk | [clerk.com/docs](https://clerk.com/docs) |
| Prisma | [prisma.io/docs](https://www.prisma.io/docs) |
| Supabase | [supabase.com/docs](https://supabase.com/docs) |
| Google Gemini AI | [ai.google.dev](https://ai.google.dev) |
| Inngest | [inngest.com/docs](https://www.inngest.com/docs) |
| Arcjet | [docs.arcjet.com](https://docs.arcjet.com) |
| Resend | [resend.com/docs](https://resend.com/docs) |
| Tailwind CSS | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| Recharts | [recharts.org](https://recharts.org) |

---

## Contact

Built by **Sandip Mandal**

Based in India | Open to remote & global collaboration

---
