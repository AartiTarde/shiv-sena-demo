# Government Voter Management System

A secure Next.js application built with TypeScript and Tailwind CSS, featuring comprehensive security measures for government-level data protection.

## Features

- 🔐 Secure login with authentication
- 📊 Dashboard with sidebar navigation
- 🎨 Modern UI with Tailwind CSS
- 🔒 **Comprehensive Security Implementation**
  - XSS Protection
  - CSRF Protection
  - Input Validation & Sanitization
  - Rate Limiting
  - Security Headers (CSP, HSTS, etc.)
  - Secure Authentication
- 📱 Responsive design
- ⚡ Built with Next.js 14 and TypeScript

## Security

This application implements comprehensive security measures suitable for government projects:

- **Security Headers**: CSP, XSS Protection, HSTS, Frame Options, and more
- **Input Validation**: All user inputs are validated and sanitized
- **XSS Protection**: HTML sanitization and safe rendering
- **CSRF Protection**: Token-based CSRF protection
- **Rate Limiting**: Prevents brute force and DoS attacks
- **Secure Authentication**: Token-based auth with session management
- **Secure Storage**: Sanitized localStorage wrapper

See [SECURITY.md](./SECURITY.md) for detailed security documentation.

⚠️ **Important**: For production deployment, implement backend API authentication and move sensitive operations to a secure backend.

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

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Update the environment variables with your secure values. **Never commit `.env.local` to version control.**

### Security Configuration

Security headers are automatically applied via `middleware.ts`. To customize:

1. Edit `middleware.ts` for header configuration
2. Edit `app/utils/security.ts` for validation rules
3. Edit `app/utils/auth.ts` for authentication settings

### Disabling Next.js Telemetry

Next.js collects anonymous telemetry data by default. To disable it:

**Locally:**
```bash
npx next telemetry disable
```

**On Vercel:**
Set the environment variable `NEXT_TELEMETRY_DISABLED=1` in your Vercel project settings.

## Security Best Practices

1. **Never commit sensitive data** - Use environment variables
2. **Keep dependencies updated** - Run `npm audit` regularly
3. **Use HTTPS in production** - Always enforce HTTPS
4. **Implement backend API** - Move authentication to secure backend
5. **Regular security audits** - Review and update security measures
6. **Monitor for vulnerabilities** - Set up security monitoring

For detailed security information, see [SECURITY.md](./SECURITY.md).

