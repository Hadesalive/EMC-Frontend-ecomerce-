# Express Management Consultancy - Marketing Website

Modern, high-performance marketing website built with Next.js 14+ and TypeScript for optimal SEO and speed.

## 🚀 Features

- **Next.js 14+** with App Router for server-side rendering and optimal performance
- **TypeScript** for type safety and better developer experience
- **SEO Optimized** with metadata API, semantic HTML, and structured data
- **Responsive Design** with mobile-first approach
- **Fast Performance** with automatic code splitting and image optimization
- **Modern UI** with CSS Modules and clean, professional design

## 📦 Tech Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Deployment**: Optimized for Vercel (as per proposal)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
marketing-website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── contact/           # Contact page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Layout/           # Header, Footer
│   ├── Home/             # Home page components
│   └── Contact/          # Contact form
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

- Update colors and styles in `app/globals.css`
- Modify metadata and SEO settings in `app/layout.tsx`
- Add new pages in the `app/` directory
- Customize components in the `components/` directory

## 📝 Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 🔗 Integration

This marketing website is designed to integrate with:
- Main Web Application (Phase 1)
- Mobile Application (Phase 2)
- Backend API (Phase 1)

## 📄 License

Copyright © Express Management Consultancy

