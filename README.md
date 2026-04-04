# FinanceJini 💰

A modern personal finance management application with AI-powered receipt scanning, automated budget tracking, and comprehensive financial insights.

## 🚀 Tech Stack

### Frontend
- **Next.js 15.5.3** - React framework with App Router and Turbopack
- **React 19.1.0** - UI library with latest features
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library with Radix UI primitives
- **Lucide React** - Beautiful icon library
- **Recharts** - Chart library for financial data visualization
- **React Hook Form + Zod** - Form handling with TypeScript-first schema validation

### Backend & Database
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Robust relational database (via Supabase)
- **Supabase** - Database hosting with connection pooling

### Authentication & Security
- **Clerk** - Complete authentication solution
- **Middleware** - Route protection and user session management

### AI & Integrations
- **Google Generative AI (Gemini)** - AI-powered receipt scanning and expense categorization
- **Resend** - Transactional email service
- **React Email** - Email template components

### Background Jobs & Notifications
- **Inngest** - Serverless background job processing
- **Sonner** - Toast notifications

### UI/UX Components
- **Radix UI** - Headless UI primitives (Dialog, Dropdown, Select, etc.)
- **React Day Picker** - Calendar and date selection
- **Vaul** - Mobile-optimized drawer component
- **React Spinners** - Loading states and animations
- **Next Themes** - Dark/light mode support

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Class Variance Authority** - Conditional CSS class utilities

## 🛠️ Key Features

- **Smart Expense Tracking** - AI-powered receipt scanning with automatic categorization
- **Multi-Account Management** - Track multiple bank accounts and credit cards
- **Budget Monitoring** - Automated monthly budget alerts and insights
- **Bulk Operations** - Efficient transaction management with bulk delete
- **Real-time Dashboard** - Financial overview with interactive charts
- **Email Notifications** - Monthly reports and budget alerts
- **Secure Authentication** - Protected routes with Clerk integration

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📧 Email Development

```bash
# Start email development server
npm run email
```
