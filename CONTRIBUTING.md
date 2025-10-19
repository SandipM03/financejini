````markdown
# 🤝 Contributing to FinanceJini

Thanks for your interest in contributing to **FinanceJini** — an AI-powered financial assistant designed to simplify personal finance management with smart insights and Indian language support.  
We’re thrilled to welcome your ideas, code, and creativity!

---

## 🧭 Contribution Workflow

### 1. Fork the repository
Click the **“Fork”** button at the top-right corner of this page to create your own copy.

### 2. Clone your fork
```bash
git clone https://github.com/your-username/financejini.git
cd financejini
````

### 3. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

### 4. Make your changes

Add your feature, fix bugs, improve UI, or enhance performance — anything that makes FinanceJini better!

### 5. Commit and push

```bash
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```

### 6. Open a Pull Request

Go to your forked repo on GitHub and click **“Compare & pull request”**.
Clearly describe what you’ve changed and why. Link any related issues if applicable.

---

## 🧪 Contribution Ideas

Here are some areas where you can contribute:

* 🌐 **Language Expansion** – Add more Indian languages to the chatbot or UI
* 💅 **UI/UX Enhancements** – Improve visual design, animations, or accessibility
* 💬 **Chatbot Upgrades** – Enhance Gemini AI conversations with better prompt handling
* 💼 **Financial APIs** – Integrate new APIs for mutual funds, stock insights, or savings tracking
* 📈 **Analytics & Performance** – Optimize Next.js pages and Supabase queries
* 🔒 **Security & Rate Limiting** – Enhance Arcjet rules for better protection
* 🧾 **Testing** – Add Jest/Playwright tests for components or API routes
* ⚙️ **Automation** – Improve background jobs and cron flows via Inngest

---

## ⚙️ Code Style & Standards

* Follow **Next.js** and **React 19 (RC)** conventions
* Prefer **TypeScript** for new features
* Use **Tailwind CSS** utility-first approach for styling
* Run linters and formatters before committing:

  ```bash
  npm run lint
  npm run format
  ```
* Keep your commits **small**, **descriptive**, and **atomic**

---

## 🧾 Commit Message Format

To maintain consistency, please use a clear and structured commit format:

```
Add: new chatbot language support
Fix: rate limiting bug with Arcjet middleware
Update: Tailwind color theme
Refactor: Supabase query performance
Docs: improved README setup instructions
```

---

## 🧰 Development Setup Checklist

Before running the app locally, ensure you have these environment variables set up in `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Database
DATABASE_URL=your_supabase_connection_pooling_url
DIRECT_URL=your_supabase_direct_connection_url

# Arcjet (for rate limiting and API protection)
ARCJET_KEY=your_arcjet_key
```

Then start your development server:

```bash
npm run dev
```

For background jobs (if using Inngest):

```bash
npx inngest-cli@latest dev
```

---

## 🧠 Tech References

| Tool / Framework      | Usage                               |
| --------------------- | ----------------------------------- |
| **Next.js 15**        | Frontend & Backend framework        |
| **React 19 (RC)**     | UI Development                      |
| **Supabase**          | Database, Auth, Realtime            |
| **Clerk**             | Authentication & Session Management |
| **Google Gemini API** | AI Chat & Advisory                  |
| **Arcjet**            | API Security & Rate Limiting        |
| **Tailwind CSS**      | Styling                             |
| **Prisma (optional)** | ORM Layer                           |
| **Recharts**          | Data Visualization                  |
| **Resend**            | Transactional Emails                |
| **Inngest (planned)** | Background Jobs                     |


---

💡 *“Every pull request, no matter how small, helps build a smarter financial future for users.”*
Thank you for contributing to **FinanceJini** 💛

```

