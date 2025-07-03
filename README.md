# Next.js Authentication System

A complete authentication system built with Next.js, Auth.js, and PostgreSQL. Features include:

- Username & password authentication
- GitHub OAuth authentication
- Persistent sessions
- Modern UI with Shadcn UI

## Features

- 🔐 Secure user authentication with Auth.js
- 📱 Responsive design with Tailwind CSS and Shadcn UI
- 🔄 Persistent sessions using JWT and PostgreSQL
- 🚀 Fast and SEO-friendly with Next.js App Router
- 🐘 PostgreSQL database integration

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@hostname:port/database"

# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

### Installation

1. Install dependencies:

```bash
npm install
```

2. Initialize the database:

```bash
npx tsx src/scripts/db-init.ts
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The authentication system uses the following database tables:

- `users` - User information including credentials
- `accounts` - OAuth accounts linked to users
- `sessions` - Active sessions
- `verification_tokens` - Email verification tokens

## Authentication Flow

1. Users can sign up with email and password
2. Users can sign in with credentials or GitHub
3. Sessions are persisted using JWT strategy
4. Protected routes require authentication

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
