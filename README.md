# Next.js Dashboard with Login

A modern Next.js application built with TypeScript and Tailwind CSS, featuring a login page and dashboard with sidebar navigation.

## Features

- 🔐 Login page with demo credentials
- 📊 Dashboard with sidebar navigation
- 🎨 Modern UI with Tailwind CSS
- 🌙 Dark mode support
- 📱 Responsive design
- ⚡ Built with Next.js 14 and TypeScript

## Demo Login Credentials

- **Email:** `demo@example.com`
- **Password:** `demo123`

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── dashboard/      # Dashboard page with sidebar
│   ├── login/          # Login page
│   ├── globals.css     # Global styles with Tailwind
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page (redirects to login/dashboard)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Dashboard Features

- **Sidebar Navigation:** Overview, Analytics, Reports, Settings
- **Overview Section:** Displays key metrics and recent activity
- **Responsive Design:** Works on desktop and mobile devices
- **Logout Functionality:** Secure logout that redirects to login page

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- React 18
- Framer Motion

## Configuration

### Disabling Next.js Telemetry

Next.js collects anonymous telemetry data by default. To disable it:

**Locally:**
```bash
npx next telemetry disable
```

**On Vercel:**
Set the environment variable `NEXT_TELEMETRY_DISABLED=1` in your Vercel project settings.

