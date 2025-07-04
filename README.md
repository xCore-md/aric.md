# 🧾 Project Overview

This project is built using the following modern technologies:

- [Next.js](https://nextjs.org/) – A React framework for building fast, scalable web applications.
- [Tailwind CSS](https://tailwindcss.com/) – A utility-first CSS framework for styling.
- [shadcn/ui](https://ui.shadcn.com/) – Accessible and customizable UI components based on Radix UI and Tailwind.
- [TanStack Query (React Query)](https://tanstack.com/query/latest) – Powerful asynchronous state and data-fetching library.

---

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

---

## 🔐 Environment Variables

Create a `.env.local` file in the root of your project and add the following variables:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
AUTH_SECRET=your-secret-key
```

> These variables are required for the application to connect to the backend and handle authentication.

---

## 📦 Available Scripts

```bash
npm run dev        # Start the development server
npm run build      # Build the app for production
npm run start      # Start the production server
```