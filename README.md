<<<<<<< HEAD
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
=======


````markdown
# 💰 FinanceJini – Your AI-Powered Financial Assistant

FinanceJini is a next-gen financial assistant web application that empowers users to **track expenses**, **manage accounts**, **receive personalized investment advice**, and **explore financial products** — all with **AI-powered insights** and **support for Indian languages**.

---

## 🚀 Features

- 🛂 **Secure Auth** – Login/Signup via Clerk  
- 🌐 **Language Support** – Choose your preferred Indian language  
- 📊 **Dashboard** – View account summaries, income, and expenses  
- 🧾 **Smart Transactions** – Upload bill images and auto-detect amount/type using AI  
- 🔁 **Recurring Transactions** – Add recurring incomes/expenses  
- 📈 **Visual Insights** – Interactive monthly income & expense graphs  
- 💬 **Finance Chatbot** – Ask finance-related questions via AI  
- 💼 **Personalized Advisory** – Investment suggestions based on goals, income, and risk appetite  
- 🔎 **Product Discovery** – Filter-based investment product exploration  
- 📤 **Email Support** – Receive summaries and alerts via Resend  
- 🧱 **Rate Limiting & Security** – Powered by Arcjet for API protection and request control  

---

## 🧠 Tech Stack

| Technology              | Role                                |
|--------------------------|-------------------------------------|
| **Next.js 15**           | Frontend & Backend Framework        |
| **React 19 (RC)**        | UI Development                      |
| **Tailwind CSS**         | Styling                             |
| **Supabase**             | Database, Auth, Realtime            |
| **Prisma (optional)**    | ORM Layer                           |
| **Clerk**                | Authentication & Session Management |
| **Google Gemini API**    | AI Chat & Advisory                  |
| **Recharts**             | Graphs & Visuals                    |
| **Resend + React Email** | Transactional Emails                |
| **Framer Motion**        | Animations                          |
| **Zod + React Hook Form**| Form Validation                     |
| **Radix UI**             | Headless UI Components              |
| **Arcjet**               | Rate Limiting & API Security        |
| **Inngest (planned)**    | Background Jobs                     |

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/SandipM03/financejini.git
cd financejini
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app
>>>>>>> 396e0131d786290258b0b27e298a06c270916a9a

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

<<<<<<< HEAD
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📧 Email Development

```bash
# Start email development server
npm run email
```
=======
### 4. Run Inngest (if applicable)

```bash
npx inngest-cli@latest dev
```

---

## 🔐 Environment Variables

Before running the app, create a `.env.local` file in the root directory and add the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase Database
DATABASE_URL=your_supabase_connection_pooling_url
DIRECT_URL=your_supabase_direct_connection_url

# Arcjet (for rate limiting & API security)
ARCJET_KEY=your_arcjet_key
```

---

## 🤝 Contributing

We welcome contributions to improve **FinanceJini**!
Please read our [Contribution Guidelines](./CONTRIBUTING.md) before submitting a pull request.

---

## 📚 Documentation

* [Clerk Docs](https://clerk.com/docs)
* [Supabase Docs](https://supabase.com/docs)
* [Gemini AI Docs](https://ai.google.dev)
* [Prisma Docs](https://www.prisma.io/docs)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)
* [Arcjet Docs](https://arcjet.com/docs)

---

## 🙌 Acknowledgments

* Google Gemini API
* Supabase
* Clerk
* Arcjet

---
## 📬 Contact

Built by Sandip Mandal

📍 Based in India | 🌐 Open to remote & global collaboration
* React & Next.js Community

---

>>>>>>> 396e0131d786290258b0b27e298a06c270916a9a
